import Link from 'next/link';
import { format } from 'date-fns';

async function getPosts() {
  // Fetch data from the internal API
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blog`, {
    cache: 'no-store', // Re-fetch data on every request
  });

  if (!res.ok) {
    throw new Error('Failed to fetch posts');
  }

  return res.json();
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-gray-900 leading-tight">
            My Digital Garden
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            A collection of thoughts, stories, and ideas.
          </p>
        </header>

        <div className="space-y-10">
          {posts.map((post: any) => (
            <article key={post._id} className="group relative bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <time dateTime={post.createdAt}>
                  {format(new Date(post.createdAt), 'MMMM d, yyyy')}
                </time>
                <span className="mx-2">•</span>
                <span>{post.author}</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-3">
                <Link href={`/blog/${post.slug}`}>
                  <span className="absolute inset-0" aria-hidden="true"></span>
                  {post.title}
                </Link>
              </h2>
              <p className="text-gray-600 line-clamp-3">
                {post.content.substring(0, 200).replace(/<[^>]*>?/gm, '')}...
              </p>
              <div className="mt-4">
                <span className="text-blue-600 font-semibold group-hover:underline">
                  Read more &rarr;
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
