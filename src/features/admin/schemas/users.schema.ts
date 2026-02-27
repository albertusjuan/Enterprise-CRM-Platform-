import { z } from 'zod'

export const UpdateUserSchema = z.object({
  full_name: z.string().min(1, 'Name is required').max(255),
  role: z.enum(['admin', 'marketing']),
  is_active: z.boolean(),
})

export type UpdateUserInput = z.infer<typeof UpdateUserSchema>
