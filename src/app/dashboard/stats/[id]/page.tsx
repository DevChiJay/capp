"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { useLinkStats } from "@/hooks/use-links"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { StatsMain } from "@/components/StatsMain"

export default function StatsPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string
  const { data: stats, isLoading, isError } = useLinkStats(id)
  const [activeTab, setActiveTab] = useState("day")

  // Filter data based on selected period
  const getFilteredData = () => {
    if (!stats?.clicksByDay) return [];
    
    const now = new Date();
    const filterDate = new Date();
    
    switch (activeTab) {
      case 'day':
        filterDate.setDate(now.getDate() - 1);
        break;
      case 'week':
        filterDate.setDate(now.getDate() - 7);
        break;
      case 'month':
        filterDate.setMonth(now.getMonth() - 1);
        break;
      case 'all':
      default:
        return stats.clicksByDay;
    }
    
    return stats.clicksByDay.filter(item => new Date(item.date) >= filterDate);
  };

  const filteredData = stats ? getFilteredData() : [];

  if (isLoading) {
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
              <Skeleton className="h-64 w-full" />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (isError || !stats) {
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
              <h1 className="text-2xl font-bold">Link Statistics</h1>
            </div>
            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <div className="rounded-md bg-red-50 p-4 text-red-800">
                <p>Failed to load statistics. Please try again later.</p>
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
            <h1 className="text-2xl font-bold">Link Statistics</h1>
          </div>
          
          <StatsMain 
            stats={stats} 
            filteredData={filteredData} 
            activeTab={activeTab} 
            setActiveTab={setActiveTab}
          />
        </div>
      </main>
      <Footer />
    </div>
  )
}
