<script setup>
import LinkButton from "../UI/LinkButton.vue";
import Link from "./Link.vue";
</script>

<template>
  <ul
    class="flex flex-col gap-2 items-center mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium"
  >
    <Link route-name="home" label="Home" />
    <Link route-name="history" label="History" />
    <Link route-name="favorites" label="Favorites" />
    <Link route-name="profile" label="My profile" />

    <LinkButton route-name="login" label="Login" />
  </ul>
</template>
