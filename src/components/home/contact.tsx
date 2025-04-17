"use client"

import { useRef, FormEvent, JSX } from "react"
import { motion, useInView, Variants } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Github, Linkedin, Twitter } from "lucide-react"

// Types
interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface SocialLink {
  platform: string;
  url: string;
  icon: JSX.Element;
}

interface ContactProps {
  email: string;
  phone: string;
  location: string;
  socialLinks: {
    github: string;
    linkedin: string;
    twitter: string;
  };
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
}

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6 },
  },
}

export default function Contact({
  email,
  phone,
  location,
  socialLinks,
}: ContactProps): JSX.Element {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const socialIcons: SocialLink[] = [
    {
      platform: "GitHub",
      url: socialLinks.github,
      icon: <Github className="w-5 h-5" aria-hidden="true" />,
    },
    {
      platform: "LinkedIn",
      url: socialLinks.linkedin,
      icon: <Linkedin className="w-5 h-5" aria-hidden="true" />,
    },
    {
      platform: "Twitter",
      url: socialLinks.twitter,
      icon: <Twitter className="w-5 h-5" aria-hidden="true" />,
    },
  ]

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    
    const form = e.currentTarget
    const formData = new FormData(form)
    
    const contactData: ContactFormData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contactData),
      })

      if (!response.ok) {
        throw new Error("Failed to send message")
      }

      form.reset()
      alert("Message sent successfully!")
    } catch (error) {
      console.error("Error sending message:", error)
      alert("Failed to send message. Please try again.")
    }
  }

  return (
    <section id="contact" className="py-20 bg-gray-800">
      <div className="container px-4 mx-auto">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-center">
            Get In <span className="text-purple-500">Touch</span>
          </h2>
          <div className="w-20 h-1 bg-purple-500 mx-auto mb-10"></div>

          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid md:grid-cols-2 gap-10"
          >
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-bold mb-6 text-purple-400">Contact Information</h3>

              <div className="space-y-6 mb-8">
                <div className="flex items-start">
                  <Mail className="w-5 h-5 text-purple-500 mt-1 mr-4" />
                  <div>
                    <h4 className="font-medium mb-1">Email</h4>
                    <p className="text-gray-400">{email}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="w-5 h-5 text-purple-500 mt-1 mr-4" />
                  <div>
                    <h4 className="font-medium mb-1">Phone</h4>
                    <p className="text-gray-400">{phone}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-purple-500 mt-1 mr-4" />
                  <div>
                    <h4 className="font-medium mb-1">Location</h4>
                    <p className="text-gray-400">{location}</p>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-bold mb-4">Connect With Me</h3>
              <div className="flex space-x-4">
                {socialIcons.map((link) => (
                  <a
                    key={link.platform}
                    href={link.url}
                    className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center hover:bg-purple-600 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.platform}
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-bold mb-6 text-purple-400">Send Me a Message</h3>

              <form className="space-y-6" onSubmit={handleSubmit} noValidate>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Your Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="John Doe"
                      className="bg-gray-700 border-gray-600 focus:border-purple-500"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Your Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      className="bg-gray-700 border-gray-600 focus:border-purple-500"
                      required
                      pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    placeholder="Project Inquiry"
                    className="bg-gray-700 border-gray-600 focus:border-purple-500"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Your message here..."
                    className="bg-gray-700 border-gray-600 focus:border-purple-500 min-h-[150px]"
                    required
                  />
                </div>

                <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
                  Send Message
                </Button>
              </form>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
