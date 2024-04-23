<script setup>
const props = defineProps({
  list: Array,
  isActive: Boolean,
});
</script>

<template>
  <div
    class="slide grid grid-cols-4 md:grid-cols-8 object-center duration-[300ms]"
    :class="{ 'w-0': !isActive, 'w-full': isActive }"
  >
    <router-link
      v-for="(item, index) in list"
      :class="{ hidden: index % 2 !== 0, 'md:inline-block': true }"
      :key="item._id"
      :to="{ name: 'book-details', params: { id: item._id } }"
    >
      <img
        :src="item.image"
        :alt="item.name"
        class="h-full w-full aspect-[9/16] object-cover"
      />
    </router-link>
  </div>
</template>
