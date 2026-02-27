export type Customer = {
  id: string
  company_name: string
  industry_type?: string
  city?: string
  district?: string
  address?: string
  phone?: string
  email?: string
  machine_type?: string
  status: 'active' | 'inactive' | 'dormant'
  last_contact_date?: string
  notes?: string
  created_at: string
  updated_at: string
}

export type Contact = {
  id: string
  customer_id: string
  name: string
  role?: string
  mobile?: string
  email?: string
  is_primary: boolean
  created_at: string
}

export type Activity = {
  id: string
  customer_id: string
  user_id?: string
  activity_type: 'visit' | 'call' | 'email' | 'meeting' | 'quotation' | 'service' | 'complaint' | 'follow-up' | 'whatsapp'
  activity_date: string
  contact_person?: string
  notes?: string
  outcome?: 'no_need' | 'has_need' | 'follow_up' | 'service_request' | 'order_placed' | 'quotation_sent' | 'no_response'
  next_contact_date?: string
  is_imported?: boolean
  created_at: string
}

export type UserProfile = {
  id: string
  full_name: string
  role: 'admin' | 'marketing'
  is_active: boolean
  created_at: string
  updated_at: string
}
