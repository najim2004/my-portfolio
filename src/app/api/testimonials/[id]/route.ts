import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Testimonial } from "@/models/testimonial.model";
import { ITestimonial } from "@/types/model/testimonial.types";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth.config";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
): Promise<NextResponse<(ITestimonial & { _id: string }) | { error: string }>> {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    await connectDB();

    const { id } = params;
    const { status } = await request.json();

    // Validate status
    if (!["REJECTED", "PENDING", "APPROVED"].includes(status)) {
      return NextResponse.json(
        { error: "Invalid status value" },
        { status: 400 }
      );
    }

    const updatedTestimonial = await Testimonial.findByIdAndUpdate(
      id,
      {
        status,
        updatedAt: new Date(),
      },
      { new: true }
    );

    if (!updatedTestimonial) {
      return NextResponse.json(
        { error: "Testimonial not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedTestimonial, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error updating testimonial status:", error);
    return NextResponse.json(
      {
        error:
          (error instanceof Error && error.message) ||
          "Failed to update testimonial status",
      },
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
