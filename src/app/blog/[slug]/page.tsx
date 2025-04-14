import BlogPageClient from "./BlogPageClient"

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

export async function generateMetadata({ params }) {
  const blog = blogs.find((b) => b.slug === params.slug)

  if (!blog) {
    return {
      title: "Blog Post Not Found",
      description: "The requested blog post could not be found.",
    }
  }

  return {
    title: `${blog.title} | Najim's Blog`,
    description: blog.excerpt,
    openGraph: {
      title: `${blog.title} | Najim's Blog`,
      description: blog.excerpt,
      images: [
        {
          url: blog.image,
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
    },
  }
}

export async function generateStaticParams() {
  return blogs.map((blog) => ({
    slug: blog.slug,
  }))
}

export default function BlogPage({ params }) {
  return <BlogPageClient params={params} />
}
