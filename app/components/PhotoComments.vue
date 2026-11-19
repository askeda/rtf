<script setup lang="ts">
import type { Comment } from '~/schemas'

interface Props {
  comments: Comment[]
}

const props = defineProps<Props>()
</script>

<template>
  <div class="mt-4">
    <p v-if="!props.comments.length" class="text-sm text-gray-500">
      Brak komentarzy do tego zdjęcia.
    </p>

    <ul v-else class="divide-y divide-gray-200">
      <li
        v-for="comment in props.comments"
        :key="comment.id"
        class="flex gap-x-2 px-2 py-3 text-left"
      >
        <img
          :src="comment.avatar"
          :alt="`Avatar: ${comment.author}`"
          width="40"
          height="40"
          class="size-10 shrink-0 rounded-full object-cover"
        >

        <div class="flex-1 flex flex-col gap-y-1">
          <div class="flex items-center justify-between gap-3">
            <p class="text-sm font-medium text-gray-900">
              {{ comment.author }}
            </p>

            <time :datetime="comment.createdAt" class="shrink-0 text-xs text-gray-500">
              {{ formatDate(comment.createdAt) }}
            </time>
          </div>

          <p class="text-sm text-gray-700">
            {{ comment.content }}
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>
