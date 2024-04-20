<script setup>
import { ref, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";
import bookService from "../services/book.service";
import { formatCurrency } from "../utils/utils";
import BookInfo from "../components/BookInfo.vue";
import ButtonAmount from "../components/UI/ButtonAmount.vue";
import Button from "../components/UI/Button.vue";
import { useAuthStore } from "../store";
import readerService from "../services/reader.service";

const route = useRoute();
const router = useRouter();
const store = useAuthStore();
const book = ref(null);
const amount = ref(1);

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

    const response = await readerService.addToFavorites({
      id,
      bookId,
    });

    if (response.message) {
      alert(response.message);
    }
  }
};

const borrowBook = async () => {
  if (!store.isLoggedIn) {
    router.push({ name: "login" });
  }
  const bookId = book.value._id || route.params.id;
  console.log("Borrow book: ", book.value.name, bookId);
};

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
        <p class="my-5 text-center xl:text-left">
          <span class="text-3xl text-yellow-500">{{
            book.price > 0 ? formatCurrency(book.price) : "Miễn phí"
          }}</span>
          <span v-if="book.price > 0" class="text-2xl"> /</span>
          <span v-if="book.price > 0" class="text-xl">ngày</span>
        </p>

        <!-- Book info -->
        <BookInfo :book="book" />

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
            :on-click="borrowBook"
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
