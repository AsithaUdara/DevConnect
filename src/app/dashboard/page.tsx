// src/app/dashboard/page.tsx
'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { PlusCircle, LogOut, Settings, User, LayoutGrid, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import PostList from '@/components/posts/PostList';
import { useAuth } from '@/context/AuthContext';
import type { Post } from '@/types';
import Modal from '@/components/ui/Modal'; // Import Modal
import PostForm from '@/components/posts/PostForm'; // Import Post Form
import { signOut } from 'firebase/auth'; // Import directly
import { auth } from '@/lib/firebase'; // Import auth instance


// Button styles
const primaryButtonClasses = "inline-flex items-center justify-center whitespace-nowrap bg-black text-white px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ease-in-out hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:opacity-50";
const sidebarLinkClasses = "group flex items-center px-3 py-2.5 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-100 hover:text-black transition-colors duration-150";
const sidebarActiveLinkClasses = "group flex items-center px-3 py-2.5 text-sm font-medium rounded-md bg-gray-100 text-black font-semibold";


export default function DashboardPage() {
    const router = useRouter();
    const { user, loading: authLoading } = useAuth(); // Renamed loading to avoid conflict
    const [posts, setPosts] = useState<Post[]>([]);
    const [isLoadingPosts, setIsLoadingPosts] = useState(true); // Separate loading state for posts
    const [error, setError] = useState<string | null>(null);

    // State for Modals
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingPost, setEditingPost] = useState<Post | null>(null);

    // --- Protected Route Logic ---
    useEffect(() => {
        // Redirect if auth check is complete and there's no user
        if (!authLoading && !user) {
            console.log("Dashboard: No user found after load, redirecting to home.");
            router.push('/');
        }
    }, [user, authLoading, router]);


    // --- Fetch Posts ---
    const fetchPosts = useCallback(async () => {
        // Only fetch if authenticated user exists
        if (!user) return;

        console.log("Dashboard: User found, fetching posts...");
        setIsLoadingPosts(true); // Use post-specific loading state
        setError(null);
        try {
            const token = await user.getIdToken();
            const response = await fetch('/api/posts', {
                headers: { 'Authorization': `Bearer ${token}` },
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ message: `HTTP error! Status: ${response.status}` }));
                throw new Error(errorData.message || `Failed to fetch posts (${response.status})`);
            }
            const data: Post[] = await response.json();
            setPosts(data);
            console.log("Dashboard: Posts fetched successfully", data.length);
        } catch (err: any) {
            console.error("Fetch posts error:", err);
            setError(err.message || "Could not load posts.");
        } finally {
            setIsLoadingPosts(false); // Use post-specific loading state
        }
    }, [user]); // Depend only on user

    // Initial fetch and re-fetch when user changes
    useEffect(() => {
        if (user) { // Fetch only if user is available
             fetchPosts();
        } else if (!authLoading) {
             // If loading is done and still no user, clear posts (optional)
             setPosts([]);
             setIsLoadingPosts(false);
        }
    }, [user, authLoading, fetchPosts]);


    // --- CRUD Handlers ---
    const openCreateModal = () => {
        setEditingPost(null);
        setIsEditModalOpen(false);
        setIsCreateModalOpen(true);
    };

    const openEditModal = (postToEdit: Post) => {
        setEditingPost(postToEdit);
        setIsCreateModalOpen(false);
        setIsEditModalOpen(true);
    };

    const closeModal = () => {
        setIsCreateModalOpen(false);
        setIsEditModalOpen(false);
        setEditingPost(null);
    }

    // Callback from PostForm on success
    const handleFormSuccess = () => {
        closeModal();
        fetchPosts(); // Refresh list
    }

    // --- Delete Handler ---
    const handleDeletePost = async (postId: number) => {
        if (!window.confirm("Are you sure you want to delete this post?")) return;
        if (!user) return;

        const originalPosts = [...posts]; // Keep a copy for potential revert
        // Optimistic UI update: Remove post immediately
        setPosts(currentPosts => currentPosts.filter(p => p.id !== postId));
        setError(null); // Clear previous errors

        try {
            const token = await user.getIdToken();
            const response = await fetch(`/api/posts/${postId}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` },
            });

            if (!response.ok) {
                 const errorData = await response.json().catch(() => ({ message: `HTTP error! Status: ${response.status}` }));
                 throw new Error(errorData.message || `Failed to delete post (${response.status})`);
            }
            console.log(`Post ${postId} deleted successfully via API`);
            // No need to call fetchPosts() again due to optimistic update

        } catch (err: any) {
             console.error(`Delete post error (ID: ${postId}):`, err);
             setError(err.message || "Could not delete post. Reverting change.");
             setPosts(originalPosts); // Revert UI update on error
        }
    };


    // --- Logout Handler ---
    const handleLogout = async () => {
        try {
            await signOut(auth);
            // AuthProvider listener will redirect, or we can force it:
            router.push('/');
        } catch (error) { console.error("Logout Error:", error); }
    }

    // Display user info safely
    const displayUser = {
        name: user?.displayName || user?.email || "User",
        avatarUrl: user?.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.displayName || user?.email || 'U')}&background=000&color=fff&size=96`,
    };

    // Render Loading Auth State or if user is null after loading
     if (authLoading) {
        return ( <div className="flex h-screen items-center justify-center text-gray-500"> <Loader2 className="animate-spin mr-2"/> Loading authentication... </div> );
     }
     // This should ideally not be reached if redirect effect works, but good fallback
     if (!user) {
        return ( <div className="flex h-screen items-center justify-center text-gray-500"> Please log in to view the dashboard. </div> );
     }

    // --- Main Render ---
    return (
        <>
            <div className="flex h-screen bg-gray-50 overflow-hidden">
                {/* Sidebar */}
                <aside className="hidden md:flex md:flex-shrink-0">
                    <div className="flex flex-col w-64 border-r border-gray-200 bg-white">
                        {/* Sidebar Header */}
                        <div className="flex items-center h-16 flex-shrink-0 px-4 border-b border-gray-100">
                             <Link href="/" className="text-xl font-bold text-black tracking-tight"> DevConnect </Link>
                        </div>
                        {/* Navigation */}
                        <div className="flex-1 flex flex-col overflow-y-auto pt-5 pb-4">
                            <nav className="flex-1 px-3 space-y-1.5">
                                <Link href="/dashboard" className={sidebarActiveLinkClasses}> <LayoutGrid className="mr-3 h-5 w-5 flex-shrink-0 text-gray-500 group-hover:text-black" /> Dashboard </Link>
                                <Link href="#" className={sidebarLinkClasses}> <User className="mr-3 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-600" /> Profile </Link>
                                <Link href="#" className={sidebarLinkClasses}> <Settings className="mr-3 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-600" /> Settings </Link>
                            </nav>
                        </div>
                         {/* Sidebar Footer */}
                         <div className="flex-shrink-0 flex border-t border-gray-100 p-4">
                            <button onClick={handleLogout} className="flex-shrink-0 w-full group block focus:outline-none rounded-md focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                <div className="flex items-center">
                                    <div> <Image className="inline-block h-9 w-9 rounded-full ring-1 ring-white" src={displayUser.avatarUrl} alt="User Avatar" width={36} height={36} unoptimized/> </div>
                                    <div className="ml-3 text-left flex-grow">
                                        <p className="text-sm font-medium text-gray-700 group-hover:text-black truncate">{displayUser.name}</p>
                                        <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700 flex items-center"> Logout <LogOut className="ml-1.5 h-3.5 w-3.5"/> </p>
                                    </div>
                                </div>
                            </button>
                        </div>
                    </div>
                </aside>

                {/* Main Content Area */}
                <div className="flex flex-col w-0 flex-1 overflow-hidden">
                    <main className="flex-1 relative overflow-y-auto focus:outline-none">
                        <div className="py-8 px-4 sm:px-6 lg:px-8 container mx-auto max-w-7xl">
                            {/* Page Header */}
                            <div className="flex items-center justify-between pb-6 border-b border-gray-200 mb-8 flex-wrap gap-4">
                                 <div>
                                    <h1 className="text-2xl font-bold leading-tight text-gray-900 sm:text-3xl"> Dashboard </h1>
                                    <p className="mt-1 text-sm text-gray-500">Your recent activity and posts.</p>
                                </div>
                                <button type="button" onClick={openCreateModal} className={primaryButtonClasses}>
                                    <PlusCircle className="mr-2 h-5 w-5" /> Create Post
                                </button>
                            </div>

                            {/* Content Grid - Posts */}
                            <div>
                                {/* Display Error Message */}
                                {error && (
                                    <div className="mb-4 text-center py-4 px-3 rounded-md bg-red-100 text-red-700 text-sm">Error: {error}</div>
                                )}

                                {/* Display Loading State for Posts */}
                                {isLoadingPosts && (
                                     <div className="text-center py-10 text-gray-500"><Loader2 className="animate-spin inline-block h-6 w-6 mr-2"/> Loading posts...</div>
                                )}

                                {/* Display Posts or Empty State */}
                                {!isLoadingPosts && !error && (
                                    <>
                                        {posts.length > 0 ? (
                                            <PostList
                                                posts={posts}
                                                onEditPost={openEditModal}
                                                onDeletePost={handleDeletePost}
                                            />
                                        ) : (
                                            <div className="text-center py-16 border-2 border-dashed border-gray-200 rounded-lg mt-6">
                                                <h3 className="text-lg font-medium text-gray-900">No posts yet</h3>
                                                <p className="mt-1 text-sm text-gray-500">Get started by creating your first post.</p>
                                                <div className="mt-6">
                                                    <button type="button" onClick={openCreateModal} className={primaryButtonClasses}>
                                                         <PlusCircle className="mr-2 h-5 w-5" /> Create Post
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                     </>
                                )}
                            </div>
                        </div>
                    </main>
                </div>
            </div> {/* End Flex Container */}

            {/* Create/Edit Post Modals */}
             <Modal isOpen={isCreateModalOpen || isEditModalOpen} onClose={closeModal} title={editingPost ? "Edit Post" : "Create New Post"}>
                <PostForm
                    initialData={editingPost}
                    onFormSubmitSuccess={handleFormSuccess}
                    onCancel={closeModal}
                />
             </Modal>
        </> // End Fragment
    );
}