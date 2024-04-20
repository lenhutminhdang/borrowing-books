<script setup>
import { onBeforeMount, ref, watchEffect } from "vue";
import readerService from "../services/reader.service";
import Button from "../components/UI/Button.vue";
import ProfileItem from "../components/profile/ProfileItem.vue";
import { useAuthStore } from "../store";
import { useRouter } from "vue-router";

const reader = ref(null);
const store = useAuthStore();
const router = useRouter();

onBeforeMount(() => {
  if (!store.isLoggedIn) {
    router.push({ name: "login" });
  }
});

watchEffect(async () => {
  const response = await readerService.getProfile();

  if (response) {
    reader.value = response;
  }
});

const logout = async () => {
  const response = await readerService.logout();
  if (response) {
    store.logout();
    router.push({ name: "home" });
  }
};
</script>

<template>
  <main>
    <h1 class="text-xl text-center text-gray-600 mb-4">@Thông tin tài khoản</h1>
    <section class="flex flex-col gap-4 justify-center items-center">
      <ul v-if="reader" class="flex gap-20 bg-orange-100 rounded-lg p-4">
        <div class="flex flex-col gap-4">
          <ProfileItem label="Tên" :data="reader.name" />
          <ProfileItem label="Ngày sinh" :data="reader.birthDay" />
          <ProfileItem label="Giới tính" :data="reader.gender" />
        </div>
        <div class="flex flex-col gap-4">
          <ProfileItem label="Email" :data="reader.email" />
          <ProfileItem label="Địa chỉ" :data="reader.address" />
          <ProfileItem label="Điện thoại" :data="reader.phone" />
        </div>
      </ul>

      <Button :onclick="logout" class="py-2 px-6">Đăng xuất</Button>
    </section>
  </main>
</template>
