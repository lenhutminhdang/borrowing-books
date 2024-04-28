<script setup>
import { computed, ref, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";
import bookService from "../services/book.service";
import historyService from "../services/history.service";
import { formatCurrency, getDomainName } from "../utils/utils";
import BookInfo from "../components/BookInfo.vue";
import ButtonAmount from "../components/UI/ButtonAmount.vue";
import Button from "../components/UI/Button.vue";
import ModalWrapper from "../components/ModalWrapper.vue";
import { useAuthStore } from "../store";
import readerService from "../services/reader.service";
import { addDays, format } from "date-fns";

const BROWSER_DATE_FORMAT = "yyyy-MM-dd";

const route = useRoute();
const router = useRouter();
const store = useAuthStore();
const book = ref(null);
const publisher = computed(() => book.value?.publisherInfo[0]);
const amount = ref(1);

const show = ref(false);
const showPublisher = ref(false);

watchEffect(async () => {
  const response = await bookService.get(route.params.id);
  book.value = response[0];
});

const addToFavorite = async () => {
  if (!store.isLoggedIn) {
    router.push({ name: "login" });
  }

  if (book.value && store.user) {
    const bookId = book.value._id || route.params.id;
    const id = store.user._id;

    await readerService.addToFavorites({
      id,
      bookId,
    });

    router.push({ name: "favorites" });
  }
};

const borrowBook = async () => {
  if (!store.isLoggedIn) {
    router.push({ name: "login" });
  }

  const bookId = book.value._id || route.params.id;
  const reader = store.user._id;
  const borrowDate = format(new Date(), BROWSER_DATE_FORMAT);
  const dueDate = format(
    addDays(new Date(), amount.value),
    BROWSER_DATE_FORMAT
  );

  if (bookId && reader) {
    const response = await historyService.borrowBook({
      book: bookId,
      reader,
      borrowDate,
      dueDate,
    });

    // Borrowed successfully
    // Then decrease the amount of book by 1 (book.instock)
    if (response.insertedId && book.value.instock > 0) {
      await bookService.update(bookId, {
        instock: --book.value.instock,
      });
    }

    // Show notification here
    // OR redirect to History Page
    router.push({ name: "history" });
  }
};

// Modal
const showModal = () => (show.value = true);
const closeModal = () => (show.value = false);
const checkAuthBeforeShow = () => {
  if (!store.isLoggedIn) {
    router.push({ name: "login" });
  } else {
    showModal();
  }
};

const togglePublisher = () => (showPublisher.value = !showPublisher.value);

const agree = () => {
  borrowBook();

  closeModal();
};

// Amount Buttons
const onDecrease = () => {
  if (amount.value <= 1) amount.value = 1;
  else --amount.value;
};
const onIncrease = () => {
  ++amount.value;
};
const onChange = (e) => {
  if (e.target.value <= 1) amount.value = 1;
  else {
    amount.value = +e.target.value;
  }
};
</script>

<template>
  <main>
    <section
      v-if="book"
      class="grid grid-cols-1 xl:grid-cols-[3fr_5fr] xl:gap-8"
    >
      <div class="place-self-center xl:place-self-auto">
        <img
          class="max-w-[20rem] xl:max-w-[30rem] aspect-[2/3] object-cover object-center rounded-xl"
          :src="book.image"
          :alt="book.name"
        />
      </div>
      <div class="mt-6 xl:mt-0">
        <!-- Book name -->
        <h1 class="text-3xl text-center xl:text-left text-gray-800">
          {{ book.name }}
        </h1>

        <!-- Borrowing price -->
        <h2 class="my-5 text-center xl:text-left">
          <span class="text-3xl text-yellow-500">{{
            book.price > 0 ? formatCurrency(book.price) : "Miễn phí"
          }}</span>
          <span v-if="book.price > 0" class="text-2xl"> /</span>
          <span v-if="book.price > 0" class="text-xl">ngày</span>
        </h2>

        <!-- Book info -->
        <BookInfo :book="book" @on-toggle-publisher="togglePublisher" />

        <!-- Book description -->
        <div>
          <h3 class="font-semibold">Nội dung</h3>
          <p class="text-[1rem] font-light whitespace-pre-line text-gray-600">
            {{ book.description }}
          </p>
        </div>

        <!-- Instock -->
        <div class="flex gap-4 mt-4">
          <h3 class="font-semibold">Tồn kho:</h3>
          <p class="text-[1rem] font-light whitespace-pre-line text-gray-600">
            {{ book.instock || 0 }}
          </p>
        </div>

        <!-- Actions -->
        <div class="mt-4 inline-flex flex-wrap gap-2">
          <!-- Amount -->
          <div
            title="Nhập số ngày bạn muốn mượn sách"
            class="w-36 inline-grid grid-cols-3 gap-[1px] text-white"
          >
            <ButtonAmount :on-click="onDecrease" classes="rounded-l-md">
              -
            </ButtonAmount>
            <input
              type="number"
              name="amount"
              min="1"
              max="100"
              :value="amount"
              @change="onChange"
              class="bg-[#333333] py-3 px-2 text-white outline-none text-center"
            />
            <ButtonAmount :on-click="onIncrease" classes="rounded-r-md">
              +
            </ButtonAmount>
          </div>

          <!-- Order -->
          <Button
            :disabled="!book.instock"
            :on-click="checkAuthBeforeShow"
            classes="py-3 px-6"
            >MƯỢN SÁCH</Button
          >
          <!-- Favorite -->
          <Button
            :on-click="addToFavorite"
            classes="py-3 px-8 !bg-main !text-white"
            >YÊU THÍCH</Button
          >
        </div>
      </div>
    </section>

    <!-- Confirm Modal -->
    <ModalWrapper :show-modal="show">
      <template #title> Xác nhận mượn sách? </template>

      <template #content v-if="book">
        <div>
          {{ book.name }}
        </div>
        <div v-if="book.price > 0">
          {{ amount }} ngày x {{ formatCurrency(book.price) }} =
          {{ formatCurrency(amount * book.price) }}
        </div>
        <div v-else>Miễn phí</div>
      </template>

      <template #actions>
        <Button
          :on-click="closeModal"
          classes="py-2 !bg-transparent !text-main border border-main"
          >Hủy</Button
        >
        <Button :on-click="agree" classes="py-2">Đồng ý</Button>
      </template>
    </ModalWrapper>

    <div
      v-if="publisher"
      class="fixed left-0 bottom-0 max-h-[80vh] w-full px-6 pt-6 bg-white border shadow-2xl rounded-t-[3rem] duration-300"
      :class="{ '-bottom-[105%]': !showPublisher }"
    >
      <div
        class="flex flex-col md:flex-row gap-6 items-start w-full h-full p-6 bg-gray-100 rounded-t-[2rem]"
      >
        <div class="shrink-0 flex items-center gap-6">
          <figure class="shrink-0 w-56 rounded-2xl overflow-hidden">
            <img
              :src="publisher.logo"
              :alt="publisher.name"
              class="w-full h-full object-cover"
            />
          </figure>
          <h3 class="block md:hidden text-2xl text-wrap font-semibold mb-4">
            NXB {{ publisher.name }}
          </h3>
        </div>

        <div class="w-full text-gray-800">
          <h3 class="hidden md:block text-2xl font-semibold mb-4">
            NXB {{ publisher.name }}
          </h3>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-x-24 gap-y-2">
            <div class="flex flex-col gap-2">
              <div class="grid grid-cols-[1fr_2.5fr] gap-16">
                <h4 class="text-lg text-gray-500">Phone</h4>
                <p class="justify-self-end">{{ publisher.phone }}</p>
              </div>

              <div class="grid grid-cols-[1fr_2.5fr] gap-16">
                <h4 class="text-lg text-gray-500">Email</h4>
                <p class="justify-self-end">{{ publisher.email }}</p>
              </div>
            </div>

            <div class="flex flex-col gap-2">
              <div class="grid grid-cols-[1fr_2.5fr] gap-16">
                <h4 class="text-lg text-gray-500">Website</h4>
                <a
                  :href="publisher.website"
                  target="_blank"
                  class="justify-self-end text-blue-600"
                >
                  {{ getDomainName(publisher.website) }}
                </a>
              </div>

              <div class="grid grid-cols-[1fr_2.5fr] gap-16">
                <h4 class="text-lg text-gray-500">Address</h4>
                <p class="justify-self-end">{{ publisher.address }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button
        @click="togglePublisher"
        class="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 size-10 rounded-full bg-yellow-200 text-xl duration-300"
      >
        <span class="block -translate-x-[2px]">&#11085;</span>
      </button>
    </div>
  </main>
</template>

<style scoped>
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
/* Firefox */
input[type="number"] {
  appearance: textfield;
}
</style>
>
