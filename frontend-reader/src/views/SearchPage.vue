<script setup>
import { ref, watch } from "vue";
import bookService from "../services/book.service";
import Input from "../components/form/Input.vue";
import SearchIcon from "../components/icons/SearchIcon.vue";
import Pagination from "../components/pagination/Pagination.vue";

const searchResults = ref([]);
const searchTerm = ref("");
const renderedSearchResults = ref([]);
const isFetching = ref(false);

const fetchData = async () => {
  try {
    if (searchTerm.value.trim().length >= 2) {
      isFetching.value = true;
      const response = await bookService.findByName(searchTerm.value);
      searchResults.value = response;
    }
  } catch (error) {
    console.log(error);
  }
  isFetching.value = false;
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
      <div class="flex justify-center">
        <Input
          type="text"
          name="text"
          classes="grow !bg-white !border !border-r-0 border-gray-300 !outline-none !rounded-l-full placeholder:text-gray-500 placeholder:italic"
          placeholder="Nhập tên sách hoặc tên tác giả..."
          v-model="searchTerm"
          :onChange="handleChange"
        />

        <div
          class="size-[3.4rem] p-3 bg-white rounded-r-full border border-l-0 border-gray-300"
        >
          <SearchIcon />
        </div>
      </div>

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
                class="w-10 h-16 object-cover rounded-[0.2rem]"
              />
              <div>
                <p class="font-semibold">
                  {{ book.name }}
                </p>
                <p class="text-sm italic text-gray-600">
                  {{ book.authorsInfo[0].name }}
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

      <!-- Fallback text -->
      <p class="text-center mt-10">
        <template v-if="isFetching">Đang tìm kiếm...</template>
        <template v-else-if="!isFetching && searchResults.length === 0">
          {{
            searchTerm.trim().length >= 2
              ? "Không tìm thấy kết quả"
              : "Nhập tên sách hoặc tên tác giả để tìm kiếm"
          }}
        </template>
      </p>
    </section>
  </main>
</template>
