import React, { useState } from "react";
import {
  Edit2,
  Trash,
  Calendar,
  User,
  Heart,
  MessageSquare,
  Send,
} from "lucide-react"; 

const PostCard = ({
  post,
  handleOpenEditModal,
  handleOpenDeleteModal,
  isOwnPost,
  formatDate,
}) => {
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const currentUser = localStorage.getItem("username") || "Você";

  const handleLike = () => {
    setIsAnimating(true);
    setLikes((prev) => (isLiked ? prev - 1 : prev + 1));
    setIsLiked(!isLiked);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 400);
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      setComments((prev) => [
        ...prev,
        {
          username: currentUser,
          text: newComment,
        },
      ]);
      setNewComment("");
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-200">
      <div className="bg-indigo-600 px-5 py-3 border-b border-indigo-700">
        {" "}
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-white line-clamp-1">
            {post.title}
          </h3>

          {isOwnPost(post) && (
            <div className="flex gap-1">
              <button
                onClick={() => handleOpenEditModal(post)}
                className="text-white hover:bg-indigo-500 p-2 rounded-full transition-colors duration-150 ease-in-out" // White icon, darker hover, slightly larger padding, standard duration
                aria-label="Edit post"
              >
                <Edit2 size={16} />
              </button>
              <button
                onClick={() => handleOpenDeleteModal(post)}
                className="text-white hover:bg-red-500 p-2 rounded-full transition-colors duration-150 ease-in-out" // White icon, red hover for danger, matching style
                aria-label="Delete post"
              >
                <Trash size={16} />
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="p-5 space-y-4">
        <div className="flex items-center text-xs text-gray-500 space-x-3">
          <div className="flex items-center gap-1.5">
            <User size={12} className="text-indigo-600" />
            <span>{post.username}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar size={12} className="text-pink-600" />
            <span>{formatDate(post.created_datetime)}</span>
          </div>
        </div>

        <div className="border-l-2 border-indigo-400 pl-3 -ml-0.5">
          <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
            {post.content}
          </p>
        </div>

        <div className="flex items-center gap-4 pt-1">
          <button
            onClick={handleLike}
            className={`flex items-center gap-1 text-sm ${
              isLiked ? "text-red-600" : "text-gray-500"
            } hover:text-red-600 transition-colors`}
          >
            <Heart 
            size={14} 
            fill={isLiked ? "#dc2626" : "none"} 
            className={`transition-all duration-300 ${
              isAnimating ? "scale-150 scale-100" : ""
            }`}
          />
            {likes} {likes === 1 ? "Like" : "Likes"}
          </button>

          <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-blue-600 transition-colors">
            <MessageSquare size={14} />
            {comments.length} {comments.length === 1 ? "Comment" : "Comments"}
          </button>
        </div>

        {comments.length > 0 && (
          <div className="space-y-2 pt-2 border-t border-gray-100">
            <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              Comments
            </h4>
            <div className="space-y-2">
              {comments.map((comment, index) => (
                <div
                  key={index}
                  className="text-sm text-gray-600 bg-gray-50 rounded px-3 py-2"
                >
                  <span className="font-medium text-indigo-700">
                    {comment.username}
                  </span>
                  : {comment.text}
                </div>
              ))}
            </div>
          </div>
        )}
        <form
          onSubmit={handleAddComment}
          className="pt-2 border-t border-gray-100"
        >
          <div className="relative">
            <input
              type="text"
              className="w-full pl-3 pr-10 py-2 text-sm border border-gray-200 rounded-md focus:ring-1 focus:ring-indigo-400 focus:border-indigo-400 outline-none transition"
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button
              type="submit"
              disabled={!newComment.trim()}
              className="absolute right-1 top-1/2 -translate-y-1/2 p-1 text-indigo-700 hover:text-indigo-900 rounded-md disabled:text-indigo-300 transition-colors"
            >
              <Send size={16} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostCard;
