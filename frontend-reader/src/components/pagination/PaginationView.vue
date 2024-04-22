<script setup>
import { computed, ref, watchEffect } from "vue";
import Pagination from "../pagination/Pagination.vue";

const props = defineProps({
  items: Array,
  itemsPerPage: Number,
});

const emit = defineEmits(["renderNewView", "changePage"]);

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

watchEffect(() => emit("renderNewView", displayedItems.value));
</script>

<template>
  <div>
    <div>
      <slot />
    </div>
    <Pagination
      :items="items"
      :itemsPerPage="itemsPerPage"
      :currentPage="currentPage"
      @changePage="changeCurrentPage"
    />
  </div>
</template>
