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
import { Search, MoreHorizontal, CheckCircle, XCircle, Eye } from "lucide-react"
import { Badge } from "@/components/ui/badge"

// Mock data - in a real app, this would come from your database
const initialTestimonials = [
  {
    id: "1",
    name: "Sarah Johnson",
    position: "CEO at TechStart",
    content:
      "Najim delivered an exceptional website that exceeded our expectations. His attention to detail and ability to translate our vision into reality was impressive.",
    avatar: "/placeholder.svg?height=100&width=100",
    company: "TechStart",
    status: "approved",
    date: "2023-05-15",
  },
  {
    id: "2",
    name: "Michael Chen",
    position: "Marketing Director",
    content:
      "Working with Najim was a pleasure. He's not only technically skilled but also brings creative ideas to the table. Our conversion rates improved significantly after the redesign.",
    avatar: "/placeholder.svg?height=100&width=100",
    company: "Digital Solutions Inc.",
    status: "approved",
    date: "2023-06-22",
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    position: "Product Manager",
    content:
      "Najim's expertise in front-end development helped us create a user-friendly interface that our customers love. He's responsive, professional, and delivers on time.",
    avatar: "/placeholder.svg?height=100&width=100",
    company: "InnovateTech",
    status: "approved",
    date: "2023-07-10",
  },
  {
    id: "4",
    name: "David Wilson",
    position: "Startup Founder",
    content:
      "As a startup founder with limited technical knowledge, I needed someone who could guide me through the process of building my first web application. Najim was patient, knowledgeable, and helped me understand the technical decisions.",
    avatar: "/placeholder.svg?height=100&width=100",
    company: "LaunchPad Ventures",
    status: "pending",
    date: "2023-08-05",
  },
  {
    id: "5",
    name: "Jennifer Lee",
    position: "E-commerce Manager",
    content:
      "Our online store needed a complete overhaul to improve user experience and increase sales. Najim redesigned our e-commerce platform with a focus on the customer journey.",
    avatar: "/placeholder.svg?height=100&width=100",
    company: "StyleShop",
    status: "pending",
    date: "2023-09-12",
  },
]

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState(initialTestimonials)
  const [searchQuery, setSearchQuery] = useState("")
  const [viewDialogOpen, setViewDialogOpen] = useState(false)
  const [selectedTestimonial, setSelectedTestimonial] = useState(null)
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredTestimonials = testimonials.filter(
    (testimonial) =>
      (statusFilter === "all" || testimonial.status === statusFilter) &&
      (testimonial.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        testimonial.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        testimonial.content.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  const handleViewClick = (testimonial) => {
    setSelectedTestimonial(testimonial)
    setViewDialogOpen(true)
  }

  const handleStatusChange = (testimonialId, newStatus) => {
    setTestimonials(
      testimonials.map((testimonial) =>
        testimonial.id === testimonialId ? { ...testimonial, status: newStatus } : testimonial,
      ),
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Testimonials</h1>
      </div>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Manage Testimonials</CardTitle>
          <CardDescription className="text-gray-400">
            Review and approve testimonials from your clients.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search testimonials..."
                className="pl-8 bg-gray-700 border-gray-600 text-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={statusFilter === "all" ? "default" : "outline"}
                onClick={() => setStatusFilter("all")}
                className={statusFilter === "all" ? "bg-purple-600 hover:bg-purple-700" : ""}
              >
                All
              </Button>
              <Button
                variant={statusFilter === "pending" ? "default" : "outline"}
                onClick={() => setStatusFilter("pending")}
                className={statusFilter === "pending" ? "bg-yellow-600 hover:bg-yellow-700" : ""}
              >
                Pending
              </Button>
              <Button
                variant={statusFilter === "approved" ? "default" : "outline"}
                onClick={() => setStatusFilter("approved")}
                className={statusFilter === "approved" ? "bg-green-600 hover:bg-green-700" : ""}
              >
                Approved
              </Button>
              <Button
                variant={statusFilter === "rejected" ? "default" : "outline"}
                onClick={() => setStatusFilter("rejected")}
                className={statusFilter === "rejected" ? "bg-red-600 hover:bg-red-700" : ""}
              >
                Rejected
              </Button>
            </div>
          </div>

          <div className="rounded-md border border-gray-700">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-gray-700 border-gray-700">
                  <TableHead className="text-gray-400">Name</TableHead>
                  <TableHead className="text-gray-400">Company</TableHead>
                  <TableHead className="text-gray-400">Date</TableHead>
                  <TableHead className="text-gray-400">Status</TableHead>
                  <TableHead className="text-gray-400 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTestimonials.length === 0 ? (
                  <TableRow className="hover:bg-gray-700 border-gray-700">
                    <TableCell colSpan={5} className="text-center text-gray-400 py-6">
                      No testimonials found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredTestimonials.map((testimonial) => (
                    <TableRow key={testimonial.id} className="hover:bg-gray-700 border-gray-700">
                      <TableCell className="font-medium text-white">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
                            <img
                              src={testimonial.avatar || "/placeholder.svg"}
                              alt={testimonial.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <div>{testimonial.name}</div>
                            <div className="text-xs text-gray-400">{testimonial.position}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-400">{testimonial.company}</TableCell>
                      <TableCell className="text-gray-400">{testimonial.date}</TableCell>
                      <TableCell>
                        <Badge
                          className={`${
                            testimonial.status === "approved"
                              ? "bg-green-900/30 text-green-400"
                              : testimonial.status === "rejected"
                                ? "bg-red-900/30 text-red-400"
                                : "bg-yellow-900/30 text-yellow-400"
                          }`}
                        >
                          {testimonial.status.charAt(0).toUpperCase() + testimonial.status.slice(1)}
                        </Badge>
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
                              onClick={() => handleViewClick(testimonial)}
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            {testimonial.status === "pending" && (
                              <>
                                <DropdownMenuItem
                                  className="cursor-pointer hover:bg-gray-700"
                                  onClick={() => handleStatusChange(testimonial.id, "approved")}
                                >
                                  <CheckCircle className="mr-2 h-4 w-4 text-green-400" />
                                  Approve
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className="cursor-pointer hover:bg-gray-700"
                                  onClick={() => handleStatusChange(testimonial.id, "rejected")}
                                >
                                  <XCircle className="mr-2 h-4 w-4 text-red-400" />
                                  Reject
                                </DropdownMenuItem>
                              </>
                            )}
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

      {/* View Testimonial Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="bg-gray-800 border-gray-700 text-white">
          <DialogHeader>
            <DialogTitle>Testimonial Details</DialogTitle>
            <DialogDescription className="text-gray-400">Review the full testimonial content.</DialogDescription>
          </DialogHeader>
          {selectedTestimonial && (
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <img
                    src={selectedTestimonial.avatar || "/placeholder.svg"}
                    alt={selectedTestimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-white">{selectedTestimonial.name}</h3>
                  <p className="text-sm text-gray-400">{selectedTestimonial.position}</p>
                  <p className="text-xs text-gray-500">{selectedTestimonial.company}</p>
                </div>
              </div>
              <div className="bg-gray-700 p-4 rounded-md">
                <p className="text-gray-300 italic">"{selectedTestimonial.content}"</p>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-400">Submitted on: {selectedTestimonial.date}</div>
                <Badge
                  className={`${
                    selectedTestimonial.status === "approved"
                      ? "bg-green-900/30 text-green-400"
                      : selectedTestimonial.status === "rejected"
                        ? "bg-red-900/30 text-red-400"
                        : "bg-yellow-900/30 text-yellow-400"
                  }`}
                >
                  {selectedTestimonial.status.charAt(0).toUpperCase() + selectedTestimonial.status.slice(1)}
                </Badge>
              </div>
            </div>
          )}
          <DialogFooter>
            {selectedTestimonial && selectedTestimonial.status === "pending" && (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="border-red-500 text-red-400 hover:bg-red-900/20"
                  onClick={() => {
                    handleStatusChange(selectedTestimonial.id, "rejected")
                    setViewDialogOpen(false)
                  }}
                >
                  <XCircle className="mr-2 h-4 w-4" />
                  Reject
                </Button>
                <Button
                  className="bg-green-600 hover:bg-green-700"
                  onClick={() => {
                    handleStatusChange(selectedTestimonial.id, "approved")
                    setViewDialogOpen(false)
                  }}
                >
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Approve
                </Button>
              </div>
            )}
            {selectedTestimonial && selectedTestimonial.status !== "pending" && (
              <Button onClick={() => setViewDialogOpen(false)}>Close</Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
