"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Plus, Search, MoreHorizontal, Pencil, Trash, ExternalLink } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

// Mock data - in a real app, this would come from your database
const initialBlogs = [
  {
    id: "1",
    slug: "building-responsive-websites-with-tailwind-css",
    title: "Building Responsive Websites with Tailwind CSS",
    excerpt: "Learn how to create beautiful, responsive websites using Tailwind CSS, a utility-first CSS framework.",
    image: "/placeholder.svg?height=400&width=600",
    date: "May 15, 2023",
    readTime: "5 min read",
    author: "Najim",
    authorImage: "/placeholder.svg?height=100&width=100",
    published: true,
  },
  {
    id: "2",
    slug: "future-of-web-development-with-nextjs",
    title: "The Future of Web Development with Next.js",
    excerpt: "Explore the features and benefits of Next.js, the React framework for production.",
    image: "/placeholder.svg?height=400&width=600",
    date: "June 22, 2023",
    readTime: "7 min read",
    author: "Najim",
    authorImage: "/placeholder.svg?height=100&width=100",
    published: true,
  },
  {
    id: "3",
    slug: "optimizing-performance-in-react-applications",
    title: "Optimizing Performance in React Applications",
    excerpt: "Tips and tricks for improving the performance of your React applications.",
    image: "/placeholder.svg?height=400&width=600",
    date: "July 10, 2023",
    readTime: "6 min read",
    author: "Najim",
    authorImage: "/placeholder.svg?height=100&width=100",
    published: true,
  },
  {
    id: "4",
    slug: "mastering-css-grid-layout",
    title: "Mastering CSS Grid Layout",
    excerpt: "A comprehensive guide to using CSS Grid for modern web layouts.",
    image: "/placeholder.svg?height=400&width=600",
    date: "August 5, 2023",
    readTime: "8 min read",
    author: "Najim",
    authorImage: "/placeholder.svg?height=100&width=100",
    published: false,
  },
]

export default function BlogsPage() {
  const [blogs, setBlogs] = useState(initialBlogs)
  const [searchQuery, setSearchQuery] = useState("")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [blogToDelete, setBlogToDelete] = useState(null)
  const router = useRouter()

  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleDeleteClick = (blog) => {
    setBlogToDelete(blog)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (blogToDelete) {
      setBlogs(blogs.filter((blog) => blog.id !== blogToDelete.id))
      setDeleteDialogOpen(false)
      setBlogToDelete(null)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Blog Posts</h1>
        <Button onClick={() => router.push("/admin/dashboard/blog/new")}>
          <Plus className="mr-2 h-4 w-4" /> Add New Post
        </Button>
      </div>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Manage Blog Posts</CardTitle>
          <CardDescription className="text-gray-400">View and manage all your blog posts.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search blog posts..."
                className="pl-8 bg-gray-700 border-gray-600 text-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="rounded-md border border-gray-700">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-gray-700 border-gray-700">
                  <TableHead className="text-gray-400">Title</TableHead>
                  <TableHead className="text-gray-400">Date</TableHead>
                  <TableHead className="text-gray-400">Status</TableHead>
                  <TableHead className="text-gray-400 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBlogs.length === 0 ? (
                  <TableRow className="hover:bg-gray-700 border-gray-700">
                    <TableCell colSpan={4} className="text-center text-gray-400 py-6">
                      No blog posts found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredBlogs.map((blog) => (
                    <TableRow key={blog.id} className="hover:bg-gray-700 border-gray-700">
                      <TableCell className="font-medium text-white">{blog.title}</TableCell>
                      <TableCell className="text-gray-400">{blog.date}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            blog.published ? "bg-green-900/30 text-green-400" : "bg-yellow-900/30 text-yellow-400"
                          }`}
                        >
                          {blog.published ? "Published" : "Draft"}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-gray-800 border-gray-700 text-white">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator className="bg-gray-700" />
                            <DropdownMenuItem
                              className="cursor-pointer hover:bg-gray-700"
                              onClick={() => router.push(`/admin/dashboard/blog/${blog.id}`)}
                            >
                              <Pencil className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="cursor-pointer hover:bg-gray-700"
                              onClick={() => handleDeleteClick(blog)}
                            >
                              <Trash className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="bg-gray-700" />
                            <DropdownMenuItem className="cursor-pointer hover:bg-gray-700" asChild>
                              <Link href={`/blog/${blog.slug}`} target="_blank">
                                <ExternalLink className="mr-2 h-4 w-4" />
                                View Live
                              </Link>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="bg-gray-800 border-gray-700 text-white">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription className="text-gray-400">
              Are you sure you want to delete the blog post &quot;
              {blogToDelete?.title}&quot;? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
