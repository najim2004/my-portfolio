import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { User } from "@/models/user.model";
import { Testimonial } from "@/models/testimonial.model";
import { HomeData } from "@/types/api/home.types";

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

    // Parallel fetch for user data and testimonials
    const [user, testimonials] = await Promise.all([
      User.findById(userId)
        .select("-password -__v")
        .populate([
          {
            path: "projects",
            select:
              "_id title slug description technologies liveLink githubLink image -__v",
            options: { limit: 3 },
          },
          {
            path: "blogs",
            select: "_id publishedAt readTime title excerpt slug image -__v",
            options: { limit: 3 },
          },
          {
            path: "services",
            select: "_id title description icon duration createdAt -__v",
          },
          {
            path: "skills",
            select: "_id name category level icon -__v",
          },
        ]),
      Testimonial.find()
        .select("_id name email avatar position company message -__v")
        .limit(3)
        .sort({ createdAt: -1 }),
    ]);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const blogsWithAuthor = user.blogs.map(
      (
        blog: { toObject(): Pick<HomeData, "blogs"> } & Pick<HomeData, "blogs">
      ) => ({
        ...blog.toObject(),
        authorName: user.fullName,
      })
    );

    const homeData: HomeData = {
      user: {
        _id: user._id,
        fullName: user.fullName,
        titles: user.titles,
        email: user.email,
        phone: user.phone,
        location: user.location,
        isFreelancer: user.isFreelancer,
        profileImage: user.profileImage,
        resumeUrl: user.resumeUrl,
        about: user.about,
        approach: user.approach,
        socialLinks: user.socialLinks,
      },
      projects: user.projects,
      blogs: blogsWithAuthor,
      services: user.services,
      testimonials,
      skills: user.skills,
    };

    return NextResponse.json(homeData, { status: 200 });
  } catch (error) {
    console.error("Error fetching home data:", error);
    return NextResponse.json(
      { error: "Failed to fetch home data" },
      { status: 500 }
    );
  }
}
