"use client"

import { useState } from "react"
import Link from "next/link"
import { format } from "date-fns"
import { Copy, BarChart, Pencil, Trash2, QrCode } from "lucide-react"
import { useLinks, useDeleteLink } from "@/hooks/use-links"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from "@/components/ui/use-toast"
import { Skeleton } from "@/components/ui/skeleton"
import type { ShortLink } from "@/lib/types"

const url = process.env.NEXT_PUBLIC_BASE_URL

export function LinksTable() {
  const [page, setPage] = useState(1)
  const [selectedLink, setSelectedLink] = useState<ShortLink | null>(null)
  const [qrDialogOpen, setQrDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  const { data, isLoading, isError } = useLinks(page)
  const deleteLink = useDeleteLink()

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      description: "Link copied to clipboard",
    })
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteLink.mutateAsync(id)
      toast({
        description: "Link deleted successfully",
      })
      setDeleteDialogOpen(false)
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete link",
      })
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-full" />
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-16 w-full" />
        ))}
      </div>
    )
  }

  if (isError) {
    return (
      <div className="rounded-md bg-red-50 p-4 text-red-800">
        <p>Failed to load links. Please try again later.</p>
      </div>
    )
  }

  if (!data?.data) {
    return (
      <div className="rounded-md bg-gray-50 p-8 text-center">
        <h3 className="text-lg font-medium">No links yet</h3>
        <p className="mt-2 text-gray-600">Shorten your first URL above to get started.</p>
      </div>
    )
  }

  return (
    <div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Original URL</TableHead>
              <TableHead>Short Link</TableHead>
              <TableHead>Expiry</TableHead>
              <TableHead>Clicks</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.data.map((link) => (
              <TableRow key={link.shortCode}>
                <TableCell className="max-w-[200px] truncate font-medium" title={link.originalUrl}>
                  {link.originalUrl}
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <span className="text-blue-600">
                      {`${url}/${link.shortCode}`}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => copyToClipboard(`${url}/${link.shortCode}`)}
                      title="Copy link"
                    >
                      <Copy className="h-4 w-4" />
                      <span className="sr-only">Copy</span>
                    </Button>
                  </div>
                </TableCell>
                <TableCell>{format(new Date(link.expiresAt), "MMM d, yyyy")}</TableCell>
                <TableCell>{link.clicks}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-1">
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={`/dashboard/stats/${link.id}`}>
                        <BarChart className="h-4 w-4" />
                        <span className="sr-only">Stats</span>
                      </Link>
                    </Button>
                    <Dialog
                      open={qrDialogOpen && selectedLink?.id === link.id}
                      onOpenChange={(open) => {
                        setQrDialogOpen(open)
                        if (!open) setSelectedLink(null)
                      }}
                    >
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setSelectedLink(link)
                            setQrDialogOpen(true)
                          }}
                        >
                          <QrCode className="h-4 w-4" />
                          <span className="sr-only">QR Code</span>
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>QR Code</DialogTitle>
                          <DialogDescription>Scan this QR code to access your shortened URL.</DialogDescription>
                        </DialogHeader>
                        {isLoading ? (
                          <Skeleton className="h-48 w-48" />
                        ) : (
                          selectedLink && (
                            <div className="flex flex-col items-center justify-center space-y-4 p-4">
                              <img
                                src={selectedLink.qrCode}
                                alt="QR Code"
                                className="h-48 w-48"
                              />
                              <p className="text-center text-sm">
                                {`${url}/${selectedLink.shortCode}`}
                              </p>
                              <div className="flex gap-2">
                                <Button
                                  onClick={() => copyToClipboard(`${url}/${selectedLink.shortCode}`)}
                                  variant="outline"
                                >
                                  Copy URL
                                </Button>
                                <Button
                                  onClick={() => {
                                    if (selectedLink.qrCode) {
                                      const a = document.createElement("a");
                                      a.href = selectedLink.qrCode;
                                      a.download = `qrcode-${selectedLink?.shortCode}.png`;
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
                          )
                        )}
                      </DialogContent>
                    </Dialog>
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={`/dashboard/edit/${link.id}`}>
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Link>
                    </Button>
                    <AlertDialog
                      open={deleteDialogOpen && selectedLink?.id === link.id}
                      onOpenChange={(open) => {
                        setDeleteDialogOpen(open)
                        if (!open) setSelectedLink(null)
                      }}
                    >
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setSelectedLink(link)
                            setDeleteDialogOpen(true)
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This will permanently delete this shortened URL. This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => selectedLink && handleDelete(selectedLink.id)}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            {deleteLink.isPending ? "Deleting..." : "Delete"}
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {data.count && data.count > 10 && (
        <div className="mt-4 flex items-center justify-center space-x-2">
          <Button variant="outline" size="sm" onClick={() => setPage((p) => Math.max(p - 1, 1))} disabled={page === 1}>
            Previous
          </Button>
          <span className="text-sm text-gray-600">
            Page {page} of {Math.ceil(data.count / 10)}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => p + 1)}
            disabled={page >= Math.ceil(data.count / 10)}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  )
}
