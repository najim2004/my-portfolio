import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    // Validate the request
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // In a real application, you would:
    // 1. Store the message in MongoDB
    // 2. Send an email notification
    // 3. Return a success response

    // Mock successful response
    return NextResponse.json({ success: true, message: "Message sent successfully" }, { status: 200 })
  } catch (error) {
    console.error("Error in contact form submission:", error)
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 })
  }
}
