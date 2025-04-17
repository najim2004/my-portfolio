import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Github, ExternalLink } from "lucide-react";
import ScrollNavbar from "@/components/layout/scroll-navbar";
import Footer from "@/components/layout/footer";
import { JSX } from "react";
import { IProject } from "@/types/model/project.types";
import { BackButton } from "@/components/ui/back-button";

interface PageProps {
  params: {
    slug: string;
  };
}

// Utility function for API calls
async function getProject(slug: string): Promise<Omit<IProject, "userId">> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/projects/${slug}`,
    {
      next: {
        revalidate: 3600, // Cache for 1 hour
        tags: [`project-${slug}`], // Add cache tag for selective revalidation
      },
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch project: ${res.status}`);
  }

  return res.json();
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  try {
    const project = await getProject(params.slug);

    return {
      title: `${project.title} | Najim's Portfolio`,
      description: project.description,
      openGraph: {
        title: `${project.title} | Najim's Portfolio`,
        description: project.description,
        type: "article",
        publishedTime: new Date(project.createdAt).toISOString(),
        images: [
          {
            url: project.image || "/placeholder.svg",
            width: 1200,
            height: 630,
            alt: project.title,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: `${project.title} | Najim's Portfolio`,
        description: project.description,
        images: [project.image || "/placeholder.svg"],
      },
    };
  } catch {
    return {
      title: "Project Not Found | Najim's Portfolio",
      description: "The requested project could not be found.",
    };
  }
}

export default async function ProjectPage({
  params,
}: PageProps): Promise<JSX.Element> {
  const project = await getProject(params.slug).catch(() => {
    notFound();
  });

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    dateStyle: "long",
  }).format(new Date(project.createdAt));

  return (
    <main className="min-h-screen bg-gray-900 text-gray-100">
      <ScrollNavbar />

      <article className="pt-24 pb-16">
        <div className="max-w-6xl px-4 mx-auto">
          <BackButton className="text-purple-400 hover:text-purple-300 mb-8 transition-colors" />
          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {project.title}
            </h1>
            <time
              dateTime={new Date(project.createdAt).toISOString()}
              className="text-gray-400"
            >
              {formattedDate}
            </time>
          </header>

          <figure className="rounded-xl overflow-hidden mb-10">
            <Image
              src={project.image || "/placeholder.svg"}
              alt={project.title}
              width={1200}
              height={630}
              className="w-full h-auto object-cover"
              priority
            />
          </figure>

          <div className="flex flex-wrap gap-2 mb-8">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-gray-800 text-purple-300 rounded-full text-sm"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="prose prose-invert max-w-none mb-10">
            <p className="text-xl mb-6 leading-relaxed">
              {project.description}
            </p>
            <div className="whitespace-pre-line leading-relaxed">
              {project.fullDescription}
            </div>

            <section>
              <h2 className="text-2xl font-bold mt-10 mb-4">Key Features</h2>
              <ul className="space-y-2">
                {project.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <span className="text-purple-400 mr-2">•</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <div className="flex flex-wrap gap-4">
            {project.liveLink && (
              <Button
                className="bg-purple-600 hover:bg-purple-700 transition-colors"
                asChild
              >
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View Live Demo"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Live Demo
                </a>
              </Button>
            )}
            {project.githubLink && (
              <Button variant="outline" asChild>
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View Source Code"
                >
                  <Github className="mr-2 h-4 w-4" />
                  View Code
                </a>
              </Button>
            )}
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
}
