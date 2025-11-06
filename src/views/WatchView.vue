<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const mediaId = ref(route.params.id as string)
const mediaName = ref(route.params.name as string)
const isLoaded = ref(false)
</script>

<template>
  <div class="flex flex-col items-center w-full min-h-screen bg-base-100 text-base-content">
    <!-- Title -->
    <h1 class="text-2xl md:text-3xl font-bold my-4">
      {{ mediaName }}
    </h1>

    <!-- Loading spinner -->
    <div v-if="!isLoaded" class="flex justify-center items-center flex-1 w-full">
      <span class="loading loading-ring loading-xl text-primary"></span>
    </div>

    <!-- Video player -->
    <div v-show="isLoaded" class="w-full flex-1">
      <iframe
        :src="'https://vidlink.pro/movie/' + mediaId + '?autoplay=true&title=false'"
        frameborder="0"
        allowfullscreen
        class="w-full h-[calc(100vh-5rem)]"
        @load="isLoaded = true"
      ></iframe>
    </div>

    <!-- Disclaimer -->
    <p class="mt-4 text-xs text-base-content/60 text-center px-4 max-w-xl">
      ⚠️ This player is provided by a <span class="font-semibold">third‑party service</span>. Ads
      and pop‑ups may appear, and I do not control or endorse them.
    </p>
  </div>
</template>
