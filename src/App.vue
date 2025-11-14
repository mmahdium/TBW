<script setup lang="ts">
import '@/style.css'
import NavBar from './components/NavBar.vue'
import { Analytics } from '@vercel/analytics/vue';
</script>

<template>
  <Analytics />
  <NavBar v-if="$route.name !== 'watch'" />

  <RouterView />
</template>
