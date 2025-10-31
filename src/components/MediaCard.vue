<script setup lang="ts">
import { useMediaStore } from '@/stores/media'
import { computed } from 'vue'
import type { MediaType } from '@/types/Media'
import ImageWithFallback from './ImageWithFallback.vue'

const props = defineProps<{
  media: MediaType
}>()

const emit = defineEmits<{
  'add-media': [media: MediaType]
  'remove-media': [mediaId: number]
}>()

const store = useMediaStore()

const alreadyAdded = computed(() => store.mediaList.some((media) => media.Id === props.media.Id))
</script>

<template>
  <div
    class="card relative w-full h-full overflow-hidden bg-white/70 backdrop-blur-md border border-gray-200/60 shadow-md hover:shadow-xl transition-all duration-300"
    v-motion-fade-visible-once
  >
    <!-- Poster -->
    <router-link
      :to="{ name: 'details', params: { type: props.media.MediaType, id: props.media.Id } }"
    >
      <ImageWithFallback
        :src="props.media.PosterPath"
        :alt="props.media.Title"
        size="w300"
        class="aspect-2/3 object-cover w-full h-full transform transition-transform duration-500 hover:scale-105"
      />
    </router-link>

    <!-- Body -->
    <div class="card-body p-4 flex flex-col">
      <router-link
        :to="{ name: 'details', params: { type: props.media.MediaType, id: props.media.Id } }"
      >
        <h2
          class="card-title text-base font-semibold bg-linear-to-r from-gray-700 to-gray-500 bg-clip-text text-transparent"
        >
          {{ props.media.Title }}
        </h2>
        <p class="text-sm text-gray-400">{{ props.media.ReleaseDate.slice(0, 4) }}</p>
      </router-link>

      <div class="card-actions justify-end mt-auto">
        <button
          v-motion-fade-visible-once
          v-if="!alreadyAdded"
          class="btn btn-sm px-4 bg-linear-to-r from-gray-100 to-gray-200 border border-gray-300 text-gray-700 hover:from-gray-200 hover:to-gray-300 hover:text-gray-900 transition"
          @click="$emit('add-media', props.media)"
        >
          Add
        </button>
        <button
          v-motion-fade-visible-once
          v-else
          class="btn btn-sm px-4 bg-linear-to-r from-red-50 to-red-100 border border-red-200 text-red-600 hover:from-red-100 hover:to-red-200 hover:text-red-700 transition"
          @click="$emit('remove-media', props.media.Id)"
        >
          Remove
        </button>
      </div>
    </div>
  </div>
</template>
