"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, Plus, X, Save, Pencil } from "lucide-react"
import dynamic from "next/dynamic"
import { Badge } from "@/components/ui/badge"

// Dynamically import the rich text editor to avoid SSR issues
const RichTextEditor = dynamic(() => import("@/components/ui/rich-text-editor"), { ssr: false })

// Mock data - in a real app, this would come from your database
const initialProfile = {
  name: "Najim",
  title: "Full Stack Developer",
  email: "najim@example.com",
  phone: "+1 (555) 123-4567",
  location: "San Francisco, California",
  freelance: "Available",
  about: `
    <p>I'm a passionate full stack developer with a keen eye for design and a love for creating intuitive, dynamic user experiences. With expertise in modern JavaScript frameworks and a strong foundation in HTML, CSS, and responsive design, I transform ideas into beautiful, functional websites.</p>
    <p>My journey in web development began during my college years when I built my first website for a local business. Since then, I've been constantly learning and adapting to new technologies and methodologies to stay at the forefront of the industry.</p>
  `,
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
    { id: "1", name: "HTML5", category: "Frontend", level: 95 },
    { id: "2", name: "CSS3", category: "Frontend", level: 90 },
    { id: "3", name: "JavaScript", category: "Frontend", level: 95 },
    { id: "4", name: "React", category: "Frontend", level: 90 },
    { id: "5", name: "Next.js", category: "Frontend", level: 85 },
    { id: "6", name: "Node.js", category: "Backend", level: 80 },
    { id: "7", name: "MongoDB", category: "Backend", level: 75 },
    { id: "8", name: "Git", category: "DevOps", level: 85 },
  ],
  services: [
    {
      id: "1",
      title: "Web Development",
      description: "Custom websites and web applications built with modern technologies and best practices.",
      icon: "Code",
    },
    {
      id: "2",
      title: "UI/UX Design",
      description: "User-centered design solutions that are both beautiful and functional.",
      icon: "Figma",
    },
    {
      id: "3",
      title: "Mobile Development",
      description: "Native and cross-platform mobile applications for iOS and Android.",
      icon: "Smartphone",
    },
    {
      id: "4",
      title: "SEO Optimization",
      description: "Improve your website's visibility and ranking in search engine results.",
      icon: "Globe",
    },
    {
      id: "5",
      title: "Performance Optimization",
      description: "Speed up your website and improve user experience with performance optimizations.",
      icon: "Zap",
    },
    {
      id: "6",
      title: "API Development",
      description: "Custom API development and integration with third-party services.",
      icon: "Sparkles",
    },
  ],
  social: {
    github: "https://github.com/username",
    linkedin: "https://linkedin.com/in/username",
    twitter: "https://twitter.com/username",
  },
}

export default function ProfilePage() {
  const [profile, setProfile] = useState(initialProfile)
  const [activeTab, setActiveTab] = useState("personal")
  const [newSkill, setNewSkill] = useState({ name: "", category: "", level: 75 })
  const [newEducation, setNewEducation] = useState({
    degree: "",
    institution: "",
    years: "",
  })
  const [newExperience, setNewExperience] = useState({
    position: "",
    company: "",
    years: "",
    description: "",
  })
  const [newService, setNewService] = useState({
    title: "",
    description: "",
    icon: "",
  })
  const [editingService, setEditingService] = useState(null)

  const handlePersonalChange = (e) => {
    const { name, value } = e.target
    setProfile((prev) => ({ ...prev, [name]: value }))
  }

  const handleAboutChange = (content) => {
    setProfile((prev) => ({ ...prev, about: content }))
  }

  const handleSocialChange = (e) => {
    const { name, value } = e.target
    setProfile((prev) => ({
      ...prev,
      social: { ...prev.social, [name]: value },
    }))
  }

  const handleAddSkill = () => {
    if (newSkill.name && newSkill.category) {
      const id = Date.now().toString()
      setProfile((prev) => ({
        ...prev,
        skills: [...prev.skills, { ...newSkill, id }],
      }))
      setNewSkill({ name: "", category: "", level: 75 })
    }
  }

  const handleRemoveSkill = (id) => {
    setProfile((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill.id !== id),
    }))
  }

  const handleAddEducation = () => {
    if (newEducation.degree && newEducation.institution && newEducation.years) {
      const id = Date.now().toString()
      setProfile((prev) => ({
        ...prev,
        education: [...prev.education, { ...newEducation, id }],
      }))
      setNewEducation({ degree: "", institution: "", years: "" })
    }
  }

  const handleRemoveEducation = (id) => {
    setProfile((prev) => ({
      ...prev,
      education: prev.education.filter((edu) => edu.id !== id),
    }))
  }

  const handleAddExperience = () => {
    if (newExperience.position && newExperience.company && newExperience.years) {
      const id = Date.now().toString()
      setProfile((prev) => ({
        ...prev,
        experience: [...prev.experience, { ...newExperience, id }],
      }))
      setNewExperience({
        position: "",
        company: "",
        years: "",
        description: "",
      })
    }
  }

  const handleRemoveExperience = (id) => {
    setProfile((prev) => ({
      ...prev,
      experience: prev.experience.filter((exp) => exp.id !== id),
    }))
  }

  const handleAddService = () => {
    if (newService.title && newService.description && newService.icon) {
      const id = Date.now().toString()
      setProfile((prev) => ({
        ...prev,
        services: [...prev.services, { ...newService, id }],
      }))
      setNewService({ title: "", description: "", icon: "" })
    }
  }

  const handleUpdateService = () => {
    if (editingService && editingService.title && editingService.description && editingService.icon) {
      setProfile((prev) => ({
        ...prev,
        services: prev.services.map((service) => (service.id === editingService.id ? editingService : service)),
      }))
      setEditingService(null)
    }
  }

  const handleRemoveService = (id) => {
    setProfile((prev) => ({
      ...prev,
      services: prev.services.filter((service) => service.id !== id),
    }))
  }

  const handleSaveProfile = () => {
    // In a real app, you would save the profile to your database
    console.log("Saving profile:", profile)
    alert("Profile saved successfully!")
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Profile</h1>
        <Button onClick={handleSaveProfile} className="bg-purple-600 hover:bg-purple-700">
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-gray-700 border-gray-600">
          <TabsTrigger value="personal" className="data-[state=active]:bg-purple-600">
            Personal Info
          </TabsTrigger>
          <TabsTrigger value="about" className="data-[state=active]:bg-purple-600">
            About Me
          </TabsTrigger>
          <TabsTrigger value="skills" className="data-[state=active]:bg-purple-600">
            Skills
          </TabsTrigger>
          <TabsTrigger value="education" className="data-[state=active]:bg-purple-600">
            Education
          </TabsTrigger>
          <TabsTrigger value="experience" className="data-[state=active]:bg-purple-600">
            Experience
          </TabsTrigger>
          <TabsTrigger value="services" className="data-[state=active]:bg-purple-600">
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
                    <Label htmlFor="title" className="text-white">
                      Professional Title
                    </Label>
                    <Input
                      id="title"
                      name="title"
                      value={profile.title}
                      onChange={handlePersonalChange}
                      className="bg-gray-700 border-gray-600 text-white"
                    />
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
                  <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 flex flex-col items-center justify-center">
                    <Upload className="h-10 w-10 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-400 mb-2">Drag and drop an image, or click to browse</p>
                    <Button type="button" variant="outline" size="sm">
                      Upload Image
                    </Button>
                    <div className="mt-4">
                      <p className="text-sm text-gray-400">Current image:</p>
                      <div className="mt-2 relative w-32 h-32 mx-auto">
                        <img
                          src="/placeholder.svg?height=100&width=100"
                          alt="Profile"
                          className="rounded-full w-full h-full object-cover"
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
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* About Me Tab */}
        <TabsContent value="about">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">About Me</CardTitle>
              <CardDescription className="text-gray-400">Update your bio and personal description.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="about" className="text-white">
                  Bio
                </Label>
                <RichTextEditor
                  value={profile.about}
                  onChange={handleAboutChange}
                  className="bg-gray-700 border-gray-600 text-white min-h-[300px]"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Skills Tab */}
        <TabsContent value="skills">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Skills</CardTitle>
              <CardDescription className="text-gray-400">Manage your skills and expertise.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="skillName" className="text-white">
                      Skill Name
                    </Label>
                    <Input
                      id="skillName"
                      value={newSkill.name}
                      onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
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
                      onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })}
                      placeholder="E.g., Frontend"
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="skillLevel" className="text-white">
                      Proficiency Level (%)
                    </Label>
                    <Input
                      id="skillLevel"
                      type="number"
                      min="0"
                      max="100"
                      value={newSkill.level}
                      onChange={(e) => setNewSkill({ ...newSkill, level: Number.parseInt(e.target.value) || 0 })}
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                </div>
                <Button onClick={handleAddSkill} className="bg-purple-600 hover:bg-purple-700">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Skill
                </Button>
              </div>

              <div className="space-y-2">
                <Label className="text-white">Current Skills</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {profile.skills.map((skill) => (
                    <div key={skill.id} className="flex items-center justify-between bg-gray-700 p-3 rounded-md">
                      <div className="space-y-1">
                        <div className="flex items-center">
                          <span className="font-medium text-white">{skill.name}</span>
                          <Badge className="ml-2 bg-gray-600 text-white">{skill.category}</Badge>
                        </div>
                        <div className="w-full bg-gray-600 rounded-full h-2">
                          <div className="bg-purple-600 h-2 rounded-full" style={{ width: `${skill.level}%` }}></div>
                        </div>
                        <span className="text-xs text-gray-400">{skill.level}%</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveSkill(skill.id)}
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

        {/* Education Tab */}
        <TabsContent value="education">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Education</CardTitle>
              <CardDescription className="text-gray-400">Manage your educational background.</CardDescription>
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
                      onChange={(e) => setNewEducation({ ...newEducation, degree: e.target.value })}
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
                      onChange={(e) => setNewEducation({ ...newEducation, institution: e.target.value })}
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
                      onChange={(e) => setNewEducation({ ...newEducation, years: e.target.value })}
                      placeholder="E.g., 2015-2019"
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                </div>
                <Button onClick={handleAddEducation} className="bg-purple-600 hover:bg-purple-700">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Education
                </Button>
              </div>

              <div className="space-y-2">
                <Label className="text-white">Education History</Label>
                <div className="space-y-4">
                  {profile.education.map((edu) => (
                    <div key={edu.id} className="flex items-start justify-between bg-gray-700 p-4 rounded-md">
                      <div className="space-y-1">
                        <div className="font-medium text-white">{edu.degree}</div>
                        <div className="text-sm text-gray-400">{edu.institution}</div>
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
              <CardDescription className="text-gray-400">Manage your work experience.</CardDescription>
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
                      onChange={(e) => setNewExperience({ ...newExperience, position: e.target.value })}
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
                      onChange={(e) => setNewExperience({ ...newExperience, company: e.target.value })}
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
                      onChange={(e) => setNewExperience({ ...newExperience, years: e.target.value })}
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
                      onChange={(e) => setNewExperience({ ...newExperience, description: e.target.value })}
                      placeholder="E.g., Lead development of company's flagship web application"
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                </div>
                <Button onClick={handleAddExperience} className="bg-purple-600 hover:bg-purple-700">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Experience
                </Button>
              </div>

              <div className="space-y-2">
                <Label className="text-white">Work History</Label>
                <div className="space-y-4">
                  {profile.experience.map((exp) => (
                    <div key={exp.id} className="flex items-start justify-between bg-gray-700 p-4 rounded-md">
                      <div className="space-y-1">
                        <div className="font-medium text-white">{exp.position}</div>
                        <div className="text-sm text-gray-400">{exp.company}</div>
                        <div className="text-xs text-gray-500">{exp.years}</div>
                        <div className="text-sm text-gray-300">{exp.description}</div>
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
              <CardDescription className="text-gray-400">Manage the services you provide.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {editingService ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="serviceTitle" className="text-white">
                        Service Title
                      </Label>
                      <Input
                        id="serviceTitle"
                        value={editingService.title}
                        onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="serviceIcon" className="text-white">
                        Icon Name
                      </Label>
                      <Input
                        id="serviceIcon"
                        value={editingService.icon}
                        onChange={(e) => setEditingService({ ...editingService, icon: e.target.value })}
                        placeholder="E.g., Code, Figma, Smartphone"
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="serviceDescription" className="text-white">
                      Description
                    </Label>
                    <Textarea
                      id="serviceDescription"
                      value={editingService.description}
                      onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                      className="bg-gray-700 border-gray-600 text-white resize-none h-20"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleUpdateService} className="bg-purple-600 hover:bg-purple-700">
                      Update Service
                    </Button>
                    <Button variant="outline" onClick={() => setEditingService(null)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="serviceTitle" className="text-white">
                        Service Title
                      </Label>
                      <Input
                        id="serviceTitle"
                        value={newService.title}
                        onChange={(e) => setNewService({ ...newService, title: e.target.value })}
                        placeholder="E.g., Web Development"
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="serviceIcon" className="text-white">
                        Icon Name
                      </Label>
                      <Input
                        id="serviceIcon"
                        value={newService.icon}
                        onChange={(e) => setNewService({ ...newService, icon: e.target.value })}
                        placeholder="E.g., Code, Figma, Smartphone"
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="serviceDescription" className="text-white">
                      Description
                    </Label>
                    <Textarea
                      id="serviceDescription"
                      value={newService.description}
                      onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                      placeholder="Describe the service you provide"
                      className="bg-gray-700 border-gray-600 text-white resize-none h-20"
                    />
                  </div>
                  <Button onClick={handleAddService} className="bg-purple-600 hover:bg-purple-700">
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
                        <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center">
                          <span className="text-purple-500">{service.icon}</span>
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
                      <h3 className="font-bold text-white mb-1">{service.title}</h3>
                      <p className="text-sm text-gray-300">{service.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
