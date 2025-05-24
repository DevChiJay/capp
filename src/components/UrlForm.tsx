"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { CalendarIcon, ChevronDown, ChevronUp } from "lucide-react"
import { format } from "date-fns"
import { useCreateLink } from "@/hooks/use-links"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { toast } from "@/components/ui/use-toast"
import type { UrlFormData } from "@/lib/types"

const urlSchema = z.object({
  originalUrl: z.string().url({ message: "Please enter a valid URL" }),
  customSlug: z.string().optional(),
  expiresAt: z.date().optional(),
  description: z.string().optional(),
})

export function UrlForm() {
  const [showAdvanced, setShowAdvanced] = useState(false)
  const createLink = useCreateLink()

  const form = useForm<z.infer<typeof urlSchema>>({
    resolver: zodResolver(urlSchema),
    defaultValues: {
      originalUrl: "",
      customSlug: "",
      description: "",
    },
  })

  const onSubmit = async (data: z.infer<typeof urlSchema>) => {
    try {
      const formData: UrlFormData = {
        originalUrl: data.originalUrl,
      }

      if (showAdvanced) {
        if (data.customSlug) formData.customSlug = data.customSlug
        if (data.expiresAt) formData.expiresAt = data.expiresAt.toISOString()
        if (data.description) formData.description = data.description
      }

      const result = await createLink.mutateAsync(formData)

      if (result) {
        toast({
          title: "URL shortened successfully!",
          description: `Your short URL: ${result.shortCode}`,
        })
        form.reset()
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to shorten URL. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0">
          <FormField
            control={form.control}
            name="originalUrl"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input placeholder="Enter your long URL" {...field} className="h-12" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="h-12 px-8" disabled={createLink.isPending}>
            {createLink.isPending ? "Shortening..." : "Shorten"}
          </Button>
        </div>

        <div>
          <Button
            type="button"
            variant="ghost"
            className="flex items-center p-0 text-sm font-medium text-gray-600"
            onClick={() => setShowAdvanced(!showAdvanced)}
          >
            {showAdvanced ? (
              <>
                <ChevronUp className="mr-1 h-4 w-4" />
                Hide Advanced Options
              </>
            ) : (
              <>
                <ChevronDown className="mr-1 h-4 w-4" />
                Show Advanced Options
              </>
            )}
          </Button>

          {showAdvanced && (
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="customSlug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Custom Slug (optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., my-custom-link" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="expiresAt"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Expiry Date (optional)</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button variant="outline" className="w-full justify-start text-left font-normal">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                          disabled={(date) => date < new Date()}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description (optional)</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Add a description for this link" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
        </div>
      </form>
    </Form>
  )
}
