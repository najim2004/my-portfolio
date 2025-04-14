"use client";

import { useState, useEffect, JSX } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Briefcase,
  FileText,
  Users,
  Eye,
  ThumbsUp,
  MessageSquare,
  LucideIcon,
} from "lucide-react";

// Types
interface DashboardStat {
  name: string;
  value: string | number;
  icon: LucideIcon;
  color: string;
}

interface Activity {
  id: number;
  type: "project" | "blog" | "testimonial";
  action: "added" | "updated" | "approved";
  name: string;
  date: string;
}

// Mock data with proper typing
const stats: DashboardStat[] = [
  {
    name: "Total Projects",
    value: 24,
    icon: Briefcase,
    color: "bg-purple-500",
  },
  { name: "Blog Posts", value: 18, icon: FileText, color: "bg-blue-500" },
  { name: "Testimonials", value: 42, icon: Users, color: "bg-green-500" },
  { name: "Total Views", value: "12.5K", icon: Eye, color: "bg-yellow-500" },
  { name: "Likes", value: 842, icon: ThumbsUp, color: "bg-red-500" },
  { name: "Comments", value: 156, icon: MessageSquare, color: "bg-cyan-500" },
];

const recentActivities: Activity[] = [
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
];

export default function AdminDashboard(): JSX.Element {
  const [greeting, setGreeting] = useState<string>("");

  useEffect(() => {
    const getGreeting = (): string => {
      const hour = new Date().getHours();
      if (hour < 12) return "Good morning";
      if (hour < 18) return "Good afternoon";
      return "Good evening";
    };

    setGreeting(getGreeting());
  }, []);

  const getActivityIcon = (type: Activity["type"]): JSX.Element => {
    switch (type) {
      case "project":
        return <Briefcase className="h-4 w-4 text-white" />;
      case "blog":
        return <FileText className="h-4 w-4 text-white" />;
      case "testimonial":
        return <Users className="h-4 w-4 text-white" />;
    }
  };

  const getActivityColor = (type: Activity["type"]): string => {
    switch (type) {
      case "project":
        return "bg-purple-500";
      case "blog":
        return "bg-blue-500";
      case "testimonial":
        return "bg-green-500";
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">{greeting}, Admin</h1>
        <p className="text-gray-400 mt-1" role="status">
          Here&#39;s what&#39;s happening with your portfolio today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <Card
            key={`stat-${stat.name}-${index}`}
            className="bg-gray-800 border-gray-700"
          >
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className={`p-3 rounded-full ${stat.color} mr-4`}>
                  <stat.icon
                    className="h-6 w-6 text-white"
                    aria-hidden="true"
                  />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-400">
                    {stat.name}
                  </p>
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
          <CardDescription className="text-gray-400">
            Your latest actions and updates
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {recentActivities.map((activity) => (
              <div key={`activity-${activity.id}`} className="flex items-start">
                <div
                  className={`p-2 rounded-full mr-4 ${getActivityColor(
                    activity.type
                  )}`}
                >
                  {getActivityIcon(activity.type)}
                </div>
                <div>
                  <p className="text-white">
                    <span className="font-medium">You {activity.action}</span>{" "}
                    {activity.type}{" "}
                    <span className="font-medium">{activity.name}</span>
                  </p>
                  <time
                    dateTime={new Date().toISOString()}
                    className="text-sm text-gray-400"
                  >
                    {activity.date}
                  </time>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
