"use client";

import { JSX, useRef, useState } from "react";
import { motion, Variants, useInView } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ISkill } from "@/types/model/skill.types";

// Define types

export type SkillCategory =
  | "Frontend"
  | "Backend"
  | "DevOps"
  | "Design"
  | "All";

// Animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5 },
  },
};

interface SkillsProps {
  skills: Omit<ISkill, "userId">[];
  categories: SkillCategory[];
}

export default function Skills({
  skills,
  categories,
}: SkillsProps): JSX.Element {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [activeCategory, setActiveCategory] = useState<SkillCategory>("All");

  const filteredSkills = skills?.filter((skill) =>
    activeCategory === "All" ? true : skill?.category === activeCategory
  );

  return (
    <section id="skills" className="py-20 bg-gray-800">
      <div className="container px-4 mx-auto">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-center">
            My <span className="text-purple-500">Skills</span>
          </h2>
          <div className="w-20 h-1 bg-purple-500 mx-auto mb-10"></div>

          {/* Filter buttons */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories?.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full transition-colors ${
                  activeCategory === category
                    ? "bg-purple-600 text-white"
                    : "bg-gray-700 text-white hover:bg-purple-600"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-6"
          >
            {filteredSkills?.map((skill, index) => (
              <motion.div
                key={`${skill.name}-${index}`}
                variants={itemVariants}
                whileHover={{
                  scale: 1.1,
                  transition: { duration: 0.2 },
                }}
                className={cn(
                  `group relative flex flex-col items-center justify-center p-4 rounded-lg border hover:border-opacity-100 border-opacity-50 transition-all duration-300`
                )}
                style={{
                  backgroundColor: skill?.color
                    ? `${skill.color}10`
                    : "#1a15331a",
                  borderColor: skill?.color || "#1a1533",
                }}
              >
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500" />

                <div className="relative">
                  <Image
                    src={skill?.icon || "#"}
                    alt={`${skill.name} icon`}
                    width={60}
                    height={60}
                    className="mb-2 transition-transform duration-300 group-hover:scale-110"
                    priority={index < 8}
                  />
                </div>
                <p className="text-sm font-medium text-center">{skill.name}</p>
                <span className="text-xs text-gray-400 mt-1">
                  {skill.category}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
