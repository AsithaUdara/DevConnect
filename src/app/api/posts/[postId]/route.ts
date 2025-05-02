// src/app/api/posts/[postId]/route.ts
import 'dotenv/config';
import { NextResponse } from 'next/server';
import { withAuthApi, type NextRequestWithUser } from '@/utils/withAuthApi';
import Post from '@/models/Post';

interface RouteContext {
    params: {
        postId: string; // Note: URL parameters are always strings initially
    };
}

// PUT handler to update a specific post owned by the user
export const PUT = withAuthApi(async (req: NextRequestWithUser, context: RouteContext) => {
    try {
        const userId = req.user.dbUserId;
        const postId = parseInt(context.params.postId, 10);

        if (isNaN(postId)) {
            return NextResponse.json({ message: "Invalid post ID format" }, { status: 400 });
        }

        const body = await req.json();
        const { title, description } = body;

        console.log(`Updating post ID: ${postId} for user ID: ${userId}`); // Logging

        // Basic validation
        if (!title || !description || title.trim() === '' || description.trim() === '') {
            return NextResponse.json({ message: "Title and description cannot be empty" }, { status: 400 });
        }

        // Find the post ensuring it belongs to the current user
        const post = await Post.findOne({
            where: {
                id: postId,
                userId: userId // SECURITY CHECK: Ensure ownership
            }
        });

        if (!post) {
            console.warn(`Post not found or permission denied for post ID: ${postId}, user ID: ${userId}`); // Logging
            return NextResponse.json({ message: "Post not found or permission denied" }, { status: 404 });
        }

        // Update the post
        await post.update({ title: title.trim(), description: description.trim() });

        console.log(`Updated post ID: ${postId} successfully`); // Logging
        return NextResponse.json(post); // Return updated post

    } catch (error: any) {
        console.error(`API Error - Updating post ${context?.params?.postId}:`, error);
         if (error.name === 'SequelizeValidationError') {
             const messages = error.errors.map((e: any) => e.message).join(', ');
             return NextResponse.json({ message: `Validation Error: ${messages}` }, { status: 400 });
        }
        return NextResponse.json({ message: "Failed to update post" }, { status: 500 });
    }
});


// DELETE handler to remove a specific post owned by the user
export const DELETE = withAuthApi(async (req: NextRequestWithUser, context: RouteContext) => {
    try {
        const userId = req.user.dbUserId;
        const postId = parseInt(context.params.postId, 10);

        if (isNaN(postId)) {
            return NextResponse.json({ message: "Invalid post ID format" }, { status: 400 });
        }

        console.log(`Deleting post ID: ${postId} for user ID: ${userId}`); // Logging

        // Find the post ensuring it belongs to the current user before deleting
        const post = await Post.findOne({
            where: {
                id: postId,
                userId: userId // SECURITY CHECK: Ensure ownership
            }
        });

        if (!post) {
            console.warn(`Post not found or permission denied for deletion - post ID: ${postId}, user ID: ${userId}`); // Logging
            return NextResponse.json({ message: "Post not found or permission denied" }, { status: 404 });
        }

        // Delete the post
        await post.destroy();

        console.log(`Deleted post ID: ${postId} successfully`); // Logging
        return NextResponse.json({ message: "Post deleted successfully" }, { status: 200 });

    } catch (error) {
        console.error(`API Error - Deleting post ${context?.params?.postId}:`, error);
        return NextResponse.json({ message: "Failed to delete post" }, { status: 500 });
    }
});