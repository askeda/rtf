import * as z from 'zod'
import { COMMENTS_ENDPOINT } from '~/api'
import type { Comment } from '~/schemas'
import { commentsSchema } from '~/schemas'

export const useComments = (photoId: string) => {
  const { data: comments, status, error } = useFetch(COMMENTS_ENDPOINT, {
    key: 'comments',
    server: false,
    transform: (raw) => {
      const { success, data, error } = commentsSchema.safeParse(raw)

      if (!success) {
        const message = z.prettifyError(error)

        console.error('[useComments]', message)

        throw createError({
          statusCode: 500,
          statusMessage: 'Invalid comments response',
          message,
        })
      }

      return data
    },
  })

  const isLoading = computed<boolean>(() => status.value === 'idle' || status.value === 'pending')

  const filteredComments = computed<Comment[]>(() => comments.value
    ? comments.value.filter(comment => comment.photoId === photoId)
    : [],
  )

  return {
    filteredComments,
    isLoading,
    error,
  }
}
