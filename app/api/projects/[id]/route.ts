// app/api/projects/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server'

import { Project } from '@/models/Project'
import { connectDB } from '@/config/db'

interface Params {
  params: {
    id: string
  }
}

export async function GET(request: NextRequest, { params }: Params) {
  try {
    await connectDB()
    
    const project = await Project.findOne({ id: params.id }).lean()
    
    if (!project) {
      return NextResponse.json(
        { success: false, error: 'Project not found' },
        { status: 404 }
      )
    }
    
    // Increment views
    await Project.updateOne(
      { id: params.id },
      { $inc: { 'stats.views': 1 } }
    )
    
    return NextResponse.json({
      success: true,
      data: project
    })
  } catch (error) {
    console.error('Error fetching project:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch project' },
      { status: 500 }
    )
  }
}

export async function PATCH(request: NextRequest, { params }: Params) {
  try {
    await connectDB()
    
    const body = await request.json()
    const project = await Project.findOneAndUpdate(
      { id: params.id },
      { $set: body },
      { new: true }
    )
    
    if (!project) {
      return NextResponse.json(
        { success: false, error: 'Project not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({
      success: true,
      data: project
    })
  } catch (error) {
    console.error('Error updating project:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update project' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    await connectDB()
    
    const project = await Project.findOneAndDelete({ id: params.id })
    
    if (!project) {
      return NextResponse.json(
        { success: false, error: 'Project not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({
      success: true,
      message: 'Project deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting project:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete project' },
      { status: 500 }
    )
  }
}