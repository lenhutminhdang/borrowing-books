<script setup>
const props = defineProps(["book"]);
const emit = defineEmits(["onTogglePublisher"]);
</script>
<template>
  <div class="grid md:grid-cols-2 gap-x-10 xl:gap-x-32 gap-y-2 mb-2">
    <div class="flex flex-wrap gap-2 justify-between">
      <h3 class="font-semibold">Tác giả</h3>
      <p class="font-light">{{ book.author }}</p>
    </div>
    <div class="flex flex-wrap gap-2 justify-between">
      <h3 class="font-semibold">Nhà xuất bản</h3>
      <p
        @click="emit('onTogglePublisher')"
        class="text-blue-600 cursor-pointer"
      >
        {{ book.publisherInfo[0].name }}
      </p>
    </div>
    <div class="flex flex-wrap gap-2 justify-between">
      <h3 class="font-semibold">Năm xuất bản</h3>
      <p class="font-light">{{ book.publicationYear }}</p>
    </div>
    <div class="flex flex-wrap gap-2 justify-between">
      <h3 class="font-semibold">Số quyển</h3>
      <p class="font-light">{{ book.volumeNumber }}</p>
    </div>
  </div>
</template>
