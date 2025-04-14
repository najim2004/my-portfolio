import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import ScrollNavbar from "@/components/layout/scroll-navbar"
import Footer from "@/components/layout/footer"

// Mock data - in a real app, this would come from your database
const blogs = [
  {
    slug: "building-responsive-websites-with-tailwind-css",
    title: "Building Responsive Websites with Tailwind CSS",
    excerpt: "Learn how to create beautiful, responsive websites using Tailwind CSS, a utility-first CSS framework.",
    image: "/placeholder.svg?height=400&width=600",
    date: "May 15, 2023",
    readTime: "5 min read",
    author: "Najim",
    authorImage: "https://ik.imagekit.io/golcqzkpl/1735059192393-ujna0s_CWpLw83fa?updatedAt=1735059196909",
  },
  {
    slug: "future-of-web-development-with-nextjs",
    title: "The Future of Web Development with Next.js",
    excerpt: "Explore the features and benefits of Next.js, the React framework for production.",
    image: "/placeholder.svg?height=400&width=600",
    date: "June 22, 2023",
    readTime: "7 min read",
    author: "Najim",
    authorImage: "https://ik.imagekit.io/golcqzkpl/1735059192393-ujna0s_CWpLw83fa?updatedAt=1735059196909",
  },
  {
    slug: "optimizing-performance-in-react-applications",
    title: "Optimizing Performance in React Applications",
    excerpt: "Tips and tricks for improving the performance of your React applications.",
    image: "/placeholder.svg?height=400&width=600",
    date: "July 10, 2023",
    readTime: "6 min read",
    author: "Najim",
    authorImage: "https://ik.imagekit.io/golcqzkpl/1735059192393-ujna0s_CWpLw83fa?updatedAt=1735059196909",
  },
  {
    slug: "mastering-css-grid-layout",
    title: "Mastering CSS Grid Layout",
    excerpt: "A comprehensive guide to using CSS Grid for modern web layouts.",
    image: "/placeholder.svg?height=400&width=600",
    date: "August 5, 2023",
    readTime: "8 min read",
    author: "Najim",
    authorImage: "https://ik.imagekit.io/golcqzkpl/1735059192393-ujna0s_CWpLw83fa?updatedAt=1735059196909",
  },
  {
    slug: "introduction-to-typescript",
    title: "Introduction to TypeScript",
    excerpt: "Learn the basics of TypeScript and how it can improve your JavaScript development.",
    image: "/placeholder.svg?height=400&width=600",
    date: "September 12, 2023",
    readTime: "5 min read",
    author: "Najim",
    authorImage: "https://ik.imagekit.io/golcqzkpl/1735059192393-ujna0s_CWpLw83fa?updatedAt=1735059196909",
  },
  {
    slug: "state-management-in-react",
    title: "State Management in React",
    excerpt: "Comparing different state management solutions for React applications.",
    image: "/placeholder.svg?height=400&width=600",
    date: "October 18, 2023",
    readTime: "7 min read",
    author: "Najim",
    authorImage: "https://ik.imagekit.io/golcqzkpl/1735059192393-ujna0s_CWpLw83fa?updatedAt=1735059196909",
  },
]

export const metadata = {
  title: "Blog | Najim's Portfolio",
  description: "Read my latest articles on web development, design, and technology.",
}

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-gray-900 text-gray-100">
      <ScrollNavbar />

      <div className="pt-24 pb-16">
        <div className="container px-4 mx-auto">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
              My <span className="text-purple-500">Blog</span>
            </h1>
            <p className="text-gray-400 text-center max-w-2xl mx-auto mb-12">
              Thoughts, tutorials, and insights on web development, design, and technology.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog) => (
                <div
                  key={blog.slug}
                  className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-purple-500/50 transition-all group"
                >
                  <Link href={`/blog/${blog.slug}`} className="block relative overflow-hidden aspect-video">
                    <Image
                      src={blog.image || "/placeholder.svg"}
                      alt={blog.title}
                      width={600}
                      height={400}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                    />
                  </Link>

                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-400 mb-4">
                      <div className="flex items-center mr-4">
                        <Calendar className="w-4 h-4 mr-1" />
                        {blog.date}
                      </div>
                      <div className="flex items-center mr-4">
                        <Clock className="w-4 h-4 mr-1" />
                        {blog.readTime}
                      </div>
                      <div className="flex items-center">
                        <div className="w-5 h-5 rounded-full overflow-hidden mr-1">
                          <Image
                            src={blog.authorImage || "/placeholder.svg"}
                            alt={blog.author}
                            width={20}
                            height={20}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        {blog.author}
                      </div>
                    </div>

                    <Link href={`/blog/${blog.slug}`}>
                      <h3 className="text-xl font-bold mb-2 text-purple-400 hover:text-purple-300 transition-colors">
                        {blog.title}
                      </h3>
                    </Link>
                    <p className="text-gray-300 mb-4">{blog.excerpt}</p>

                    <Button variant="link" className="p-0 text-purple-400 hover:text-purple-300 group" asChild>
                      <Link href={`/blog/${blog.slug}`}>
                        Read More
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
