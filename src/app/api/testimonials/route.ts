import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, position, content, email } = body

    // Validate the request
    if (!name || !position || !content || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // In a real application, you would:
    // 1. Store the testimonial in MongoDB with status "pending"
    // 2. Send an email notification to admin
    // 3. Return a success response

    // Mock successful response
    return NextResponse.json(
      {
        success: true,
        message: "Testimonial submitted successfully and pending approval",
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Error in testimonial submission:", error)
    return NextResponse.json({ error: "Failed to submit testimonial" }, { status: 500 })
  }
}
