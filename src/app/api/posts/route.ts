// src/app/api/posts/route.ts
import 'dotenv/config';
import { NextResponse } from 'next/server';
import { withAuthApi, type NextRequestWithUser } from '@/utils/withAuthApi';
import Post from '@/models/Post';
// import User from '@/models/User'; // Only needed if including author

// GET handler to fetch posts for the authenticated user
export const GET = withAuthApi(async (req: NextRequestWithUser) => {
    try {
        const userId = req.user.dbUserId; // Get OUR database user ID

        console.log(`Fetching posts for user ID: ${userId}`); // Logging

        const posts = await Post.findAll({
            where: { userId: userId },
            order: [['createdAt', 'DESC']], // Show newest first
        });

        console.log(`Found ${posts.length} posts for user ID: ${userId}`); // Logging

        return NextResponse.json(posts);

    } catch (error) {
        console.error("API Error - Fetching posts:", error);
        return NextResponse.json({ message: "Failed to fetch posts" }, { status: 500 });
    }
});

// POST handler to create a new post for the authenticated user
export const POST = withAuthApi(async (req: NextRequestWithUser) => {
    try {
        const userId = req.user.dbUserId;
        const body = await req.json();
        const { title, description } = body;

        console.log(`Creating post for user ID: ${userId} with title: ${title}`); // Logging

        // Basic validation
        if (!title || !description || title.trim() === '' || description.trim() === '') {
            return NextResponse.json({ message: "Title and description cannot be empty" }, { status: 400 });
        }

        const newPost = await Post.create({
            title: title.trim(),
            description: description.trim(),
            userId: userId, // Associate post with the logged-in user's DB ID
        });

        console.log(`Created post with ID: ${newPost.id} for user ID: ${userId}`); // Logging

        // TODO: Add email sending logic here if needed

        return NextResponse.json(newPost, { status: 201 });

    } catch (error: any) {
        console.error("API Error - Creating post:", error);
        if (error.name === 'SequelizeValidationError') {
             const messages = error.errors.map((e: any) => e.message).join(', ');
             return NextResponse.json({ message: `Validation Error: ${messages}` }, { status: 400 });
        }
        return NextResponse.json({ message: "Failed to create post" }, { status: 500 });
    }
});