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
        `/url/user/urls?page=${page}&limit=${limit}`,
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
      const response = await apiClient.post<ApiResponse<ShortLink>>("/url/shorten", data)
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
    mutationFn: async ({ shortCode, data }: { shortCode: string; data: Partial<UrlFormData> }) => {
      const response = await apiClient.patch<ApiResponse<ShortLink>>(`/url/${shortCode}`, data)
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
    mutationFn: async (shortCode: string) => {
      const response = await apiClient.delete<ApiResponse<void>>(`/url/${shortCode}`)
      return response.data.success
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["links"] })
    },
  })
}

// Get link QR code
export function useLinkQR(shortCode: string) {
  return useQuery({
    queryKey: ["linkQR", shortCode],
    queryFn: async () => {
      const response = await apiClient.get<ApiResponse<string>>(`/url/${shortCode}/qr`)
      return response.data
    },
    enabled: !!shortCode,
  })
}

// Get link statistics
export function useLinkStats(shortCode: string) {
  return useQuery({
    queryKey: ["linkStats", shortCode],
    queryFn: async () => {
      const response = await apiClient.get<ApiResponse<LinkStats>>(`/url/${shortCode}/stats`)
      return response.data.data
    },
    enabled: !!shortCode,
  })
}

// Get user statistics
export function useUserStats() {
  return useQuery({
    queryKey: ["userStats"],
    queryFn: async () => {
      const response = await apiClient.get<ApiResponse<LinkStats[]>>(`/url/user/stats`)
      return response.data
    },
    enabled: true,
  })
}
