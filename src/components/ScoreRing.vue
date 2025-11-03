<script setup lang="ts">
const props = defineProps<{ VoteAverage: number }>()
</script>

<template>
  <div
    class="radial-progress bg-primary text-primary-content border-primary border-4 font-bold flex items-center justify-center"
    :style="{
      '--value': props.VoteAverage * 10,
      '--size': '2rem',
      '--thickness': '3px',
    }"
    :aria-valuenow="props.VoteAverage"
    role="progressbar"
  >
    <span class="flex items-baseline text-[0.7em]">
      {{ props.VoteAverage === 0 ? '?' : (props.VoteAverage * 10).toFixed(0) }}
      <span class="text-[0.5em] relative -top-1 ml-0.5">%</span>
    </span>
  </div>
</template>
