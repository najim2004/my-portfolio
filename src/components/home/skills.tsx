"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"

// Define actual technologies with their logos and categories
const skills = [
  {
    name: "HTML5",
    icon: "/placeholder.svg?height=60&width=60",
    category: "Frontend",
    color: "border-orange-500",
    background: "bg-orange-500/10",
  },
  {
    name: "CSS3",
    icon: "/placeholder.svg?height=60&width=60",
    category: "Frontend",
    color: "border-blue-500",
    background: "bg-blue-500/10",
  },
  {
    name: "JavaScript",
    icon: "/placeholder.svg?height=60&width=60",
    category: "Frontend",
    color: "border-yellow-500",
    background: "bg-yellow-500/10",
  },
  {
    name: "TypeScript",
    icon: "/placeholder.svg?height=60&width=60",
    category: "Frontend",
    color: "border-blue-600",
    background: "bg-blue-600/10",
  },
  {
    name: "React",
    icon: "/placeholder.svg?height=60&width=60",
    category: "Frontend",
    color: "border-cyan-500",
    background: "bg-cyan-500/10",
  },
  {
    name: "Next.js",
    icon: "/placeholder.svg?height=60&width=60",
    category: "Frontend",
    color: "border-gray-500",
    background: "bg-gray-500/10",
  },
  {
    name: "Tailwind CSS",
    icon: "/placeholder.svg?height=60&width=60",
    category: "Frontend",
    color: "border-cyan-400",
    background: "bg-cyan-400/10",
  },
  {
    name: "Node.js",
    icon: "/placeholder.svg?height=60&width=60",
    category: "Backend",
    color: "border-green-500",
    background: "bg-green-500/10",
  },
  {
    name: "Express",
    icon: "/placeholder.svg?height=60&width=60",
    category: "Backend",
    color: "border-gray-500",
    background: "bg-gray-500/10",
  },
  {
    name: "MongoDB",
    icon: "/placeholder.svg?height=60&width=60",
    category: "Backend",
    color: "border-green-600",
    background: "bg-green-600/10",
  },
  {
    name: "PostgreSQL",
    icon: "/placeholder.svg?height=60&width=60",
    category: "Backend",
    color: "border-blue-700",
    background: "bg-blue-700/10",
  },
  {
    name: "GraphQL",
    icon: "/placeholder.svg?height=60&width=60",
    category: "Backend",
    color: "border-pink-600",
    background: "bg-pink-600/10",
  },
  {
    name: "Docker",
    icon: "/placeholder.svg?height=60&width=60",
    category: "DevOps",
    color: "border-blue-500",
    background: "bg-blue-500/10",
  },
  {
    name: "Git",
    icon: "/placeholder.svg?height=60&width=60",
    category: "DevOps",
    color: "border-orange-600",
    background: "bg-orange-600/10",
  },
  {
    name: "Figma",
    icon: "/placeholder.svg?height=60&width=60",
    category: "Design",
    color: "border-purple-500",
    background: "bg-purple-500/10",
  },
  {
    name: "Adobe XD",
    icon: "/placeholder.svg?height=60&width=60",
    category: "Design",
    color: "border-pink-500",
    background: "bg-pink-500/10",
  },
]

export default function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section id="skills" className="py-20 bg-gray-800">
      <div className="container px-4 mx-auto">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-center">
            My <span className="text-purple-500">Skills</span>
          </h2>
          <div className="w-20 h-1 bg-purple-500 mx-auto mb-10"></div>

          {/* Filter buttons */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            <button className="px-4 py-2 rounded-full bg-purple-600 text-white">All</button>
            <button className="px-4 py-2 rounded-full bg-gray-700 text-white hover:bg-purple-600 transition-colors">
              Frontend
            </button>
            <button className="px-4 py-2 rounded-full bg-gray-700 text-white hover:bg-purple-600 transition-colors">
              Backend
            </button>
            <button className="px-4 py-2 rounded-full bg-gray-700 text-white hover:bg-purple-600 transition-colors">
              DevOps
            </button>
            <button className="px-4 py-2 rounded-full bg-gray-700 text-white hover:bg-purple-600 transition-colors">
              Design
            </button>
          </div>

          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-6"
          >
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{
                  scale: 1.1,
                  transition: { duration: 0.2 },
                }}
                className={`group relative flex flex-col items-center justify-center p-4 rounded-lg ${skill.background} border ${skill.color} hover:border-opacity-100 border-opacity-50 transition-all duration-300`}
              >
                {/* Animated glow on hover */}
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500"></div>

                <div className="relative">
                  <Image
                    src={skill.icon || "/placeholder.svg"}
                    alt={skill.name}
                    width={60}
                    height={60}
                    className="mb-2 transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <p className="text-sm font-medium text-center">{skill.name}</p>
                <span className="text-xs text-gray-400 mt-1">{skill.category}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
