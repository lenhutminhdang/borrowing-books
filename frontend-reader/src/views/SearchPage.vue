<script setup>
import { ref, watch } from "vue";
import bookService from "../services/book.service";
import Button from "../components/UI/Button.vue";
import Input from "../components/form/Input.vue";
import SearchIcon from "../components/icons/SearchIcon.vue";
import Pagination from "../components/pagination/Pagination.vue";

const searchResults = ref([]);
const searchTerm = ref("");
const renderedSearchResults = ref([]);

const fetchData = async () => {
  try {
    const response = await bookService.findByName(searchTerm.value);

    searchResults.value = response;
  } catch (error) {
    console.log(error);
  }
};

const renderNewSearchResults = (dataFromPagination) => {
  renderedSearchResults.value = dataFromPagination;
};

const handleChange = (e) => {
  searchTerm.value = e.target.value;
};

function createDebounce() {
  let timer;
  return function (fn, delay = 500) {
    clearTimeout(timer);

    timer = setTimeout(() => {
      fn();
    }, delay);
  };
}

const debounce = createDebounce();

watch(searchTerm, () => {
  debounce(fetchData);
});
</script>

<template>
  <main class="text-gray-700">
    <section class="md:mx-20 xl:mx-40">
      <form @submit.prevent="fetchData" class="flex justify-center">
        <Input
          type="text"
          name="text"
          classes="grow !bg-white !border !border-r-0 border-gray-300 !outline-none !rounded-l-full"
          placeholder="Nhập tên sách..."
          v-model="searchTerm"
          :onChange="handleChange"
        />

        <button
          class="size-[3.4rem] p-3 bg-white rounded-r-full border border-l-0 border-gray-300"
        >
          <SearchIcon />
        </button>
      </form>

      <!-- Search Results -->
      <div>
        <ul
          v-if="renderedSearchResults.length > 0"
          class="flex flex-col mt-4 bg-white border border-gray-300 rounded-md"
        >
          <li v-for="book in renderedSearchResults" :key="book._id">
            <router-link
              :to="{ name: 'book-details', params: { id: book._id } }"
              class="flex gap-x-3 p-4 bg-yellow-50 hover:bg-yellow-100"
            >
              <img
                :src="book.image"
                :alt="book.name"
                class="w-10 h-[16] object-cover rounded-[0.2rem]"
              />
              <div>
                <p class="font-semibold">
                  {{ book.name }}
                </p>
                <p class="text-sm italic text-gray-600">
                  {{ book.author }}
                </p>
              </div>
            </router-link>
          </li>
        </ul>
        <Pagination
          v-if="searchResults"
          :items="searchResults"
          :itemsPerPage="5"
          @renderNewItems="renderNewSearchResults"
        />
      </div>
      <p
        v-if="searchResults.length === 0 && searchTerm !== ''"
        class="text-center mt-10"
      >
        Không tìm thấy kết quả
      </p>
      <p
        v-if="searchResults.length === 0 && searchTerm === ''"
        class="text-center mt-10"
      >
        Nhập tên sách để tìm kiếm
      </p>
    </section>
  </main>
</template>
