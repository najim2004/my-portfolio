import Hero from "@/components/home/hero"
import About from "@/components/home/about"
import Skills from "@/components/home/skills"
import Services from "@/components/home/services"
import Projects from "@/components/home/projects"
import Testimonials from "@/components/home/testimonials"
import Blogs from "@/components/home/blogs"
import GithubStats from "@/components/home/github-stats"
import Contact from "@/components/home/contact"
import Footer from "@/components/layout/footer"
import FloatingActionButton from "@/components/ui/floating-action-button"
import ScrollNavbar from "@/components/layout/scroll-navbar"
import ScrollProgress from "@/components/ui/scroll-progress"

export const metadata = {
  title: "Najim | Full Stack Developer",
  description: "Professional portfolio of Najim, a full stack developer specializing in modern web technologies.",
  openGraph: {
    title: "Najim | Full Stack Developer",
    description: "Professional portfolio of Najim, a full stack developer specializing in modern web technologies.",
    url: "https://najim.dev",
    siteName: "Najim Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Najim Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
}

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-900 text-gray-100 overflow-hidden">
      <ScrollProgress />
      <ScrollNavbar />
      <Hero />
      <About />
      <Skills />
      <Services />
      <Projects />
      <Testimonials />
      <Blogs />
      <GithubStats />
      <Contact />
      <Footer />
      <FloatingActionButton />
    </main>
  )
}
