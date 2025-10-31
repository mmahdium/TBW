<script setup lang="ts">
interface Props {
  size?: 'xs' | 'sm' | 'md' | 'lg'
  color?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  color: 'primary',
})
</script>

<template>
  <span :class="`loading loading-ring loading-${props.size} text-${props.color}`"></span>
</template>
