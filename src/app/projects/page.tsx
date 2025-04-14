import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"
import ScrollNavbar from "@/components/layout/scroll-navbar"
import Footer from "@/components/layout/footer"

// Mock data - in a real app, this would come from your database
const projects = [
  {
    slug: "e-commerce-platform",
    title: "E-Commerce Platform",
    description: "A fully responsive e-commerce platform with product filtering and cart functionality.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Next.js", "MongoDB", "Tailwind CSS", "Stripe"],
    liveLink: "#",
    githubLink: "#",
  },
  {
    slug: "admin-dashboard",
    title: "Admin Dashboard",
    description: "An admin dashboard with data visualization, user management, and dark mode.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["React", "Chart.js", "Tailwind CSS", "Redux"],
    liveLink: "#",
    githubLink: "#",
  },
  {
    slug: "social-media-app",
    title: "Social Media App",
    description: "A social platform with real-time messaging, post creation, and user profiles.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Next.js", "MongoDB", "Socket.io", "Tailwind CSS"],
    liveLink: "#",
    githubLink: "#",
  },
  {
    slug: "portfolio-website",
    title: "Portfolio Website",
    description: "A creative portfolio for a digital artist with image gallery and contact form.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Next.js", "Framer Motion", "Tailwind CSS", "Sanity.io"],
    liveLink: "#",
    githubLink: "#",
  },
  {
    slug: "task-management-app",
    title: "Task Management App",
    description: "A Kanban-style task management application with drag-and-drop functionality.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["React", "Redux", "Firebase", "Tailwind CSS"],
    liveLink: "#",
    githubLink: "#",
  },
  {
    slug: "weather-app",
    title: "Weather App",
    description: "A weather application with location detection and 7-day forecast.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["React", "OpenWeather API", "Geolocation", "Tailwind CSS"],
    liveLink: "#",
    githubLink: "#",
  },
]

export const metadata = {
  title: "Projects | Najim's Portfolio",
  description: "Explore my latest web development projects and applications.",
}

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-gray-900 text-gray-100">
      <ScrollNavbar />

      <div className="pt-24 pb-16">
        <div className="container px-4 mx-auto">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
              My <span className="text-purple-500">Projects</span>
            </h1>
            <p className="text-gray-400 text-center max-w-2xl mx-auto mb-12">
              Explore my latest web development projects. Each project represents my skills, creativity, and
              problem-solving abilities.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <div
                  key={project.slug}
                  className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-purple-500/50 transition-all group"
                >
                  <Link href={`/projects/${project.slug}`} className="block relative overflow-hidden aspect-video">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      width={600}
                      height={400}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                    />
                  </Link>

                  <div className="p-6">
                    <Link href={`/projects/${project.slug}`}>
                      <h3 className="text-xl font-bold mb-2 text-purple-400 hover:text-purple-300 transition-colors">
                        {project.title}
                      </h3>
                    </Link>
                    <p className="text-gray-300 mb-4">{project.description}</p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map((tag, tagIndex) => (
                        <span key={tagIndex} className="text-xs bg-gray-700 text-purple-300 px-3 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-4">
                      <Button size="sm" className="bg-purple-600 hover:bg-purple-700" asChild>
                        <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Live Demo
                        </a>
                      </Button>
                      <Button size="sm" variant="outline" asChild>
                        <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                          <Github className="w-4 h-4 mr-2" />
                          Code
                        </a>
                      </Button>
                    </div>
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
