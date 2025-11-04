<script setup lang="ts">
import '@/style.css'
import NavBar from './components/NavBar.vue'
import { SpeedInsights } from '@vercel/speed-insights/vue'
</script>

<template>
  <SpeedInsights />
  <NavBar v-if="$route.name !== 'watch'" />

  <RouterView />
</template>
