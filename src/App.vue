<script setup lang="ts">
import '@/style.css'
import NavBar from './components/NavBar.vue'
import { SpeedInsights } from "@vercel/speed-insights/vue"
</script>

<template>
  <SpeedInsights/>
  <NavBar />

  <RouterView />
</template>

<style scoped>
.page-enter-active,
.page-leave-active {
  transition: all 0.2s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.page-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
</style>
