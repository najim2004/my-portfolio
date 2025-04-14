"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Briefcase, FileText, Users, Eye, ThumbsUp, MessageSquare } from "lucide-react"

// Mock data for dashboard stats
const stats = [
  { name: "Total Projects", value: 24, icon: Briefcase, color: "bg-purple-500" },
  { name: "Blog Posts", value: 18, icon: FileText, color: "bg-blue-500" },
  { name: "Testimonials", value: 42, icon: Users, color: "bg-green-500" },
  { name: "Total Views", value: "12.5K", icon: Eye, color: "bg-yellow-500" },
  { name: "Likes", value: 842, icon: ThumbsUp, color: "bg-red-500" },
  { name: "Comments", value: 156, icon: MessageSquare, color: "bg-cyan-500" },
]

// Mock data for recent activities
const recentActivities = [
  {
    id: 1,
    type: "project",
    action: "added",
    name: "E-Commerce Platform",
    date: "2 hours ago",
  },
  {
    id: 2,
    type: "blog",
    action: "updated",
    name: "The Future of Web Development",
    date: "5 hours ago",
  },
  {
    id: 3,
    type: "testimonial",
    action: "approved",
    name: "Testimonial from Sarah Johnson",
    date: "1 day ago",
  },
  {
    id: 4,
    type: "project",
    action: "updated",
    name: "Admin Dashboard",
    date: "2 days ago",
  },
  {
    id: 5,
    type: "blog",
    action: "added",
    name: "Optimizing Performance in React Applications",
    date: "3 days ago",
  },
]

export default function AdminDashboard() {
  const [greeting, setGreeting] = useState("")

  useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 12) setGreeting("Good morning")
    else if (hour < 18) setGreeting("Good afternoon")
    else setGreeting("Good evening")
  }, [])

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">{greeting}, Admin</h1>
        <p className="text-gray-400 mt-1">Here's what's happening with your portfolio today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className={`p-3 rounded-full ${stat.color} mr-4`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-400">{stat.name}</p>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Recent Activity</CardTitle>
          <CardDescription className="text-gray-400">Your latest actions and updates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start">
                <div
                  className={`p-2 rounded-full mr-4 ${
                    activity.type === "project"
                      ? "bg-purple-500"
                      : activity.type === "blog"
                        ? "bg-blue-500"
                        : "bg-green-500"
                  }`}
                >
                  {activity.type === "project" ? (
                    <Briefcase className="h-4 w-4 text-white" />
                  ) : activity.type === "blog" ? (
                    <FileText className="h-4 w-4 text-white" />
                  ) : (
                    <Users className="h-4 w-4 text-white" />
                  )}
                </div>
                <div>
                  <p className="text-white">
                    <span className="font-medium">You {activity.action}</span> {activity.type}{" "}
                    <span className="font-medium">{activity.name}</span>
                  </p>
                  <p className="text-sm text-gray-400">{activity.date}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
