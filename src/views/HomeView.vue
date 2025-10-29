<script setup lang="ts"></script>

<template>
  <div class="container mx-auto px-4 py-16" v-motion-fade-visible-once>
    <div class="flex flex-col items-center justify-center text-center">
      <h1 class="text-5xl font-bold mb-8 leading-tight">
        Welcome to <br />
        <span class="text-6xl font-extrabold gradient-text"> To Be Watched </span>
      </h1>

      <p class="text-lg text-gray-600 max-w-2xl mb-12">
        A simple and beautiful media list app built with Vue&nbsp;3 and Tailwind&nbsp;CSS (daisyUI).
      </p>

      <RouterLink
        to="/add"
        class="btn px-8 py-3 text-lg font-medium bg-linear-to-r from-gray-100 to-gray-200 border border-gray-300 text-gray-700 hover:from-gray-200 hover:to-gray-300 hover:text-gray-900 transition"
      >
        Get Started
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
.gradient-text {
  background: linear-gradient(
    90deg,
    #6b7280 0%,
    /* gray-500 */ #818cf8 50%,
    /* indigo-400 */ #22d3ee 100% /* cyan-400 */
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: 200% auto;
  animation: gradientShift 6s ease infinite alternate;
}

@keyframes gradientShift {
  0% {
    background-position: left center;
  }
  100% {
    background-position: right center;
  }
}
</style>
