// src/components/posts/PostList.tsx
import React from 'react';
import { Post } from '@/types';
import PostCard from './PostCard';
import { motion } from 'framer-motion';

interface PostListProps {
  posts: Post[];
  onEditPost: (post: Post) => void; // Prop type for edit handler
  onDeletePost: (postId: number) => void; // Prop type for delete handler
}

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
};

const PostList: React.FC<PostListProps> = ({ posts, onEditPost, onDeletePost }) => {
  // Empty state is handled in DashboardPage
  if (!posts || posts.length === 0) return null;

  return (
    <motion.div
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
    >
      {posts.map((post) => (
        <PostCard
            key={post.id} // Use unique post ID as key
            post={post}
            onEditClick={onEditPost}   // Pass the edit handler
            onDeleteClick={onDeletePost} // Pass the delete handler
        />
      ))}
    </motion.div>
  );
};

export default PostList;