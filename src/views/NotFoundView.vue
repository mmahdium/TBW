<script setup lang="ts"></script>

<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center bg-linear-to-b from-gray-50 to-white px-4"
  >
    <!-- Big 404 -->
    <h1
      class="text-8xl font-extrabold mb-4 bg-linear-to-r from-gray-700 to-gray-500 bg-clip-text text-transparent"
    >
      404
    </h1>

    <!-- Message -->
    <p class="text-xl text-gray-600 mb-8 text-center">
      Oops! The page you’re looking for doesn’t exist.
    </p>

    <!-- Button back home -->
    <RouterLink
      to="/"
      class="btn px-6 py-3 bg-linear-to-r from-gray-100 to-gray-200 border border-gray-300 text-gray-700 hover:from-gray-200 hover:to-gray-300 hover:text-gray-900 transition"
    >
      Back to Home
    </RouterLink>
  </div>
</template>

<style scoped></style>
