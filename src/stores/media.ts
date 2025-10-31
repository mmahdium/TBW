import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { MediaType } from '@/types/Media'

function saveMedias(medias: MediaType[]) {
  localStorage.setItem('medias', JSON.stringify(medias))
}

function loadMedias(): MediaType[] {
  const medias = localStorage.getItem('medias')
  return medias ? JSON.parse(medias) : []
}

export const useMediaStore = defineStore('medias', () => {
  const mediaList = ref<MediaType[]>(loadMedias())

  function addMedia(media: MediaType) {
    if (!mediaList.value.find((m) => m.Id === media.Id)) {
      mediaList.value.push(media)
      saveMedias(mediaList.value)
    }
  }

  function removeMedia(mediaId: number) {
    mediaList.value = mediaList.value.filter((m) => m.Id !== mediaId)
    saveMedias(mediaList.value)
  }

  return { mediaList, addMedia, removeMedia }
})

export const useSearchPageStore = defineStore('searchPage', () => {
  const mediaList = ref<MediaType[]>()
  const searchPage = ref(0)
  const searchQuery = ref('')

  function setState(page: number, query: string, medias: MediaType[]) {
    searchPage.value = page
    searchQuery.value = query
    mediaList.value = medias
  }
  return { searchPage, searchQuery, mediaList, setState }
})
