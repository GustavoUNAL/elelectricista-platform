import { useQuery } from '@tanstack/react-query'
import { fetchSiteContent } from '@/api/site-content'

export function useSiteContent() {
  return useQuery({
    queryKey: ['site', 'content'] as const,
    queryFn: fetchSiteContent,
  })
}
