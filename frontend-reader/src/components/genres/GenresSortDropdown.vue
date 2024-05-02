<script setup>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import {
  SORT_OPTIONS,
  setDefaultSortOptionIfNotMatch,
} from "../../utils/utils";

const emit = defineEmits(["onDropdownChange"]);
const route = useRoute();

const selected = ref(route.query.sort);

watch(
  () => route.query.sort,
  (newValue, _) => {
    selected.value = setDefaultSortOptionIfNotMatch(newValue);
    emit("onDropdownChange", selected.value);
  },
  {
    immediate: true,
  }
);
</script>
<template>
  <div class="flex flex-col sm:flex-row gap-2 items-end">
    <p class="font-light">Sắp xếp theo:</p>
    <select
      v-model="selected"
      class="p-2 bg-white shadow rounded-md"
      @change="() => emit('onDropdownChange', selected)"
    >
      <option v-for="opt in SORT_OPTIONS" :key="opt.value" :value="opt.value">
        {{ opt.text }}
      </option>
    </select>
  </div>
</template>
