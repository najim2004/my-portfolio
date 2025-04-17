import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Download, Mail } from "lucide-react";
import ScrollNavbar from "@/components/layout/scroll-navbar";
import Footer from "@/components/layout/footer";
import { notFound } from "next/navigation";
import { AboutData } from "@/types/api/about.types";

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

async function getAboutData(): Promise<AboutData> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/about`, {
      method: "GET",
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch about data: ${res.status}`);
    }

    return res.json();
  } catch (error) {
    console.error("Failed to fetch about data:", error);
    throw error;
  }
}

export default async function AboutPage() {
  const data = await getAboutData().catch(() => {
    notFound();
  });

  const {
    user,
    educations = [],
    experiences = [],
    skillCategories = [],
    skills = [],
  } = data;
  console.log(data);

  return (
    <main className="min-h-screen bg-gray-900 text-gray-100">
      <ScrollNavbar />

      <section className="pt-24 pb-16">
        <div className="container px-4 mx-auto">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <header className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                About <span className="text-purple-500">Me</span>
              </h1>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Get to know more about me, my background, and what drives my
                passion for web development.
              </p>
            </header>

            <div className="grid md:grid-cols-3 gap-10">
              {/* Profile Section */}
              <aside className="md:col-span-1">
                <div className="sticky top-24">
                  <div className="relative">
                    <div className="absolute -inset-4 rounded-xl bg-purple-500/20 blur-xl" />
                    <div className="relative aspect-square overflow-hidden rounded-xl border-2 border-purple-500/50">
                      <Image
                        src={
                          user?.profileImage ||
                          "https://ik.imagekit.io/golcqzkpl/1735059192393-ujna0s_CWpLw83fa"
                        }
                        alt="Profile picture"
                        width={400}
                        height={400}
                        className="object-cover w-full h-full"
                        priority
                        sizes="(max-width: 768px) 100vw, 400px"
                      />
                    </div>
                  </div>

                  <div className="mt-8 space-y-4">
                    {user?.resumeUrl && (
                      <Button
                        className="w-full bg-purple-600 hover:bg-purple-700"
                        asChild
                      >
                        <Link
                          href={user.resumeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Download
                            className="mr-2 h-4 w-4"
                            aria-hidden="true"
                          />
                          Download Resume
                        </Link>
                      </Button>
                    )}
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/contact">
                        <Mail className="mr-2 h-4 w-4" aria-hidden="true" />
                        Contact Me
                      </Link>
                    </Button>
                  </div>
                </div>
              </aside>

              {/* Main Content */}
              <div className="md:col-span-2">
                {user?.about && (
                  <section className="mb-10">
                    <h2 className="text-3xl font-bold mb-6">Who Am I?</h2>
                    <div
                      className="prose prose-lg prose-invert w-full !max-w-none"
                      dangerouslySetInnerHTML={{ __html: user.about }}
                    />
                  </section>
                )}

                {user?.approach && (
                  <section className="mb-10">
                    <h2 className="text-3xl font-bold mb-6">My Approach</h2>
                    <div
                      className="prose prose-lg prose-invert w-full !max-w-none"
                      dangerouslySetInnerHTML={{ __html: user.approach }}
                    />
                  </section>
                )}

                {(educations.length > 0 || experiences.length > 0) && (
                  <section className="mb-10">
                    <h2 className="text-3xl font-bold mb-6">
                      Education & Experience
                    </h2>
                    <div className="space-y-6">
                      {educations.map((edu, index) => (
                        <div
                          key={edu._id || index}
                          className="border-l-2 border-purple-500 pl-6 py-2"
                        >
                          <h3 className="text-xl font-bold">{edu.degree}</h3>
                          <p className="text-gray-400">
                            {edu.institution} | {edu.years}
                          </p>
                        </div>
                      ))}

                      {experiences.map((exp, index) => (
                        <div
                          key={exp._id || index}
                          className="border-l-2 border-purple-500 pl-6 py-2"
                        >
                          <h3 className="text-xl font-bold">{exp.position}</h3>
                          <p className="text-gray-400">
                            {exp.company} | {exp.years}
                          </p>
                          {exp.description && (
                            <div
                              className="prose prose-lg prose-invert w-full !max-w-none"
                              dangerouslySetInnerHTML={{
                                __html: exp.description,
                              }}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {skillCategories.length > 0 && (
                  <section className="mb-10">
                    <h2 className="text-3xl font-bold mb-6">
                      Skills & Technologies
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {skillCategories.map((category) => (
                        <div
                          key={category._id}
                          className="bg-gray-800 p-4 rounded-lg"
                        >
                          <h3 className="font-bold mb-2">{category.name}</h3>
                          <ul className="text-gray-300 space-y-1">
                            {skills
                              .filter(
                                (skill) =>
                                  skill.categoryId?.toString() === category._id
                              )
                              .map((skill) => (
                                <li key={skill._id}>{skill.name}</li>
                              ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {user?.hobbies && (
                  <section>
                    <h2 className="text-3xl font-bold mb-6">
                      Interests & Hobbies
                    </h2>
                    <div
                      className="prose prose-lg prose-invert w-full !max-w-none"
                      dangerouslySetInnerHTML={{ __html: user.hobbies }}
                    />
                  </section>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
