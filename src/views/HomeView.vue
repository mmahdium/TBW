<script setup lang="ts"></script>

<template>
  <div class="relative isolate bg-base-100 px-6 pt-16 lg:px-8">
    <!-- Top blurred gradient background -->
    <div
      class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
      aria-hidden="true"
    >
      <div
        class="relative left-[calc(50%-11rem)] aspect-1155/678 w-xl -translate-x-1/2 rotate-30 bg-linear-to-tr from-gray-400 via-indigo-400 to-cyan-400 opacity-30 sm:left-[calc(50%-30rem)] sm:w-6xl"
        style="
          clip-path: polygon(
            74.1% 44.1%,
            100% 61.6%,
            97.5% 26.9%,
            85.5% 0.1%,
            80.7% 2%,
            72.5% 32.5%,
            60.2% 62.4%,
            52.4% 68.1%,
            47.5% 58.3%,
            45.2% 34.5%,
            27.5% 76.7%,
            0.1% 64.9%,
            17.9% 100%,
            27.6% 76.8%,
            76.1% 97.7%,
            74.1% 44.1%
          );
        "
      ></div>
    </div>

    <!-- Hero content -->
    <div
      class="container mx-auto px-4 py-24 sm:py-32 lg:py-40 text-center"
      v-motion-fade-visible-once
    >
      <h1 class="text-5xl font-bold mb-8 leading-tight">
        Welcome to <br />
        <span class="text-6xl font-extrabold gradient-text"> To Be Watched </span>
      </h1>

      <p class="text-lg text-base-content/70 max-w-2xl mx-auto mb-12">
        A simple and beautiful media list app built with Vue&nbsp;3 and Tailwind&nbsp;CSS (daisyUI).
      </p>

      <RouterLink
        to="/add"
        class="btn px-8 py-3 text-lg font-medium bg-gradient-to-r from-base-300 to-base-200 border border-base-content/30 text-base-content hover:from-base-200 hover:to-base-100 hover:text-base-content/90 transition"
      >
        Get Started
      </RouterLink>
    </div>

    <!-- Bottom blurred gradient background -->
    <div
      class="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
      aria-hidden="true"
    >
      <div
        class="relative left-[calc(50%+3rem)] aspect-1155/678 w-xl -translate-x-1/2 bg-linear-to-tr from-gray-400 via-indigo-400 to-cyan-400 opacity-30 sm:left-[calc(50%+36rem)] sm:w-6xl"
        style="
          clip-path: polygon(
            74.1% 44.1%,
            100% 61.6%,
            97.5% 26.9%,
            85.5% 0.1%,
            80.7% 2%,
            72.5% 32.5%,
            60.2% 62.4%,
            52.4% 68.1%,
            47.5% 58.3%,
            45.2% 34.5%,
            27.5% 76.7%,
            0.1% 64.9%,
            17.9% 100%,
            27.6% 76.8%,
            76.1% 97.7%,
            74.1% 44.1%
          );
        "
      ></div>
    </div>
  </div>
</template>

<style scoped>
.gradient-text {
  background: linear-gradient(
    90deg,
    oklch(77.48% 0.204 60.62) 0%,
    /* primary */ oklch(45.98% 0.248 305.03) 50%,
    /* secondary */ oklch(77.48% 0.204 60.62) 100% /* accent */
  );
  -webkit-background-clip: text;
  background-clip: text;
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
