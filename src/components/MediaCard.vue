<script setup lang="ts">
import { useMediaStore } from '@/stores/media'
import { computed } from 'vue'
import type { MediaType } from '@/types/Media'
import ImageWithFallback from './ImageWithFallback.vue'
import ScoreRing from './ScoreRing.vue'

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
    class="card relative w-full h-full overflow-hidden bg-base-200/70 backdrop-blur-md border border-base-content/20 shadow-xs hover:shadow-xl transition-all duration-300"
    v-motion-fade-visible-once
  >
    <div class="relative w-full">
      <router-link
        :to="{ name: 'details', params: { type: props.media.MediaType, id: props.media.Id } }"
        class="block w-full aspect-2/3 overflow-hidden bg-base-300 relative"
      >
        <ImageWithFallback
          :src="props.media.PosterPath"
          :alt="props.media.Title"
          size="w300"
          class="w-full h-full object-cover transform transition-transform duration-500 hover:scale-105"
        />
        <!-- Glassy gradient shadow overlay -->
        <div
          class="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-base-100/40 via-base-100/20 to-transparent backdrop-blur-[0.5px] pointer-events-none"
        ></div>
      </router-link>

      <!-- Radial progress placed on the right edge, centered on the seam between poster and body -->
      <div class="absolute right-3 bottom-0 z-20 translate-y-1/2" aria-hidden="true">
        <ScoreRing :VoteAverage="props.media.VoteAverage" />
      </div>
    </div>

    <!-- Body -->
    <div class="card-body p-4 flex flex-col pt-6">
      <router-link
        :to="{ name: 'details', params: { type: props.media.MediaType, id: props.media.Id } }"
        class="block"
      >
        <h2
          class="card-title text-base font-semibold bg-gradient-to-r from-base-content/70 to-base-content/50 bg-clip-text text-transparent break-words"
        >
          {{ props.media.Title }}
        </h2>
        <time
          class="text-sm text-base-content/60"
          :datetime="
            props.media.ReleaseDate === '' && props.media.FirstAirDate === ''
              ? 'unknown'
              : new Date(
                  props.media.ReleaseDate === ''
                    ? props.media.FirstAirDate
                    : props.media.ReleaseDate,
                ).toISOString()
          "
        >
          {{
            props.media.ReleaseDate === '' && props.media.FirstAirDate === ''
              ? 'unknown'
              : new Intl.DateTimeFormat('default', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                }).format(
                  new Date(
                    props.media.ReleaseDate === ''
                      ? props.media.FirstAirDate
                      : props.media.ReleaseDate,
                  ),
                )
          }}
        </time>
      </router-link>

      <!-- Actions row -->
      <div class="card-actions flex items-center justify-between mt-auto">
        <!-- Type badge -->
        <span
          class="badge badge-outline text-xs font-medium px-2 py-1"
          :class="props.media.Adult ? 'badge-error' : 'text-base-content'"
        >
          {{ props.media.MediaType === 'movie' ? 'Movie' : 'Show' }}
        </span>

        <!-- Bookmark buttons -->
        <div class="flex gap-2">
          <button
            v-motion-fade-visible-once
            v-if="!alreadyAdded"
            class="btn btn-circle btn-md px-1.5 bg-gradient-to-r from-base-300 to-base-200 border-base-content/30 text-base-content hover:from-base-200 hover:to-base-100 hover:text-base-content/90 transition"
            @click="emit('add-media', props.media)"
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
            v-motion-fade-visible-once
            v-else
            class="btn btn-circle btn-md px-1.5 bg-gradient-to-r from-error/10 to-error/20 border border-error/30 text-error hover:from-error/20 hover:to-error/30 hover:text-error-content transition"
            @click="emit('remove-media', props.media.Id)"
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
        </div>
      </div>
    </div>
  </div>
</template>
