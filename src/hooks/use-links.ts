"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import apiClient from "@/lib/api-client"
import type { UrlFormData } from "@/lib/types"

// Fetch all links for the current user
export function useLinks(page = 1, limit = 10) {
  return useQuery({
    queryKey: ["links", page, limit],
    queryFn: async () => {
      // Using mock API client
      return await apiClient.getLinks(page, limit)
    },
  })
}

// Create a new short link
export function useCreateLink() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: UrlFormData) => {
      // Using mock API client
      return await apiClient.createLink(data)
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
      // Using mock API client
      return await apiClient.updateLink(id, data)
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
      // Using mock API client
      return await apiClient.deleteLink(id)
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
      // Using mock API client
      return await apiClient.getLinkStats(id)
    },
    enabled: !!id,
  })
}

// Get available domains
export function useDomains() {
  return useQuery({
    queryKey: ["domains"],
    queryFn: async () => {
      // Using mock API client
      return await apiClient.getDomains()
    },
  })
}

/*
 * IMPORTANT: When connecting to your real backend:
 * 1. Replace the mock API calls with real API calls using axios
 * 2. Update the error handling and response parsing
 * 3. Adjust the query and mutation options as needed
 */
