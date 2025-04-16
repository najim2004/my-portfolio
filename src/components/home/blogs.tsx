"use client";

import { JSX, useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Clock, User } from "lucide-react";

// Types
interface Blog {
  title: string;
  excerpt: string;
  image: string;
  date: string;
  readTime: string;
  author: string;
  slug: string;
}

// Animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6 },
  },
};

// Blog data
const blogs: Blog[] = [
  {
    title: "Building Responsive Websites with Tailwind CSS",
    excerpt:
      "Learn how to create beautiful, responsive websites using Tailwind CSS, a utility-first CSS framework.",
    image: "/placeholder.svg?height=400&width=600",
    date: "May 15, 2023",
    readTime: "5 min read",
    author: "Najim",
    slug: "building-responsive-websites-with-tailwind-css ",
  },
  {
    title: "The Future of Web Development with Next.js",
    excerpt:
      "Explore the features and benefits of Next.js, the React framework for production.",
    image: "/placeholder.svg?height=400&width=600",
    date: "June 22, 2023",
    readTime: "7 min read",
    author: "Najim",
    slug: "future-of-web-development-with-nextjs",
  },
  {
    title: "Optimizing Performance in React Applications",
    excerpt:
      "Tips and tricks for improving the performance of your React applications.",
    image: "/placeholder.svg?height=400&width=600",
    date: "July 10, 2023",
    readTime: "6 min read",
    author: "Najim",
    slug: "optimizing-performance-in-react-applications",
  },
];

export default function Blogs(): JSX.Element {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section id="blogs" className="py-20 bg-gray-800">
      <div className="container px-4 mx-auto">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-center">
            Latest <span className="text-purple-500">Blogs</span>
          </h2>
          <div className="w-20 h-1 bg-purple-500 mx-auto mb-10" />

          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {blogs.map((blog, index) => (
              <motion.div
                key={`blog-${blog.slug}-${index}`}
                variants={itemVariants}
                whileHover={{
                  y: -10,
                  boxShadow:
                    "0 20px 25px -5px rgba(124, 58, 237, 0.1), 0 10px 10px -5px rgba(124, 58, 237, 0.04)",
                }}
                className="bg-gray-900 rounded-xl overflow-hidden border border-gray-700 hover:border-purple-500/50 transition-all group"
              >
                <Link href={`/blog/${blog.slug}`} prefetch>
                  <div className="relative overflow-hidden aspect-video">
                    <Image
                      src={blog.image}
                      alt={`Cover image for ${blog.title}`}
                      width={600}
                      height={400}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                      priority={index < 3}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                </Link>

                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-400 mb-4">
                    <div
                      className="flex items-center mr-4"
                      title="Publication date"
                    >
                      <Calendar className="w-4 h-4 mr-1" aria-hidden="true" />
                      <time dateTime={new Date(blog.date).toISOString()}>
                        {blog.date}
                      </time>
                    </div>
                    <div className="flex items-center mr-4" title="Read time">
                      <Clock className="w-4 h-4 mr-1" aria-hidden="true" />
                      <span>{blog.readTime}</span>
                    </div>
                    <div className="flex items-center" title="Author">
                      <User className="w-4 h-4 mr-1" aria-hidden="true" />
                      <span>{blog.author}</span>
                    </div>
                  </div>

                  <Link href={`/blog/${blog.slug}`} prefetch>
                    <h3 className="text-xl font-bold mb-2 text-purple-400 hover:text-purple-300 transition-colors">
                      {blog.title}
                    </h3>
                  </Link>
                  <p className="text-gray-300 mb-4">{blog.excerpt}</p>

                  <Button
                    variant="link"
                    className="p-0 text-purple-400 hover:text-purple-300 group"
                    asChild
                  >
                    <Link href={`/blog/${blog.slug}`} prefetch>
                      Read More
                      <ArrowRight
                        className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform"
                        aria-hidden="true"
                      />
                    </Link>
                  </Button>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="flex justify-center mt-12">
            <Button asChild className="group">
              <Link href="/blog" prefetch>
                View All Blogs
                <ArrowRight
                  className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform"
                  aria-hidden="true"
                />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
