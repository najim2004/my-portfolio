import { NextRequest, NextResponse } from "next/server";
import { Project } from "@/models/project.model";
import { connectDB } from "@/lib/db";
import { IProject } from "@/types/model/project.types";
import { ProjectType } from "@/types/api/home.types";

// GET all projects
export async function GET(): Promise<
  NextResponse<ProjectType[] | { error: string }>
> {
  try {
    await connectDB();
    const projects = await Project.find({}).select(
      "_id title slug description technologies liveLink githubLink -__v"
    );
    return NextResponse.json(projects, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

// POST new project
export async function POST(
  request: NextRequest
): Promise<NextResponse<IProject | { error: string }>> {
  try {
    await connectDB();
    const body = (await request.json()) as Omit<
      IProject,
      "createdAt" | "userId" | "slug"
    >;
    const project = await Project.create(body);
    return NextResponse.json(project, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
}
