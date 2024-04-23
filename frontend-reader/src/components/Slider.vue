<script setup>
import { computed, onMounted, ref } from "vue";
import Slide from "./Slide.vue";

const props = defineProps({
  books: Array,
});

const ITEMS_PER_SLIDE = 8;
const slides = ref([]);
const currentSlide = ref(0);
const slidesContainer = ref();

onMounted(() => (slides.value = document.getElementsByClassName("slide")));

let interval = setInterval(next, 3000);

function next() {
  clearInterval(interval);

  if (currentSlide.value === slides.value.length - 1) {
    currentSlide.value = 0;
  } else {
    currentSlide.value++;
  }
  interval = setInterval(next, 3000);
}

function prev() {
  clearInterval(interval);

  if (currentSlide.value === 0) {
    currentSlide.value = slides.value.length - 1;
  } else {
    currentSlide.value--;
  }

  interval = setInterval(next, 3000);
}

const tempBooks = computed(() => {
  const arr = [];
  for (let i = 0; i < 3; i++) {
    arr.push(
      [
        ...props.books,
        ...props.books,
        ...props.books,
        ...props.books,
        ...props.books,
      ].slice(i * ITEMS_PER_SLIDE, (i + 1) * ITEMS_PER_SLIDE)
    );
  }
  return arr;
});
</script>

<template>
  <section v-if="books.length > 0" class="flex justify-center mb-20">
    <!-- LARGE SCREEN -->
    <div>
      <div class="relative overflow-hidden rounded-md">
        <div
          ref="slidesContainer"
          class="slide-container flex h-[13rem] sm:h-[50rem] md:h-[30rem] lg:h-[16rem] xl:h-[18rem]"
        >
          <!-- Slide # -->
          <Slide
            v-for="(list, index) in tempBooks"
            :key="list._id"
            :list="list"
            :isActive="currentSlide === index"
          />
        </div>

        <!-- Actions -->
        <div
          class="absolute z-40 top-1/2 left-0 -translate-y-1/2 w-full flex justify-between gap-4"
        >
          <button
            @click="prev"
            class="flex justify-center items-center size-12 rounded-full text-xl bg-[rgba(234,234,234,0.8)] ml-2"
          >
            &#129044;
          </button>
          <button
            @click="next"
            class="flex justify-center items-center size-12 rounded-full text-xl bg-[rgba(234,234,234,0.8)] mr-2"
          >
            &#129046;
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@media screen and (min-width: 500px) {
  .slide-container {
    height: 15rem;
  }
}
@media screen and (min-width: 570px) {
  .slide-container {
    height: 20rem;
  }
}
@media screen and (min-width: 760px) {
  .slide-container {
    height: 14rem;
  }
}
@media screen and (min-width: 1300px) {
  .slide-container {
    height: 16rem;
  }
}
@media screen and (min-width: 1500px) {
  .slide-container {
    height: 18rem;
  }
}
@media screen and (min-width: 1645px) {
  .slide-container {
    height: 22rem;
  }
}
</style>
