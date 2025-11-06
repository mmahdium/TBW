<script setup lang="ts">
import type { SearchFilters } from '@/types/SearchFilters'
import { reactive, watch } from 'vue'

const props = defineProps<{
  modelValue: SearchFilters // optional initial value
}>()

const emit = defineEmits<{
  (e: 'update:filters', value: SearchFilters): void
}>()

const local = reactive<SearchFilters>({
  includeAdult: props.modelValue?.includeAdult,
  onlyMovies: props.modelValue?.onlyMovies,
  onlySeries: props.modelValue?.onlySeries,
})

function toggleIncludeAdult(e: Event) {
  local.includeAdult = (e.target as HTMLInputElement).checked
}
function toggleOnlyMovies(e: Event) {
  const checked = (e.target as HTMLInputElement).checked
  if (!checked && !local.onlySeries) {
    local.onlySeries = true
  }
  local.onlyMovies = checked
}
function toggleOnlySeries(e: Event) {
  const checked = (e.target as HTMLInputElement).checked
  if (!checked && !local.onlyMovies) {
    local.onlyMovies = true
  }
  local.onlySeries = checked
}

watch(
  () => ({ ...local }),
  (next) => {
    // ensureAtLeastOneGenre()
    const out: SearchFilters = {
      includeAdult: next.includeAdult,
      onlyMovies: next.onlyMovies,
      onlySeries: next.onlySeries,
    }
    emit('update:filters', out)
  },
  { deep: true, immediate: true },
)
</script>

<template>
  <form class="flex gap-2 justify-center mb-8 flex-wrap">
    <label class="btn btn-outline" :class="local.includeAdult ? 'btn-error' : 'btn-ghost'">
      <input
        type="checkbox"
        :checked="local.includeAdult"
        @change="toggleIncludeAdult"
        aria-label="Adult"
        class="sr-only"
      />
      Adult
    </label>

    <label class="btn btn-outline" :class="local.onlyMovies ? 'btn-primary' : 'btn-ghost'">
      <input
        type="checkbox"
        :checked="local.onlyMovies"
        @change="toggleOnlyMovies"
        aria-label="Movies"
        class="sr-only"
      />
      Movies
    </label>

    <label class="btn btn-outline" :class="local.onlySeries ? 'btn-primary' : 'btn-ghost'">
      <input
        type="checkbox"
        :checked="local.onlySeries"
        @change="toggleOnlySeries"
        aria-label="TV Series"
        class="sr-only"
      />
      TV Series
    </label>
  </form>
</template>
