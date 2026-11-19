<script setup lang="ts">
interface Props {
  message?: string
}

const props = withDefaults(defineProps<Props>(), {
  message: 'Coś poszło nie tak. Spróbuj ponownie później.',
})
</script>

<template>
  <div role="alert" class="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
    {{ props.message }}
  </div>
</template>
