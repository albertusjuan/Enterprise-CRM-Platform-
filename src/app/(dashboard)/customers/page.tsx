<<<<<<< HEAD
export default function CustomersPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Customers</h1>
      <p className="text-slate-600 mt-1">Customer management coming soon</p>
    </div>
=======
import { getCustomers, getCities, getIndustries } from '@/features/customers'
import { CustomerList } from '@/features/customers'
import { CustomerFiltersSchema } from '@/features/customers/schemas/customers.schema'
import { getUserProfile } from '@/shared/lib/auth/guards'
import { canEditCustomer } from '@/shared/lib/auth/permissions'

export const revalidate = 30

export default async function CustomersPage({ searchParams }: { searchParams: Promise<any> }) {
  const params = await searchParams
  const filters = CustomerFiltersSchema.parse(params)
  const { profile } = await getUserProfile()

  const [customersData, cities, industries] = await Promise.all([
    getCustomers(filters),
    getCities(),
    getIndustries(),
  ])

  return (
    <CustomerList 
      data={customersData} 
      cities={cities} 
      industries={industries} 
      filters={filters}
      canEdit={canEditCustomer(profile?.role)}
    />
>>>>>>> feat/customers
  )
}
