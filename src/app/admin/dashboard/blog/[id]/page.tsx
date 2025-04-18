"use client";

import { useState, useEffect, ChangeEvent, FormEvent, JSX } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Blog } from "../page";

// Dynamically import the rich text editor to avoid SSR issues
const RichTextEditor = dynamic(
  () => import("@/components/ui/rich-text-editor"),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-[400px] bg-gray-700 rounded-md animate-pulse" />
    ),
  }
);
const initialBlogs = [
  {
    id: "1",
    slug: "building-responsive-websites-with-tailwind-css",
    title: "Building Responsive Websites with Tailwind CSS",
    excerpt:
      "Learn how to create beautiful, responsive websites using Tailwind CSS, a utility-first CSS framework.",
    content: `
      <h2>Introduction to Tailwind CSS</h2>
      <p>Tailwind CSS is a utility-first CSS framework that allows you to build modern websites without ever leaving your HTML. Unlike other CSS frameworks that provide pre-designed components, Tailwind gives you low-level utility classes that let you build completely custom designs.</p>
      
      <h2>Getting Started</h2>
      <p>To get started with Tailwind CSS, you can install it via npm:</p>
      <pre><code>npm install tailwindcss</code></pre>
      
      <p>Then, create a configuration file:</p>
      <pre><code>npx tailwindcss init</code></pre>
      
      <h2>Building Responsive Layouts</h2>
      <p>Tailwind makes it easy to build responsive layouts with its built-in breakpoint system. You can use prefixes like sm:, md:, lg:, and xl: to apply styles at different screen sizes.</p>
      
      <h2>Customization</h2>
      <p>One of the biggest advantages of Tailwind is its customizability. You can easily modify the default theme in your tailwind.config.js file to match your design requirements.</p>
      
      <h2>Conclusion</h2>
      <p>Tailwind CSS provides a different approach to styling your websites. By using utility classes, you can build custom designs faster and with more consistency. Give it a try on your next project!</p>
    `,
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
    excerpt:
      "Explore the features and benefits of Next.js, the React framework for production.",
    content: `
      <h2>What is Next.js?</h2>
      <p>Next.js is a React framework that enables server-side rendering, static site generation, and other advanced features to improve performance and developer experience.</p>
      
      <h2>Key Features</h2>
      <ul>
        <li>Server-side rendering</li>
        <li>Static site generation</li>
        <li>Incremental static regeneration</li>
        <li>API routes</li>
        <li>File-based routing</li>
        <li>Built-in CSS and Sass support</li>
      </ul>
      
      <h2>Performance Benefits</h2>
      <p>Next.js offers significant performance improvements over client-side rendered applications. By rendering pages on the server, Next.js can deliver fully rendered HTML to the client, reducing the time to first contentful paint.</p>
      
      <h2>Developer Experience</h2>
      <p>Next.js provides an excellent developer experience with features like fast refresh, which updates your application in real-time as you make changes, without losing component state.</p>
      
      <h2>Conclusion</h2>
      <p>Next.js is shaping the future of web development by providing a powerful framework that combines the best of static and server rendering. Whether you're building a blog, e-commerce site, or complex web application, Next.js offers the tools you need to create fast, SEO-friendly, and developer-friendly applications.</p>
    `,
    image: "/placeholder.svg?height=400&width=600",
    date: "June 22, 2023",
    readTime: "7 min read",
    author: "Najim",
    authorImage: "/placeholder.svg?height=100&width=100",
    published: true,
  },
];

const emptyBlog: Blog = {
  id: "",
  slug: "",
  title: "",
  excerpt: "",
  content: "",
  image: "/placeholder.svg?height=400&width=600",
  date: new Date().toISOString().split("T")[0],
  readTime: "5 min read",
  author: "Najim",
  authorImage: "/placeholder.svg?height=100&width=100",
  published: false,
};

export default function BlogForm(): JSX.Element {
  const router = useRouter();
  const isNew = useParams().id === "new";
  const blogId = useParams().id as string;

  const [blog, setBlog] = useState<Blog>(emptyBlog);
  const [loading, setLoading] = useState<boolean>(!isNew);

  useEffect(() => {
    if (!isNew) {
      // In a real app, this would be an API call
      const foundBlog = initialBlogs.find((b) => b.id === blogId);
      if (foundBlog) {
        setBlog(foundBlog);
      } else {
        router.push("/404");
      }
      setLoading(false);
    }
  }, [isNew, blogId, router]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setBlog((prev) => ({ ...prev, [name]: value }));
  };

  const handleRichTextChange = (content: string): void => {
    setBlog((prev) => ({ ...prev, content }));
  };

  const handlePublishedChange = (checked: boolean): void => {
    setBlog((prev) => ({ ...prev, published: checked }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setLoading(true);

    try {
      // In a real app, you would make an API call here
      // const savedBlog = await saveBlog(blog)
      console.log("Saving blog:", blog);
      router.push("/admin/dashboard/blog");
    } catch (error) {
      console.error("Error saving blog:", error);
      // Handle error (show toast notification, etc.)
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div
          className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"
          role="status"
          aria-label="Loading"
        >
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Button variant="ghost" asChild className="mr-4">
          <Link href="/admin/dashboard/blog">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog Posts
          </Link>
        </Button>
        <h1 className="text-3xl font-bold text-white">
          {isNew ? "Add New Blog Post" : "Edit Blog Post"}
        </h1>
      </div>

      <form onSubmit={handleSubmit}>
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Blog Post Details</CardTitle>
            <CardDescription className="text-gray-400">
              Fill in the details of your blog post.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-white">
                  Blog Title
                </Label>
                <Input
                  id="title"
                  name="title"
                  value={blog.title}
                  onChange={handleChange}
                  placeholder="E.g., Building Responsive Websites with Tailwind CSS"
                  className="bg-gray-700 border-gray-600 text-white"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="slug" className="text-white">
                  Slug (URL-friendly name)
                </Label>
                <Input
                  id="slug"
                  name="slug"
                  value={blog.slug}
                  onChange={handleChange}
                  placeholder="building-responsive-websites-with-tailwind-css"
                  className="bg-gray-700 border-gray-600 text-white"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="excerpt" className="text-white">
                Excerpt
              </Label>
              <Textarea
                id="excerpt"
                name="excerpt"
                value={blog.excerpt}
                onChange={handleChange}
                placeholder="A brief summary of your blog post"
                className="bg-gray-700 border-gray-600 text-white resize-none h-20"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content" className="text-white">
                Content
              </Label>
              <RichTextEditor
                value={blog.content}
                onChange={handleRichTextChange}
                className="bg-gray-700 border-gray-600 text-white min-h-[400px]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="date" className="text-white">
                  Publication Date
                </Label>
                <Input
                  id="date"
                  name="date"
                  type="date"
                  value={blog.date}
                  onChange={handleChange}
                  className="bg-gray-700 border-gray-600 text-white"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="readTime" className="text-white">
                  Read Time
                </Label>
                <Input
                  id="readTime"
                  name="readTime"
                  value={blog.readTime}
                  onChange={handleChange}
                  placeholder="5 min read"
                  className="bg-gray-700 border-gray-600 text-white"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-white">Featured Image URL</Label>
              <div className="space-y-4">
                <Input
                  id="image"
                  name="image"
                  value={blog.image}
                  onChange={handleChange}
                  placeholder="Enter image URL (e.g., https://example.com/image.jpg)"
                  className="bg-gray-700 border-gray-600 text-white"
                />
                {blog.image && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-400 mb-2">Image Preview:</p>
                    <div className="relative w-full max-w-xs mx-auto">
                      <Image
                        src={blog.image}
                        alt="Blog preview"
                        width={600}
                        height={400}
                        className="rounded-md w-full h-auto"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="published"
                checked={blog.published}
                onCheckedChange={handlePublishedChange}
              />
              <Label htmlFor="published" className="text-white">
                {blog.published ? "Published" : "Draft"}
              </Label>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t border-gray-700 pt-6">
            <Button
              variant="outline"
              type="button"
              onClick={() => router.push("/admin/dashboard/blog")}
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
              {isNew ? "Create Post" : "Update Post"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
