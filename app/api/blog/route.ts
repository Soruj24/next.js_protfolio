import { NextResponse } from 'next/server';
import { connectDB } from '@/config/db';
import { Blog } from '@/models/Blog';
import { auth } from '@/auth';

// GET all blog posts
export async function GET() {
  try {
    await connectDB();
    const posts = await Blog.find({}).sort({ createdAt: -1 });
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

// POST a new blog post
export async function POST(request: Request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    await connectDB();
    const body = await request.json();
    const { title, content, author } = body;

    if (!title || !content) {
      return NextResponse.json({ message: 'Title and content are required' }, { status: 400 });
    }

    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const newPost = new Blog({ title, slug, content, author });
    await newPost.save();

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error('Error creating blog post:', error);
    return NextResponse.json({ message: 'Internal ServerError' }, { status: 500 });
  }
}
