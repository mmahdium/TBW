<script setup lang="ts">
import AddMoreCard from './AddMoreCard.vue'
import MediaCard from './MediaCard.vue'
import type { MediaType } from '@/types/Media'

const props = defineProps<{
  medias: MediaType[]
  loadingMore: boolean
  isSearch: boolean
}>()

const emit = defineEmits<{ (e: 'loaded', id: string): void; (e: 'loadMore'): void }>()
</script>

<template>
  <div>
    <p
      v-if="props.medias.length === 0"
      class="text-center text-gray-500 py-12 bg-gray-50/60 rounded-lg border border-gray-200"
    >
      No media found.<br />
      <RouterLink to="/add" class="text-gray-700 font-semibold hover:text-gray-900 transition">
        Add media
      </RouterLink>
    </p>

    <ul
      v-auto-animate
      v-else
      class="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
    >
      <li v-for="movie in props.medias" :key="movie.Id" v-auto-animate>
        <MediaCard :movie="movie" />
      </li>
      <li v-if="!props.isSearch">
        <AddMoreCard />
      </li>
    </ul>

    <div v-if="props.isSearch && props.medias.length > 0" class="flex justify-center mt-8">
      <button
        class="btn px-6 bg-linear-to-r from-gray-100 to-gray-200 border border-gray-300 text-gray-700 hover:from-gray-200 hover:to-gray-300 hover:text-gray-900 disabled:opacity-50"
        @click="emit('loadMore')"
        :disabled="props.loadingMore"
      >
        <span v-if="props.loadingMore" class="loading loading-spinner loading-xs mr-2"></span>
        Load more
      </button>
    </div>
  </div>
</template>
