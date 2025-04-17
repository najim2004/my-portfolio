import { NextRequest, NextResponse } from "next/server";
import { Blog } from "@/models/blog.model";
import { BlogType } from "../../../types/api/home.types";
import { connectDB } from "@/lib/db";
import { getServerSession } from "next-auth";
import { IBlog } from "@/types/model/blog.types";
import { User } from "@/models/user.model";
import { authOptions } from "@/lib/auth.config";

// Custom error type
class ApiError extends Error {
  constructor(public statusCode: number, message: string) {
    super(message);
  }
}

// Response types
type ApiResponse<T> = NextResponse<T | { error: string }>;

// GET all blogs
export async function GET(): Promise<ApiResponse<BlogType[]>> {
  try {
    await connectDB();

    const blogs = await Blog.find()
      .select("_id title slug excerpt publishedAt image readTime")
      .populate("userId", "fullName")
      .sort({ publishedAt: -1 });

    const formattedBlogs = blogs.map(
      (
        blog: BlogType & {
          userId?: { fullName?: string };
          toObject: () => Omit<BlogType, "_id" | "userId">;
        }
      ) => ({
        ...blog.toObject(),
        _id: blog._id.toString(),
        authorName: blog.userId?.fullName || "Unknown", // if user deleted
      })
    );

    return NextResponse.json(formattedBlogs, { status: 200 });
  } catch (error) {
    console.error("GET blogs error:", error);
    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}

// POST new blog
export async function POST(
  request: NextRequest
): Promise<ApiResponse<BlogType>> {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      throw new ApiError(401, "Unauthorized");
    }

    // Connect to DB and get user data in parallel
    const [, user] = await Promise.all([
      connectDB(),
      User.findById(session.user.id).select("fullName").lean() as Promise<{
        fullName: string;
      } | null>,
    ]);

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    const body = (await request.json()) as Omit<
      IBlog,
      "createdAt" | "userId" | "slug"
    >;

    // Validate required fields
    if (!body.title || !body.content || !body.excerpt) {
      throw new ApiError(400, "Missing required fields");
    }

    const blog = await Blog.create({
      ...body,
      userId: session.user.id,
    });

    return NextResponse.json(
      { ...blog.toObject(), authorName: user.fullName },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST blog error:", error);
    if (error instanceof ApiError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.statusCode }
      );
    }
    return NextResponse.json(
      { error: "Failed to create blog" },
      { status: 500 }
    );
  }
}
