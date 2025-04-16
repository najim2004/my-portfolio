import { connectDB } from "@/lib/db";
import { Blog } from "@/models/blog.model";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { IBlog } from "@/types/model/blog.types";
import { BlogType } from "@/types/api/home.types";

// GET blog by slug
export async function GET(
  request: NextRequest
): Promise<
  NextResponse<
    (IBlog & { authorName: string; _id: string }) | { error: string }
  >
> {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");
    const blog = await Blog.findOne({ slug })
      .select("-__v")
      .populate("userId", "fullName")
      .sort({ publishedAt: -1 });
    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }
    return NextResponse.json(
      {
        ...blog,
        _id: blog._id.toString(),
        userId: blog.userId._id.toString(),
        authorName: blog.userId.fullName,
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch blog" },
      { status: 500 }
    );
  }
}

// PUT update blog
export async function PUT(
  request: NextRequest
): Promise<NextResponse<BlogType | { error: string }>> {
  try {
    const { searchParams } = new URL(request.url);
    const _id = searchParams.get("slug");
    if (!_id) {
      return NextResponse.json(
        { error: "Blog ID is required" },
        { status: 400 }
      );
    }
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const body = (await request.json()) as Partial<IBlog>;

    const blog = await Blog.findOneAndUpdate(
      { _id, userId: session.user.id },
      { $set: body },
      { new: true }
    )
      .select("_id title slug excerpt publishedAt image -__v")
      .populate("userId", "fullName");

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(
      { ...blog, authorName: blog.userId.fullName },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: "Failed to update blog" },
      { status: 500 }
    );
  }
}

// DELETE blog
export async function DELETE(
  request: NextRequest
): Promise<NextResponse<{ message: string } | { error: string }>> {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const url = new URL(request.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Blog ID is required" },
        { status: 400 }
      );
    }

    await connectDB();
    const blog = await Blog.findOneAndDelete({
      _id: id,
      userId: session.user.id,
    });

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Blog deleted successfully" },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: "Failed to delete blog" },
      { status: 500 }
    );
  }
}
