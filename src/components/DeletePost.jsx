import React from "react";
import { TriangleAlert } from "lucide-react";
const DeletePost = ({ postToDelete, handleDeletePost, setShowDeleteModal }) => {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center p-4 z-50 animate-fadeIn">
      <div className="bg-white rounded-xl w-full max-w-md shadow-2xl border border-gray-100 overflow-hidden">
        <div className="p-6">
          <div className="flex flex-col items-center mb-4">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-3">
            <TriangleAlert color="red"/>
            </div>
            <h2 className="text-xl font-bold text-gray-800">Delete Post</h2>
          </div>
          
          <p className="text-gray-600 mb-6 text-center">
            Are you sure you want to delete this post <span className="font-medium text-gray-800">"{postToDelete?.title}"</span>?
            <br />
            This action cant be undone.
          </p>
          
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setShowDeleteModal(false)}
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors duration-300 font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleDeletePost}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 transition-all duration-300 font-medium shadow-sm hover:shadow-md"
            >
                Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeletePost;