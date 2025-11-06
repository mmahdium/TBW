<script setup lang="ts">
import { computed, ref } from 'vue'

interface Props {
  src: string
  alt: string
  size?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 'w300',
})

const imageLoadFailed = ref(false)
const loaded = ref(false)

const imageSource = computed(() => {
  if (!props.src) {
    return ''
  }
  return `https://6909aa3d0001d5d30ff1.fra.appwrite.run/t/p/${props.size}${props.src}` // Image proxy
})
</script>

<template>
  <figure class="overflow-hidden flex items-center justify-center bg-base-300 aspect-2/3">
    <span v-if="!loaded" class="loading loading-ring loading-lg text-primary"></span>

    <div v-else-if="imageLoadFailed" class="flex items-center justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-12 h-12 text-base-content/40"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
        />
      </svg>
    </div>

    <img
      v-motion-fade-visible-once
      v-show="loaded && !imageLoadFailed"
      :src="imageSource"
      :alt="props.alt"
      class="object-cover w-full h-full"
      @load="loaded = true"
      @error="
        () => {
          imageLoadFailed = true
          loaded = true
        }
      "
    />
  </figure>
</template>
