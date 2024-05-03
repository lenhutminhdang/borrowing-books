<script setup>
import LinkButton from "../UI/LinkButton.vue";
import Link from "../UI/Link.vue";
import { useAuthStore } from "../../store";

const store = useAuthStore();
</script>

<template>
  <ul class="w-full flex flex-col gap-3 items-center md:flex-row">
    <li @click="$emit('closeMenu')">
      <Link route-name="home">Trang chủ</Link>
    </li>
    <li @click="$emit('closeMenu')">
      <Link route-name="search">Tìm kiếm</Link>
    </li>
    <li v-if="store.isLoggedIn" @click="$emit('closeMenu')">
      <Link route-name="history">Lịch sử</Link>
    </li>
    <li v-if="store.isLoggedIn" @click="$emit('closeMenu')">
      <Link route-name="favorites">Yêu thích</Link>
    </li>
    <li v-if="store.isLoggedIn" @click="$emit('closeMenu')">
      <Link route-name="profile">Tài khoản</Link>
    </li>
    <li v-if="!store.isLoggedIn" @click="$emit('closeMenu')">
      <LinkButton route-name="login">Đăng nhập</LinkButton>
    </li>
  </ul>
</template>
