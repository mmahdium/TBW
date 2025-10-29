<script setup lang="ts">
import { useMediaStore } from '@/stores/media'
import { computed, ref } from 'vue'
import type { MediaType } from '@/types/Media'

const props = defineProps<{
  media: MediaType
}>()

const store = useMediaStore()
const imageLoadFailed = ref(false)
const loaded = ref(false)

const alreadyAdded = computed(() => store.mediaList.some((media) => media.Id === props.media.Id))

const imageSource = computed(() => {
  if (!props.media.PosterPath) {
    return ''
  }
  return `https://image.tmdb.org/t/p/w300${props.media.PosterPath}`
})
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
      <figure class="overflow-hidden flex items-center justify-center aspect-2/3 bg-gray-50">
        <span v-if="!loaded" class="loading loading-ring loading-lg text-primary"></span>

        <div v-else-if="imageLoadFailed" class="flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-12 h-12 text-gray-300"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
            />
          </svg>
        </div>

        <img
          v-show="loaded && !imageLoadFailed"
          :src="imageSource"
          :alt="props.media.Title"
          class="object-cover w-full h-full transform transition-transform duration-500 hover:scale-105"
          @load="loaded = true"
          @error="
            () => {
              imageLoadFailed = true
              loaded = true
            }
          "
        />
      </figure>
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
          @click="store.addMedia(props.media)"
        >
          Add
        </button>
        <button
          v-motion-fade-visible-once
          v-else
          class="btn btn-sm px-4 bg-linear-to-r from-red-50 to-red-100 border border-red-200 text-red-600 hover:from-red-100 hover:to-red-200 hover:text-red-700 transition"
          @click="store.removeMedia(props.media.Id)"
        >
          Remove
        </button>
      </div>
    </div>
  </div>
</template>
