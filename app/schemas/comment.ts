import * as z from 'zod'

export const commentSchema = z.object({
  id: z.string(),
  photoId: z.string(),
  author: z.string(),
  avatar: z.string(),
  content: z.string(),
  createdAt: z.iso.datetime(),
})

export const commentsSchema = z.array(commentSchema)

export type Comment = z.infer<typeof commentSchema>
