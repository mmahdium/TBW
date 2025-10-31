<script setup lang="ts"></script>

<template>
  <router-link
    to="/add"
    class="card relative w-full h-full flex items-center justify-center aspect-2/3 bg-white/40 backdrop-blur-md border-2 border-dashed border-gray-300 rounded-lg shadow-sm hover:shadow-md hover:border-gray-400 transition-all duration-300"
    v-motion-fade-visible-once
  >
    <!-- Plus icon -->
    <div
      class="flex flex-col items-center justify-center text-gray-400 hover:text-gray-600 transition"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-16 h-16 mb-2"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
      </svg>
      <span class="text-lg font-semibold">Add More</span>
    </div>
  </router-link>
</template>
