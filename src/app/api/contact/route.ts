import { NextResponse } from "next/server";

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
  error?: string;
}

export class ContactValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ContactValidationError";
  }
}

export function validateContactForm(data: ContactFormData): void {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!data.name?.trim()) {
    throw new ContactValidationError("Name is required");
  }

  if (!data.email?.trim()) {
    throw new ContactValidationError("Email is required");
  }

  if (!emailRegex.test(data.email)) {
    throw new ContactValidationError("Invalid email format");
  }

  if (!data.subject?.trim()) {
    throw new ContactValidationError("Subject is required");
  }

  if (!data.message?.trim()) {
    throw new ContactValidationError("Message is required");
  }

  if (data.message.length < 10) {
    throw new ContactValidationError(
      "Message must be at least 10 characters long"
    );
  }
}

export async function POST(
  request: Request
): Promise<NextResponse<ContactResponse>> {
  try {
    const body = await request.json();
    const contactData: ContactFormData = {
      name: body.name,
      email: body.email,
      subject: body.subject,
      message: body.message,
    };

    // Validate the request
    try {
      validateContactForm(contactData);
    } catch (error) {
      if (error instanceof ContactValidationError) {
        return NextResponse.json(
          {
            success: false,
            message: "Validation failed",
            error: error.message,
          },
          { status: 400 }
        );
      }
      throw error;
    }

    // In a real application, you would:
    // 1. Store the message in MongoDB using Prisma
    // await prisma.contact.create({
    //   data: contactData,
    // })

    // 2. Send an email notification using a service like Nodemailer or SendGrid
    // await sendEmail({
    //   to: process.env.ADMIN_EMAIL,
    //   subject: `New Contact Form Submission: ${contactData.subject}`,
    //   text: `
    //     Name: ${contactData.name}
    //     Email: ${contactData.email}
    //     Message: ${contactData.message}
    //   `,
    // })

    return NextResponse.json(
      {
        success: true,
        message: "Message sent successfully",
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  } catch (error) {
    console.error("Error in contact form submission:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
        error: "Failed to send message",
      },
      {
        status: 500,
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  }
}
