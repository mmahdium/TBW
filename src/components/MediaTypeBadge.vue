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
    :class="`flex items-center w-max px-3 py-1 rounded-md text-sm bg-linear-to-r from-gray-100 to-gray-200 ${type ? 'badge-' + type : ''} text-gray-700 border border-gray-300`"
  >
    {{ props.text }}
  </span>
</template>
