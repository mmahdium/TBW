<script setup lang="ts"></script>

<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-base-300 to-base-100 px-4"
  >
    <!-- Big 404 -->
    <h1
      class="text-8xl font-extrabold mb-4 bg-gradient-to-r from-base-content/70 to-base-content/50 bg-clip-text text-transparent"
    >
      404
    </h1>

    <!-- Message -->
    <p class="text-xl text-base-content/70 mb-8 text-center">
      Oops! The page you’re looking for doesn’t exist.
    </p>

    <!-- Button back home -->
    <RouterLink
      to="/"
      class="btn px-6 py-3 bg-gradient-to-r from-base-300 to-base-200 border border-base-content/30 text-base-content hover:from-base-200 hover:to-base-100 hover:text-base-content/90 transition"
    >
      Back to Home
    </RouterLink>
  </div>
</template>

<style scoped></style>
