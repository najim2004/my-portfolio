"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Code, Figma, Globe, Smartphone, Sparkles, Zap } from "lucide-react"

const services = [
  {
    icon: Code,
    title: "Web Development",
    description: "Custom websites and web applications built with modern technologies and best practices.",
    side: "left",
  },
  {
    icon: Figma,
    title: "UI/UX Design",
    description: "User-centered design solutions that are both beautiful and functional.",
    side: "right",
  },
  {
    icon: Smartphone,
    title: "Mobile Development",
    description: "Native and cross-platform mobile applications for iOS and Android.",
    side: "left",
  },
  {
    icon: Globe,
    title: "SEO Optimization",
    description: "Improve your website's visibility and ranking in search engine results.",
    side: "right",
  },
  {
    icon: Zap,
    title: "Performance Optimization",
    description: "Speed up your website and improve user experience with performance optimizations.",
    side: "left",
  },
  {
    icon: Sparkles,
    title: "API Development",
    description: "Custom API development and integration with third-party services.",
    side: "right",
  },
]

export default function Services() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
    <section id="services" className="py-20 bg-gray-900">
      <div className="container px-4 mx-auto">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-center">
            Services I <span className="text-purple-500">Provide</span>
          </h2>
          <div className="w-20 h-1 bg-purple-500 mx-auto mb-4"></div>
          <p className="text-gray-400 text-center max-w-2xl mx-auto mb-16">
            I offer a wide range of services to help you build and grow your online presence.
          </p>

          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="relative"
          >
            {/* Central line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500/50 via-purple-600/50 to-purple-500/50 transform -translate-x-1/2 hidden md:block"></div>

            {/* Services */}
            <div className="space-y-16 md:space-y-24 relative">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className={`flex flex-col ${service.side === "left" ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-8`}
                >
                  {/* Service card */}
                  <div className={`w-full md:w-5/12 ${service.side === "left" ? "md:text-right" : "md:text-left"}`}>
                    <div className="relative group">
                      {/* Animated border */}
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-gradient-xy"></div>

                      <div className="relative bg-gray-800 p-6 rounded-lg border border-gray-700 group-hover:border-purple-500/50 transition-all">
                        <div
                          className={`flex items-center ${service.side === "left" ? "md:justify-end" : "md:justify-start"} mb-4`}
                        >
                          <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center mr-4 md:order-1">
                            <service.icon className="w-6 h-6 text-purple-500" />
                          </div>
                          <h3 className="text-xl font-bold">{service.title}</h3>
                        </div>
                        <p className="text-gray-400">{service.description}</p>
                      </div>
                    </div>
                  </div>

                  {/* Central node */}
                  <div className="hidden md:flex w-2/12 justify-center">
                    <div className="w-6 h-6 rounded-full bg-purple-600 border-4 border-gray-900 z-10"></div>
                  </div>

                  {/* Empty space for alignment */}
                  <div className="hidden md:block w-5/12"></div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
