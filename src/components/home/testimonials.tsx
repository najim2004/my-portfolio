"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Quote } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Johnson",
    position: "CEO at TechStart",
    content:
      "Najim delivered an exceptional website that exceeded our expectations. His attention to detail and ability to translate our vision into reality was impressive.",
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Michael Chen",
    position: "Marketing Director",
    content:
      "Working with Najim was a pleasure. He's not only technically skilled but also brings creative ideas to the table. Our conversion rates improved significantly after the redesign.",
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Emily Rodriguez",
    position: "Product Manager",
    content:
      "Najim's expertise in front-end development helped us create a user-friendly interface that our customers love. He's responsive, professional, and delivers on time.",
    avatar: "/placeholder.svg?height=100&width=100",
  },
]

export default function Testimonials() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [activeIndex, setActiveIndex] = useState(0)

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
      transition: { duration: 0.6 },
    },
  }

  return (
    <section id="testimonials" className="py-20 bg-gray-900">
      <div className="container px-4 mx-auto">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-center">
            Client <span className="text-purple-500">Testimonials</span>
          </h2>
          <div className="w-20 h-1 bg-purple-500 mx-auto mb-10"></div>

          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid md:grid-cols-3 gap-8"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{
                  y: -10,
                  boxShadow: "0 20px 25px -5px rgba(124, 58, 237, 0.1), 0 10px 10px -5px rgba(124, 58, 237, 0.04)",
                }}
                className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-purple-500/50 transition-all relative"
              >
                <Quote className="absolute top-6 right-6 w-10 h-10 text-purple-500/20" />

                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <img
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-purple-400">{testimonial.name}</h3>
                    <p className="text-sm text-gray-400">{testimonial.position}</p>
                  </div>
                </div>

                <p className="text-gray-300 italic">"{testimonial.content}"</p>
              </motion.div>
            ))}
          </motion.div>

          <div className="flex justify-center mt-12">
            <Button asChild className="group">
              <Link href="/testimonials">
                View All Testimonials
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
