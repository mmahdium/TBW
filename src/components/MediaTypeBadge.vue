<script setup lang="ts">
interface Props {
  text: string
  type?: 'info' | 'success' | 'warning' | 'error' | 'primary' | 'secondary' | 'accent' | 'ghost'
}

const props = withDefaults(defineProps<Props>(), {
  type: 'primary',
})
</script>

<template>
  <span
    :class="`flex items-center w-max px-3 py-1 rounded-md text-sm bg-gradient-to-r from-base-300 to-base-200 ${type ? 'badge-' + type : ''} text-base-content border border-base-content/30`"
  >
    {{ props.text }}
  </span>
</template>
