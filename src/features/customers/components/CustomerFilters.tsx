'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Button, Badge } from '@/shared/components/ui'
import type { CustomerFilters } from '../schemas/customers.schema'

interface CustomerFiltersProps {
  cities: string[]
  industries: string[]
  filters: CustomerFilters
}

export function CustomerFilters({ cities, industries, filters }: CustomerFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set(key, value)
      params.set('page', '1')
    } else {
      params.delete(key)
    }
    router.push(`?${params.toString()}`)
  }

  const removeFilter = (key: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete(key)
    params.set('page', '1')
    router.push(`?${params.toString()}`)
  }

  const clearAllFilters = () => {
    router.push('/dashboard/customers')
  }

  const activeFiltersCount = [filters.search, filters.city, filters.industry].filter(Boolean).length

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          placeholder="Search by company name or address..."
          defaultValue={filters.search || ''}
          onChange={(e) => {
            const value = e.target.value
            const timeoutId = setTimeout(() => updateFilter('search', value), 500)
            return () => clearTimeout(timeoutId)
          }}
          className="flex-1 h-11 px-4 rounded-md border border-slate-300 focus:border-slate-800 focus:ring-1 focus:ring-slate-800"
        />

        <select
          value={filters.city || ''}
          onChange={(e) => updateFilter('city', e.target.value)}
          className="h-11 px-4 rounded-md border border-slate-300 focus:border-slate-800 focus:ring-1 focus:ring-slate-800"
        >
          <option value="">All Cities</option>
          {cities.map((city) => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>

        <select
          value={filters.industry || ''}
          onChange={(e) => updateFilter('industry', e.target.value)}
          className="h-11 px-4 rounded-md border border-slate-300 focus:border-slate-800 focus:ring-1 focus:ring-slate-800"
        >
          <option value="">All Industries</option>
          {industries.map((industry) => (
            <option key={industry} value={industry}>{industry}</option>
          ))}
        </select>

        {activeFiltersCount > 0 && (
          <Button variant="secondary" onClick={clearAllFilters}>
            Clear
          </Button>
        )}
      </div>

      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap gap-2">
          {filters.search && (
            <Badge variant="info" className="flex items-center gap-2">
              Search: {filters.search}
              <button onClick={() => removeFilter('search')} className="hover:text-blue-900">✕</button>
            </Badge>
          )}
          {filters.city && (
            <Badge variant="info" className="flex items-center gap-2">
              City: {filters.city}
              <button onClick={() => removeFilter('city')} className="hover:text-blue-900">✕</button>
            </Badge>
          )}
          {filters.industry && (
            <Badge variant="info" className="flex items-center gap-2">
              Industry: {filters.industry}
              <button onClick={() => removeFilter('industry')} className="hover:text-blue-900">✕</button>
            </Badge>
          )}
        </div>
      )}
    </div>
  )
}
