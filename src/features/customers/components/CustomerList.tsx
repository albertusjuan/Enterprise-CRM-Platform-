'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/shared/components/ui'
import { CustomerTable } from './CustomerTable'
import { CustomerCards } from './CustomerCards'
import { CustomerFilters } from './CustomerFilters'
import { AddCustomerDialog } from './AddCustomerDialog'
import type { Customer } from '@/shared/types'
import type { CustomerFilters as Filters } from '../schemas/customers.schema'

interface CustomerListProps {
  data: {
    data: (Customer & { contacts?: any[] })[]
    count: number
    pageSize: number
  }
  cities: string[]
  industries: string[]
  filters: Filters
  canEdit?: boolean
}

export function CustomerList({ data, cities, industries, filters, canEdit = true }: CustomerListProps) {
  const router = useRouter()
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table')

  const totalPages = Math.ceil(data.count / data.pageSize)
  const currentPage = filters.page

  const goToPage = (page: number) => {
    const params = new URLSearchParams(window.location.search)
    params.set('page', page.toString())
    router.push(`?${params.toString()}`)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Customers</h1>
          <p className="text-slate-600 mt-1">{data.count} total customers</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 border border-slate-300 rounded-md">
            <button
              onClick={() => setViewMode('table')}
              className={`px-3 py-2 text-sm ${viewMode === 'table' ? 'bg-slate-100' : ''}`}
            >
              📊 Table
            </button>
            <button
              onClick={() => setViewMode('cards')}
              className={`px-3 py-2 text-sm ${viewMode === 'cards' ? 'bg-slate-100' : ''}`}
            >
              📇 Cards
            </button>
          </div>
          {canEdit && (
            <Button variant="primary" onClick={() => setShowAddDialog(true)}>
              + Add Customer
            </Button>
          )}
        </div>
      </div>

      <CustomerFilters cities={cities} industries={industries} filters={filters} />

      {data.data.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-slate-500 text-lg mb-4">No customers found</p>
          {canEdit && (
            <Button variant="primary" onClick={() => setShowAddDialog(true)}>
              Add Your First Customer
            </Button>
          )}
        </div>
      ) : (
        <>
          <div className="hidden md:block">
            {viewMode === 'table' ? (
              <CustomerTable customers={data.data} />
            ) : (
              <CustomerCards customers={data.data} />
            )}
          </div>
          <div className="md:hidden">
            <CustomerCards customers={data.data} />
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-between border-t border-slate-200 pt-4">
              <p className="text-sm text-slate-600">
                Page {currentPage} of {totalPages}
              </p>
              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage <= 1}
                >
                  Previous
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage >= totalPages}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </>
      )}

      <AddCustomerDialog isOpen={showAddDialog} onClose={() => setShowAddDialog(false)} />
    </div>
  )
}
