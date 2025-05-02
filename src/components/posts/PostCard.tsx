// src/components/posts/PostCard.tsx
import React from 'react';
import { Post } from '@/types';
import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';
import { MoreHorizontal, Edit3, Trash2 } from 'lucide-react';

interface PostCardProps {
  post: Post;
  onEditClick: (post: Post) => void; // Callback with full post object
  onDeleteClick: (postId: number) => void; // Callback with post ID
}

const cardVariants = {
   hidden: { opacity: 0, y: 20 },
   visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const PostCard: React.FC<PostCardProps> = ({ post, onEditClick, onDeleteClick }) => {

    let timeAgo = 'a moment ago';
    try {
        const date = new Date(post.createdAt ?? Date.now());
        if (!isNaN(date.getTime())) { timeAgo = formatDistanceToNow(date, { addSuffix: true }); }
        else { throw new Error("Invalid date"); }
    } catch (e) { console.error("Error formatting date:", post.createdAt, e); }

  return (
    <motion.div
      className="bg-white border border-gray-200/80 rounded-xl shadow-sm overflow-hidden transition-shadow duration-200 hover:shadow-md"
      variants={cardVariants} // Ensure PostList uses motion.div with variants for this to work
    >
      <div className="p-5 sm:p-6">
        <div className="flex justify-between items-start mb-3">
            <h3 className="text-lg font-semibold text-black leading-snug pr-2">
                {post.title}
            </h3>
            {/* Actions: Replace with actual Dropdown component later */}
            <div className="relative flex-shrink-0 ml-2">
                 <div className="flex space-x-1">
                     <button
                        onClick={() => onEditClick(post)} // Pass full post
                        className="p-1.5 rounded text-gray-400 hover:bg-blue-50 hover:text-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-300"
                        aria-label="Edit post"
                     > <Edit3 size={16}/> </button>
                     <button
                        onClick={() => onDeleteClick(post.id)} // Pass ID
                        className="p-1.5 rounded text-gray-400 hover:bg-red-50 hover:text-red-600 focus:outline-none focus:ring-1 focus:ring-red-300"
                        aria-label="Delete post"
                     > <Trash2 size={16}/> </button>
                 </div>
                 {/* Placeholder for a future dropdown button */}
                 {/* <button className="p-1 rounded-full ..."><MoreHorizontal size={18} /></button> */}
            </div>
        </div>

        <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-3">
            {post.description}
        </p>
        <div className="text-xs text-gray-400 flex items-center pt-3 border-t border-gray-100 mt-4"> {/* Added divider */}
          <span>Posted {timeAgo}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default PostCard;