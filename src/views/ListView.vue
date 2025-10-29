<script setup lang="ts">
import { useMediaStore } from '@/stores/media'
import MediaList from '@/components/MediaList.vue'

const store = useMediaStore()
</script>

<template>
  <div class="container mx-auto px-4 py-12" v-motion-fade-visible-once>
    <h1
      class="text-4xl font-extrabold text-center mb-10 bg-linear-to-r from-gray-700 to-gray-500 bg-clip-text text-transparent"
    >
      Movie Library
    </h1>
    <MediaList
      v-auto-animate
      v-if="store.mediaList"
      :medias="store.mediaList"
      :loading-more="false"
      :is-search="false"
    />
  </div>
</template>

<style scoped></style>
