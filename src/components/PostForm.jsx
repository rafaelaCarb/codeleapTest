import React, { useState } from "react";
import { Plus, Send, X } from "lucide-react";

const PostForm = ({
  title,
  setTitle,
  content,
  setContent,
  handleCreatePost,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleForm = () => {
    setIsExpanded(!isExpanded);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCreatePost(e);
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
            aria-label="Criar novo post"
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
                Criar Novo Post
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
                  Título
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-2 rounded-md bg-gray-50 border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  placeholder="Digite o título do post"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="content"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Conteúdo
                </label>
                <textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full p-2 rounded-md bg-gray-50 border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 min-h-32 transition-all"
                  placeholder="Digite o conteúdo do post"
                />
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={!title.trim() || !content.trim()}
                  className="flex items-center gap-2 px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={16} />
                  Publicar
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
