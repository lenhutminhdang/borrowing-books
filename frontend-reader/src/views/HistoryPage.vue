<script setup>
import { onMounted, ref, watchEffect } from "vue";
import { useAuthStore } from "../store";
import { useRouter } from "vue-router";
import historyService from "../services/history.service";

const store = useAuthStore();
const router = useRouter();
const histories = ref([]);

onMounted(() => {
  const timer = setTimeout(() => {
    if (!store.isLoggedIn) {
      router.push({ name: "login" });
    }
    clearTimeout(timer);
  }, 300);
});

watchEffect(async () => {
  if (store.isLoggedIn) {
    const response = await historyService.getAllHistory({
      readerId: store.user._id,
    });

    if (response) {
      histories.value = response;
    }
  }
});
</script>

<template>
  <main class="text-gray-700">
    <h1 class="text-xl text-gray-600 mb-4">@Lịch sử mượn sách</h1>
    <p
      v-if="histories.length === 0"
      class="text-center text-lg h-[30rem] flex justify-center items-center text-gray-600"
    >
      Danh sách trống...
    </p>

    <div
      v-if="histories.length > 0"
      class="hidden md:grid gap-4 grid-cols-1 md:grid-cols-5 justify-items-start ml-4 py-4 text-lg text-gray-700"
    >
      <p class="flex items-center">#Bìa</p>
      <p class="flex items-center">#Tên sách</p>
      <p class="flex items-center">#Trạng thái</p>
      <p class="flex items-center">#Ngày đặt</p>
      <p class="flex items-center">#Ngày trả</p>
    </div>

    <ul class="flex flex-col gap-6" v-if="histories.length > 0">
      <li
        v-for="history in histories"
        :key="history._id"
        class="relative h-48 border border-gray-300 rounded-lg p-4"
      >
        <router-link
          :to="{
            name: 'book-details',
            params: { id: history.bookInfo[0]._id },
          }"
          class="h-full grid grid-cols-2 md:grid-cols-[1fr_4fr] items-stretch gap-4 outline-none outline-offset-0 focus:outline-yellow-400 rounded-md"
        >
          <img
            class="aspect-[9/16] h-full rounded-md object-cover"
            :src="history.bookInfo[0].image"
            :alt="history.bookInfo[0].name"
          />
          <div
            class="grid gap-4 grid-cols-1 md:grid-cols-4 justify-items-end md:justify-items-start"
          >
            <p class="flex items-center">
              {{ history.bookInfo[0].name }}
            </p>
            <p class="flex items-center">{{ history.status }}</p>
            <p class="flex items-center">{{ history.borrowDate }}</p>
            <p class="flex items-center">{{ history.dueDate }}</p>
          </div>
        </router-link>
      </li>
    </ul>
  </main>
</template>
