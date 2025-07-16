"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BarChart3, Users, MousePointer, TrendingUp, LogOut } from "lucide-react"
import { AnalyticsLogin } from "@/components/analytics-login"

interface AnalyticsData {
  totalClicks: number
  uniqueVisitors: number
  topLinks: Array<{
    link_title: string
    link_group: string
    total_clicks: number
    unique_clicks: number
  }>
  recentActivity: Array<{
    date: string
    clicks: number
  }>
}

export default function AnalyticsPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is already authenticated
    checkAuthStatus()
  }, [])

  const checkAuthStatus = async () => {
    try {
      const response = await fetch("/api/analytics")
      if (response.ok) {
        const analyticsData = await response.json()
        setData(analyticsData)
        setIsAuthenticated(true)
      } else if (response.status === 401) {
        setIsAuthenticated(false)
      }
    } catch (error) {
      console.error("Failed to check auth status:", error)
      setIsAuthenticated(false)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await fetch("/api/auth", { method: "DELETE" })
      setIsAuthenticated(false)
      setData(null)
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  const handleLoginSuccess = () => {
    setIsAuthenticated(true)
    checkAuthStatus()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-400">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <AnalyticsLogin onSuccess={handleLoginSuccess} />
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
        <p className="text-slate-600 dark:text-slate-400">Failed to load analytics</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">Analytics Dashboard</h1>
            <p className="text-slate-600 dark:text-slate-400">Track your profile link performance</p>
          </div>
          <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2 bg-transparent">
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Total Clicks</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{data.totalClicks}</p>
                </div>
                <MousePointer className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Unique Visitors</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{data.uniqueVisitors}</p>
                </div>
                <Users className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Avg. Clicks/Visitor</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                    {data.uniqueVisitors > 0 ? (data.totalClicks / data.uniqueVisitors).toFixed(1) : "0"}
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Top Link</p>
                  <p className="text-lg font-bold text-slate-900 dark:text-slate-100 truncate">
                    {data.topLinks[0]?.link_title || "No data"}
                  </p>
                </div>
                <BarChart3 className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Top Links */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Top Performing Links</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.topLinks.map((link, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-blue-600 dark:text-blue-400">{index + 1}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 dark:text-slate-100">{link.link_title}</h3>
                      <Badge variant="secondary" className="text-xs">
                        {link.link_group}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-slate-900 dark:text-slate-100">{link.total_clicks}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{link.unique_clicks} unique</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity (Last 7 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {data.recentActivity.map((day, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded"
                >
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    {new Date(day.date).toLocaleDateString()}
                  </span>
                  <span className="font-semibold text-slate-900 dark:text-slate-100">{day.clicks} clicks</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
