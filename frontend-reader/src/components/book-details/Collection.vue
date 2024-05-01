<script setup>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import bookService from "../../services/book.service";
import BookItems from "../BookItems.vue";
import Pagination from "../pagination/Pagination.vue";

const props = defineProps({
  collection: String,
  name: String,
});

const route = useRoute();
const books = ref([]);
const renderedBooks = ref([]);

const renderNewBooks = (dataFromPagination) => {
  renderedBooks.value = dataFromPagination;
};

watch(
  () => route.params.id,
  async () => {
    if (props.collection) {
      const response = await bookService.findByCollection(props.collection);
      books.value = response.filter((book) => book._id !== route.params.id);
    }
  },
  {
    immediate: true,
  }
);
</script>
<template>
  <div v-if="books.length > 0">
    <h2 class="text-xl text-gray-600 mb-4">@Cùng bộ sưu tập "{{ name }}"</h2>

    <BookItems :books="renderedBooks" />

    <Pagination
      v-if="books"
      :items="books"
      :itemsPerPage="6"
      @renderNewItems="renderNewBooks"
    />
  </div>
</template>
