"use client";

import { JSX, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

// Types
interface Blog {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  content?: string;
  date?: string;
  readTime?: string;
  author?: string;
  authorImage?: string;
}

interface BlogPageClientProps {
  params: {
    slug: string;
  };
}

// Mock data - in a real app, this would come from your database
const blogs: Blog[] = [
  {
    slug: "building-responsive-websites-with-tailwind-css",
    title: "Building Responsive Websites with Tailwind CSS",
    excerpt:
      "Learn how to create beautiful, responsive websites using Tailwind CSS, a utility-first CSS framework.",
    image: "/placeholder.svg?height=400&width=600",
    date: "2024-04-15",
    readTime: "5 min read",
    author: "Najim",
    authorImage: "/avatar.jpg",
    content: "// Your blog content here...",
  },
  {
    slug: "future-of-web-development-with-nextjs",
    title: "The Future of Web Development with Next.js",
    excerpt:
      "Explore the features and benefits of Next.js, the React framework for production.",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    slug: "optimizing-performance-in-react-applications",
    title: "Optimizing Performance in React Applications",
    excerpt:
      "Tips and tricks for improving the performance of your React applications.",
    image: "/placeholder.svg?height=400&width=600",
  },
];

export default function BlogPageClient({
  params,
}: BlogPageClientProps): JSX.Element {
  const [blog, setBlog] = useState<Blog | null>(null);

  useEffect(() => {
    // In a real app, this would be an API call
    const currentBlog = blogs.find((b) => b.slug === params.slug);
    setBlog(currentBlog || null);
  }, [params.slug]);

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-400">Blog post not found</p>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto px-4 py-12">
      <Button variant="ghost" className="mb-8 hover:bg-purple-500/10" asChild>
        <Link href="/blog">
          <ArrowLeft className="w-4 h-4 mr-2" aria-hidden="true" />
          Back to Blog
        </Link>
      </Button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-6">{blog.title}</h1>

        <div className="flex items-center text-sm text-gray-400 mb-8">
          {blog.date && (
            <time className="flex items-center mr-4" dateTime={blog.date}>
              <Calendar className="w-4 h-4 mr-1" aria-hidden="true" />
              {new Date(blog.date).toLocaleDateString()}
            </time>
          )}
          {blog.readTime && (
            <div className="flex items-center mr-4">
              <Clock className="w-4 h-4 mr-1" aria-hidden="true" />
              {blog.readTime}
            </div>
          )}
        </div>

        <div className="relative aspect-video mb-8 rounded-xl overflow-hidden">
          <Image
            src={blog.image}
            alt={`Cover image for ${blog.title}`}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1200px) 100vw, 1200px"
          />
        </div>

        <div className="prose prose-invert prose-purple max-w-none">
          {blog.content}
        </div>
      </motion.div>
    </article>
  );
}
