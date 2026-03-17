'use client';

import BlogEditor from '@/components/admin/BlogEditor';

export default function EditPostPage({ params }: { params: { id: string } }) {
  return (
    <div className="bg-[#0d1117] min-h-screen p-8 text-gray-300">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-white">Edit Post</h1>
          <p className="text-gray-400">Update the details of your article below.</p>
        </header>
        <div className="bg-[#161b22] border border-gray-800 rounded-lg p-8">
          <BlogEditor postId={params.id} />
        </div>
      </div>
    </div>
  );
}
