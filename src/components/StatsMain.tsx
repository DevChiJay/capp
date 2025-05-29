"use client"

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Define types for the stats data
type Referrer = {
  source: string;
  count: number;
};

type Browser = {
  name: string;
  count: number;
};

type ClickData = {
  date: string;
  clicks: number;
};

type StatsData = {
  totalClicks: number;
  clicksByDay: ClickData[];
  referrers: Referrer[];
  browsers: Browser[];
};

type StatsMainProps = {
  stats: StatsData;
  filteredData: ClickData[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

export function StatsMain({ stats, filteredData, activeTab, setActiveTab }: StatsMainProps) {
  return (
    <div className="container mx-auto px-4">
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
  )
}
