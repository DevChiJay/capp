"use client"

import { useMutation } from "@tanstack/react-query"
import apiClient from "@/lib/api-client"
import { toast } from "@/hooks/use-toast"

export type ContactFormData = {
  fullName: string
  email: string
  subject: string
  message: string
}

export function useContactForm() {
  return useMutation({
    mutationFn: async (data: ContactFormData) => {
      const response = await apiClient.post("/url/contact", data)
      return response.data
    },
    onSuccess: () => {
      toast({
        title: "Message sent",
        description: "Thank you for contacting us! We'll get back to you soon.",
        variant: "default",
      })
    },
    onError: (error) => {
      toast({
        title: "Failed to send message",
        description: error instanceof Error ? error.message : "Please try again later.",
        variant: "destructive",
      })
    },
  })
}
