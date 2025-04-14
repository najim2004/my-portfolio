import { Quote } from "lucide-react"
import ScrollNavbar from "@/components/layout/scroll-navbar"
import Footer from "@/components/layout/footer"

// Mock data - in a real app, this would come from your database
const testimonials = [
  {
    name: "Sarah Johnson",
    position: "CEO at TechStart",
    content:
      "Najim delivered an exceptional website that exceeded our expectations. His attention to detail and ability to translate our vision into reality was impressive. The project was completed on time and within budget, and the results have been outstanding.",
    avatar: "/placeholder.svg?height=100&width=100",
    company: "TechStart",
  },
  {
    name: "Michael Chen",
    position: "Marketing Director",
    content:
      "Working with Najim was a pleasure. He's not only technically skilled but also brings creative ideas to the table. Our conversion rates improved significantly after the redesign. His communication throughout the project was excellent, and he was always responsive to our feedback.",
    avatar: "/placeholder.svg?height=100&width=100",
    company: "Digital Solutions Inc.",
  },
  {
    name: "Emily Rodriguez",
    position: "Product Manager",
    content:
      "Najim's expertise in front-end development helped us create a user-friendly interface that our customers love. He's responsive, professional, and delivers on time. I particularly appreciated his attention to accessibility and performance optimization.",
    avatar: "/placeholder.svg?height=100&width=100",
    company: "InnovateTech",
  },
  {
    name: "David Wilson",
    position: "Startup Founder",
    content:
      "As a startup founder with limited technical knowledge, I needed someone who could guide me through the process of building my first web application. Najim was patient, knowledgeable, and helped me understand the technical decisions. The final product has been crucial to our early success.",
    avatar: "/placeholder.svg?height=100&width=100",
    company: "LaunchPad Ventures",
  },
  {
    name: "Jennifer Lee",
    position: "E-commerce Manager",
    content:
      "Our online store needed a complete overhaul to improve user experience and increase sales. Najim redesigned our e-commerce platform with a focus on the customer journey, resulting in a 35% increase in conversion rate and a significant reduction in cart abandonment.",
    avatar: "/placeholder.svg?height=100&width=100",
    company: "StyleShop",
  },
  {
    name: "Robert Martinez",
    position: "CTO",
    content:
      "We hired Najim to help modernize our legacy web application. His expertise in modern JavaScript frameworks and best practices was invaluable. He not only improved the performance and user experience but also set up a maintainable codebase that our internal team can build upon.",
    avatar: "/placeholder.svg?height=100&width=100",
    company: "Enterprise Solutions",
  },
]

export const metadata = {
  title: "Testimonials | Najim's Portfolio",
  description: "Read what clients and colleagues have to say about working with Najim.",
}

export default function TestimonialsPage() {
  return (
    <main className="min-h-screen bg-gray-900 text-gray-100">
      <ScrollNavbar />

      <div className="pt-24 pb-16">
        <div className="container px-4 mx-auto">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
              Client <span className="text-purple-500">Testimonials</span>
            </h1>
            <p className="text-gray-400 text-center max-w-2xl mx-auto mb-12">
              Don't just take my word for it. Here's what clients and colleagues have to say about working with me.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
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
                      <p className="text-xs text-gray-500">{testimonial.company}</p>
                    </div>
                  </div>

                  <p className="text-gray-300 italic">"{testimonial.content}"</p>
                </div>
              ))}
            </div>

            <div className="mt-16 bg-gray-800 p-8 rounded-xl border border-gray-700">
              <h2 className="text-2xl font-bold mb-6 text-center">Would you like to share your experience?</h2>
              <p className="text-gray-400 text-center mb-8">
                If you've worked with me and would like to share your feedback, I'd love to hear from you.
              </p>

              <form className="max-w-2xl mx-auto space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="position" className="block text-sm font-medium mb-2">
                    Your Position
                  </label>
                  <input
                    type="text"
                    id="position"
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="company"
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="testimonial" className="block text-sm font-medium mb-2">
                    Your Testimonial
                  </label>
                  <textarea
                    id="testimonial"
                    rows={5}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  ></textarea>
                </div>

                <div className="text-center">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-md transition-colors"
                  >
                    Submit Testimonial
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
