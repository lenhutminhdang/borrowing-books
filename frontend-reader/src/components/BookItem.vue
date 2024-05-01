<script setup>
import { formatCurrency } from "../utils/utils";

const props = defineProps({
  to: Object,
  book: Object,
});
</script>
<template>
  <router-link :to="to" class="group text-center">
    <div class="overflow-hidden rounded-md">
      <img
        class="w-full rounded-md object-cover aspect-[9/16] group-hover:scale-105 transition-transform duration-300"
        :src="book.image"
        :alt="book.name"
      />
    </div>
    <h3 class="text-lg truncate">{{ book.name }}</h3>
    <p class="whitespace-nowrap">
      <span class="text-yellow-500 text-lg sm:text-base">{{
        book.price > 0 ? formatCurrency(book.price) : "Miễn phí"
      }}</span>
      <span v-if="book.price > 0" class="font-light">/ngày</span>
    </p>
  </router-link>
</template>
