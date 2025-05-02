// src/components/posts/PostForm.tsx
'use client';
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import type { Post } from '@/types';
import { Loader2 } from 'lucide-react';

interface PostFormProps {
    initialData?: Post | null; // Post data if editing, null/undefined if creating
    onFormSubmitSuccess: () => void; // Callback when form submits successfully
    onCancel: () => void; // Callback for cancel action
}

// Button styles
const primaryButtonClasses = "inline-flex items-center justify-center whitespace-nowrap bg-black text-white px-5 py-2.5 rounded-full text-sm font-medium ring-offset-background transition-colors duration-200 ease-in-out hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 shadow-sm hover:shadow disabled:opacity-50";
const cancelButtonClasses = "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium ring-offset-background transition-colors duration-200 ease-in-out border border-gray-300 bg-white text-black hover:bg-gray-100 px-5 py-2.5 shadow-sm hover:shadow disabled:opacity-50";


const PostForm: React.FC<PostFormProps> = ({ initialData, onFormSubmitSuccess, onCancel }) => {
    const { user } = useAuth();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const isEditing = !!initialData; // Determine if we are editing

    // Populate form if editing
    useEffect(() => {
        if (isEditing && initialData) {
            setTitle(initialData.title);
            setDescription(initialData.description);
        } else {
            // Reset form if switching to create mode or initially
            setTitle('');
            setDescription('');
        }
        setError(null); // Clear error when initialData changes
    }, [initialData, isEditing]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) {
            setError("Authentication error. Please log in again.");
            return;
        }
        if (!title.trim() || !description.trim()) {
            setError("Title and Description cannot be empty.");
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const token = await user.getIdToken();
            const apiUrl = isEditing ? `/api/posts/${initialData?.id}` : '/api/posts';
            const method = isEditing ? 'PUT' : 'POST';

            const response = await fetch(apiUrl, {
                method: method,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title: title.trim(), description: description.trim() }),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ message: `HTTP error! Status: ${response.status}` }));
                throw new Error(errorData.message || `Failed to ${isEditing ? 'update' : 'create'} post`);
            }

            console.log(`Post ${isEditing ? 'updated' : 'created'} successfully!`);
            onFormSubmitSuccess(); // Call the success callback passed from DashboardPage

        } catch (err: any) {
            console.error(`Error ${isEditing ? 'updating' : 'creating'} post:`, err);
            setError(err.message || `Could not ${isEditing ? 'update' : 'create'} post.`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
             {error && (
                <p className="text-sm text-center py-2 px-3 rounded-md bg-red-100 text-red-700">
                    {error}
                </p>
            )}
            <div>
                <label htmlFor="post-title" className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                </label>
                <input
                    id="post-title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    disabled={isLoading}
                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2.5 px-3"
                    placeholder="Enter post title"
                />
            </div>
            <div>
                <label htmlFor="post-description" className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                </label>
                <textarea
                    id="post-description"
                    rows={5} // Slightly taller textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    disabled={isLoading}
                    className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2.5 px-3 resize-y" // Allow vertical resize
                    placeholder="Write your post content here..."
                />
            </div>
            <div className="flex justify-end gap-3 pt-3 border-t border-gray-100 mt-6"> {/* Added divider */}
                <button
                    type="button"
                    onClick={onCancel}
                    disabled={isLoading}
                    className={cancelButtonClasses}
                >
                    Cancel
                </button>
                 <button
                    type="submit"
                    disabled={isLoading}
                    className={primaryButtonClasses}
                >
                    {isLoading ? (
                        <> <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving... </>
                    ) : (
                         isEditing ? 'Update Post' : 'Create Post'
                    )}
                </button>
            </div>
        </form>
    );
};

export default PostForm;