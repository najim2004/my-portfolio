"use client";

import { JSX, useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, ExternalLink, Github } from "lucide-react";

// Types
interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveLink: string;
  githubLink: string;
}

// Animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6 },
  },
};

// Projects data
const projects: Project[] = [
  {
    title: "E-Commerce Platform",
    description:
      "A fully responsive e-commerce platform with product filtering and cart functionality.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Next.js", "MongoDB", "Tailwind CSS", "Stripe"],
    liveLink: "#",
    githubLink: "#",
  },
  {
    title: "Admin Dashboard",
    description:
      "An admin dashboard with data visualization, user management, and dark mode.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["React", "Chart.js", "Tailwind CSS", "Redux"],
    liveLink: "#",
    githubLink: "#",
  },
  {
    title: "Social Media App",
    description:
      "A social platform with real-time messaging, post creation, and user profiles.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Next.js", "MongoDB", "Socket.io", "Tailwind CSS"],
    liveLink: "#",
    githubLink: "#",
  },
];

export default function Projects(): JSX.Element {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section id="projects" className="py-20 bg-gray-800">
      <div className="container px-4 mx-auto">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-center">
            Featured <span className="text-purple-500">Projects</span>
          </h2>
          <div className="w-20 h-1 bg-purple-500 mx-auto mb-10" />

          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {projects.map((project, index) => (
              <motion.div
                key={`project-${project.title}-${index}`}
                variants={itemVariants}
                whileHover={{
                  y: -10,
                  boxShadow:
                    "0 20px 25px -5px rgba(124, 58, 237, 0.1), 0 10px 10px -5px rgba(124, 58, 237, 0.04)",
                }}
                className="bg-gray-900 rounded-xl overflow-hidden border border-gray-700 hover:border-purple-500/50 transition-all group"
              >
                <div className="relative overflow-hidden aspect-video">
                  <Image
                    src={project.image}
                    alt={`Screenshot of ${project.title}`}
                    width={600}
                    height={400}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                    priority={index < 3}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-purple-400">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 mb-4">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={`${project.title}-tag-${tagIndex}`}
                        className="text-xs bg-gray-800 text-purple-300 px-3 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4">
                    <Button
                      size="sm"
                      className="bg-purple-600 hover:bg-purple-700"
                      asChild
                    >
                      <Link
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        <span>Live Demo</span>
                      </Link>
                    </Button>
                    <Button size="sm" variant="outline" asChild>
                      <Link
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="w-4 h-4 mr-2" />
                        <span>Code</span>
                      </Link>
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="flex justify-center mt-12">
            <Button asChild className="group">
              <Link href="/projects" prefetch>
                View All Projects
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
