import { Metadata } from "next";
import { notFound } from "next/navigation";
import Hero from "@/components/home/hero";
import About from "@/components/home/about";
import Skills from "@/components/home/skills";
import Services from "@/components/home/services";
import Projects from "@/components/home/projects";
import Testimonials from "@/components/home/testimonials";
import Blogs from "@/components/home/blogs";
import GithubStats from "@/components/home/github-stats";
import Contact from "@/components/home/contact";
import Footer from "@/components/layout/footer";
import FloatingActionButton from "@/components/ui/floating-action-button";
import ScrollNavbar from "@/components/layout/scroll-navbar";
import ScrollProgress from "@/components/ui/scroll-progress";
import { HomeData } from "@/types/api/home.types";

export const metadata: Metadata = {
  title: "Najim | Full Stack Developer",
  description:
    "Professional portfolio of Najim, a full stack developer specializing in modern web technologies.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://najim.dev"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Najim | Full Stack Developer",
    description:
      "Professional portfolio of Najim, a full stack developer specializing in modern web technologies.",
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
  twitter: {
    card: "summary_large_image",
    title: "Najim | Full Stack Developer",
    description:
      "Professional portfolio of Najim, a full stack developer specializing in modern web technologies.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

async function getHomeData(): Promise<HomeData> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/home`, {
      method: "GET",
      next: {
        revalidate: 3600, // Cache for 1 hour
        tags: ["home-data"],
      },
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch home data: ${res.status}`);
    }

    return res.json();
  } catch (error) {
    console.error("Failed to fetch home data:", error);
    throw error;
  }
}

export default async function Home() {
  const homeData = await getHomeData().catch(() => {
    notFound();
  });

  if (!homeData?.user) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-900 text-gray-100 overflow-hidden">
      <ScrollProgress />
      <ScrollNavbar />

      <Hero
        name={homeData.user.fullName}
        description="Full Stack Developer"
        designations={homeData.user.titles}
        resumeLink={homeData.user.resumeUrl}
      />

      <About
        profileImage={homeData.user.profileImage}
        email={homeData.user.email}
        name={homeData.user.fullName}
        location={homeData.user.location}
        freelanceStatus={
          homeData.user.isFreelancer ? "Available" : "Not Available"
        }
      />

      <Skills skills={homeData.skills} categories={["All"]} />

      <Services services={homeData.services} />

      <Projects projects={homeData.projects} />

      <Testimonials testimonials={homeData.testimonials} />

      <Blogs blogs={homeData.blogs} />

      <GithubStats />
      <Contact
        socialLinks={{
          github: homeData.user.socialLinks.github || "#",
          linkedin: homeData.user.socialLinks.linkedin || "#",
          twitter: homeData.user.socialLinks.twitter || "#",
        }}
        email={homeData.user.email}
        phone={homeData.user.phone || ""}
        location={homeData.user.location || ""}
      />
      <Footer />
      <FloatingActionButton
        whatsappNumber={homeData.user.phone || "01630364401"}
      />
    </main>
  );
}
