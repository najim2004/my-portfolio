import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { ITestimonial } from "@/types/model/testimonial.types";
import { connectDB } from "@/lib/db";
import { Testimonial } from "@/models/testimonial.model";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth.config";

export class TestimonialValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "TestimonialValidationError";
  }
}

export function validateTestimonial(
  data: Omit<ITestimonial, "createdAt" | "status">
): void {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!data.name?.trim()) {
    throw new TestimonialValidationError("Name is required");
  }

  if (!data.position?.trim()) {
    throw new TestimonialValidationError("Position is required");
  }

  if (!data.message?.trim()) {
    throw new TestimonialValidationError("message is required");
  }

  if (!data.email?.trim()) {
    throw new TestimonialValidationError("Email is required");
  }

  if (!emailRegex.test(data.email)) {
    throw new TestimonialValidationError("Invalid email format");
  }

  if (data.message.length < 10) {
    throw new TestimonialValidationError(
      "Content must be at least 10 characters long"
    );
  }
}

export async function POST(
  request: Request
): Promise<NextResponse<(ITestimonial & { _id: string }) | { error: string }>> {
  try {
    // Rate limiting check (optional)
    const headersList = await headers();
    const ip = headersList.get("x-forwarded-for") || "unknown";
    console.log(ip);

    // Parse request body
    const body = (await request.json()) as Omit<
      ITestimonial,
      "createdAt" | "status"
    >;

    // Validate the submission
    try {
      await connectDB();
      validateTestimonial(body);
      const testimonial = await Testimonial.create({
        ...body,
        status: "PENDING",
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      return NextResponse.json(testimonial, {
        status: 201,
      });
    } catch (error) {
      if (error instanceof TestimonialValidationError) {
        return NextResponse.json(
          {
            error: error.message,
          },
          {
            status: 400,
            headers: {
              "Content-Type": "application/json",
              "Cache-Control": "no-store",
            },
          }
        );
      }
      throw error; // Re-throw other errors to be caught by outer catch
    }
  } catch (error) {
    console.error("Error creating testimonial:", error);
    return NextResponse.json(
      {
        error:
          (error instanceof Error && error.message) ||
          "Failed to create testimonial",
      },
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store",
        },
      }
    );
  }
}

export async function GET(
  request: Request
): Promise<
  NextResponse<
    { testimonials: (ITestimonial & { _id: string })[] } | { error: string }
  >
> {
  try {
    await connectDB();

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const statusParam = searchParams.get("status");
    const status = statusParam as ITestimonial["status"];

    // Build query object
    if (!status || !["REJECTED", "PENDING"].includes(status)) {
      const session = await getServerSession(authOptions);
      if (!session?.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
    }
    const query = status ? { status } : {};

    const testimonials = await Testimonial.find(query)
      .sort({ createdAt: -1 })
      .exec();

    return NextResponse.json(
      { testimonials },
      {
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "public, max-age=300", // Cache for 5 minutes
        },
      }
    );
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return NextResponse.json(
      {
        error:
          (error instanceof Error && error.message) ||
          "Failed to fetch testimonials",
      },
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store",
        },
      }
    );
  }
}
