import { getActivities } from '@/features/activities'
import { ActivityList } from '@/features/activities'
import { z } from 'zod'

export const revalidate = 30

const PageSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
})

export default async function ActivitiesPage({ searchParams }: { searchParams: Promise<any> }) {
  const params = await searchParams
  const { page } = PageSchema.parse(params)

  const activitiesData = await getActivities(page)

  return <ActivityList data={activitiesData} currentPage={page} />
}
