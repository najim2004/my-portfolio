import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Download, Mail } from "lucide-react";
import ScrollNavbar from "@/components/layout/scroll-navbar";
import Footer from "@/components/layout/footer";
import { JSX } from "react";

// Types
interface Education {
  degree: string;
  institution: string;
  period: string;
}

interface Experience {
  title: string;
  company: string;
  period: string;
  achievements: string[];
}

interface SkillCategory {
  title: string;
  skills: string[];
}

// Metadata
export const metadata: Metadata = {
  title: "About Me | Najim's Portfolio",
  description:
    "Learn more about Najim, a full stack developer with expertise in modern web technologies.",
  openGraph: {
    title: "About Me | Najim's Portfolio",
    description:
      "Learn more about Najim, a full stack developer with expertise in modern web technologies.",
    images: [
      {
        url: "https://ik.imagekit.io/golcqzkpl/1735059192393-ujna0s_CWpLw83fa",
        width: 400,
        height: 400,
        alt: "Najim's profile picture",
      },
    ],
  },
};

// Data
const education: Education[] = [
  {
    degree: "Bachelor of Science in Computer Science",
    institution: "University of California, Berkeley",
    period: "2015-2019",
  },
];

const experience: Experience[] = [
  {
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    period: "2021-Present",
    achievements: [
      "Lead development of company's flagship web application",
      "Implemented modern frontend architecture using Next.js and TypeScript",
      "Improved application performance by 40%",
    ],
  },
  {
    title: "Full Stack Developer",
    company: "WebSolutions",
    period: "2019-2021",
    achievements: [
      "Developed and maintained client websites and applications",
      "Collaborated with design team to implement responsive UI/UX",
      "Worked with various APIs and third-party integrations",
    ],
  },
];

const skillCategories: SkillCategory[] = [
  {
    title: "Frontend",
    skills: [
      "HTML5, CSS3, JavaScript",
      "React, Next.js",
      "TypeScript",
      "Tailwind CSS, SASS",
    ],
  },
  {
    title: "Backend",
    skills: ["Node.js, Express", "Python, Django", "RESTful APIs", "GraphQL"],
  },
  {
    title: "Database",
    skills: ["MongoDB", "PostgreSQL", "MySQL", "Firebase"],
  },
  {
    title: "DevOps",
    skills: ["Git, GitHub", "Docker", "CI/CD", "AWS, Vercel"],
  },
  {
    title: "Design",
    skills: ["Figma", "Adobe XD", "Responsive Design", "UI/UX Principles"],
  },
  {
    title: "Other",
    skills: [
      "Agile Methodology",
      "Problem Solving",
      "Team Collaboration",
      "Project Management",
    ],
  },
];

export default function AboutPage(): JSX.Element {
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
              Get to know more about me, my background, and what drives my
              passion for web development.
            </p>

            <div className="grid md:grid-cols-3 gap-10">
              <div className="md:col-span-1">
                <div className="sticky top-24">
                  <div className="relative">
                    <div className="absolute -inset-4 rounded-xl bg-purple-500/20 blur-xl" />
                    <div className="relative aspect-square overflow-hidden rounded-xl border-2 border-purple-500/50">
                      <Image
                        src="https://ik.imagekit.io/golcqzkpl/1735059192393-ujna0s_CWpLw83fa"
                        alt="Najim's profile picture"
                        width={400}
                        height={400}
                        className="object-cover w-full h-full"
                        priority
                        sizes="(max-width: 768px) 100vw, 400px"
                      />
                    </div>
                  </div>

                  <div className="mt-8 space-y-4">
                    <Button
                      className="w-full bg-purple-600 hover:bg-purple-700"
                      onClick={() => window.open("/resume.pdf", "_blank")}
                    >
                      <Download className="mr-2 h-4 w-4" aria-hidden="true" />
                      Download Resume
                    </Button>

                    <Button variant="outline" className="w-full" asChild>
                      <Link href="#contact">
                        <Mail className="mr-2 h-4 w-4" aria-hidden="true" />
                        Contact Me
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>

              <div className="md:col-span-2">
                <h2 className="text-3xl font-bold mb-6">Who Am I?</h2>
                <p className="text-gray-300 mb-6">
                  I&#39;m Najim, a passionate Full Stack Developer based in San
                  Francisco, California. With over 5 years of experience in web
                  development, I specialize in creating responsive,
                  user-friendly websites and applications that deliver
                  exceptional user experiences.
                </p>
                <p className="text-gray-300 mb-6">
                  My journey in web development began during my college years
                  when I built my first website for a local business. Since
                  then, I&#39;ve been constantly learning and adapting to new
                  technologies and methodologies to stay at the forefront of the
                  industry.
                </p>

                <h2 className="text-3xl font-bold mt-10 mb-6">My Approach</h2>
                <p className="text-gray-300 mb-6">
                  I believe in a user-centered approach to development, focusing
                  on creating intuitive interfaces and seamless experiences. My
                  process involves understanding the client&#39;s needs,
                  researching the target audience, and implementing solutions
                  that are both functional and aesthetically pleasing.
                </p>
                <p className="text-gray-300 mb-6">
                  I&#39;m passionate about clean code, performance optimization,
                  and accessibility. I strive to build applications that are not
                  only visually appealing but also fast, reliable, and
                  accessible to all users.
                </p>

                <h2 className="text-3xl font-bold mt-10 mb-6">
                  Education & Experience
                </h2>
                <div className="space-y-6">
                  {education.map((edu, index) => (
                    <div
                      key={`education-${index}`}
                      className="border-l-2 border-purple-500 pl-6 py-2"
                    >
                      <h3 className="text-xl font-bold">{edu.degree}</h3>
                      <p className="text-gray-400">
                        {edu.institution} | {edu.period}
                      </p>
                    </div>
                  ))}

                  {experience.map((exp, index) => (
                    <div
                      key={`experience-${index}`}
                      className="border-l-2 border-purple-500 pl-6 py-2"
                    >
                      <h3 className="text-xl font-bold">{exp.title}</h3>
                      <p className="text-gray-400">
                        {exp.company} | {exp.period}
                      </p>
                      <ul className="list-disc list-inside text-gray-300 mt-2">
                        {exp.achievements.map((achievement, i) => (
                          <li key={`achievement-${i}`}>{achievement}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <h2 className="text-3xl font-bold mt-10 mb-6">
                  Skills & Technologies
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
                  {skillCategories.map((category, index) => (
                    <div
                      key={`skill-category-${index}`}
                      className="bg-gray-800 p-4 rounded-lg"
                    >
                      <h3 className="font-bold mb-2">{category.title}</h3>
                      <ul className="text-gray-300 space-y-1">
                        {category.skills.map((skill, i) => (
                          <li key={`skill-${i}`}>{skill}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <h2 className="text-3xl font-bold mt-10 mb-6">
                  Interests & Hobbies
                </h2>
                <p className="text-gray-300 mb-6">
                  When I&#39;m not coding, you can find me hiking in the
                  mountains, reading science fiction novels, or experimenting
                  with new recipes in the kitchen. I&#39;m also an avid
                  photographer and enjoy capturing landscapes and urban scenes.
                </p>
                <p className="text-gray-300 mb-6">
                  I believe in continuous learning and regularly attend tech
                  conferences, workshops, and meetups to stay connected with the
                  developer community and keep up with the latest trends and
                  technologies.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
