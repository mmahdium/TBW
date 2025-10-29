<script setup lang="ts">
import { loadMoreMovies, searchMovies } from '@/lib/api'
import { onMounted, ref, watch } from 'vue'
import SearchBar from '@/components/SearchBar.vue'
import MediaList from '@/components/MediaList.vue'
import type { MediaType } from '@/types/Media'
import ErrorAlert from '@/components/alerts/ErrorAlert.vue'
import { useSearchPageStore } from '@/stores/media'

const medias = ref<MediaType[]>()
const seachError = ref<string>('')
const searchQuery = ref('')
const searchPage = ref(1)
const isSearching = ref(false)
const isLoadingMore = ref(false)

const state = useSearchPageStore()

async function searchMovie() {
  try {
    isSearching.value = true
    searchPage.value = 1
    const result = await searchMovies(searchQuery.value)
    console.log(result)
    if (result.totalResults === 0) {
      medias.value = []
      seachError.value = 'No results found'
      return
    }
    seachError.value = ''
    medias.value = result.Results

    state.setState(searchPage.value, searchQuery.value, result.Results)
  } catch (error) {
    medias.value = []
    console.error(error)
    seachError.value = (error as Error).message
  } finally {
    isSearching.value = false
  }
}

async function loadMore() {
  try {
    isLoadingMore.value = true
    searchPage.value++
    const result = await loadMoreMovies(searchQuery.value, searchPage.value)
    medias.value?.push(...result.Results)
    state.setState(searchPage.value, searchQuery.value, medias.value ? medias.value : [])
  } catch (error) {
    searchPage.value = 1
    seachError.value = (error as Error).message
  } finally {
    isLoadingMore.value = false
  }
}

onMounted(() => {
  if (
    state.searchQuery !== '' &&
    state.searchPage !== 0 &&
    state.mediaList !== undefined &&
    state.mediaList.length > 0
  ) {
    searchQuery.value = state.searchQuery
    searchPage.value = state.searchPage
    medias.value = state.mediaList
  }
})

let timeoutId: number | null = null

watch(searchQuery, () => {
  if (timeoutId) {
    clearTimeout(timeoutId)
  }

  timeoutId = window.setTimeout(() => {
    if (searchQuery.value.length > 2 && state.searchQuery !== searchQuery.value) {
      searchMovie()
    }
    timeoutId = null
  }, 500)
})
</script>

<template>
  <div class="container mx-auto px-4 py-12" v-motion-fade-visible-once>
    <!-- Title -->
    <h1
      class="text-4xl font-extrabold text-center mb-10 bg-linear-to-r from-gray-700 to-gray-500 bg-clip-text text-transparent"
    >
      Add Media
    </h1>

    <!-- Search bar -->
    <SearchBar v-model="searchQuery" @submit="searchMovie" />

    <!-- Loading spinner -->
    <div v-if="isSearching" class="flex justify-center my-16">
      <span class="loading loading-ring loading-lg text-primary"></span>
    </div>

    <!-- Movie list -->
    <MediaList
      v-else-if="medias && medias.length > 0"
      :medias="medias"
      :loading-more="isLoadingMore"
      @loadMore="loadMore"
      :is-search="true"
    />

    <!-- Empty state -->
    <p
      v-else
      class="text-center text-gray-500 mt-16 bg-gray-50/60 border border-gray-200 rounded-lg py-12"
    >
      Search for a movie or TV Serie to add it to your list
    </p>

    <!-- Error alert -->
    <div class="flex justify-center pt-4">
      <ErrorAlert v-if="seachError" :message="seachError" />
    </div>
  </div>
</template>
