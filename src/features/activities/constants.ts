export const ACTIVITY_TYPES = [
  { value: 'call', label: 'Phone Call', icon: '📞', color: 'bg-green-100 text-green-700' },
  { value: 'visit', label: 'Visit', icon: '🏢', color: 'bg-blue-100 text-blue-700' },
  { value: 'meeting', label: 'Meeting', icon: '🤝', color: 'bg-purple-100 text-purple-700' },
  { value: 'email', label: 'Email', icon: '📧', color: 'bg-pink-100 text-pink-700' },
  { value: 'whatsapp', label: 'WhatsApp', icon: '💬', color: 'bg-emerald-100 text-emerald-700' },
  { value: 'quotation', label: 'Quotation', icon: '💰', color: 'bg-amber-100 text-amber-700' },
  { value: 'service', label: 'Service', icon: '🔧', color: 'bg-cyan-100 text-cyan-700' },
  { value: 'complaint', label: 'Complaint', icon: '⚠️', color: 'bg-red-100 text-red-700' },
  { value: 'follow-up', label: 'Follow Up', icon: '🔄', color: 'bg-indigo-100 text-indigo-700' },
] as const

export const OUTCOMES = [
  { value: 'has_need', label: 'Has Need', icon: '✅' },
  { value: 'no_need', label: 'No Need', icon: '❌' },
  { value: 'follow_up', label: 'Follow Up', icon: '🔄' },
  { value: 'service_request', label: 'Service Request', icon: '🔧' },
  { value: 'quotation_sent', label: 'Quotation Sent', icon: '💰' },
  { value: 'order_placed', label: 'Order Placed', icon: '🎉' },
  { value: 'no_response', label: 'No Response', icon: '😶' },
] as const

export type ActivityType = typeof ACTIVITY_TYPES[number]['value']
export type ActivityOutcome = typeof OUTCOMES[number]['value']

export function getActivityTypeInfo(type: string) {
  return ACTIVITY_TYPES.find(t => t.value === type) || ACTIVITY_TYPES[0]
}

export function getOutcomeInfo(outcome: string) {
  return OUTCOMES.find(o => o.value === outcome) || OUTCOMES[0]
}
