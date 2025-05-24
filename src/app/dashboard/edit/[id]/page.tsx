"use client"

import { useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { format } from "date-fns"
import { CalendarIcon, ArrowLeft } from "lucide-react"
import { useLinks, useUpdateLink } from "@/hooks/use-links"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { toast } from "@/components/ui/use-toast"
import { Skeleton } from "@/components/ui/skeleton"

const editLinkSchema = z.object({
  customSlug: z.string().optional(),
  expiresAt: z.date().optional().nullable(),
  description: z.string().optional(),
})

export default function EditLinkPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string

  const { data: linksData, isLoading: isLoadingLink } = useLinks()
  const updateLink = useUpdateLink()

  const form = useForm<z.infer<typeof editLinkSchema>>({
    resolver: zodResolver(editLinkSchema),
    defaultValues: {
      customSlug: "",
      expiresAt: null,
      description: "",
    },
  })

  // Find the current link and populate the form
  useEffect(() => {
    if (linksData?.links && id) {
      const link = linksData.links.find((link) => link.id === id)
      if (link) {
        form.reset({
          customSlug: link.customSlug || "",
          expiresAt: link.expiresAt ? new Date(link.expiresAt) : null,
          description: link.description || "",
        })
      }
    }
  }, [linksData, id, form])

  const onSubmit = async (data: z.infer<typeof editLinkSchema>) => {
    try {
      await updateLink.mutateAsync({
        id,
        data: {
          customSlug: data.customSlug || undefined,
          expiresAt: data.expiresAt ? data.expiresAt.toISOString() : undefined,
          description: data.description || undefined,
        },
      })

      toast({
        title: "Link updated",
        description: "Your link has been updated successfully",
      })

      router.push("/dashboard")
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update link",
      })
    }
  }

  if (isLoadingLink) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 bg-gray-50 py-8">
          <div className="container mx-auto px-4">
            <div className="mb-6 flex items-center">
              <Button variant="ghost" size="sm" onClick={() => router.back()} className="mr-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <Skeleton className="h-8 w-48" />
            </div>
            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <Skeleton className="mb-4 h-8 w-32" />
              <div className="space-y-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-10 w-32" />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="mb-6 flex items-center">
            <Button variant="ghost" size="sm" onClick={() => router.back()} className="mr-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <h1 className="text-2xl font-bold">Edit Link</h1>
          </div>

          <div className="rounded-lg border bg-white p-6 shadow-sm">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                            selected={field.value || undefined}
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

                <div className="flex justify-end space-x-4">
                  <Button type="button" variant="outline" onClick={() => router.back()}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={updateLink.isPending}>
                    {updateLink.isPending ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
