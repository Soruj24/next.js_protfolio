'use client';

import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // import styles

interface BlogEditorProps {
  postId?: string;
}

interface FormData {
  title: string;
  content: string;
}

export default function BlogEditor({ postId }: BlogEditorProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, control, reset, formState: { errors } } = useForm<FormData>();

  const isEditMode = !!postId;

  useEffect(() => {
    if (isEditMode) {
      const fetchPost = async () => {
        setIsLoading(true);
        try {
          const res = await fetch(`/api/blog/${postId}`);
          const data = await res.json();
          reset(data);
        } catch (error) {
          toast.error('Failed to load post data.');
        } finally {
          setIsLoading(false);
        }
      };
      fetchPost();
    }
  }, [postId, isEditMode, reset]);

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      const url = isEditMode ? `/api/blog/${postId}` : '/api/blog';
      const method = isEditMode ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error(isEditMode ? 'Failed to update' : 'Failed to create');

      toast.success(`Post ${isEditMode ? 'updated' : 'created'} successfully!`);
      router.push('/admin/blog');
      router.refresh();
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['link', 'image'],
      ['clean']
    ],
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-400 mb-2">Title</label>
        <Input
          id="title"
          {...register('title', { required: 'Title is required' })}
          className="bg-transparent border-gray-700 border rounded-lg px-4 py-3 text-gray-200 w-full"
          placeholder="Enter post title"
        />
        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-400 mb-2">Content</label>
        <Controller
          name="content"
          control={control}
          rules={{ required: 'Content is required' }}
          render={({ field }) => (
            <ReactQuill
              theme="snow"
              {...field}
              modules={quillModules}
              className="bg-white text-gray-900 rounded-lg"
            />
          )}
        />
        {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>}
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={isLoading} className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-6 rounded-lg">
          {isLoading ? (isEditMode ? 'Updating...' : 'Creating...') : (isEditMode ? 'Update Post' : 'Create Post')}
        </Button>
      </div>
    </form>
  );
}
