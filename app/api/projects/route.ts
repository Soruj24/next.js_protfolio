// app/api/projects/route.ts
import { NextRequest, NextResponse } from 'next/server'

import { Project } from '@/models/Project'
import { connectDB } from '@/config/db'

export async function GET(request: NextRequest) {
  try {
    await connectDB()
    
    const searchParams = request.nextUrl.searchParams
    const category = searchParams.get('category')
    const status = searchParams.get('status')
    const featured = searchParams.get('featured')
    const limit = parseInt(searchParams.get('limit') || '12')
    const page = parseInt(searchParams.get('page') || '1')
    const skip = (page - 1) * limit
    
    const query: Record<string, string | boolean> = {}
    
    if (category) query.category = category
    if (status) query.status = status
    if (featured) query.featured = featured === 'true'
    
    const [projects, total] = await Promise.all([
      Project.find(query)
        .sort({ featured: -1, updatedAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Project.countDocuments(query)
    ])
    
    return NextResponse.json({
      success: true,
      data: projects,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching projects:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch projects' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    
    const body = await request.json()
    const project = await Project.create(body)
    
    return NextResponse.json({
      success: true,
      data: project
    })
  } catch (error) {
    console.error('Error creating project:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create project' },
      { status: 500 }
    )
  }
}