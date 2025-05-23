"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import apiClient from "@/lib/api-client"
import type { ApiResponse, ShortLink, UrlFormData, LinkStats } from "@/lib/types"

// Fetch all links for the current user
export function useLinks(page = 1, limit = 10) {
  return useQuery({
    queryKey: ["links", page, limit],
    queryFn: async () => {
      const response = await apiClient.get<ApiResponse<{ links: ShortLink[]; total: number }>>(
        `/links?page=${page}&limit=${limit}`,
      )
      return response.data.data
    },
  })
}

// Create a new short link
export function useCreateLink() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: UrlFormData) => {
      const response = await apiClient.post<ApiResponse<ShortLink>>("/links", data)
      return response.data.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["links"] })
    },
  })
}

// Update an existing link
export function useUpdateLink() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<UrlFormData> }) => {
      const response = await apiClient.put<ApiResponse<ShortLink>>(`/links/${id}`, data)
      return response.data.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["links"] })
    },
  })
}

// Delete a link
export function useDeleteLink() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await apiClient.delete<ApiResponse<void>>(`/links/${id}`)
      return response.data.success
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["links"] })
    },
  })
}

// Get link statistics
export function useLinkStats(id: string) {
  return useQuery({
    queryKey: ["linkStats", id],
    queryFn: async () => {
      const response = await apiClient.get<ApiResponse<LinkStats>>(`/links/${id}/stats`)
      return response.data.data
    },
    enabled: !!id,
  })
}

// Get available domains
export function useDomains() {
  return useQuery({
    queryKey: ["domains"],
    queryFn: async () => {
      const response = await apiClient.get<ApiResponse<string[]>>("/domains")
      return response.data.data || []
    },
  })
}
