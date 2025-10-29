<script setup lang="ts">
import type { MovieDetailsType } from '@/types/Movie'
import type { TvSeriesDetailsType } from '@/types/TvSeries'
import { computed } from 'vue'
import { useMediaStore } from '@/stores/media'
import type { MediaType } from '@/types/Media'
import ImageWithFallback from './ImageWithFallback.vue'
import MediaTypeBadge from './MediaTypeBadge.vue'

const props = defineProps<{
  type: 'movie' | 'tv'
  media?: MediaType
  movie?: MovieDetailsType | null
  tvSeries?: TvSeriesDetailsType | null
}>()

const store = useMediaStore()

const alreadyAdded = computed(() =>
  props.type === 'movie' && props.movie
    ? store.mediaList.some((m: MediaType) => m.Id === props.movie!.Id)
    : props.type === 'tv' && props.tvSeries
      ? store.mediaList.some((ts: MediaType) => ts.Id === props.tvSeries!.Id)
      : false,
)
</script>

<template>
  <!-- Error -->
  <!-- <ErrorAlert
    v-if="props.type === 'movie' && props.movie?.Error"
    :message="props.movie.ErrorMessage"
  /> -->

  <!-- Hero -->
  <div
    class="flex flex-col lg:flex-row gap-12 items-center max-w-6xl w-full bg-white/70 backdrop-blur-md border border-gray-200/60 shadow-md rounded-xl p-8 transition"
    v-motion-fade-visible-once
  >
    <!-- Poster -->
    <ImageWithFallback
      :src="
        type === 'movie'
          ? props.movie!.PosterPath
          : props.tvSeries!.PosterPath
      "
      alt="Poster"
      size="w500"
      class="shrink-0 w-full max-w-sm rounded-lg shadow-lg transform transition-transform duration-500 hover:scale-105"
    />

    <!-- Text -->
    <div class="flex-1">
      <h1 class="text-4xl font-bold text-gray-800 mb-2">
        <template v-if="props.type === 'movie'">
          {{ props.movie!.Title }}
          <span class="text-gray-400 text-lg font-normal"
            >({{ props.movie!.ReleaseDate?.slice(0, 4) }})</span
          >
        </template>
        <template v-else>
          {{ props.tvSeries!.Name }}
          <span class="text-gray-400 text-lg font-normal"
            >({{ props.tvSeries!.FirstAirDate?.slice(0, 4) }})</span
          >
        </template>
      </h1>

      <p v-if="props.type === 'movie' && props.movie!.Tagline" class="italic text-gray-500 mb-2">
        {{ props.movie!.Tagline }}
      </p>
      <p v-if="props.type === 'tv' && props.tvSeries!.Tagline" class="italic text-gray-500 mb-2">
        {{ props.tvSeries!.Tagline }}
      </p>

      <p class="text-gray-600 leading-relaxed mb-6">
        {{ props.type === 'movie' ? props.movie!.Overview : props.tvSeries!.Overview }}
      </p>

      <!-- Badges -->
      <div class="flex flex-wrap gap-2 mb-6">
        <MediaTypeBadge
          v-for="g in props.type === 'movie' ? props.movie!.Genres : props.tvSeries!.Genres"
          :key="g.id"
          :text="g.name"
        />
        <MediaTypeBadge
          v-if="props.type === 'movie'"
          :text="`Runtime: ${props.movie!.Runtime} min`"
        />
        <MediaTypeBadge
          v-if="props.type === 'tv'"
          :text="`Seasons: ${props.tvSeries!.NumberOfSeasons}`"
        />
      </div>

      <!-- Actions -->
      <div class="card-actions" v-auto-animate>
        <template v-if="(props.movie && props.media) || (props.tvSeries && props.media)">
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

        <RouterLink
          :to="{
            name: 'watch',
            params: {
              name: props.type === 'movie' ? props.movie!.Title : props.tvSeries!.Name,
              id: props.type === 'movie' ? props.movie!.Id : props.tvSeries!.Id,
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
        </RouterLink>
      </div>
    </div>
  </div>
</template>
