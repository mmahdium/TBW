<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const mediaId = ref(route.params.id as string)
const mediaName = ref(route.params.name as string)
const isLoaded = ref(false)
</script>

<template>
  <div class="flex justify-center min-h-auto px-4 py-12 bg-linear-to-b from-gray-50 to-white">
    <div
      class="w-full max-w-6xl bg-white/70 backdrop-blur-md border border-gray-200/60 shadow-md rounded-xl p-4 lg:p-8 transition flex flex-col items-center"
      v-motion-fade-visible-once
    >
      <!-- Title with Experimental badge -->
      <div class="flex items-center gap-3 mb-6">
        <h1 class="text-3xl font-bold text-gray-700">
          Watch <br />
          <span class="bg-linear-to-r from-indigo-500 to-cyan-400 bg-clip-text text-transparent">
            {{ mediaName }}
          </span>
        </h1>
        <span class="badge badge-warning">Experimental</span>
      </div>

      <!-- Loading spinner -->
      <div v-if="!isLoaded" class="flex justify-center items-center h-64 w-full">
        <span class="loading loading-ring loading-lg text-primary"></span>
      </div>

      <!-- Responsive iframe -->
      <div v-show="isLoaded" class="w-full aspect-video rounded-lg overflow-hidden shadow-lg">
        <iframe
          :src="'https://vidlink.pro/movie/' + mediaId + '?autoplay=true&title=false'"
          frameborder="0"
          allowfullscreen
          class="w-full h-full"
          @load="isLoaded = true"
        ></iframe>
      </div>

      <!-- Disclaimer -->
      <p class="mt-6 text-sm text-gray-500 text-center max-w-2xl">
        ⚠️ This player is provided by a <span class="font-semibold">third‑party service</span>. Ads
        and pop‑ups may appear, and I do not control or endorse them.
      </p>
    </div>
  </div>
</template>
