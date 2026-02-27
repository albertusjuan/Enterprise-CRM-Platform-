import { z } from 'zod'

export const ActivitySchema = z.object({
  customer_id: z.string().uuid(),
  activity_type: z.enum(['call', 'visit', 'meeting', 'email', 'whatsapp', 'quotation', 'service', 'complaint', 'follow-up']),
  activity_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format'),
  contact_person: z.string().optional(),
  notes: z.string().optional(),
  outcome: z.enum(['has_need', 'no_need', 'follow_up', 'service_request', 'quotation_sent', 'order_placed', 'no_response']).optional(),
  next_contact_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format').optional().or(z.literal('')),
})

export type ActivityInput = z.infer<typeof ActivitySchema>
