<script setup>
import { computed, ref, watchEffect } from "vue";
import { useRoute } from "vue-router";
import bookService from "../services/book.service";
import { formatCurrency } from "../utils/utils";
import BookInfo from "../components/BookInfo.vue";
import ButtonAmount from "../components/UI/ButtonAmount.vue";
import Button from "../components/UI/Button.vue";

const route = useRoute();
const book = ref(null);
const formattedPrice = ref(0);

const amount = ref(1);

watchEffect(async () => {
  const response = await bookService.get(route.params.id);
  book.value = response[0];
  if (book.value.price) {
    formattedPrice.value = computed(() => {
      const price = formatCurrency(book.value.price);

      return price;
    });
  }
});
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
          <span class="text-3xl text-yellow-400">{{
            formattedPrice.value
          }}</span>
          <span class="text-2xl"> /</span>
          <span class="text-xl">ngày</span>
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
            {{ 10 }}
          </p>
        </div>

        <!-- Actions -->
        <div class="mt-4 inline-flex gap-2">
          <!-- Amount -->
          <div class="w-36 inline-grid grid-cols-3 gap-[1px] text-white">
            <ButtonAmount :on-click="() => --amount" classes="rounded-l-md">
              -
            </ButtonAmount>
            <input
              type="number"
              name="amount"
              min="1"
              max="100"
              :value="amount"
              @change="(e) => (amount = e.target.value)"
              class="bg-[#333333] py-3 px-2 text-white outline-none text-center"
            />
            <ButtonAmount :on-click="() => ++amount" classes="rounded-r-md">
              +
            </ButtonAmount>
          </div>

          <!-- Order -->
          <Button
            label="ĐẶT NGAY"
            :in-stock="true"
            :on-click="() => console.log(`Borrow book with ${amount} days`)"
            classes="py-2 px-10"
          />
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
