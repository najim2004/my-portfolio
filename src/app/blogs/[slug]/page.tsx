import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, ChevronLeft, User, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { notFound } from "next/navigation";
import { IBlog } from "@/types/model/blog.types";
import { BackButton } from "@/components/ui/back-button";

async function getBlogPost(slug: string): Promise<Omit<IBlog, "userId">> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/blogs/${slug}`,
      {
        method: "GET",
        next: {
          revalidate: 3600, // Cache for 1 hour
          tags: [`blog-${slug}`],
        },
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch blog post: ${res.status}`);
    }

    return res.json();
  } catch (error) {
    console.error("Failed to fetch blog post:", error);
    throw error;
  }
}

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const blog = await getBlogPost(params.slug);

    return {
      title: `${blog?.title} | Najim's Blog`,
      description: blog.excerpt,
      openGraph: {
        title: blog.title,
        description: blog.excerpt,
        type: "article",
        publishedTime: new Date(blog.publishedAt).toISOString(),
        authors: [blog.authorName],
        tags: [blog.category],
        images: [
          {
            url: blog.image || "/placeholder.svg",
            width: 1200,
            height: 630,
            alt: blog.title,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: blog.title,
        description: blog.excerpt,
        images: [blog.image || "/placeholder.svg"],
      },
    };
  } catch {
    return {
      title: "Blog Post Not Found | Najim's Blog",
      description: "The requested blog post could not be found.",
    };
  }
}

export default async function BlogPostPage({ params }: Props) {
  const blog = await getBlogPost(params.slug).catch(() => {
    notFound();
  });

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    dateStyle: "long",
  }).format(new Date(blog.publishedAt));

  return (
    <div className="bg-gray-900 text-gray-100">
      <article className="max-w-6xl px-4 mx-auto py-12">
        <BackButton />

        <div>
          <header className="border p-4 rounded-lg bg-gray-800 mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {blog.title}
            </h1>

            <div className="flex flex-wrap items-center text-sm text-gray-400">
              {[
                { icon: Calendar, text: formattedDate },
                { icon: Clock, text: blog.readTime },
                { icon: User, text: blog.authorName },
                { icon: Tag, text: blog.category },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center mr-4 mb-2">
                  <Icon className="w-4 h-4 mr-1" />
                  {text}
                </div>
              ))}
            </div>
          </header>

          <div className="relative mb-10 aspect-video w-full overflow-hidden rounded-xl">
            <Image
              src={blog.image || "/placeholder.svg"}
              alt={blog.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 85vw, 1200px"
            />
          </div>

          <div
            className="prose prose-lg prose-invert w-full !max-w-none"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          <footer className="border-t border-gray-800 mt-12 pt-8">
            <h3 className="text-xl font-bold mb-4">Share this post</h3>
            <div className="flex space-x-4">
              {["Twitter", "Facebook", "LinkedIn"].map((platform) => (
                <Button key={platform} variant="outline" size="sm">
                  Share on {platform}
                </Button>
              ))}
            </div>
          </footer>
        </div>
      </article>
    </div>
  );
}

export const dynamicParams = false; // Only allow defined blog slugs
