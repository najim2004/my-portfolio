"use client";

import { useState, useEffect, ChangeEvent, FormEvent, JSX } from "react";
import { useRouter } from "next/navigation";
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
import { ArrowLeft, Plus, X, Upload } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Badge } from "@/components/ui/badge";

export interface Project {
  id: string;
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

export interface ProjectFormProps {
  params: {
    id: string;
  };
}

const initialProjects = [
  {
    id: "1",
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
    id: "2",
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
];
// Dynamically import the rich text editor
const RichTextEditor = dynamic(
  () => import("@/components/ui/rich-text-editor"),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-[400px] bg-gray-700 rounded-md animate-pulse" />
    ),
  }
);

const emptyProject: Project = {
  id: "",
  slug: "",
  title: "",
  description: "",
  fullDescription: "",
  image: "/placeholder.svg?height=400&width=600",
  technologies: [],
  features: [],
  liveLink: "",
  githubLink: "",
  date: new Date().toISOString().split("T")[0],
};

export default function ProjectForm({ params }: ProjectFormProps): JSX.Element {
  const router = useRouter();
  const isNew = params.id === "new";
  const projectId = params.id;

  const [project, setProject] = useState<Project>(emptyProject);
  const [newTag, setNewTag] = useState<string>("");
  const [newFeature, setNewFeature] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(!isNew);
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    if (!isNew) {
      const foundProject = initialProjects.find((p) => p.id === projectId);
      if (foundProject) {
        setProject(foundProject);
      } else {
        router.push("/404");
      }
      setLoading(false);
    }
  }, [isNew, projectId, router]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setProject((prev) => ({ ...prev, [name]: value }));
  };

  const handleRichTextChange = (content: string): void => {
    setProject((prev) => ({ ...prev, fullDescription: content }));
  };

  const handleImageUpload = async (
    e: ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      // In a real app, you would upload to your storage service
      // const imageUrl = await uploadImage(file)
      // setProject(prev => ({ ...prev, image: imageUrl }))
    }
  };

  const handleAddTag = (): void => {
    if (newTag.trim() && !project.technologies.includes(newTag.trim())) {
      setProject((prev) => ({
        ...prev,
        technologies: [...prev.technologies, newTag.trim()],
      }));
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string): void => {
    setProject((prev) => ({
      ...prev,
      technologies: prev.technologies.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleAddFeature = (): void => {
    if (newFeature.trim() && !project.features.includes(newFeature.trim())) {
      setProject((prev) => ({
        ...prev,
        features: [...prev.features, newFeature.trim()],
      }));
      setNewFeature("");
    }
  };

  const handleRemoveFeature = (featureToRemove: string): void => {
    setProject((prev) => ({
      ...prev,
      features: prev.features.filter((feature) => feature !== featureToRemove),
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setLoading(true);

    try {
      // In a real app, you would save to your database
      console.log("Saving project:", project);
      router.push("/admin/dashboard/projects");
    } catch (error) {
      console.error("Error saving project:", error);
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
          <Link href="/admin/dashboard/projects">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Link>
        </Button>
        <h1 className="text-3xl font-bold text-white">
          {isNew ? "Add New Project" : "Edit Project"}
        </h1>
      </div>

      <form onSubmit={handleSubmit}>
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Project Details</CardTitle>
            <CardDescription className="text-gray-400">
              Fill in the details of your project.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-white">
                  Project Title
                </Label>
                <Input
                  id="title"
                  name="title"
                  value={project.title}
                  onChange={handleChange}
                  placeholder="E.g., E-Commerce Platform"
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
                  value={project.slug}
                  onChange={handleChange}
                  placeholder="e-commerce-platform"
                  className="bg-gray-700 border-gray-600 text-white"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-white">
                Short Description
              </Label>
              <Textarea
                id="description"
                name="description"
                value={project.description}
                onChange={handleChange}
                placeholder="A brief description of your project"
                className="bg-gray-700 border-gray-600 text-white resize-none h-20"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="fullDescription" className="text-white">
                Full Description
              </Label>
              <RichTextEditor
                value={project.fullDescription}
                onChange={handleRichTextChange}
                className="bg-gray-700 border-gray-600 text-white min-h-[200px]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="liveLink" className="text-white">
                  Live Demo Link
                </Label>
                <Input
                  id="liveLink"
                  name="liveLink"
                  value={project.liveLink}
                  onChange={handleChange}
                  placeholder="https://example.com"
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="githubLink" className="text-white">
                  GitHub Repository Link
                </Label>
                <Input
                  id="githubLink"
                  name="githubLink"
                  value={project.githubLink}
                  onChange={handleChange}
                  placeholder="https://github.com/username/repo"
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="date" className="text-white">
                Completion Date
              </Label>
              <Input
                id="date"
                name="date"
                type="date"
                value={project.date}
                onChange={handleChange}
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-white">Project Image</Label>
              <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 flex flex-col items-center justify-center">
                <Upload className="h-10 w-10 text-gray-400 mb-2" />
                <p className="text-sm text-gray-400 mb-2">
                  Drag and drop an image, or click to browse
                </p>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <Button type="button" variant="outline" size="sm">
                  Upload Image
                </Button>
                {project.image && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-400">Current image:</p>
                    <div className="mt-2 relative w-full max-w-xs mx-auto">
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt="Project preview"
                        width={600}
                        height={400}
                        className="rounded-md w-full h-auto"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-white">Technologies Used</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {project.technologies.map((tech, index) => (
                  <Badge
                    key={index}
                    className="bg-purple-600 hover:bg-purple-700 text-white"
                  >
                    {tech}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tech)}
                      className="ml-1 text-white hover:text-gray-200"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Add a technology"
                  className="bg-gray-700 border-gray-600 text-white"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddTag();
                    }
                  }}
                />
                <Button type="button" onClick={handleAddTag} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-white">Key Features</Label>
              <div className="space-y-2 mb-2">
                {project.features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-gray-700 p-2 rounded-md"
                  >
                    <span className="text-white">{feature}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveFeature(feature)}
                      className="text-gray-400 hover:text-white"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  value={newFeature}
                  onChange={(e) => setNewFeature(e.target.value)}
                  placeholder="Add a feature"
                  className="bg-gray-700 border-gray-600 text-white"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddFeature();
                    }
                  }}
                />
                <Button type="button" onClick={handleAddFeature} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t border-gray-700 pt-6">
            <Button
              variant="outline"
              type="button"
              onClick={() => router.push("/admin/dashboard/projects")}
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
              {isNew ? "Create Project" : "Update Project"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
