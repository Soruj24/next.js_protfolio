import Link from 'next/link';
import { format } from 'date-fns';

async function getPost(slug: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blog/${slug}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch post');
  }

  return res.json();
}

export default async function SinglePostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <header className="mb-8">
          <Link href="/blog" className="text-blue-600 hover:underline mb-4 inline-block">
            &larr; Back to all posts
          </Link>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            {post.title}
          </h1>
          <div className="mt-4 flex items-center text-sm text-gray-500">
            <time dateTime={post.createdAt}>
              {format(new Date(post.createdAt), 'MMMM d, yyyy')}
            </time>
            <span className="mx-2">•</span>
            <span>By {post.author}</span>
          </div>
        </header>

        <article className="prose prose-lg max-w-none">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>
      </div>
    </div>
  );
}

// This function is needed for Next.js to know which dynamic routes to pre-render.
export async function generateStaticParams() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blog`);
  const posts = await res.json();
 
  return posts.map((post: any) => ({
    slug: post.slug,
  }));
}
