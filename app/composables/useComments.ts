import * as z from 'zod'
import { COMMENTS_ENDPOINT } from '~/api'
import { commentsSchema } from '~/schemas'

export const useComments = () => {
  const { data: comments, pending, error } = useFetch(COMMENTS_ENDPOINT, {
    key: 'comments',
    server: false,
    transform: (raw) => {
      const { success, data, error } = commentsSchema.safeParse(raw)

      if (!success) {
        throw createError({
          statusCode: 500,
          statusMessage: 'Invalid comments response',
          message: z.prettifyError(error),
        })
      }

      return data
    },
  })

  return {
    comments,
    pending,
    error,
  }
}
