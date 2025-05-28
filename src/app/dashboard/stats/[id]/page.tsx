"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { useLinkStats } from "@/hooks/use-links"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts"

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

          <div className="mb-6 grid gap-4 md:grid-cols-4">
            <div className="rounded-lg border bg-white p-4 shadow-sm">
              <p className="text-sm text-gray-500">Total Clicks</p>
              <p className="text-3xl font-bold">{stats.totalClicks}</p>
            </div>
            {/* Add more stat cards here if needed */}
          </div>

          <div className="rounded-lg border bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-semibold">Click Analytics</h2>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList>
                  <TabsTrigger value="day">Day</TabsTrigger>
                  <TabsTrigger value="week">Week</TabsTrigger>
                  <TabsTrigger value="month">Month</TabsTrigger>
                  <TabsTrigger value="all">All Time</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <div className="h-64 w-full">
              {filteredData && filteredData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={filteredData}>
                    <XAxis 
                      dataKey="date" 
                      tickFormatter={(date) => {
                        const d = new Date(date);
                        return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                      }}
                    />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="clicks" fill="#6366f1" />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex h-full items-center justify-center rounded-md bg-gray-100">
                  <p className="text-gray-500">No click data available for this period</p>
                </div>
              )}
            </div>

            <div className="mt-8 grid gap-8 md:grid-cols-2">
              <div>
                <h3 className="mb-4 text-lg font-medium">Top Referrers</h3>
                <div className="space-y-2">
                  {stats.referrers.length > 0 ? (
                    stats.referrers.map((referrer, index) => (
                      <div key={index} className="flex items-center justify-between rounded-md border p-3">
                        <span>{referrer.source || "Direct"}</span>
                        <span className="font-medium">{referrer.count}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">No referrer data available</p>
                  )}
                </div>
              </div>

              <div>
                <h3 className="mb-4 text-lg font-medium">Browsers</h3>
                <div className="space-y-2">
                  {stats.browsers.length > 0 ? (
                    stats.browsers.map((browser, index) => (
                      <div key={index} className="flex items-center justify-between rounded-md border p-3">
                        <span>{browser.name}</span>
                        <span className="font-medium">{browser.count}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">No browser data available</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
