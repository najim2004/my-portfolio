"use client";

import { useRef, useState, useEffect, JSX } from "react";
import { motion, Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowDown } from "lucide-react";

// Type definitions
interface HeroProps {
  designations: string[];
  name: string;
  description: string;
  resumeLink?: string;
  aboutLink?: string;
}

const fadeInUpVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

export default function Hero({
  designations = [
    "Front-End Web Developer",
    "UI/UX Designer",
    "Mobile App Developer",
    "Web Developer",
    "Frontend Specialist",
  ],
  name = "Najim",
  description = "I build exceptional and accessible digital experiences for the web.",
  resumeLink = "#",
  aboutLink = "#about",
}: HeroProps): JSX.Element {
  const ref = useRef<HTMLElement>(null);
  const [index, setIndex] = useState<number>(0);
  const [subIndex, setSubIndex] = useState<number>(0);
  const [reverse, setReverse] = useState<boolean>(false);
  const [blink, setBlink] = useState<boolean>(true);

  // Typing effect
  useEffect((): (() => void) => {
    if (reverse) {
      if (subIndex === 0) {
        setReverse(false);
        setIndex((prev) => (prev + 1) % designations.length);
        return () => {};
      }

      const timeout = setTimeout(() => {
        setSubIndex((prev) => prev - 1);
      }, 50);

      return () => clearTimeout(timeout);
    }

    if (subIndex === designations[index].length + 1 && !reverse) {
      const timeout = setTimeout(() => {
        setReverse(true);
      }, 2000);

      return () => clearTimeout(timeout);
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + 1);
    }, 150);

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, designations]);

  // Blinking cursor effect
  useEffect((): (() => void) => {
    const timeout = setTimeout(() => {
      setBlink((prev) => !prev);
    }, 500);

    return () => clearTimeout(timeout);
  }, [blink]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden py-20 lg:py-0 bg-[#1a1533]"
    >
      <div className="container px-4 mx-auto z-10">
        <div className="flex flex-col items-center justify-center text-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-purple-400 font-medium mb-4"
          >
            {designations[index].substring(0, subIndex)}
            <span
              className={`${
                blink ? "opacity-100" : "opacity-0"
              } transition-opacity`}
            >
              |
            </span>
          </motion.p>

          <motion.h1
            initial="initial"
            animate="animate"
            variants={fadeInUpVariants}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            Hi, I&apos;m <span className="text-purple-500">{name}</span>
          </motion.h1>

          <motion.p
            initial="initial"
            animate="animate"
            variants={fadeInUpVariants}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-gray-300 text-xl md:text-2xl max-w-2xl mx-auto mb-10"
          >
            {description}
          </motion.p>

          <motion.div
            initial="initial"
            animate="animate"
            variants={fadeInUpVariants}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              size="lg"
              className="bg-purple-600 hover:bg-purple-700"
              asChild
            >
              <Link href={resumeLink}>Download Resume</Link>
            </Button>

            <Button
              variant="outline"
              size="lg"
              asChild
              className="bg-white text-gray-900 hover:bg-gray-100 border-white"
            >
              <Link href={"/projects"}>View My Work</Link>
            </Button>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 1.2,
          duration: 0.8,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
        className="absolute bottom-10 text-center"
      >
        <Link
          href={aboutLink}
          className="flex flex-col items-center text-gray-400 hover:text-purple-400 transition-colors"
        >
          <span className="text-sm mb-2">Scroll Down</span>
          <ArrowDown size={20} />
        </Link>
      </motion.div>
    </section>
  );
}
