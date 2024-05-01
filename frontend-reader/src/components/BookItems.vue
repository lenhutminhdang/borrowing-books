<script setup>
import BookItem from "./BookItem.vue";
const props = defineProps({
  books: Array,
});
</script>
<template>
  <ul class="grid grid-cols-3 md:grid-cols-6 gap-4">
    <li v-for="book in books" :key="book._id">
      <BookItem
        :to="{ name: 'book-details', params: { id: book._id } }"
        :book="book"
      />
    </li>
  </ul>
</template>
