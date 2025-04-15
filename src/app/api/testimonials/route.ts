import { NextResponse } from 'next/server'
import { headers } from 'next/headers'

export type TestimonialStatus = 'pending' | 'approved' | 'rejected'

export interface TestimonialSubmission {
  name: string
  position: string
  content: string
  email: string
  company?: string
}

export interface Testimonial extends TestimonialSubmission {
  id: string
  status: TestimonialStatus
  avatar?: string
  createdAt: Date
  updatedAt: Date
}

export interface TestimonialResponse {
  success: boolean
  message: string
  error?: string
  data?: Testimonial
}

export class TestimonialValidationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'TestimonialValidationError'
  }
}

export function validateTestimonial(data: TestimonialSubmission): void {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!data.name?.trim()) {
    throw new TestimonialValidationError('Name is required')
  }

  if (!data.position?.trim()) {
    throw new TestimonialValidationError('Position is required')
  }

  if (!data.content?.trim()) {
    throw new TestimonialValidationError('Content is required')
  }

  if (!data.email?.trim()) {
    throw new TestimonialValidationError('Email is required')
  }

  if (!emailRegex.test(data.email)) {
    throw new TestimonialValidationError('Invalid email format')
  }

  if (data.content.length < 10) {
    throw new TestimonialValidationError('Content must be at least 10 characters long')
  }
}

export async function POST(
  request: Request
): Promise<NextResponse<TestimonialResponse>> {
  try {
    // Rate limiting check (optional)
    const headersList = await headers()
    const ip = headersList.get('x-forwarded-for') || 'unknown'
    
    // Parse request body
    const body = await request.json()
    const testimonialData: TestimonialSubmission = {
      name: body.name,
      position: body.position,
      content: body.content,
      email: body.email,
      company: body.company, // optional
    }

    // Validate the submission
    try {
      validateTestimonial(testimonialData)
    } catch (error) {
      if (error instanceof TestimonialValidationError) {
        return NextResponse.json(
          { 
            success: false, 
            message: 'Validation failed',
            error: error.message 
          },
          { 
            status: 400,
            headers: {
              'Content-Type': 'application/json',
              'Cache-Control': 'no-store'
            }
          }
        )
      }
      throw error
    }

    // In a real application, you would:
    // 1. Store in database
    // const testimonial = await prisma.testimonial.create({
    //   data: {
    //     ...testimonialData,
    //     status: 'pending',
    //     createdAt: new Date(),
    //     updatedAt: new Date(),
    //   }
    // })

    // 2. Send notification email to admin
    // await sendEmail({
    //   to: process.env.ADMIN_EMAIL,
    //   subject: 'New Testimonial Submission',
    //   text: `New testimonial from ${testimonialData.name}`,
    // })

    return NextResponse.json(
      {
        success: true,
        message: 'Testimonial submitted successfully and pending approval',
      },
      { 
        status: 201,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store'
        }
      }
    )
  } catch (error) {
    console.error('Error in testimonial submission:', error)
    
    return NextResponse.json(
      { 
        success: false,
        message: 'Failed to submit testimonial',
        error: 'Internal server error'
      },
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store'
        }
      }
    )
  }
}
