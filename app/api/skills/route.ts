// app/api/skills/route.ts
import { NextRequest, NextResponse } from 'next/server'

import { connectDB } from '@/config/db'
import { SkillCategory } from '@/models/Skill'

export async function GET() {
  try {
    await connectDB()
    
    const skills = await SkillCategory.find().sort({ createdAt: 1 }).lean()
    
    return NextResponse.json({
      success: true,
      data: skills
    })
  } catch (error) {
    console.error('Error fetching skills:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch skills' },
      { status: 500 }
    )
  }
}