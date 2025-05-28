"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { ChevronDown, ChevronUp, Copy } from "lucide-react"
import { useCreateLink } from "@/hooks/use-links"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Skeleton } from "@/components/ui/skeleton"
import type { UrlFormData, ShortLink } from "@/lib/types"

const url = process.env.NEXT_PUBLIC_BASE_URL

const urlSchema = z.object({
  originalUrl: z.string().url({ message: "Please enter a valid URL" }),
  customSlug: z.string().optional(),
  expirationDays: z.number().int().min(1).default(7),
  description: z.string().optional(),
})

export function UrlForm() {
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [qrDialogOpen, setQrDialogOpen] = useState(false)
  const [createdLink, setCreatedLink] = useState<ShortLink | null>(null)
  const createLink = useCreateLink()

  const form = useForm<z.infer<typeof urlSchema>>({
    resolver: zodResolver(urlSchema),
    defaultValues: {
      originalUrl: "",
      customSlug: "",
      expirationDays: 7,
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
        if (data.expirationDays) formData.expirationDays = data.expirationDays
        if (data.description) formData.description = data.description
      }

      const result = await createLink.mutateAsync(formData)

      if (result) {
        setCreatedLink(result)
        setQrDialogOpen(true)
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

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      description: "Link copied to clipboard",
    })
  }

  return (
    <>
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
                      <FormLabel>Custom Slug</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., /something" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="expirationDays"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Expiry Date</FormLabel>
                      <Select 
                        value={field.value.toString()} 
                        onValueChange={(value) => field.onChange(parseInt(value))}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select expiration period" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="1">1 Day</SelectItem>
                          <SelectItem value="7">7 Days</SelectItem>
                          <SelectItem value="14">14 Days</SelectItem>
                          <SelectItem value="30">30 Days</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
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

      <Dialog open={qrDialogOpen} onOpenChange={setQrDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>URL Shortened Successfully!</DialogTitle>
            <DialogDescription>Scan this QR code to access your shortened URL.</DialogDescription>
          </DialogHeader>
          {!createdLink ? (
            <Skeleton className="h-48 w-48" />
          ) : (
            <div className="flex flex-col items-center justify-center space-y-4 p-4">
              <img
                src={createdLink.qrCode}
                alt="QR Code"
                className="h-48 w-48"
              />
              <p className="text-center text-sm">
                {`${url}/${createdLink.shortCode}`}
              </p>
              <div className="flex gap-2">
                <Button
                  onClick={() => copyToClipboard(`${url}/${createdLink.shortCode}`)}
                  variant="outline"
                >
                  Copy URL
                </Button>
                <Button
                  onClick={() => {
                    if (createdLink.qrCode) {
                      const a = document.createElement("a");
                      a.href = createdLink.qrCode;
                      a.download = `qrcode-${createdLink.shortCode}.png`;
                      document.body.appendChild(a);
                      a.click();
                      document.body.removeChild(a);
                    }
                  }}
                >
                  Download QR Code
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
