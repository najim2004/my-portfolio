import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Github, ExternalLink } from "lucide-react";
import ScrollNavbar from "@/components/layout/scroll-navbar";
import Footer from "@/components/layout/footer";
import { JSX } from "react";

// Types
interface Project {
  slug: string;
  title: string;
  description: string;
  fullDescription: string;
  image: string;
  technologies: string[];
  features: string[];
  liveLink: string;
  githubLink: string;
  date: string;
}

interface PageProps {
  params: {
    slug: string;
  };
}

// Mock data - in a real app, this would come from your database
const projects: Project[] = [
  {
    slug: "e-commerce-platform",
    title: "E-Commerce Platform",
    description:
      "A fully responsive e-commerce platform with product filtering and cart functionality.",
    fullDescription: `
      This e-commerce platform was built with Next.js, MongoDB, and Stripe integration. It features a responsive design,
      product filtering, user authentication, shopping cart functionality, and secure checkout process.
      
      The application uses server-side rendering for improved SEO and performance. The admin dashboard allows for easy
      product management, order tracking, and customer data analysis.
    `,
    image: "/placeholder.svg?height=400&width=600",
    technologies: ["Next.js", "MongoDB", "Tailwind CSS", "Stripe"],
    features: [
      "Responsive design for all devices",
      "User authentication and profiles",
      "Product filtering and search",
      "Shopping cart and wishlist",
      "Secure checkout with Stripe",
      "Admin dashboard for product management",
    ],
    liveLink: "#",
    githubLink: "#",
    date: "June 2023",
  },
  {
    slug: "admin-dashboard",
    title: "Admin Dashboard",
    description:
      "An admin dashboard with data visualization, user management, and dark mode.",
    fullDescription: `
      This admin dashboard provides a comprehensive interface for managing application data, users, and analytics.
      Built with React and Chart.js, it offers powerful data visualization tools and a clean, intuitive user interface.
      
      The dashboard includes user management, content moderation, analytics tracking, and customizable reports. It also
      features a dark mode toggle for improved user experience in different lighting conditions.
    `,
    image: "/placeholder.svg?height=400&width=600",
    technologies: ["React", "Chart.js", "Tailwind CSS", "Redux"],
    features: [
      "Interactive data visualizations",
      "User management system",
      "Content moderation tools",
      "Dark mode toggle",
      "Responsive design",
      "Real-time updates",
    ],
    liveLink: "#",
    githubLink: "#",
    date: "April 2023",
  },
  {
    slug: "social-media-app",
    title: "Social Media App",
    description:
      "A social platform with real-time messaging, post creation, and user profiles.",
    fullDescription: `
      This social media application enables users to connect, share content, and communicate in real-time. Built with
      Next.js and Socket.io, it provides a seamless and interactive user experience.
      
      Features include user profiles, post creation with rich media support, real-time messaging, notifications, and
      content discovery. The application is fully responsive and optimized for performance across all devices.
    `,
    image: "/placeholder.svg?height=400&width=600",
    technologies: ["Next.js", "MongoDB", "Socket.io", "Tailwind CSS"],
    features: [
      "User profiles and authentication",
      "Post creation with image and video support",
      "Real-time messaging and notifications",
      "Content discovery feed",
      "Like, comment, and share functionality",
      "Responsive design for all devices",
    ],
    liveLink: "#",
    githubLink: "#",
    date: "August 2023",
  },
];

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const project = projects.find((p) => p.slug === params.slug);

  if (!project) {
    return {
      title: "Project Not Found",
      description: "The requested project could not be found.",
    };
  }

  return {
    title: `${project.title} | Najim's Portfolio`,
    description: project.description,
    openGraph: {
      title: `${project.title} | Najim's Portfolio`,
      description: project.description,
      images: [
        {
          url: project.image,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
  };
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default function ProjectPage({ params }: PageProps): JSX.Element {
  const project = projects.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-900 text-gray-100">
      <ScrollNavbar />

      <div className="pt-24 pb-16">
        <div className="container px-4 mx-auto">
          <Link
            href="/projects"
            className="inline-flex items-center text-purple-400 hover:text-purple-300 mb-8"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Link>

          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {project.title}
            </h1>
            <p className="text-gray-400 mb-8">{project.date}</p>

            <div className="rounded-xl overflow-hidden mb-10">
              <Image
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                width={1200}
                height={630}
                className="w-full h-auto"
              />
            </div>

            <div className="flex flex-wrap gap-2 mb-8">
              {project.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-800 text-purple-300 rounded-full text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="prose prose-invert max-w-none mb-10">
              <p className="text-xl mb-6">{project.description}</p>
              <div className="whitespace-pre-line">
                {project.fullDescription}
              </div>

              <h2 className="text-2xl font-bold mt-10 mb-4">Key Features</h2>
              <ul className="space-y-2">
                {project.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-purple-400 mr-2">•</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button className="bg-purple-600 hover:bg-purple-700" asChild>
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Live Demo
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="mr-2 h-4 w-4" />
                  View Code
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
