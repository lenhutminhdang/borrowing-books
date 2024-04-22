<script setup>
import { ref } from "vue";

const props = defineProps({
  books: Array,
});

const currentIndex = ref(0);
const currentIndexMobile = ref(0);
const container = ref(null);
const containerMobile = ref(null);

let interval = setInterval(() => {
  increaseIndex(3);

  increaseIndexMobile(7);
}, 3000);

const translate = (itemsPerFrame, baseWidth) => {
  const amount = -currentIndex.value * itemsPerFrame * baseWidth + "px";
  if (container.value) {
    container.value.style.transform = `translateX(${amount})`;
  }
  clearInterval(interval);
  interval = setInterval(() => {
    increaseIndex(3);

    increaseIndexMobile(7);
  }, 3000);
};

const decreaseIndex = (maxIndex = 3) => {
  currentIndex.value = currentIndex.value - 1;
  if (currentIndex.value === -1) currentIndex.value = maxIndex;

  translate(4, 200);
};
const increaseIndex = (maxIndex = 3) => {
  currentIndex.value = currentIndex.value + 1;
  if (currentIndex.value === maxIndex + 1) currentIndex.value = 0;

  translate(4, 200);
};

const translateMobile = (itemsPerFrame, baseWidth) => {
  const amount = -currentIndexMobile.value * itemsPerFrame * baseWidth + "px";
  if (containerMobile.value) {
    containerMobile.value.style.transform = `translateX(${amount})`;
  }
  clearInterval(interval);
  interval = setInterval(() => {
    increaseIndex(3);

    increaseIndexMobile(7);
  }, 3000);
};
const decreaseIndexMobile = (maxIndex = 7) => {
  currentIndexMobile.value = currentIndexMobile.value - 1;
  if (currentIndexMobile.value === -1) currentIndexMobile.value = maxIndex;

  translateMobile(2, 160);
};
const increaseIndexMobile = (maxIndex = 7) => {
  currentIndexMobile.value = currentIndexMobile.value + 1;
  if (currentIndexMobile.value === maxIndex + 1) currentIndexMobile.value = 0;

  translateMobile(2, 160);
};
</script>

<template>
  <section v-if="books.length > 0" class="flex justify-center mb-20">
    <!-- LARGE SCREEN -->
    <div class="hidden lg:block">
      <div class="relative overflow-hidden w-[800px] rounded-md">
        <ul ref="container" class="flex transition-transform duration-300">
          <li v-for="book in books" :key="book._id + '0'" class="shrink-0">
            <router-link
              :to="{ name: 'book-details', params: { id: book._id } }"
            >
              <img
                :src="book.image"
                :alt="book.name"
                class="aspect-[9/16] w-[200px] h-full object-cover transition-transform duration-200 ease-in-out"
              />
            </router-link>
          </li>
          <li v-for="book in books" :key="book._id + '1'" class="shrink-0">
            <router-link
              :to="{ name: 'book-details', params: { id: book._id } }"
            >
              <img
                :src="book.image"
                :alt="book.name"
                class="aspect-[9/16] w-[200px] h-full object-cover transition-transform duration-200 ease-in-out"
              />
            </router-link>
          </li>
        </ul>

        <!-- Actions -->
        <div
          class="absolute z-40 top-1/2 left-0 -translate-y-1/2 w-full flex justify-between gap-4"
        >
          <button
            @click="() => decreaseIndex(3)"
            class="flex justify-center items-center size-12 rounded-full text-xl bg-[rgba(234,234,234,0.8)] ml-2"
          >
            &#129044;
          </button>
          <button
            @click="() => increaseIndex(3)"
            class="flex justify-center items-center size-12 rounded-full text-xl bg-[rgba(234,234,234,0.8)] mr-2"
          >
            &#129046;
          </button>
        </div>
      </div>
    </div>

    <!-- MOBILE -->
    <div class="block lg:hidden">
      <div class="relative overflow-hidden w-[320px] rounded-md">
        <ul
          ref="containerMobile"
          class="flex transition-transform duration-300"
        >
          <li v-for="book in books" :key="book._id + '0'" class="shrink-0">
            <router-link
              :to="{ name: 'book-details', params: { id: book._id } }"
            >
              <img
                :src="book.image"
                :alt="book.name"
                class="aspect-[9/16] w-[160px] h-full object-cover transition-transform duration-200 ease-in-out"
              />
            </router-link>
          </li>
          <li v-for="book in books" :key="book._id + '1'" class="shrink-0">
            <router-link
              :to="{ name: 'book-details', params: { id: book._id } }"
            >
              <img
                :src="book.image"
                :alt="book.name"
                class="aspect-[9/16] w-[160px] h-full object-cover transition-transform duration-200 ease-in-out"
              />
            </router-link>
          </li>
        </ul>

        <!-- Actions -->
        <div
          class="absolute top-1/2 left-0 -translate-y-1/2 w-full flex justify-between gap-4"
        >
          <button
            @click="() => decreaseIndexMobile(7)"
            class="flex justify-center items-center size-12 rounded-full text-xl bg-[rgba(200,200,200,0.7)] ml-2"
          >
            &#129044;
          </button>
          <button
            @click="() => increaseIndexMobile(7)"
            class="flex justify-center items-center size-12 rounded-full text-xl bg-[rgba(200,200,200,0.7)] mr-2"
          >
            &#129046;
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
