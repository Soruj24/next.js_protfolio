// app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server'

import { Contact, contactFormSchema } from '@/models/Contact'
import { headers } from 'next/headers'
import { connectDB } from '@/config/db'

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    
    const body = await request.json()
    const headersList = headers()
    
    // Validate input
    const validatedData = contactFormSchema.parse(body)
    
    // Create contact message
    const contact = await Contact.create({
      ...validatedData,
      ipAddress: request.headers.get('x-forwarded-for') || 'unknown',
      userAgent: (await headersList).get('user-agent')
    })
    
    // Here you would typically send an email notification
    // For now, we'll just return success
    
    return NextResponse.json({
      success: true,
      message: 'Message sent successfully!',
      data: contact
    })
  } catch (error: unknown) {
    console.error('Error sending contact message:', error)
    
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Validation failed',
          details: (error as any).issues
        },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { success: false, error: 'Failed to send message' },
      { status: 500 }
    )
  }
}