<script setup>
import { ref } from "vue";
import bookService from "../services/book.service";
import Button from "../components/UI/Button.vue";
import Input from "../components/form/Input.vue";
import SearchIcon from "../components/icons/SearchIcon.vue";

const searchResults = ref([]);
const searchTerm = ref("");

const handleSubmit = async () => {
  try {
    const response = await bookService.findByName(searchTerm.value);

    searchResults.value = response;
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <main class="text-gray-700">
    <section class="md:mx-20 xl:mx-40">
      <form @submit.prevent="handleSubmit" class="flex justify-center">
        <Input
          type="text"
          name="text"
          classes="grow !bg-white !border !border-r-0 border-gray-300 !outline-none !rounded-l-full"
          placeholder="Nhập tên sách..."
          v-model="searchTerm"
        />

        <button
          class="size-[3.4rem] p-3 bg-white rounded-r-full border border-l-0 border-gray-300"
        >
          <SearchIcon />
        </button>
      </form>

      <!-- Search Results -->
      <ul
        v-if="searchResults.length > 0"
        class="max-h-[18rem] flex flex-col mt-4 bg-white border border-gray-300 rounded-md overflow-y-scroll"
      >
        <li v-for="book in searchResults" :key="book._id">
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