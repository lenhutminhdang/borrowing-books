<script setup>
import { ref } from "vue";

import readerService from "../services/reader.service";

import Input from "../components/form/Input.vue";
import Button from "../components/UI/Button.vue";
import Link from "../components/UI/Link.vue";
import { useAuthStore } from "../store";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");

const store = useAuthStore();
const router = useRouter();

// Login
const handleSubmit = async () => {
  if (password.value.length < 6) {
    alert("Độ dài mật khẩu phải lớn hơn hoặc bằng 6.");
    return;
  }

  if (email.value === "" || password.value === "") {
    alert("Vui lòng điền đầy đủ thông tin.");
    return;
  }

  const user = await readerService.login({
    email: email.value,
    password: password.value,
  });
  if (user._id) {
    store.login(user);
    router.push({ name: "home" });
  }
};
</script>

<template>
  <main class="flex justify-center items-center">
    <div class="mt-40">
      <h1 class="text-xl text-center text-gray-800 mb-5">ĐĂNG NHẬP</h1>
      <form @submit.prevent="handleSubmit" class="flex flex-col gap-3 w-72">
        <Input
          type="email"
          name="email"
          placeholder="email"
          v-model="email"
          required
        />
        <Input
          type="password"
          name="password"
          placeholder="mật khẩu"
          v-model="password"
          required
        />
        <Button class="py-3 px-4">Đăng nhập</Button>
      </form>

      <p class="mt-2 text-center">
        Chưa có tài khoản?
        <Link route-name="signup" classes="!text-main">Đăng ký ngay</Link>
      </p>
    </div>
  </main>
</template>
