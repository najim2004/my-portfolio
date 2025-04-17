import { connectDB } from "@/lib/db";
import { Project } from "@/models/project.model";
import { IProject } from "@/types/model/project.types";
import { Types } from "mongoose";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/lib/auth.config";

// GET project by slug
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
): Promise<NextResponse<IProject | { error: string }>> {
  try {
    await connectDB();
    const { slug } = params;
    const project = await Project.findOne({ slug }).select("-__v");
    return NextResponse.json(project, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch project" },
      { status: 500 }
    );
  }
}

// PUT update project
export async function PUT(
  request: NextRequest,
  { params }: { params: { slug: string } }
): Promise<NextResponse<IProject | { error: string }>> {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    await connectDB();
    const { slug: _id } = params;
    if (!_id) {
      return NextResponse.json(
        { error: "Project ID is required" },
        { status: 400 }
      );
    }
    const body = (await request.json()) as { _id: string } & Partial<IProject>;

    if (!Types.ObjectId.isValid(_id)) {
      return NextResponse.json(
        { error: "Invalid project ID" },
        { status: 400 }
      );
    }

    const updatedProject = await Project.findByIdAndUpdate(
      _id,
      { $set: body },
      { new: true }
    ).select("-__v");

    if (!updatedProject) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json(updatedProject, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Failed to update project" },
      { status: 500 }
    );
  }
}

// DELETE project
export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string } }
): Promise<NextResponse<{ message: string } | { error: string }>> {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    await connectDB();
    const { slug: _id } = params;

    if (!_id || !Types.ObjectId.isValid(_id)) {
      return NextResponse.json(
        { error: "Invalid project ID" },
        { status: 400 }
      );
    }

    const deletedProject = await Project.findByIdAndDelete(_id).lean();

    if (!deletedProject) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Project deleted successfully" },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { error: "Failed to delete project" },
      { status: 500 }
    );
  }
}
