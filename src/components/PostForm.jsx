import React, { useState, useRef } from "react";
import { Plus, Send, X, Paperclip, Trash2 } from "lucide-react";

const PostForm = ({
  title,
  setTitle,
  content,
  setContent,
  handleCreatePost,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]); 
  const fileInputRef = useRef(null); 

  const toggleForm = () => {
    setIsExpanded(!isExpanded);
  };

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    setSelectedFiles((prevFiles) => [...prevFiles, ...newFiles]);

    if (fileInputRef.current) {
       fileInputRef.current.value = "";
    }
  };

  const handleRemoveFile = (indexToRemove) => {
    setSelectedFiles((prevFiles) =>
      prevFiles.filter((_, index) => index !== indexToRemove)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCreatePost(e, { title, content, files: selectedFiles });
    setTitle("");
    setContent("");
    setSelectedFiles([]);
    setIsExpanded(false);
  };

  const handleCancel = () => {
    setTitle("");
    setContent("");
    setIsExpanded(false);
  };

  return (
    <>
      {!isExpanded && (
        <>
          <button
            onClick={toggleForm}
            className="fixed bottom-6 right-6 w-fit p-2 px-4 gap-2 font-semibold h-14 flex items-center justify-center bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-500 transition-all duration-300 z-50"
            aria-label="Create new post"
          >
            <Plus size={24} />
            <p>Create a new Post</p>
          </button>
        </>
      )}

      {isExpanded && (
        <div className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm md:backdrop-blur-none md:bg-transparent bg-opacity-50 flex md:items-end items-center justify-end p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 w-full max-w-lg animate-fadeIn">
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-800">
                Create New Post
              </h2>
              <button
                onClick={handleCancel}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-4">
              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-2 rounded-md bg-gray-50 border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  placeholder="Type the post title"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="content"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Content
                </label>
                <textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full p-2 rounded-md bg-gray-50 border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 min-h-32 transition-all"
                  placeholder="Type the post content"
                />
              </div>

              <div className="">
                <label
                  htmlFor="file-upload"
                  className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-indigo-700 bg-indigo-100 rounded-md hover:bg-indigo-200 transition-colors cursor-pointer"
                >
                  <Paperclip size={16} />
                  Attach Files
                </label>
                <input
                  id="file-upload"
                  type="file"
                  multiple
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                  accept="image/*,.pdf,.doc,.docx"
                />

                {selectedFiles.length > 0 && (
                  <div className="mt-3 space-y-2 max-h-32 overflow-y-auto">
                    <p className="text-xs font-medium text-gray-500">Attached files:</p>
                    <ul className="space-y-1">
                      {selectedFiles.map((file, index) => (
                        <li
                          key={index}
                          className="flex items-center justify-between text-sm text-gray-700 bg-gray-50 p-2 rounded border border-gray-200"
                        >
                          <span className="truncate mr-2">{file.name}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveFile(index)}
                            className="text-red-500 hover:text-red-700 flex-shrink-0 p-0.5 rounded hover:bg-red-100"
                            aria-label={`Remove ${file.name}`}
                          >
                            <Trash2 size={14} />
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!title.trim() || !content.trim()}
                  className="flex items-center gap-2 px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={16} />
                  Publish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default PostForm;
