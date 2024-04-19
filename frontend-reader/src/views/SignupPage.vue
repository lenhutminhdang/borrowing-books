<script setup>
import Input from "../components/form/Input.vue";
import Button from "../components/UI/Button.vue";
import Link from "../components/UI/Link.vue";
</script>

<template>
  <main class="flex justify-center items-center">
    <div class="mt-40">
      <h1 class="text-xl text-center text-gray-800 mb-5">ĐĂNG KÝ</h1>
      <form class="flex flex-col gap-3 w-72">
        <Input type="email" name="email" placeholder="email" value="" />
        <Input
          type="password"
          name="password"
          placeholder="mật khẩu"
          value=""
        />
        <Input
          type="password"
          name="confirm-password"
          placeholder="xác nhận mật khẩu"
          value=""
        />
        <Button
          :in-stock="true"
          :on-click="() => console.log('Submit')"
          class="py-3 px-4"
          >Đăng ký</Button
        >
      </form>

      <p class="mt-2 text-center">
        Đã có tài khoản?
        <Link route-name="login" classes="!text-main">Đăng nhập ngay</Link>
      </p>
    </div>
  </main>
</template>
