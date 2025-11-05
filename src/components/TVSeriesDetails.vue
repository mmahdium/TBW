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
      class="shrink-0 w-full max-w-sm rounded-lg shadow-lg transform transition-transform duration-500 hover:scale-101"
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

      <p class="text-accent leading-relaxed mb-6">
        {{ props.tvSeries!.Overview }}
      </p>

      <!-- Badges -->
      <div class="flex flex-wrap gap-2 mb-6">
        <MediaTypeBadge v-for="g in props.tvSeries!.Genres" :key="g.id" :text="g.name" />
      </div>

      <div class="card bg-base-200 w-full lg:w-96 shadow-sm mb-6 mt-6">
        <div class="card-body">
          <p class="font-semibold text-gray-900">
            Seasons:
            <span class="text-gray-600">{{ props.tvSeries!.NumberOfSeasons }}</span>
          </p>
          <p class="font-semibold text-gray-900">
            Expisodes:
            <span class="text-gray-600">{{ props.tvSeries!.NumberOfEpisodes }}</span>
          </p>

          <p class="font-semibold text-gray-900">
            Last Episode:
            <span class="text-gray-600">{{ props.tvSeries!.LastEpisodeToAir?.name }}</span>
          </p>
          <p class="font-semibold text-gray-900">
            Language:
            <span class="text-gray-600">{{ props.tvSeries!.SpokenLanguages[0]?.englishName }}</span>
          </p>
          <p class="font-semibold text-gray-900">
            First Air Date:
            <time
              class="text-sm font-semibold text-gray-600"
              :datetime="
                props.tvSeries!.FirstAirDate === ''
                  ? 'unknown'
                  : new Date(props.tvSeries!.FirstAirDate).toISOString()
              "
            >
              {{
                props.tvSeries!.FirstAirDate === ''
                  ? 'unknown'
                  : new Intl.DateTimeFormat('default', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    }).format(new Date(props.tvSeries!.FirstAirDate))
              }}
            </time>
          </p>
          <div class="card-actions justify-start mt-2 gap-3">
            <!-- TMDB button -->
            <a
              :href="`https://www.themoviedb.org/tv/${props.tvSeries?.Id}`"
              target="_blank"
              rel="noopener noreferrer"
              class="btn btn-square btn-md bg-accent border-none"
            >
              <img src="/logos/tmdb.svg" alt="TMDB" class="m-0.5" />
            </a>

            <!-- IMDB button -->
            <a
              v-if="props.tvSeries?.Homepage"
              :href="props.tvSeries.Homepage"
              target="_blank"
              rel="noopener noreferrer"
              class="btn btn-square btn-md bg-[#f5c518] border-none"
            >
              <img src="/logos/imdb.svg" alt="IMDB" class="m-0.5" />
            </a>
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div class="card-actions" v-auto-animate>
        <template v-if="props.tvSeries && props.media">
          <button
            v-if="!alreadyAdded"
            class="btn btn-square bg-linear-to-r from-gray-100 to-gray-200 border border-gray-300 text-gray-700 hover:from-gray-200 hover:to-gray-300"
            @click="store.addMedia(props.media)"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
              />
            </svg>
          </button>
          <button
            v-else
            class="btn btn-square bg-linear-to-r from-red-50 to-red-100 border border-red-200 text-red-600 hover:from-red-100 hover:to-red-200"
            @click="store.removeMedia(props.media.Id)"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m3 3 1.664 1.664M21 21l-1.5-1.5m-5.485-1.242L12 17.25 4.5 21V8.742m.164-4.078a2.15 2.15 0 0 1 1.743-1.342 48.507 48.507 0 0 1 11.186 0c1.1.128 1.907 1.077 1.907 2.185V19.5M4.664 4.664 19.5 19.5"
              />
            </svg>
          </button>
        </template>

        <RouterLink
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
        </RouterLink>
      </div>
    </div>
  </div>
</template>
