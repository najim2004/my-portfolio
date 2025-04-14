import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Download, Mail } from "lucide-react"
import ScrollNavbar from "@/components/layout/scroll-navbar"
import Footer from "@/components/layout/footer"
import Link from "next/link"

export const metadata = {
  title: "About Me | Najim's Portfolio",
  description: "Learn more about Najim, a full stack developer with expertise in modern web technologies.",
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-900 text-gray-100">
      <ScrollNavbar />

      <div className="pt-24 pb-16">
        <div className="container px-4 mx-auto">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
              About <span className="text-purple-500">Me</span>
            </h1>
            <p className="text-gray-400 text-center max-w-2xl mx-auto mb-12">
              Get to know more about me, my background, and what drives my passion for web development.
            </p>

            <div className="grid md:grid-cols-3 gap-10">
              <div className="md:col-span-1">
                <div className="sticky top-24">
                  <div className="relative">
                    <div className="absolute -inset-4 rounded-xl bg-purple-500/20 blur-xl"></div>
                    <div className="relative aspect-square overflow-hidden rounded-xl border-2 border-purple-500/50">
                      <Image
                        src="https://ik.imagekit.io/golcqzkpl/1735059192393-ujna0s_CWpLw83fa?updatedAt=1735059196909"
                        alt="Najim"
                        width={400}
                        height={400}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>

                  <div className="mt-8 space-y-4">
                    <Button className="w-full bg-purple-600 hover:bg-purple-700">
                      <Download className="mr-2 h-4 w-4" />
                      Download Resume
                    </Button>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="#contact">
                        <Mail className="mr-2 h-4 w-4" />
                        Contact Me
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>

              <div className="md:col-span-2">
                <h2 className="text-3xl font-bold mb-6">Who Am I?</h2>
                <p className="text-gray-300 mb-6">
                  I'm Najim, a passionate Full Stack Developer based in San Francisco, California. With over 5 years of
                  experience in web development, I specialize in creating responsive, user-friendly websites and
                  applications that deliver exceptional user experiences.
                </p>
                <p className="text-gray-300 mb-6">
                  My journey in web development began during my college years when I built my first website for a local
                  business. Since then, I've been constantly learning and adapting to new technologies and methodologies
                  to stay at the forefront of the industry.
                </p>

                <h2 className="text-3xl font-bold mt-10 mb-6">My Approach</h2>
                <p className="text-gray-300 mb-6">
                  I believe in a user-centered approach to development, focusing on creating intuitive interfaces and
                  seamless experiences. My process involves understanding the client's needs, researching the target
                  audience, and implementing solutions that are both functional and aesthetically pleasing.
                </p>
                <p className="text-gray-300 mb-6">
                  I'm passionate about clean code, performance optimization, and accessibility. I strive to build
                  applications that are not only visually appealing but also fast, reliable, and accessible to all
                  users.
                </p>

                <h2 className="text-3xl font-bold mt-10 mb-6">Education & Experience</h2>
                <div className="space-y-6">
                  <div className="border-l-2 border-purple-500 pl-6 py-2">
                    <h3 className="text-xl font-bold">Bachelor of Science in Computer Science</h3>
                    <p className="text-gray-400">University of California, Berkeley | 2015-2019</p>
                  </div>

                  <div className="border-l-2 border-purple-500 pl-6 py-2">
                    <h3 className="text-xl font-bold">Senior Frontend Developer</h3>
                    <p className="text-gray-400">TechCorp Inc. | 2021-Present</p>
                    <ul className="list-disc list-inside text-gray-300 mt-2">
                      <li>Lead development of company's flagship web application</li>
                      <li>Implemented modern frontend architecture using Next.js and TypeScript</li>
                      <li>Improved application performance by 40%</li>
                    </ul>
                  </div>

                  <div className="border-l-2 border-purple-500 pl-6 py-2">
                    <h3 className="text-xl font-bold">Full Stack Developer</h3>
                    <p className="text-gray-400">WebSolutions | 2019-2021</p>
                    <ul className="list-disc list-inside text-gray-300 mt-2">
                      <li>Developed and maintained client websites and applications</li>
                      <li>Collaborated with design team to implement responsive UI/UX</li>
                      <li>Worked with various APIs and third-party integrations</li>
                    </ul>
                  </div>
                </div>

                <h2 className="text-3xl font-bold mt-10 mb-6">Skills & Technologies</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <h3 className="font-bold mb-2">Frontend</h3>
                    <ul className="text-gray-300 space-y-1">
                      <li>HTML5, CSS3, JavaScript</li>
                      <li>React, Next.js</li>
                      <li>TypeScript</li>
                      <li>Tailwind CSS, SASS</li>
                    </ul>
                  </div>

                  <div className="bg-gray-800 p-4 rounded-lg">
                    <h3 className="font-bold mb-2">Backend</h3>
                    <ul className="text-gray-300 space-y-1">
                      <li>Node.js, Express</li>
                      <li>Python, Django</li>
                      <li>RESTful APIs</li>
                      <li>GraphQL</li>
                    </ul>
                  </div>

                  <div className="bg-gray-800 p-4 rounded-lg">
                    <h3 className="font-bold mb-2">Database</h3>
                    <ul className="text-gray-300 space-y-1">
                      <li>MongoDB</li>
                      <li>PostgreSQL</li>
                      <li>MySQL</li>
                      <li>Firebase</li>
                    </ul>
                  </div>

                  <div className="bg-gray-800 p-4 rounded-lg">
                    <h3 className="font-bold mb-2">DevOps</h3>
                    <ul className="text-gray-300 space-y-1">
                      <li>Git, GitHub</li>
                      <li>Docker</li>
                      <li>CI/CD</li>
                      <li>AWS, Vercel</li>
                    </ul>
                  </div>

                  <div className="bg-gray-800 p-4 rounded-lg">
                    <h3 className="font-bold mb-2">Design</h3>
                    <ul className="text-gray-300 space-y-1">
                      <li>Figma</li>
                      <li>Adobe XD</li>
                      <li>Responsive Design</li>
                      <li>UI/UX Principles</li>
                    </ul>
                  </div>

                  <div className="bg-gray-800 p-4 rounded-lg">
                    <h3 className="font-bold mb-2">Other</h3>
                    <ul className="text-gray-300 space-y-1">
                      <li>Agile Methodology</li>
                      <li>Problem Solving</li>
                      <li>Team Collaboration</li>
                      <li>Project Management</li>
                    </ul>
                  </div>
                </div>

                <h2 className="text-3xl font-bold mt-10 mb-6">Interests & Hobbies</h2>
                <p className="text-gray-300 mb-6">
                  When I'm not coding, you can find me hiking in the mountains, reading science fiction novels, or
                  experimenting with new recipes in the kitchen. I'm also an avid photographer and enjoy capturing
                  landscapes and urban scenes.
                </p>
                <p className="text-gray-300 mb-6">
                  I believe in continuous learning and regularly attend tech conferences, workshops, and meetups to stay
                  connected with the developer community and keep up with the latest trends and technologies.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
