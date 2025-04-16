import { connectDB } from "@/lib/db";
import { Project } from "@/models/project.model";
import { IProject } from "@/types/model/project.types";
import { Types } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

// GET project by slug
export async function GET(
  request: NextRequest
): Promise<NextResponse<IProject | { error: string }>> {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");
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
  request: NextRequest
): Promise<NextResponse<IProject | { error: string }>> {
  try {
    await connectDB();
    const _id = new URL(request.url).searchParams.get("slug");
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
  request: NextRequest
): Promise<NextResponse<{ message: string } | { error: string }>> {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const _id = searchParams.get("slug");

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
