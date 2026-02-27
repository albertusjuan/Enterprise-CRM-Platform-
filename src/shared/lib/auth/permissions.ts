export function canEditCustomer(role?: string): boolean {
  return role === 'admin'
}

export function canManageUsers(role?: string): boolean {
  return role === 'admin'
}

export function canDeleteActivity(role?: string): boolean {
  return role === 'admin'
}

export function canLogActivity(role?: string): boolean {
  return role === 'admin' || role === 'marketing'
}
