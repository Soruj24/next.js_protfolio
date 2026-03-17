'use client';

import BlogEditor from '@/components/admin/BlogEditor';

export default function NewPostPage() {
  return (
    <div className="bg-[#0d1117] min-h-screen p-8 text-gray-300">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-white">Create New Post</h1>
          <p className="text-gray-400">Fill out the details below to publish a new article.</p>
        </header>
        <div className="bg-[#161b22] border border-gray-800 rounded-lg p-8">
          <BlogEditor />
        </div>
      </div>
    </div>
  );
}
