"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section id="about" className="py-20 bg-gray-900">
      <div className="container px-4 mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-center">
            About <span className="text-purple-500">Me</span>
          </h2>
          <div className="w-20 h-1 bg-purple-500 mx-auto mb-10"></div>

          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="relative">
              <div className="absolute -inset-4 rounded-xl bg-purple-500/20 blur-xl"></div>
              <div className="relative aspect-square overflow-hidden rounded-xl border-2 border-purple-500/50">
                <Image
                  src="/placeholder.svg?height=400&width=400"
                  alt="Najim"
                  width={400}
                  height={400}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-4 text-purple-400">Front-End Developer</h3>
              <p className="text-gray-300 mb-6">
                I'm a passionate front-end developer with a keen eye for design and a love for creating intuitive,
                dynamic user experiences. With expertise in modern JavaScript frameworks and a strong foundation in
                HTML, CSS, and responsive design, I transform ideas into beautiful, functional websites.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-gray-400">
                    <span className="font-bold text-purple-400">Name:</span> Najim
                  </p>
                </div>
                <div>
                  <p className="text-gray-400">
                    <span className="font-bold text-purple-400">Email:</span> najim@example.com
                  </p>
                </div>
                <div>
                  <p className="text-gray-400">
                    <span className="font-bold text-purple-400">From:</span> San Francisco, CA
                  </p>
                </div>
                <div>
                  <p className="text-gray-400">
                    <span className="font-bold text-purple-400">Freelance:</span> Available
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
