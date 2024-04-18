<script setup>
import LinkButton from "../UI/LinkButton.vue";
import Link from "./Link.vue";
</script>

<template>
  <ul class="flex flex-col gap-3 items-center md:flex-row">
    <Link route-name="home" label="Trang chủ" />
    <Link route-name="history" label="Lịch sử" />
    <Link route-name="favorites" label="Yêu thích" />
    <Link route-name="profile" label="Tài khoản" />

    <LinkButton route-name="login" label="Đăng nhập" />
  </ul>
</template>
