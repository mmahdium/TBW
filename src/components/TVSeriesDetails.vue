<script setup lang="ts">
import { computed } from 'vue'
import { useMediaStore } from '@/stores/media'
import type { MediaType } from '@/types/Media'
import ImageWithFallback from './ImageWithFallback.vue'
import MediaTypeBadge from './MediaTypeBadge.vue'
import type { TvSeriesDetailsType } from '@/types/TvSeries'

const props = defineProps<{
  media?: MediaType
  tvSeries?: TvSeriesDetailsType | null
}>()

const store = useMediaStore()

const alreadyAdded = computed(() =>
  props.tvSeries ? store.mediaList.some((m: MediaType) => m.Id === props.tvSeries!.Id) : false,
)
</script>

<template>
  <!-- Hero -->
  <div
    class="flex flex-col lg:flex-row gap-12 items-center max-w-6xl w-full bg-white/70 border border-gray-200/60 rounded-xl p-8 transition"
    v-motion-fade-visible-once
  >
    <!-- Poster -->
    <ImageWithFallback
      :src="props.tvSeries!.PosterPath"
      alt="Poster"
      size="w500"
      class="shrink-0 w-full max-w-sm rounded-lg shadow-lg transform transition-transform duration-500 hover:scale-105"
    />

    <!-- Text -->
    <div class="flex-1">
      <h1 class="text-4xl font-bold text-gray-800 mb-2">
        {{ props.tvSeries!.Name }}
        <span class="text-gray-400 text-lg font-normal"
          >({{ props.tvSeries!.FirstAirDate?.slice(0, 4) }})</span
        >
      </h1>

      <p v-if="props.tvSeries!.Tagline" class="italic text-gray-500 mb-2">
        {{ props.tvSeries!.Tagline }}
      </p>

      <p class="text-gray-600 leading-relaxed mb-6">
        {{ props.tvSeries!.Overview }}
      </p>

      <!-- Badges -->
      <div class="flex flex-wrap gap-2 mb-6">
        <MediaTypeBadge v-for="g in props.tvSeries!.Genres" :key="g.id" :text="g.name" />
        <MediaTypeBadge :text="`Seasons: ${props.tvSeries!.NumberOfSeasons}`" />
        <MediaTypeBadge :text="`Episodes: ${props.tvSeries!.NumberOfEpisodes}`" />
      </div>

      <!-- Actions -->
      <div class="card-actions" v-auto-animate>
        <template v-if="props.tvSeries && props.media">
          <button
            v-if="!alreadyAdded"
            class="btn px-6 bg-linear-to-r from-gray-100 to-gray-200 border border-gray-300 text-gray-700 hover:from-gray-200 hover:to-gray-300"
            @click="store.addMedia(props.media)"
          >
            Add to list
          </button>
          <button
            v-else
            class="btn px-6 bg-linear-to-r from-red-50 to-red-100 border border-red-200 text-red-600 hover:from-red-100 hover:to-red-200"
            @click="store.removeMedia(props.media.Id)"
          >
            Remove from library
          </button>
        </template>

        <!-- <RouterLink
          :to="{
            name: 'watch',
            params: {
              name: props.tvSeries!.Name,
              id: props.tvSeries!.Id,
            },
          }"
        >
          <button
            class="btn relative flex items-center gap-2 px-6 bg-linear-to-r from-indigo-500 to-violet-500 text-white border-0 shadow-md hover:opacity-90 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M6.5 5.5a1 1 0 0 1 1.52-.85l6 4.5a1 1 0 0 1 0 1.7l-6 4.5A1 1 0 0 1 6.5 14.5v-9z"
                clip-rule="evenodd"
              />
            </svg>
            <span>Watch</span>
            <span class="badge badge-sm badge-secondary absolute -top-2 -right-2">Beta</span>
          </button>
        </RouterLink> -->
      </div>
    </div>
  </div>
</template>
