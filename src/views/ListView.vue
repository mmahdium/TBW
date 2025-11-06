<script setup lang="ts">
import { useMediaStore } from '@/stores/media'
import MediaList from '@/components/MediaList.vue'
import type { MediaType } from '@/types/Media'

const store = useMediaStore()

const handleAddMedia = (media: MediaType) => {
  store.addMedia(media)
}

const handleRemoveMedia = (mediaId: number) => {
  store.removeMedia(mediaId)
}
</script>

<template>
  <div class="container mx-auto px-4 py-12" v-motion-fade-visible-once>
    <h1
      class="text-4xl font-extrabold text-center mb-10 bg-gradient-to-r from-base-content to-base-content/70 bg-clip-text text-transparent"
    >
      Media Library
    </h1>
    <MediaList
      v-auto-animate
      v-if="store.mediaList"
      :medias="store.mediaList"
      :loading-more="false"
      :is-search="false"
      @add-media="handleAddMedia"
      @remove-media="handleRemoveMedia"
    />
  </div>
</template>

<style scoped></style>
