"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import {
  Heading5Icon as Html5,
  CodepenIcon as Css3,
  CodepenIcon as Javascript,
  CodepenIcon as ReactLogo,
  ForwardIcon as Nextjs,
  WindIcon as Tailwind,
  Figma,
  GitGraphIcon as Git,
} from "lucide-react"

const skills = [
  { name: "HTML5", icon: Html5, color: "text-orange-500" },
  { name: "CSS3", icon: Css3, color: "text-blue-500" },
  { name: "JavaScript", icon: Javascript, color: "text-yellow-500" },
  { name: "React", icon: ReactLogo, color: "text-cyan-400" },
  { name: "Next.js", icon: Nextjs, color: "text-white" },
  { name: "Tailwind CSS", icon: Tailwind, color: "text-cyan-500" },
  { name: "Figma", icon: Figma, color: "text-purple-400" },
  { name: "Git", icon: Git, color: "text-orange-600" },
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
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-center">
            My <span className="text-purple-500">Skills</span>
          </h2>
          <div className="w-20 h-1 bg-purple-500 mx-auto mb-10"></div>

          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6"
          >
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-gray-900 rounded-lg p-6 flex flex-col items-center justify-center hover:bg-gray-700 transition-colors border border-gray-700 hover:border-purple-500/50"
              >
                <skill.icon className={`w-12 h-12 mb-4 ${skill.color}`} />
                <h3 className="font-medium text-center">{skill.name}</h3>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
