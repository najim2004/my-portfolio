"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar, Clock, User } from "lucide-react"

const blogs = [
  {
    title: "Building Responsive Websites with Tailwind CSS",
    excerpt: "Learn how to create beautiful, responsive websites using Tailwind CSS, a utility-first CSS framework.",
    image: "/placeholder.svg?height=400&width=600",
    date: "May 15, 2023",
    readTime: "5 min read",
    author: "Najim",
    slug: "building-responsive-websites-with-tailwind-css",
  },
  {
    title: "The Future of Web Development with Next.js",
    excerpt: "Explore the features and benefits of Next.js, the React framework for production.",
    image: "/placeholder.svg?height=400&width=600",
    date: "June 22, 2023",
    readTime: "7 min read",
    author: "Najim",
    slug: "future-of-web-development-with-nextjs",
  },
  {
    title: "Optimizing Performance in React Applications",
    excerpt: "Tips and tricks for improving the performance of your React applications.",
    image: "/placeholder.svg?height=400&width=600",
    date: "July 10, 2023",
    readTime: "6 min read",
    author: "Najim",
    slug: "optimizing-performance-in-react-applications",
  },
]

export default function Blogs() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section id="blogs" className="py-20 bg-gray-800">
      <div className="container px-4 mx-auto">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-center">
            Latest <span className="text-purple-500">Blogs</span>
          </h2>
          <div className="w-20 h-1 bg-purple-500 mx-auto mb-10"></div>

          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {blogs.map((blog, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{
                  y: -10,
                  boxShadow: "0 20px 25px -5px rgba(124, 58, 237, 0.1), 0 10px 10px -5px rgba(124, 58, 237, 0.04)",
                }}
                className="bg-gray-900 rounded-xl overflow-hidden border border-gray-700 hover:border-purple-500/50 transition-all group"
              >
                <Link href={`/blog/${blog.slug}`}>
                  <div className="relative overflow-hidden aspect-video">
                    <Image
                      src={blog.image || "/placeholder.svg"}
                      alt={blog.title}
                      width={600}
                      height={400}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
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
                      <User className="w-4 h-4 mr-1" />
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
              </motion.div>
            ))}
          </motion.div>

          <div className="flex justify-center mt-12">
            <Button asChild className="group">
              <Link href="/blog">
                View All Blogs
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
