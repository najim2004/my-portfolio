import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import ScrollNavbar from "@/components/layout/scroll-navbar";
import Footer from "@/components/layout/footer";
import { ProjectType } from "@/types/api/home.types";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Projects | Najim's Portfolio",
  description: "Explore my latest web development projects and applications.",
  openGraph: {
    title: "Projects | Najim's Portfolio",
    description: "Explore my latest web development projects and applications.",
    type: "website",
    images: [
      {
        url: "/og-projects.jpg", // Add an OG image for better social sharing
        width: 1200,
        height: 630,
        alt: "Projects Portfolio Preview",
      },
    ],
  },
};

async function getProjects(): Promise<ProjectType[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects`, {
      method: "GET",
      next: { revalidate: 3600 }, // Cache for 1 hour
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch projects: ${res.status}`);
    }

    return res.json();
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    throw error;
  }
}

export default async function ProjectsPage() {
  let projects: ProjectType[];

  try {
    projects = await getProjects();
  } catch {
    notFound(); // This will render the not-found page
  }

  if (!projects?.length) {
    return (
      <main className="min-h-screen bg-gray-900 text-gray-100">
        <ScrollNavbar />
        <div className="pt-24 pb-16 container">
          <p className="text-center text-gray-400">No projects found.</p>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-900 text-gray-100">
      <ScrollNavbar />

      <section className="pt-24 pb-16">
        <div className="container px-4 mx-auto">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
              My <span className="text-purple-500">Projects</span>
            </h1>
            <p className="text-gray-400 text-center max-w-2xl mx-auto mb-12">
              Explore my latest web development projects. Each project showcases
              modern technologies and best practices in software development.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <article
                  key={project.slug}
                  className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-purple-500/50 transition-all duration-300 group"
                >
                  <Link
                    href={`/projects/${project.slug}`}
                    prefetch
                    className="block relative overflow-hidden aspect-video"
                  >
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      width={600}
                      height={400}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority={true}
                    />
                  </Link>

                  <div className="p-6">
                    <Link href={`/projects/${project.slug}`} prefetch>
                      <h2 className="text-xl font-bold mb-2 text-purple-400 hover:text-purple-300 transition-colors">
                        {project.title}
                      </h2>
                    </Link>
                    <p className="text-gray-300 mb-4 line-clamp-3">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {project?.technologies?.map((tech) => (
                        <span
                          key={`${project.slug}-${tech}`}
                          className="text-xs bg-gray-700 text-purple-300 px-3 py-1 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-4">
                      {project.liveLink && (
                        <Button
                          size="sm"
                          className="bg-purple-600 hover:bg-purple-700 transition-colors"
                          asChild
                        >
                          <a
                            href={project.liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center"
                          >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Live Demo
                          </a>
                        </Button>
                      )}
                      {project.githubLink && (
                        <Button size="sm" variant="outline" asChild>
                          <a
                            href={project.githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center"
                          >
                            <Github className="w-4 h-4 mr-2" />
                            Code
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
