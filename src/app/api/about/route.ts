import { connectDB } from "@/lib/db";
import SkillCategory from "@/models/skill-categories.model";
import { User } from "@/models/user.model";
import { AboutData } from "@/types/api/about.types";
import { ISkill } from "@/types/model/skill.types";
import { NextResponse } from "next/server";
import "@/models/skill.model";
import "@/models/experience.model";
import "@/models/education.model";

export async function GET() {
  try {
    await connectDB();
    const userId = "68009ad61efea10ff2ef2c31";

    if (!userId) {
      return NextResponse.json(
        { error: "userId is required" },
        { status: 400 }
      );
    }

    // Parallel fetch for user data and testimonials
    const [user, skillCategories] = await Promise.all([
      User.findById(userId)
        .select("about approach profileImage resumeUrl hobbies")
        .populate([
          {
            path: "skills",
            select: "-userId -__v",
          },
          {
            path: "experiences",
            select: "-userId -__v",
          },
          {
            path: "educations",
            select: "-userId -__v",
          },
        ]),
      SkillCategory.find().select("-__v").sort({ order: 1 }),
    ]);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const aboutData: AboutData = {
      user: {
        profileImage: user.profileImage,
        resumeUrl: user.resumeUrl,
        about: user.about,
        approach: user.approach,
        hobbies: user.hobbies,
      },
      experiences: user.experiences,
      educations: user.educations,
      skillCategories: skillCategories as AboutData["skillCategories"],
      skills: user.skills.map(
        (skill: { categoryId: { name: string } } & Omit<ISkill, "userId">) => ({
          ...skill,
          category: skill.categoryId.name,
        })
      ),
    };

    return NextResponse.json(aboutData, { status: 200 });
  } catch (error) {
    console.error("Error fetching home data:", error);
    return NextResponse.json(
      { error: "Failed to fetch home data" },
      { status: 500 }
    );
  }
}
