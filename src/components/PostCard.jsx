
import React from "react";
import { Edit2, Trash, Calendar, User } from "lucide-react";

const PostCard = ({ post, handleOpenEditModal, handleOpenDeleteModal, isOwnPost, formatDate }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-100 overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-gray-800 hover:text-indigo-600 transition-colors">{post.title}</h3>
          {isOwnPost(post) && (
            <div className="flex gap-2">
              <button
                onClick={() => handleOpenEditModal(post)}
                className="flex items-center gap-1 text-gray-500 hover:text-indigo-600 transition-colors p-1 rounded hover:bg-indigo-50"
                aria-label="Editar post"
              >
                <Edit2 size={16} />
                <span className="text-sm">Editar</span>
              </button>
              <button
                onClick={() => handleOpenDeleteModal(post)}
                className="flex items-center gap-1 text-gray-500 hover:text-pink-600 transition-colors p-1 rounded hover:bg-pink-50"
                aria-label="Excluir post"
              >
                <Trash size={16} />
                <span className="text-sm">Excluir</span>
              </button>
            </div>
          )}
        </div>
        
        <div className="border-l-4 border-indigo-400 pl-4 mb-4">
          <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{post.content}</p>
        </div>
        
        <div className="flex justify-between items-center text-sm text-gray-500 pt-3 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <User size={14} className="text-indigo-400" />
            <span>{post.username}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={14} className="text-pink-400" />
            <span>{formatDate(post.created_datetime)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
