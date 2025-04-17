import { Metadata } from "next";
import Image from "next/image";
import { Quote } from "lucide-react";
import ScrollNavbar from "@/components/layout/scroll-navbar";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { JSX } from "react";

// Types
interface Testimonial {
  name: string;
  position: string;
  content: string;
  avatar: string;
  company: string;
}

interface TestimonialFormData {
  name: string;
  email: string;
  position: string;
  company: string;
  testimonial: string;
  avatar: string; // Add this line
}

// Metadata
export const metadata: Metadata = {
  title: "Testimonials | Najim's Portfolio",
  description:
    "Read what clients and colleagues have to say about working with Najim.",
  openGraph: {
    title: "Testimonials | Najim's Portfolio",
    description:
      "Read what clients and colleagues have to say about working with Najim.",
    type: "website",
  },
};

// Mock data
const testimonials: Testimonial[] = [
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
];

export default function TestimonialsPage(): JSX.Element {
  const handleSubmit = async (formData: FormData): Promise<void> => {
    "use server";

    const testimonialData: TestimonialFormData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      position: formData.get("position") as string,
      company: formData.get("company") as string,
      testimonial: formData.get("testimonial") as string,
      avatar: formData.get("avatar") as string || "/placeholder.svg?height=100&width=100", // Add this line
    };
    console.log(testimonialData);

    // Handle form submission logic here
  };

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
              Don&#39;t just take my word for it. Here&#39;s what clients and
              colleagues have to say about working with me.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div
                  key={`testimonial-${testimonial.name}-${index}`}
                  className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-purple-500/50 transition-all relative"
                >
                  <Quote
                    className="absolute top-6 right-6 w-10 h-10 text-purple-500/20"
                    aria-hidden="true"
                  />

                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                      <Image
                        src={testimonial.avatar}
                        alt={`${testimonial.name}'s profile picture`}
                        width={48}
                        height={48}
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h2 className="font-bold text-purple-400">
                        {testimonial.name}
                      </h2>
                      <p className="text-sm text-gray-400">
                        {testimonial.position}
                      </p>
                      <p className="text-xs text-gray-500">
                        {testimonial.company}
                      </p>
                    </div>
                  </div>

                  <blockquote>
                    <p className="text-gray-300 italic">
                      &#34;{testimonial.content}&#34;
                    </p>
                  </blockquote>
                </div>
              ))}
            </div>

            <div className="mt-16 bg-gray-800 p-8 rounded-xl border border-gray-700">
              <h2 className="text-2xl font-bold mb-6 text-center">
                Would you like to share your experience?
              </h2>
              <p className="text-gray-400 text-center mb-8">
                If you&#39;ve worked with me and would like to share your
                feedback, I&#39;d love to hear from you.
              </p>

              <form
                action={handleSubmit}
                className="max-w-2xl mx-auto space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium mb-2"
                    >
                      Your Name
                    </label>
                    <Input
                      type="text"
                      id="name"
                      name="name"
                      className="bg-gray-700 border-gray-600 focus:ring-purple-500"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium mb-2"
                    >
                      Your Email
                    </label>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      className="bg-gray-700 border-gray-600 focus:ring-purple-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="position"
                    className="block text-sm font-medium mb-2"
                  >
                    Your Position
                  </label>
                  <Input
                    type="text"
                    id="position"
                    name="position"
                    className="bg-gray-700 border-gray-600 focus:ring-purple-500"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="company"
                    className="block text-sm font-medium mb-2"
                  >
                    Company Name
                  </label>
                  <Input
                    type="text"
                    id="company"
                    name="company"
                    className="bg-gray-700 border-gray-600 focus:ring-purple-500"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="testimonial"
                    className="block text-sm font-medium mb-2"
                  >
                    Your Testimonial
                  </label>
                  <Textarea
                    id="testimonial"
                    name="testimonial"
                    rows={5}
                    className="bg-gray-700 border-gray-600 focus:ring-purple-500"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="avatar" className="block text-sm font-medium mb-2">
                    Your Photo URL
                  </label>
                  <Input
                    type="text"
                    id="avatar"
                    name="avatar"
                    placeholder="Enter your photo URL (e.g., https://example.com/photo.jpg)"
                    className="bg-gray-700 border-gray-600 focus:ring-purple-500"
                  />
                  {/* Preview */}
                  <div className="mt-4">
                    <label className="block text-sm font-medium mb-2">Photo Preview</label>
                    <div className="relative w-24 h-24 rounded-full overflow-hidden bg-gray-700">
                      <Image
                        id="avatar-preview"
                        src={
                          (document.getElementById("avatar") as HTMLInputElement)?.value ||
                          "/placeholder.svg?height=100&width=100"
                        }
                        alt="Avatar preview"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <Button
                    type="submit"
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    Submit Testimonial
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
