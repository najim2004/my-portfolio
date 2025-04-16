import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, ChevronLeft, User, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { notFound } from "next/navigation";

export interface BlogPost {
  title: string;
  excerpt: string;
  image: string;
  date: string;
  readTime: string;
  author: string;
  category: string;
  slug: string;
  content: string;
}
// Move this to a separate data file or API endpoint
const blogs: BlogPost[] = [
  {
    title: "Building Responsive Websites with Tailwind CSS",
    excerpt:
      "Learn how to create beautiful, responsive websites using Tailwind CSS, a utility-first CSS framework that can speed up your development workflow.",
    image: "/placeholder.svg?height=400&width=600",
    date: "May 15, 2023",
    readTime: "5 min read",
    author: "Najim",
    category: "CSS",
    slug: "building-responsive-websites-with-tailwind-css",
    content: `
      <h2>Introduction to Tailwind CSS</h2>
      <p>Tailwind CSS is a utility-first CSS framework that allows you to build modern websites without ever leaving your HTML. Unlike other CSS frameworks like Bootstrap or Foundation, Tailwind doesn't provide pre-designed components. Instead, it gives you low-level utility classes that let you build completely custom designs.</p>
      
      <h2>Getting Started with Tailwind CSS</h2>
      <p>To get started with Tailwind CSS, you first need to install it via npm:</p>
      <pre><code>npm install tailwindcss</code></pre>
      <p>Next, you'll want to create a configuration file:</p>
      <pre><code>npx tailwindcss init</code></pre>
      
      <h2>The Benefits of Utility-First CSS</h2>
      <p>Using utility classes has several advantages:</p>
      <ul>
        <li>No more naming things - you don't have to come up with class names for everything</li>
        <li>CSS doesn't grow with your project - your CSS file size stays relatively constant</li>
        <li>Making changes feels safer - you're not worried about breaking something elsewhere in the site</li>
      </ul>
      
      <h2>Building Responsive Designs</h2>
      <p>Tailwind makes responsive design incredibly easy with its responsive modifiers. Instead of writing media queries, you simply prefix the utility classes with the breakpoint:</p>
      <pre><code>&lt;div class="w-full md:w-1/2 lg:w-1/3"&gt;&lt;/div&gt;</code></pre>
      
      <h2>Creating a Component Example</h2>
      <p>Let's create a simple card component using Tailwind CSS:</p>
      <pre><code>&lt;div class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl"&gt;
  &lt;div class="md:flex"&gt;
    &lt;div class="md:shrink-0"&gt;
      &lt;img class="h-48 w-full object-cover md:w-48" src="/img/card.jpg" alt="Card image"&gt;
    &lt;/div&gt;
    &lt;div class="p-8"&gt;
      &lt;div class="uppercase tracking-wide text-sm text-indigo-500 font-semibold"&gt;Case study&lt;/div&gt;
      &lt;a href="#" class="block mt-1 text-lg leading-tight font-medium text-black hover:underline"&gt;Finding customers for your new business&lt;/a&gt;
      &lt;p class="mt-2 text-slate-500"&gt;Getting a new business off the ground is a lot of hard work. Here are some tips to help you find your first customers.&lt;/p&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/div&gt;</code></pre>
      
      <h2>Customizing Tailwind</h2>
      <p>One of the most powerful features of Tailwind is how easy it is to customize to match your design requirements. You can customize colors, spacing, breakpoints, and more in your tailwind.config.js file:</p>
      <pre><code>module.exports = {
  theme: {
    extend: {
      colors: {
        'brand': '#3490dc',
      },
      spacing: {
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
      }
    }
  }
}</code></pre>
      
      <h2>Conclusion</h2>
      <p>Tailwind CSS offers a different approach to styling your applications. By embracing utility-first CSS, you can build custom designs without writing custom CSS, allowing for rapid development without sacrificing the ability to create unique designs.</p>
      <p>Once you get used to the workflow, you might find that you're building UIs faster than ever before, all while maintaining complete control over your design.</p>
    `,
  },
  // Other blog posts would be defined here...
];

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const blog = blogs.find((b) => b.slug === params.slug);

  if (!blog) {
    return {
      title: "Blog Post Not Found",
      description: "The requested blog post could not be found.",
    };
  }

  return {
    title: `${blog.title} | Najim's Blog`,
    description: blog.excerpt,
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      images: [blog.image],
    },
  };
}

export default function BlogPostPage({ params }: Props) {
  const blog = blogs.find((b) => b.slug === params.slug);

  if (!blog) {
    notFound();
  }

  return (
    <div className=" bg-gray-900">
      <article className="max-w-6xl px-4 mx-auto py-12">
        <Button variant="outline" asChild className="mb-8">
          <Link href="/blog">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to all posts
          </Link>
        </Button>

        <div className="">
          <header>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {blog.title}
            </h1>

            <div className="flex flex-wrap items-center text-sm text-gray-400 mb-8">
              {[
                { icon: Calendar, text: blog.date },
                { icon: Clock, text: blog.readTime },
                { icon: User, text: blog.author },
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
              src={blog.image}
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
                  {platform}
                </Button>
              ))}
            </div>
          </footer>
        </div>
      </article>
    </div>
  );
}

// Add not-found.tsx handling
export const dynamicParams = false; // Only allow defined blog slugs
