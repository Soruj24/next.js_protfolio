import { NextResponse } from 'next/server';
import { connectDB } from '@/config/db';
import { Blog } from '@/models/Blog';
import { auth } from '@/auth';

// GET a single blog post by ID or slug
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const post = await Blog.findOne({ $or: [{ _id: params.id }, { slug: params.id }] });
    if (!post) {
      return NextResponse.json({ message: 'Post not found' }, { status: 404 });
    }
    return NextResponse.json(post);
  } catch (error) {
    // If the ID format is invalid, Mongoose throws an error. Catch it here.
    return NextResponse.json({ message: 'Post not found or invalid ID' }, { status: 404 });
  }
}

// PUT (update) a blog post
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    await connectDB();
    const body = await request.json();
    const { title, content, author } = body;

    let slug;
    if (title) {
      slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    }

    const updatedPost = await Blog.findByIdAndUpdate(
      params.id,
      { title, slug, content, author },
      { new: true, runValidators: true }
    );

    if (!updatedPost) {
      return NextResponse.json({ message: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json(updatedPost);
  } catch (error) {
    console.error('Error updating blog post:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

// DELETE a blog post
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    await connectDB();
    const deletedPost = await Blog.findByIdAndDelete(params.id);

    if (!deletedPost) {
      return NextResponse.json({ message: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
