"use client"

import { JSX, useRef } from "react"
import { motion, useInView, Variants } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Github, Star, GitFork } from "lucide-react"

// Types
interface GithubStats {
  totalContributions: number;
  followers: number;
  following: number;
  stars: number;
  repos: number;
}

interface Repository {
  name: string;
  description: string;
  stars: number;
  forks: number;
  language: string;
  languageColor: string;
}

type ContributionMatrix = number[][];

// Animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5 },
  },
}

// Mock data
const githubStats: GithubStats = {
  totalContributions: 1243,
  followers: 156,
  following: 89,
  stars: 342,
  repos: 48,
}

const pinnedRepos: Repository[] = [
  {
    name: "next-portfolio",
    description: "A modern portfolio website built with Next.js and Tailwind CSS.",
    stars: 124,
    forks: 45,
    language: "TypeScript",
    languageColor: "#3178c6",
  },
  {
    name: "react-dashboard",
    description: "A responsive admin dashboard template built with React and Chart.js.",
    stars: 98,
    forks: 32,
    language: "JavaScript",
    languageColor: "#f7df1e",
  },
  {
    name: "ecommerce-platform",
    description: "A full-stack e-commerce platform with Next.js, MongoDB, and Stripe.",
    stars: 87,
    forks: 29,
    language: "TypeScript",
    languageColor: "#3178c6",
  },
  {
    name: "ai-image-generator",
    description: "An AI-powered image generator using OpenAI's DALL-E API.",
    stars: 76,
    forks: 21,
    language: "Python",
    languageColor: "#3572A5",
  },
]

// Generate contribution data
const contributionData: ContributionMatrix = Array.from({ length: 52 }, () =>
  Array.from({ length: 7 }, () => Math.floor(Math.random() * 5))
)

export default function GithubStats(): JSX.Element {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  const getContributionColor = (count: number): string => {
    if (count === 0) return "bg-gray-800"
    if (count === 1) return "bg-purple-900"
    if (count === 2) return "bg-purple-700"
    if (count === 3) return "bg-purple-600"
    return "bg-purple-500"
  }

  const months: string[] = Array.from({ length: 12 }).map((_, i) => 
    new Date(0, i).toLocaleString("default", { month: "short" })
  )

  const weekDays: string[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  return (
    <section id="github-stats" className="py-20 bg-gray-900">
      <div className="container px-4 mx-auto">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-center">
            GitHub <span className="text-purple-500">Stats</span>
          </h2>
          <div className="w-20 h-1 bg-purple-500 mx-auto mb-10"></div>

          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-10"
          >
            {/* GitHub Stats Overview */}
            <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {Object.entries(githubStats).map(([key, value]) => (
                <div 
                  key={key}
                  className="bg-gray-800 rounded-lg p-4 text-center"
                >
                  <p className="text-3xl font-bold text-purple-400">{value}</p>
                  <p className="text-sm text-gray-400">
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </p>
                </div>
              ))}
            </motion.div>

            {/* Contribution Graph */}
            <motion.div variants={itemVariants} className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">Contribution Graph</h3>
              <div className="overflow-x-auto">
                <div className="min-w-[800px]">
                  <div className="flex justify-between mb-2">
                    {months.map((month, i) => (
                      <span key={i} className="text-xs text-gray-400">
                        {month}
                      </span>
                    ))}
                  </div>
                  <div className="flex">
                    <div className="flex flex-col justify-between mr-2">
                      {weekDays.map((day, i) => (
                        <span key={i} className="text-xs text-gray-400 h-3">
                          {day}
                        </span>
                      ))}
                    </div>
                    <div className="grid grid-cols-52 gap-1">
                      {contributionData.map((week, weekIndex) => (
                        <div key={weekIndex} className="flex flex-col gap-1">
                          {week.map((day, dayIndex) => (
                            <div
                              key={`${weekIndex}-${dayIndex}`}
                              className={`w-3 h-3 rounded-sm ${getContributionColor(day)}`}
                              title={`${day} contributions`}
                            />
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Pinned Repositories */}
            <motion.div variants={itemVariants}>
              <h3 className="text-xl font-bold mb-4">Pinned Repositories</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {pinnedRepos.map((repo, index) => (
                  <div
                    key={`repo-${repo.name}-${index}`}
                    className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-purple-500/50 transition-all"
                  >
                    <div className="flex items-center mb-2">
                      <Github className="w-5 h-5 text-purple-400 mr-2" />
                      <h4 className="font-bold text-purple-400">{repo.name}</h4>
                    </div>
                    <p className="text-gray-300 text-sm mb-4">{repo.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div
                          className="w-3 h-3 rounded-full mr-1"
                          style={{ backgroundColor: repo.languageColor }}
                        ></div>
                        <span className="text-xs text-gray-400">{repo.language}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-gray-400 mr-1" />
                          <span className="text-xs text-gray-400">{repo.stars}</span>
                        </div>
                        <div className="flex items-center">
                          <GitFork className="w-4 h-4 text-gray-400 mr-1" />
                          <span className="text-xs text-gray-400">{repo.forks}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <div className="flex justify-center">
              <Button 
                className="bg-gray-800 hover:bg-gray-700" 
                asChild
              >
                <a 
                  href="https://github.com/username" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center"
                >
                  <Github className="w-5 h-5 mr-2" aria-hidden="true" />
                  View GitHub Profile
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
