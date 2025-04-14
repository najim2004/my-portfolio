"use client"

// Mock data - in a real app, this would come from your database
const blogs = [
  {
    slug: "building-responsive-websites-with-tailwind-css",
    title: "Building Responsive Websites with Tailwind CSS",
    excerpt: "Learn how to create beautiful, responsive websites using Tailwind CSS, a utility-first CSS framework.",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    slug: "future-of-web-development-with-nextjs",
    title: "The Future of Web Development with Next.js",
    excerpt: "Explore the features and benefits of Next.js, the React framework for production.",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    slug: "optimizing-performance-in-react-applications",
    title: "Optimizing Performance in React Applications",
    excerpt: "Tips and tricks for improving the performance of your React applications.",
    image: "/placeholder.svg?height=400&width=600",
  },
]

export default function BlogPageClient({ params }) {
  return <div>Blog Page Client {params.slug}</div>
}
