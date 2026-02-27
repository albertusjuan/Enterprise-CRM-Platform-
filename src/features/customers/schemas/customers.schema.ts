import { z } from 'zod'

export const CustomerSchema = z.object({
  company_name: z.string().min(1, 'Company name is required').max(255),
  industry_type: z.string().optional(),
  city: z.string().optional(),
  district: z.string().optional(),
  address: z.string().optional(),
  phone: z.string().regex(/^[0-9-+() ]*$/, 'Invalid phone format').optional().or(z.literal('')),
  email: z.string().email('Invalid email').optional().or(z.literal('')),
  machine_type: z.string().optional(),
  status: z.enum(['active', 'inactive', 'dormant']).default('active'),
  notes: z.string().optional(),
})

export const ContactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  role: z.string().optional(),
  mobile: z.string().optional(),
  email: z.string().email().optional().or(z.literal('')),
  is_primary: z.boolean().default(false),
})

export const CustomerFiltersSchema = z.object({
  search: z.string().optional(),
  city: z.string().optional(),
  industry: z.string().optional(),
  page: z.coerce.number().int().positive().default(1),
})

export type CustomerInput = z.infer<typeof CustomerSchema>
export type ContactInput = z.infer<typeof ContactSchema>
export type CustomerFilters = z.infer<typeof CustomerFiltersSchema>
