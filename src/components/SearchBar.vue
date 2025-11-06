<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{ modelValue: string }>()
const emit = defineEmits<{ (e: 'update:modelValue', value: string): void; (e: 'submit'): void }>()

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const localQuery = ref(props.modelValue)

function onSubmit() {
  emit('submit')
}
</script>

<template>
  <form @submit.prevent="onSubmit" class="flex justify-center mb-3">
    <div
      class="flex items-center w-full max-w-md bg-base-200/70 backdrop-blur-md border border-base-content/20 shadow-sm hover:shadow-md transition rounded-lg overflow-hidden"
    >
      <!-- Icon -->
      <span class="pl-3 text-base-content/50">
        <svg
          class="h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </span>

      <!-- Input -->
      <input
        type="search"
        placeholder="Search for media"
        required
        :value="props.modelValue"
        @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        class="flex-1 px-3 py-2 bg-transparent outline-none text-base-content/70 placeholder-base-content/50"
      />

      <!-- Optional button -->
      <!--
      <button
        type="submit"
        class="px-4 py-2 bg-linear-to-r from-gray-100 to-gray-200
               border-l border-gray-200 text-gray-600 hover:text-gray-800
               transition"
      >
        Search
      </button>
      -->
    </div>
  </form>
</template>
