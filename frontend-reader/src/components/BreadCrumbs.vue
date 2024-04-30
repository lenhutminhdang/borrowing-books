<script setup>
const props = defineProps({
  crumbs: Array,
});
</script>
<template>
  <nav v-if="crumbs.length > 0" class="mt-12">
    <ul class="flex flex-wrap text-nowrap font-light">
      <li v-for="(crumb, index) in crumbs" :key="index">
        <template v-if="crumb.routeName || crumb.route">
          <router-link
            :to="crumb.routeName || crumb.route"
            class="hover:text-main"
          >
            {{ crumb.name }}
          </router-link>
        </template>
        <span v-else class="cursor-default text-gray-500">{{
          crumb.name
        }}</span>
        <span v-if="index !== crumbs.length - 1" class="mx-3">&#47;</span>
      </li>
    </ul>
  </nav>
</template>
