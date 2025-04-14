"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

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
              {/* Animated glow effect */}
              <div className="absolute -inset-4 rounded-xl bg-purple-500/20 blur-xl"></div>

              {/* Animated border */}
              <div className="relative">
                <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 opacity-75 blur-sm group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-gradient-xy"></div>
                <div className="relative aspect-square overflow-hidden rounded-xl border-2 border-purple-500/50">
                  <Image
                    src="https://ik.imagekit.io/golcqzkpl/1735059192393-ujna0s_CWpLw83fa?updatedAt=1735059196909"
                    alt="Najim"
                    width={400}
                    height={400}
                    className="object-cover w-full h-full"
                  />

                  {/* Corner accents */}
                  <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-purple-500"></div>
                  <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-purple-500"></div>
                  <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-purple-500"></div>
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-purple-500"></div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-4 text-purple-400">Full Stack Developer</h3>
              <p className="text-gray-300 mb-6">
                I'm a passionate full stack developer with a keen eye for design and a love for creating intuitive,
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

              <Button asChild className="group">
                <Link href="/about">
                  More About Me
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
