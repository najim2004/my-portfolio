import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { User } from "@/models/user.model";
import {
  PortfolioData,
  PortfolioEducation,
  PortfolioExperience,
  PortfolioService,
  PortfolioSkill,
} from "@/types/api/profile.types";

export async function GET(request: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "userId is required" },
        { status: 400 }
      );
    }

    const userData = await User.findById(userId)
      .select("-password -__v")
      .populate("education", "-userId -__v")
      .populate("experience", "-userId -__v")
      .populate("skills", "-userId -__v")
      .populate("services", "-userId -__v");

    if (!userData) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const portfolioData: PortfolioData = {
      user: {
        _id: userData._id.toString(),
        fullName: userData.fullName,
        titles: userData.titles,
        email: userData.email,
        phone: userData.phone,
        location: userData.location,
        isFreelancer: userData.isFreelancer,
        profileImage: userData.profileImage,
        resumeUrl: userData.resumeUrl,
        about: userData.about || "",
        approach: userData.approach || "",
        socialLinks: userData.socialLinks,
      },
      education: userData.education.map((edu: PortfolioEducation) => ({
        _id: edu._id.toString(),
        degree: edu.degree,
        institution: edu.institution,
        years: edu.years,
        createdAt: edu.createdAt,
      })),
      experience: userData.experience.map((exp: PortfolioExperience) => ({
        _id: exp._id.toString(),
        position: exp.position,
        company: exp.company,
        description: exp.description,
        years: exp.years,
        createdAt: exp.createdAt,
      })),
      skills: userData.skills.map((skill: PortfolioSkill) => ({
        _id: skill._id.toString(),
        name: skill.name,
        level: skill.level,
        category: skill.category,
      })),
      services: userData.services.map((service: PortfolioService) => ({
        id: service._id.toString(),
        title: service.title,
        description: service.description,
        icon: service.icon,
      })),
    };

    return NextResponse.json(portfolioData, { status: 200 });
  } catch (error) {
    console.error("Error fetching portfolio data:", error);
    return NextResponse.json(
      { error: "Failed to fetch portfolio data" },
      { status: 500 }
    );
  }
}
