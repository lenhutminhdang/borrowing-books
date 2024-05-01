<script setup>
import { Teleport } from "vue";
import { getDomainName } from "../../utils/utils";

const props = defineProps({
  publisher: Object,
  showPublisher: Boolean,
  togglePublisher: Function,
});
</script>

<template>
  <Teleport to="#modals">
    <div
      v-if="publisher"
      class="fixed left-0 bottom-0 max-h-[80vh] w-full px-6 pt-6 bg-white border shadow-2xl rounded-t-[3rem] duration-300"
      :class="{ '!-bottom-[105%]': !showPublisher }"
    >
      <div
        class="relative flex flex-col md:flex-row gap-6 items-start w-full h-full p-6 bg-main-100 rounded-t-[2rem]"
      >
        <div class="shrink-0 flex items-center gap-6">
          <figure
            class="shrink-0 max-w-40 sm:w-56 rounded-2xl overflow-hidden p-6 bg-white"
          >
            <img
              :src="publisher.logo"
              :alt="publisher.name"
              class="w-full h-full object-cover"
            />
          </figure>
          <h3 class="block md:hidden text-2xl text-wrap font-semibold mb-4">
            NXB {{ publisher.name }}
          </h3>
        </div>

        <div class="w-full text-gray-800">
          <h3 class="hidden md:block text-2xl font-semibold mb-4">
            NXB {{ publisher.name }}
          </h3>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-x-24 gap-y-2">
            <div class="flex flex-col gap-2">
              <div class="grid grid-cols-1 sm:grid-cols-[1fr_2.5fr] gap-x-16">
                <h4 class="text-lg text-gray-500">Điện thoại</h4>
                <p class="sm:justify-self-end">{{ publisher.phone }}</p>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-[1fr_2.5fr] gap-x-16">
                <h4 class="text-lg text-gray-500">Email</h4>
                <p class="sm:justify-self-end">{{ publisher.email }}</p>
              </div>
            </div>

            <div class="flex flex-col gap-2">
              <div class="grid grid-cols-1 sm:grid-cols-[1fr_2.5fr] gap-x-16">
                <h4 class="text-lg text-gray-500">Website</h4>
                <a
                  :href="publisher.website"
                  target="_blank"
                  class="sm:justify-self-end text-blue-600"
                >
                  {{ getDomainName(publisher.website) }}
                </a>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-[1fr_2.5fr] gap-x-16">
                <h4 class="text-lg text-gray-500">Địa chỉ</h4>
                <p class="sm:justify-self-end">{{ publisher.address }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        class="absolute top-2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white size-16 rounded-full"
      >
        <button
          @click="togglePublisher"
          class="absolute z-30 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-10 rounded-full bg-yellow-200 text-xl duration-300"
        >
          <span class="block -translate-x-[2px]">&#11085;</span>
        </button>
      </div>
    </div>
  </Teleport>
</template>
