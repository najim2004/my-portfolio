"use client";

import { useState, ChangeEvent, JSX } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Plus, X, Save, Pencil, Code } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

export interface Education {
  id: string;
  degree: string;
  institution: string;
  years: string;
}

export interface Experience {
  id: string;
  position: string;
  company: string;
  years: string;
  description: string;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  icon: string; // Changed from level: number
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string; // This will now store the base64 image string
}

export interface SocialLinks {
  github: string;
  linkedin: string;
  twitter: string;
}

export interface Profile {
  name: string;
  titles: string[];
  email: string;
  phone: string;
  location: string;
  freelance: string;
  about: string;
  approach: string;
  education: Education[];
  experience: Experience[];
  skills: Skill[];
  services: Service[];
  social: SocialLinks;
  resumeUrl: string;
  imageUrl?: string;
}

const initialProfile = {
  name: "Najim",
  titles: ["Full Stack Developer", "UI/UX Designer"],
  email: "najim@example.com",
  phone: "+1 (555) 123-4567",
  location: "San Francisco, California",
  freelance: "Available",
  about: `
    <p>I'm a passionate full stack developer with a keen eye for design and a love for creating intuitive, dynamic user experiences. With expertise in modern JavaScript frameworks and a strong foundation in HTML, CSS, and responsive design, I transform ideas into beautiful, functional websites.</p>
    <p>My journey in web development began during my college years when I built my first website for a local business. Since then, I've been constantly learning and adapting to new technologies and methodologies to stay at the forefront of the industry.</p>
  `,
  approach: `I believe in creating clean, efficient, and user-friendly solutions. My approach combines:
    - Thorough understanding of client requirements
    - Modern development practices and tools
    - Focus on performance and scalability
    - Regular communication and feedback
    - Continuous learning and improvement`,
  education: [
    {
      id: "1",
      degree: "Bachelor of Science in Computer Science",
      institution: "University of California, Berkeley",
      years: "2015-2019",
    },
  ],
  experience: [
    {
      id: "1",
      position: "Senior Frontend Developer",
      company: "TechCorp Inc.",
      years: "2021-Present",
      description: "Lead development of company's flagship web application",
    },
    {
      id: "2",
      position: "Full Stack Developer",
      company: "WebSolutions",
      years: "2019-2021",
      description: "Developed and maintained client websites and applications",
    },
  ],
  skills: [
    { id: "1", name: "HTML5", category: "Frontend", icon: "" },
    { id: "2", name: "CSS3", category: "Frontend", icon: "" },
    { id: "3", name: "JavaScript", category: "Frontend", icon: "" },
    { id: "4", name: "React", category: "Frontend", icon: "" },
    { id: "5", name: "Next.js", category: "Frontend", icon: "" },
    { id: "6", name: "Node.js", category: "Backend", icon: "" },
    { id: "7", name: "MongoDB", category: "Backend", icon: "" },
    { id: "8", name: "Git", category: "DevOps", icon: "" },
  ],
  services: [
    {
      id: "1",
      title: "Web Development",
      description:
        "Custom websites and web applications built with modern technologies and best practices.",
      icon: "",
    },
    {
      id: "2",
      title: "UI/UX Design",
      description:
        "User-centered design solutions that are both beautiful and functional.",
      icon: "",
    },
    {
      id: "3",
      title: "Mobile Development",
      description:
        "Native and cross-platform mobile applications for iOS and Android.",
      icon: "",
    },
    {
      id: "4",
      title: "SEO Optimization",
      description:
        "Improve your website's visibility and ranking in search engine results.",
      icon: "",
    },
    {
      id: "5",
      title: "Performance Optimization",
      description:
        "Speed up your website and improve user experience with performance optimizations.",
      icon: "",
    },
    {
      id: "6",
      title: "API Development",
      description:
        "Custom API development and integration with third-party services.",
      icon: "",
    },
  ],
  social: {
    github: "https://github.com/username",
    linkedin: "https://linkedin.com/in/username",
    twitter: "https://twitter.com/username",
  },
  resumeUrl: "https://example.com/resume.pdf",
  imageUrl: "",
};

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

export default function ProfilePage(): JSX.Element {
  const [profile, setProfile] = useState<Profile>(initialProfile);
  const [activeTab, setActiveTab] = useState<string>("personal");
  const [newSkill, setNewSkill] = useState<Omit<Skill, "id">>({
    name: "",
    category: "",
    icon: "", // Changed from level: 75
  });
  const [newEducation, setNewEducation] = useState<Omit<Education, "id">>({
    degree: "",
    institution: "",
    years: "",
  });
  const [newExperience, setNewExperience] = useState<Omit<Experience, "id">>({
    position: "",
    company: "",
    years: "",
    description: "",
  });
  const [newService, setNewService] = useState<Omit<Service, "id">>({
    title: "",
    description: "",
    icon: "",
  });
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  console.log("[loading]:",isLoading);
  const [newTitle, setNewTitle] = useState<string>("");

  const handlePersonalChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleAboutChange = (content: string): void => {
    setProfile((prev) => ({ ...prev, about: content }));
  };

  const handleApproachChange = (content: string): void => {
    setProfile((prev) => ({ ...prev, approach: content }));
  };

  const handleSocialChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      social: { ...prev.social, [name]: value },
    }));
  };

  const handleAddSkill = (): void => {
    if (newSkill.name && newSkill.category) {
      const id = crypto.randomUUID();
      setProfile((prev) => ({
        ...prev,
        skills: [...prev.skills, { ...newSkill, id }],
      }));
      setNewSkill({ name: "", category: "", icon: "" });
    }
  };

  const handleRemoveSkill = (id: string): void => {
    setProfile((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill.id !== id),
    }));
  };

  const handleAddEducation = (): void => {
    if (newEducation.degree && newEducation.institution && newEducation.years) {
      const id = crypto.randomUUID();
      setProfile((prev) => ({
        ...prev,
        education: [...prev.education, { ...newEducation, id }],
      }));
      setNewEducation({ degree: "", institution: "", years: "" });
    }
  };

  const handleRemoveEducation = (id: string): void => {
    setProfile((prev) => ({
      ...prev,
      education: prev.education.filter((edu) => edu.id !== id),
    }));
  };

  const handleAddExperience = (): void => {
    if (
      newExperience.position &&
      newExperience.company &&
      newExperience.years
    ) {
      const id = crypto.randomUUID();
      setProfile((prev) => ({
        ...prev,
        experience: [...prev.experience, { ...newExperience, id }],
      }));
      setNewExperience({
        position: "",
        company: "",
        years: "",
        description: "",
      });
    }
  };

  const handleRemoveExperience = (id: string): void => {
    setProfile((prev) => ({
      ...prev,
      experience: prev.experience.filter((exp) => exp.id !== id),
    }));
  };

  const handleAddService = (): void => {
    if (newService.title && newService.description && newService.icon) {
      const id = crypto.randomUUID();
      setProfile((prev) => ({
        ...prev,
        services: [...prev.services, { ...newService, id }],
      }));
      setNewService({ title: "", description: "", icon: "" });
    }
  };

  const handleUpdateService = (): void => {
    if (
      editingService &&
      editingService.title &&
      editingService.description &&
      editingService.icon
    ) {
      setProfile((prev) => ({
        ...prev,
        services: prev.services.map((service) =>
          service.id === editingService.id ? editingService : service
        ),
      }));
      setEditingService(null);
    }
  };

  const handleRemoveService = (id: string): void => {
    setProfile((prev) => ({
      ...prev,
      services: prev.services.filter((service) => service.id !== id),
    }));
  };

  const handleAddTitle = (): void => {
    if (newTitle.trim()) {
      setProfile((prev) => ({
        ...prev,
        titles: [...prev.titles, newTitle.trim()],
      }));
      setNewTitle("");
    }
  };

  const handleRemoveTitle = (indexToRemove: number): void => {
    setProfile((prev) => ({
      ...prev,
      titles: prev.titles.filter((_, index) => index !== indexToRemove),
    }));
  };

  const handleSaveProfile = async (): Promise<void> => {
    try {
      setIsLoading(true);
      // In a real app, make an API call here
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Saving profile:", profile);
      // Show success toast
    } catch (error) {
      console.error("Error saving profile:", error);
      // Show error toast
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Profile</h1>
        <Button
          onClick={handleSaveProfile}
          className="bg-purple-600 hover:bg-purple-700"
        >
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="bg-gray-700 border-gray-600">
          <TabsTrigger
            value="personal"
            className="data-[state=active]:bg-purple-600"
          >
            Personal Info
          </TabsTrigger>
          <TabsTrigger
            value="about"
            className="data-[state=active]:bg-purple-600"
          >
            About Me
          </TabsTrigger>
          <TabsTrigger
            value="skills"
            className="data-[state=active]:bg-purple-600"
          >
            Skills
          </TabsTrigger>
          <TabsTrigger
            value="education"
            className="data-[state=active]:bg-purple-600"
          >
            Education
          </TabsTrigger>
          <TabsTrigger
            value="experience"
            className="data-[state=active]:bg-purple-600"
          >
            Experience
          </TabsTrigger>
          <TabsTrigger
            value="services"
            className="data-[state=active]:bg-purple-600"
          >
            Services
          </TabsTrigger>
        </TabsList>

        {/* Personal Info Tab */}
        <TabsContent value="personal">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Personal Information</CardTitle>
              <CardDescription className="text-gray-400">
                Update your personal information and contact details.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-white">
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={profile.name}
                      onChange={handlePersonalChange}
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-white">Professional Titles</Label>
                    <div className="space-y-4">
                      <div className="flex gap-2">
                        <Input
                          id="newTitle"
                          value={newTitle}
                          onChange={(e) => setNewTitle(e.target.value)}
                          placeholder="Add a professional title"
                          className="bg-gray-700 border-gray-600 text-white"
                        />
                        <Button
                          onClick={handleAddTitle}
                          className="bg-purple-600 hover:bg-purple-700"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {profile.titles.map((title, index) => (
                          <Badge
                            key={index}
                            className="bg-gray-700 text-white px-3 py-1 flex items-center gap-2"
                          >
                            {title}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemoveTitle(index)}
                              className="h-4 w-4 p-0 text-gray-400 hover:text-white hover:bg-transparent"
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white">
                      Email
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={profile.email}
                      onChange={handlePersonalChange}
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-white">
                      Phone
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={profile.phone}
                      onChange={handlePersonalChange}
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="location" className="text-white">
                      Location
                    </Label>
                    <Input
                      id="location"
                      name="location"
                      value={profile.location}
                      onChange={handlePersonalChange}
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="freelance" className="text-white">
                      Freelance Status
                    </Label>
                    <Input
                      id="freelance"
                      name="freelance"
                      value={profile.freelance}
                      onChange={handlePersonalChange}
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-white">Profile Image</Label>
                  <div className="space-y-4">
                    <Input
                      type="url"
                      placeholder="Enter image URL"
                      value={profile.imageUrl || ""}
                      onChange={(e) =>
                        setProfile((prev) => ({
                          ...prev,
                          imageUrl: e.target.value,
                        }))
                      }
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                    <div className="flex items-center justify-center">
                      <div className="relative w-32 h-32">
                        <Image
                          src={
                            profile.imageUrl ||
                            "/placeholder.svg?height=100&width=100"
                          }
                          alt="Profile"
                          className="rounded-full w-full h-full object-cover"
                          width={100}
                          height={100}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-white">Social Media Links</Label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="github" className="text-gray-400">
                        GitHub
                      </Label>
                      <Input
                        id="github"
                        name="github"
                        value={profile.social.github}
                        onChange={handleSocialChange}
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="linkedin" className="text-gray-400">
                        LinkedIn
                      </Label>
                      <Input
                        id="linkedin"
                        name="linkedin"
                        value={profile.social.linkedin}
                        onChange={handleSocialChange}
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="twitter" className="text-gray-400">
                        Twitter
                      </Label>
                      <Input
                        id="twitter"
                        name="twitter"
                        value={profile.social.twitter}
                        onChange={handleSocialChange}
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="resumeUrl" className="text-white">
                    Resume/CV Link
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="resumeUrl"
                      name="resumeUrl"
                      type="url"
                      value={profile.resumeUrl}
                      onChange={handlePersonalChange}
                      placeholder="https://example.com/your-resume.pdf"
                      className="bg-gray-700 border-gray-600 text-white flex-1"
                    />
                    {profile.resumeUrl && (
                      <Button
                        type="button"
                        variant="outline"
                        size="default"
                        onClick={() => window.open(profile.resumeUrl, "_blank")}
                        className="text-white border-gray-600 hover:bg-gray-700"
                      >
                        View Resume
                      </Button>
                    )}
                  </div>
                  <p className="text-sm text-gray-400">
                    Add a link to your downloadable resume or CV
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* About Me Tab */}
        <TabsContent value="about">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">About Me</CardTitle>
              <CardDescription className="text-gray-400">
                Update your bio and personal description.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="about" className="text-white">
                    Bio
                  </Label>
                  <RichTextEditor
                    value={profile.about}
                    onChange={handleAboutChange}
                    className="bg-gray-700 border-gray-600 text-white min-h-[200px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="approach" className="text-white">
                    My Approach
                  </Label>
                  <RichTextEditor
                    value={profile.approach}
                    onChange={handleApproachChange}
                    className="bg-gray-700 border-gray-600 text-white min-h-[200px]"
                  />
                  <p className="text-sm text-gray-400 mt-1">
                    Describe your working methodology, principles, and
                    professional approach.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Skills Tab */}
        <TabsContent value="skills">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Skills</CardTitle>
              <CardDescription className="text-gray-400">
                Manage your skills and expertise with custom icons.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="skillName" className="text-white">
                      Skill Name
                    </Label>
                    <Input
                      id="skillName"
                      value={newSkill.name}
                      onChange={(e) =>
                        setNewSkill({ ...newSkill, name: e.target.value })
                      }
                      placeholder="E.g., JavaScript"
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="skillCategory" className="text-white">
                      Category
                    </Label>
                    <Input
                      id="skillCategory"
                      value={newSkill.category}
                      onChange={(e) =>
                        setNewSkill({ ...newSkill, category: e.target.value })
                      }
                      placeholder="E.g., Frontend"
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-white">Skill Icon URL</Label>
                  <div className="space-y-4">
                    <Input
                      type="url"
                      placeholder="Enter icon URL"
                      value={newSkill.icon}
                      onChange={(e) =>
                        setNewSkill({ ...newSkill, icon: e.target.value })
                      }
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                    {newSkill.icon && (
                      <div className="flex items-center justify-center">
                        <div className="w-12 h-12 relative">
                          <Image
                            src={newSkill.icon}
                            alt="Skill icon preview"
                            layout="fill"
                            objectFit="contain"
                            className="rounded-md"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <Button
                  onClick={handleAddSkill}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Skill
                </Button>
              </div>

              <div className="space-y-2">
                <Label className="text-white">Current Skills</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {profile.skills.map((skill) => (
                    <div
                      key={skill.id}
                      className="flex items-center justify-between bg-gray-700 p-4 rounded-md"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 relative">
                          {skill.icon ? (
                            <Image
                              src={skill.icon}
                              alt={skill.name}
                              layout="fill"
                              objectFit="contain"
                              className="rounded-md"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-600 rounded-md">
                              <Code className="h-6 w-6 text-gray-400" />
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="font-medium text-white">
                            {skill.name}
                          </div>
                          <Badge className="bg-gray-600 text-white">
                            {skill.category}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveSkill(skill.id)}
                          className="text-gray-400 hover:text-white hover:bg-gray-600"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Education Tab */}
        <TabsContent value="education">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Education</CardTitle>
              <CardDescription className="text-gray-400">
                Manage your educational background.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="degree" className="text-white">
                      Degree
                    </Label>
                    <Input
                      id="degree"
                      value={newEducation.degree}
                      onChange={(e) =>
                        setNewEducation({
                          ...newEducation,
                          degree: e.target.value,
                        })
                      }
                      placeholder="E.g., Bachelor of Science in Computer Science"
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="institution" className="text-white">
                      Institution
                    </Label>
                    <Input
                      id="institution"
                      value={newEducation.institution}
                      onChange={(e) =>
                        setNewEducation({
                          ...newEducation,
                          institution: e.target.value,
                        })
                      }
                      placeholder="E.g., University of California, Berkeley"
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="years" className="text-white">
                      Years
                    </Label>
                    <Input
                      id="years"
                      value={newEducation.years}
                      onChange={(e) =>
                        setNewEducation({
                          ...newEducation,
                          years: e.target.value,
                        })
                      }
                      placeholder="E.g., 2015-2019"
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                </div>
                <Button
                  onClick={handleAddEducation}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Education
                </Button>
              </div>

              <div className="space-y-2">
                <Label className="text-white">Education History</Label>
                <div className="space-y-4">
                  {profile.education.map((edu) => (
                    <div
                      key={edu.id}
                      className="flex items-start justify-between bg-gray-700 p-4 rounded-md"
                    >
                      <div className="space-y-1">
                        <div className="font-medium text-white">
                          {edu.degree}
                        </div>
                        <div className="text-sm text-gray-400">
                          {edu.institution}
                        </div>
                        <div className="text-xs text-gray-500">{edu.years}</div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveEducation(edu.id)}
                        className="text-gray-400 hover:text-white hover:bg-gray-600"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Experience Tab */}
        <TabsContent value="experience">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Experience</CardTitle>
              <CardDescription className="text-gray-400">
                Manage your work experience.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="position" className="text-white">
                      Position
                    </Label>
                    <Input
                      id="position"
                      value={newExperience.position}
                      onChange={(e) =>
                        setNewExperience({
                          ...newExperience,
                          position: e.target.value,
                        })
                      }
                      placeholder="E.g., Senior Frontend Developer"
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company" className="text-white">
                      Company
                    </Label>
                    <Input
                      id="company"
                      value={newExperience.company}
                      onChange={(e) =>
                        setNewExperience({
                          ...newExperience,
                          company: e.target.value,
                        })
                      }
                      placeholder="E.g., TechCorp Inc."
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expYears" className="text-white">
                      Years
                    </Label>
                    <Input
                      id="expYears"
                      value={newExperience.years}
                      onChange={(e) =>
                        setNewExperience({
                          ...newExperience,
                          years: e.target.value,
                        })
                      }
                      placeholder="E.g., 2021-Present"
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-white">
                      Description
                    </Label>
                    <Input
                      id="description"
                      value={newExperience.description}
                      onChange={(e) =>
                        setNewExperience({
                          ...newExperience,
                          description: e.target.value,
                        })
                      }
                      placeholder="E.g., Lead development of company's flagship web application"
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                </div>
                <Button
                  onClick={handleAddExperience}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Experience
                </Button>
              </div>

              <div className="space-y-2">
                <Label className="text-white">Work History</Label>
                <div className="space-y-4">
                  {profile.experience.map((exp) => (
                    <div
                      key={exp.id}
                      className="flex items-start justify-between bg-gray-700 p-4 rounded-md"
                    >
                      <div className="space-y-1">
                        <div className="font-medium text-white">
                          {exp.position}
                        </div>
                        <div className="text-sm text-gray-400">
                          {exp.company}
                        </div>
                        <div className="text-xs text-gray-500">{exp.years}</div>
                        <div className="text-sm text-gray-300">
                          {exp.description}
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveExperience(exp.id)}
                        className="text-gray-400 hover:text-white hover:bg-gray-600"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Services Tab */}
        <TabsContent value="services">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Services</CardTitle>
              <CardDescription className="text-gray-400">
                Manage the services you provide.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {editingService ? (
                <div className="space-y-4 grid grid-cols-1">
                  <div className="space-y-2">
                    <Label htmlFor="serviceTitle" className="text-white">
                      Service Title
                    </Label>
                    <Input
                      id="serviceTitle"
                      value={editingService.title}
                      onChange={(e) =>
                        setEditingService({
                          ...editingService,
                          title: e.target.value,
                        })
                      }
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-white">Service Icon URL</Label>
                    <div className="space-y-4">
                      <Input
                        type="url"
                        placeholder="Enter icon URL"
                        value={editingService.icon}
                        onChange={(e) =>
                          setEditingService({
                            ...editingService,
                            icon: e.target.value,
                          })
                        }
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                      {editingService.icon && (
                        <div className="flex items-center justify-center">
                          <div className="w-12 h-12 relative">
                            <Image
                              src={editingService.icon}
                              alt="Service icon preview"
                              layout="fill"
                              objectFit="contain"
                              className="rounded-md"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="serviceDescription" className="text-white">
                      Description
                    </Label>
                    <Textarea
                      id="serviceDescription"
                      value={editingService.description}
                      onChange={(e) =>
                        setEditingService({
                          ...editingService,
                          description: e.target.value,
                        })
                      }
                      className="bg-gray-700 border-gray-600 text-white resize-none h-20"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={handleUpdateService}
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      Update Service
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setEditingService(null)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4 grid grid-cols-1">
                  <div className="space-y-2">
                    <Label htmlFor="serviceTitle" className="text-white">
                      Service Title
                    </Label>
                    <Input
                      id="serviceTitle"
                      value={newService.title}
                      onChange={(e) =>
                        setNewService({
                          ...newService,
                          title: e.target.value,
                        })
                      }
                      placeholder="E.g., Web Development"
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-white">Service Icon URL</Label>
                    <div className="space-y-4">
                      <Input
                        type="url"
                        placeholder="Enter icon URL"
                        value={newService.icon}
                        onChange={(e) =>
                          setNewService({ ...newService, icon: e.target.value })
                        }
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                      {newService.icon && (
                        <div className="flex items-center justify-center">
                          <div className="w-12 h-12 relative">
                            <Image
                              src={newService.icon}
                              alt="Service icon preview"
                              layout="fill"
                              objectFit="contain"
                              className="rounded-md"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="serviceDescription" className="text-white">
                      Description
                    </Label>
                    <Textarea
                      id="serviceDescription"
                      value={newService.description}
                      onChange={(e) =>
                        setNewService({
                          ...newService,
                          description: e.target.value,
                        })
                      }
                      placeholder="Describe the service you provide"
                      className="bg-gray-700 border-gray-600 text-white resize-none h-20"
                    />
                  </div>
                  <Button
                    onClick={handleAddService}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Service
                  </Button>
                </div>
              )}

              <div className="space-y-2">
                <Label className="text-white">Current Services</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {profile.services.map((service) => (
                    <div
                      key={service.id}
                      className="bg-gray-700 p-4 rounded-md border border-gray-600 hover:border-purple-500/50 transition-all"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="w-12 h-12 relative">
                          {service.icon ? (
                            <Image
                              src={service.icon || "/"}
                              alt={service.title}
                              layout="fill"
                              objectFit="contain"
                              className="rounded-md"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-600 rounded-md">
                              <Code className="h-6 w-6 text-gray-400" />
                            </div>
                          )}
                        </div>
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setEditingService(service)}
                            className="h-8 w-8 p-0 text-gray-400 hover:text-white hover:bg-gray-600"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveService(service.id)}
                            className="h-8 w-8 p-0 text-gray-400 hover:text-white hover:bg-gray-600"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <h3 className="font-bold text-white mb-1">
                        {service.title}
                      </h3>
                      <p className="text-sm text-gray-300">
                        {service.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
