<script setup lang="ts">
import ErrorAlert from '@/components/alerts/ErrorAlert.vue'
import MediaDetails from '@/components/MediaDetails.vue'
import { getMovieDetails, getSeriesDetails } from '@/lib/api'
import { mapMovieDetailsToMedia, mapTvSeriesDetailsToMedia } from '@/types/MediaMap'
import type { MovieDetailsType } from '@/types/Movie'
import type { TvSeriesDetailsType } from '@/types/TvSeries'
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const movieDetails = ref<MovieDetailsType | null>(null)
const tvSeriesDetails = ref<TvSeriesDetailsType | null>(null)
const isLoading = ref(false)
const errorMessage = ref<string | null>(null)

const media = computed(() => {
  if (movieDetails.value) {
    return mapMovieDetailsToMedia(movieDetails.value)
  } else if (tvSeriesDetails.value) {
    return mapTvSeriesDetailsToMedia(tvSeriesDetails.value)
  } else {
    return undefined
  }
})

onMounted(async () => {
  if (!route.params.id || !route.params.type) {
    errorMessage.value = 'Invalid route parameters'
    return
  }

  isLoading.value = true
  errorMessage.value = null

  try {
    if (route.params.type === 'movie') {
      movieDetails.value = await getMovieDetails(route.params.id as string)
    } else if (route.params.type === 'tv') {
      tvSeriesDetails.value = await getSeriesDetails(route.params.id as string)
    } else {
      errorMessage.value = 'Unsupported media type'
    }
  } catch (err: unknown) {
    console.error(err)
    errorMessage.value = 'Failed to load media details'
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Error -->
    <ErrorAlert v-if="errorMessage" :message="errorMessage" />

    <!-- Loading -->
    <div v-else-if="isLoading" class="flex justify-center items-center">
      <span class="loading loading-ring loading-lg text-primary"></span>
    </div>

    <!-- Details -->
    <MediaDetails
      v-else-if="movieDetails || tvSeriesDetails"
      :type="route.params.type === 'movie' ? 'movie' : 'tv'"
      :media="media"
      :movie="movieDetails"
      :tv-series="tvSeriesDetails"
      v-motion-fade-visible-once
    />

    <!-- Fallback if nothing found -->
    <ErrorAlert v-else message="Could not find media" />
  </div>
</template>
