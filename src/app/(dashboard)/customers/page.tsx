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
  )
}
