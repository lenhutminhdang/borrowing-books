<script setup>
import LinkButton from "../UI/LinkButton.vue";
import Link from "../UI/Link.vue";
import { useAuthStore } from "../../store";

const store = useAuthStore();
</script>

<template>
  <ul class="flex flex-col gap-3 items-center md:flex-row">
    <li>
      <Link route-name="home">Trang chủ</Link>
    </li>
    <li>
      <Link route-name="history">Lịch sử</Link>
    </li>
    <li>
      <Link route-name="favorites">Yêu thích</Link>
    </li>
    <li v-if="store.isLoggedIn">
      <Link route-name="profile">Tài khoản</Link>
    </li>
    <li v-if="!store.isLoggedIn">
      <LinkButton route-name="login">Đăng nhập</LinkButton>
    </li>
  </ul>
</template>
