<script setup lang="ts">
interface Props {
  count?: number
}

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<Props>(), {
  count: 0,
})
</script>

<template>
  <div class="flex flex-col gap-y-2">
    <span class="sr-only">Trwa ładowanie</span>

    <div
      v-for="c in props.count"
      :key="c"
      aria-hidden="true"
      v-bind="$attrs"
      class="w-full animate-pulse rounded-lg bg-gray-200"
    />
  </div>
</template>
