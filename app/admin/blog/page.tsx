'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminBlogPage() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/blog');
      const data = await res.json();
      setPosts(data);
    } catch (error) {
      toast.error('Failed to fetch posts.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    try {
      const res = await fetch(`/api/blog/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Failed to delete');

      toast.success('Post deleted successfully!');
      fetchPosts(); // Refresh the list
    } catch (error) {
      toast.error('Failed to delete post.');
    }
  };

  if (isLoading) {
    return <div className="p-8 text-white">Loading posts...</div>;
  }

  return (
    <div className="bg-[#0d1117] min-h-screen p-8 text-gray-300">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Blog Management</h1>
          <Button asChild className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-6 rounded-lg transition-colors">
            <Link href="/admin/blog/new">
              <PlusCircle size={20} className="mr-2" />
              New Post
            </Link>
          </Button>
        </div>

        <div className="bg-[#161b22] border border-gray-800 rounded-lg shadow-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-800">
            <thead className="bg-gray-900/50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Title</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {posts.map((post: any) => (
                <tr key={post._id} className="hover:bg-gray-800/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-white">{post.title}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-400">{format(new Date(post.createdAt), 'MMM d, yyyy')}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-4">
                      <Button variant="ghost" asChild className="text-cyan-400 hover:text-cyan-300 p-1 h-auto">
                        <Link href={`/admin/blog/edit/${post._id}`}>
                          <Edit size={16} />
                        </Link>
                      </Button>
                      <Button variant="ghost" onClick={() => handleDelete(post._id)} className="text-red-500 hover:text-red-400 p-1 h-auto">
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
