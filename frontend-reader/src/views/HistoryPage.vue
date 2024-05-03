<script setup>
import { onMounted, ref, watchEffect } from "vue";
import { useAuthStore } from "../store";
import { useRouter } from "vue-router";
import orderService from "../services/order.service";
import Pagination from "../components/pagination/Pagination.vue";
import { formatCurrency } from "../utils/utils";
import ArrUpRightIcon from "../components/icons/ArrUpRightIcon.vue";

const store = useAuthStore();
const router = useRouter();
const orders = ref([]);
const renderedOrders = ref([]);

const renderNewOrders = (dataFromPagination) => {
  renderedOrders.value = dataFromPagination;
};

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
    const response = await orderService.getAllOrdersHistory(store.user._id);

    if (response) {
      orders.value = response;
    }
  }
});
</script>

<template>
  <main class="text-gray-700">
    <header class="mb-10">
      <div class="relative mb-4">
        <img
          src="../assets/banner.jpg"
          alt="banner"
          class="block rounded-lg object-cover w-full h-48 md:h-auto"
        />
        <a
          href="https://maps.app.goo.gl/TpADvczkqbDe3u6j9"
          target="_blank"
          class="absolute right-4 bottom-2 flex gap-1 text-white text-sm md:text-base uppercase font-semibold text-shadow"
          ><span>Xem địa chỉ cửa hàng</span>
          <span class="inline-block size-5 md:size-6 text stroke-white"
            ><ArrUpRightIcon
          /></span>
        </a>
      </div>
      <p class="text-lg">
        Quý khách vui lòng đến cửa hàng để thanh toán và nhận sách.
      </p>
    </header>
    <section>
      <h1 class="text-xl text-gray-600 mb-2">@Lịch sử mượn sách</h1>
      <p
        v-if="orders.length === 0"
        class="text-center text-lg h-[30rem] flex justify-center items-center text-gray-600"
      >
        Danh sách trống...
      </p>

      <div
        v-if="orders.length > 0"
        class="hidden md:grid gap-4 md:grid-cols-6 ml-4 py-4 text-lg text-gray-700"
      >
        <p class="flex items-center">#Bìa</p>
        <p class="flex items-center">#Tên sách</p>
        <p class="flex items-center">#Trạng thái</p>
        <p class="flex items-center">#Ngày đặt</p>
        <p class="flex items-center">#Ngày trả</p>
        <p class="flex items-center">#Phải trả</p>
      </div>

      <ul class="flex flex-col gap-6" v-if="renderedOrders.length > 0">
        <li
          v-for="order in renderedOrders"
          :key="order._id"
          class="relative h-auto border border-gray-300 rounded-lg p-4"
        >
          <router-link
            :to="{
              name: 'book-details',
              params: { id: order.bookInfo._id },
            }"
            class="md:h-32 grid grid-cols-[1.5fr_3.5fr] md:grid-cols-[1fr_5fr] items-stretch gap-4 outline-none outline-offset-0 focus:outline-yellow-400 rounded-md"
          >
            <img
              class="aspect-[9/16] h-full rounded-md object-cover"
              :src="order.bookInfo.image"
              :alt="order.bookInfo.name"
            />
            <div class="flex gap-4 flex-col md:grid md:grid-cols-5">
              <p class="flex items-center">
                {{ order.bookInfo.name }}
              </p>
              <p class="flex items-center">{{ order.status }}</p>
              <p class="flex items-center">{{ order.borrowDate }}</p>
              <p class="flex items-center">{{ order.dueDate }}</p>
              <p class="flex items-center">
                {{
                  order.payableAmount > 0
                    ? formatCurrency(order.payableAmount)
                    : "Miễn phí"
                }}
              </p>
            </div>
          </router-link>
        </li>
      </ul>
      <Pagination
        v-if="orders"
        :items="orders"
        :itemsPerPage="3"
        @renderNewItems="renderNewOrders"
      />
    </section>
  </main>
</template>

<style scoped>
.text-shadow {
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.6);
}
</style>
