"use client"

import { JSX } from "react"
import Link from "next/link"
import { Github, Linkedin, Twitter, Mail, LucideIcon } from "lucide-react"

// Types
interface SocialLink {
  name: string;
  href: string;
  icon: LucideIcon;
  ariaLabel: string;
}

interface QuickLink {
  name: string;
  href: string;
}

interface Service {
  name: string;
  href: string;
}

// Constants
const socialLinks: SocialLink[] = [
  {
    name: "GitHub",
    href: "https://github.com/yourusername",
    icon: Github,
    ariaLabel: "Visit my GitHub profile",
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/yourusername",
    icon: Linkedin,
    ariaLabel: "Connect with me on LinkedIn",
  },
  {
    name: "Twitter",
    href: "https://twitter.com/yourusername",
    icon: Twitter,
    ariaLabel: "Follow me on Twitter",
  },
  {
    name: "Email",
    href: "mailto:najim@example.com",
    icon: Mail,
    ariaLabel: "Send me an email",
  },
]

const quickLinks: QuickLink[] = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Projects", href: "/projects" },
  { name: "Testimonials", href: "/testimonials" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "#contact" },
]

const services: Service[] = [
  { name: "Web Development", href: "#" },
  { name: "UI/UX Design", href: "#" },
  { name: "Mobile Development", href: "#" },
  { name: "SEO Optimization", href: "#" },
  { name: "API Development", href: "#" },
]

export default function Footer(): JSX.Element {
  const currentYear: number = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link href="/" className="text-2xl font-bold text-purple-500 mb-4 inline-block">
              Najim
            </Link>
            <p className="text-gray-400 mb-6 max-w-md">
              A passionate full stack developer focused on creating interactive, accessible, and responsive web
              applications.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link) => {
                const Icon = link.icon
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-purple-600 transition-colors"
                    aria-label={link.ariaLabel}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </a>
                )
              })}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-400 hover:text-purple-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Services</h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.name}>
                  <Link 
                    href={service.href}
                    className="text-gray-400 hover:text-purple-400 transition-colors"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} Najim. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <ul className="flex space-x-6">
              <li>
                <Link 
                  href="/privacy" 
                  className="text-gray-400 hover:text-purple-400 transition-colors text-sm"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link 
                  href="/terms" 
                  className="text-gray-400 hover:text-purple-400 transition-colors text-sm"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
