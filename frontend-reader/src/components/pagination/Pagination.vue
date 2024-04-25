<script setup>
import { computed, ref, watchEffect } from "vue";
import PagButtons from "./PagButtons.vue";

const props = defineProps({
  items: Array,
  itemsPerPage: Number,
});

const emit = defineEmits(["renderNewItems"]);

// start from 1
const currentPage = ref(1);

const changeCurrentPage = (newPage) => {
  currentPage.value = newPage;
};

// start from 1
const firstDisplayedItem = computed(
  () => (currentPage.value - 1) * props.itemsPerPage + 1
);
const lastDisplayItem = computed(
  () => firstDisplayedItem.value + props.itemsPerPage - 1
);

const displayedItems = computed(() =>
  props.items.slice(firstDisplayedItem.value - 1, lastDisplayItem.value)
);

watchEffect(() => emit("renderNewItems", displayedItems.value));
</script>

<template>
  <PagButtons
    :itemsLength="items.length"
    :itemsPerPage="itemsPerPage"
    :currentPage="currentPage"
    @onPageChange="changeCurrentPage"
  />
</template>
