import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import ScrollNavbar from "@/components/layout/scroll-navbar";
import Footer from "@/components/layout/footer";
import { notFound } from "next/navigation";
import { BlogType } from "@/types/api/home.types";

// Metadata
export const metadata: Metadata = {
  title: "Blog | Najim's Portfolio",
  description:
    "Read my latest articles on web development, design, and technology.",
  openGraph: {
    title: "Blog | Najim's Portfolio",
    description:
      "Read my latest articles on web development, design, and technology.",
    type: "website",
    images: [
      {
        url: "/og-blog.jpg",
        width: 1200,
        height: 630,
        alt: "Blog | Najim's Portfolio",
      },
    ],
  },
};

// Data fetching function
async function getBlogs(): Promise<BlogType[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs`, {
      method: "GET",
      next: {
        revalidate: 3600, // Cache for 1 hour
        tags: ["blogs"],
      },
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch blogs: ${res.status}`);
    }

    return res.json();
  } catch (error) {
    console.error("Failed to fetch blogs:", error);
    throw error;
  }
}

export default async function BlogPage() {
  const blogs = await getBlogs().catch(() => {
    notFound();
  });

  if (!blogs?.length) {
    return (
      <main className="min-h-screen bg-gray-900 text-gray-100">
        <ScrollNavbar />
        <div className="pt-24 pb-16 container">
          <p className="text-center text-gray-400">No blog posts found.</p>
        </div>
        <Footer />
      </main>
    );
  }

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
              Thoughts, tutorials, and insights on web development, design, and
              technology.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog) => (
                <article
                  key={blog.slug}
                  className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-purple-500/50 transition-all group"
                >
                  <Link
                    href={`/blogs/${blog.slug}`}
                    prefetch
                    className="block relative overflow-hidden aspect-video"
                  >
                    <Image
                      src={blog.image || "/placeholder.svg"}
                      alt={`Cover image for ${blog.title}`}
                      width={600}
                      height={400}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </Link>

                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-400 mb-4">
                      <time
                        className="flex items-center mr-4"
                        dateTime={new Date(blog.publishedAt).toISOString()}
                      >
                        <Calendar className="w-4 h-4 mr-1" aria-hidden="true" />
                        {new Intl.DateTimeFormat("en-US", {
                          dateStyle: "long",
                        }).format(new Date(blog.publishedAt))}
                      </time>
                      <div className="flex items-center mr-4" title="Read time">
                        <Clock className="w-4 h-4 mr-1" aria-hidden="true" />
                        {blog?.readTime}
                      </div>
                      <div className="flex items-center" title="Author">
                        <div className="w-5 h-5 rounded-full overflow-hidden mr-1">
                          <Image
                            src={"/placeholder.svg"}
                            alt={`Avatar of ${blog.authorName}`}
                            width={20}
                            height={20}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span>{blog.authorName}</span>
                      </div>
                    </div>

                    <Link href={`/blogs/${blog.slug}`} prefetch>
                      <h2 className="text-xl font-bold mb-2 text-purple-400 hover:text-purple-300 transition-colors">
                        {blog.title}
                      </h2>
                    </Link>
                    <p className="text-gray-300 mb-4 line-clamp-3">
                      {blog.excerpt}
                    </p>

                    <Button
                      variant="link"
                      className="p-0 text-purple-400 hover:text-purple-300 group"
                      asChild
                    >
                      <Link href={`/blogs/${blog.slug}`} prefetch>
                        Read More
                        <ArrowRight
                          className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform"
                          aria-hidden="true"
                        />
                      </Link>
                    </Button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
