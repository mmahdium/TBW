<script setup lang="ts">
import AddMoreCard from './AddMoreCard.vue'
import MediaCard from './MediaCard.vue'
import type { MediaType } from '@/types/Media'

const props = defineProps<{
  medias: MediaType[]
  loadingMore: boolean
  isSearch: boolean
}>()

const emit = defineEmits<{
  (e: 'loaded', id: string): void
  (e: 'loadMore'): void
  (e: 'add-media', media: MediaType): void
  (e: 'remove-media', mediaId: number): void
}>()

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY
  const windowHeight = window.innerHeight
  const docHeight = document.documentElement.scrollHeight
  const scrollPercent = (scrollTop + windowHeight) / docHeight
  if (scrollPercent >= 0.75 && !props.loadingMore && props.isSearch) {
    emit('loadMore')
  }
})
</script>

<template>
  <div>
    <p
      v-if="props.medias.length === 0"
      class="text-center text-base-content/60 py-12 bg-base-300/60 rounded-lg border border-base-content/20"
    >
      No media found.<br />
      <RouterLink
        to="/add"
        class="text-base-content/70 font-semibold hover:text-base-content transition"
      >
        Add media
      </RouterLink>
    </p>

    <ul
      v-auto-animate
      v-else
      class="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
    >
      <li
        v-for="media in props.medias.filter((media) => media.PosterPath)"
        :key="media.Id"
        v-auto-animate
      >
        <MediaCard
          :media="media"
          @add-media="$emit('add-media', $event)"
          @remove-media="$emit('remove-media', $event)"
        />
      </li>
      <li v-if="!props.isSearch">
        <AddMoreCard />
      </li>
    </ul>

    <div v-if="props.isSearch && props.medias.length > 0" class="flex justify-center mt-8">
      <button
        class="btn px-6 bg-gradient-to-r from-base-300 to-base-200 border border-base-content/30 text-base-content hover:from-base-200 hover:to-base-100 hover:text-base-content/90 disabled:opacity-50"
        @click="emit('loadMore')"
        :disabled="props.loadingMore"
      >
        <span v-if="props.loadingMore" class="loading loading-spinner loading-xs mr-2"></span>
        Load more
      </button>
    </div>
  </div>
</template>
