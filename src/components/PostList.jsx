import React from "react";
import PostCard from "./PostCard";
import { MessageCircle } from "lucide-react";

const PostList = ({ posts, handleOpenEditModal, handleOpenDeleteModal, isOwnPost, formatDate }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <MessageCircle size={20} className="text-indigo-500" />
           Recent Posts
        </h2>
        <div className="h-1 bg-gradient-to-r from-indigo-500 to-pink-500 w-32 rounded-full"></div>
      </div>
      
      {posts.length === 0 ? (
        <div className="bg-white border border-gray-100 rounded-lg p-8 text-center shadow-md">
          <div className="bg-indigo-50 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <MessageCircle size={24} className="text-indigo-400" />
          </div>
          <p className="text-gray-600">Nenhum post encontrado. Seja o primeiro a publicar!</p>
          <div className="h-1 bg-gradient-to-r from-indigo-300 to-pink-300 w-24 rounded-full mx-auto mt-4"></div>
        </div>
      ) : (
        <div className="grid gap-6 animate-fadeIn">
          {posts.map((post, index) => (
            <div 
              key={post.id} 
              className="animate-fadeIn" 
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <PostCard 
                post={post}
                handleOpenEditModal={handleOpenEditModal}
                handleOpenDeleteModal={handleOpenDeleteModal}
                isOwnPost={isOwnPost}
                formatDate={formatDate}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PostList;
