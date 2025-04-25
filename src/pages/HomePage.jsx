import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook

import PostForm from "../components/PostForm";
import PostList from "../components/PostList";
import EditPostModal from "../components/EditPost";
import DeletePostModal from "../components/DeletePost";

import { LogOut } from "lucide-react";
const HomePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);
  const navigate = useNavigate();

  const username = localStorage.getItem("username");

  const handleLogout = () => {
    localStorage.removeItem("username"); // Remove username from localStorage
    navigate("/"); // Navigate back to the root path
  };

  const fetchPosts = async () => {
    try {
      const response = await fetch("https://dev.codeleap.co.uk/careers/");
      const data = await response.json();
      setPosts(data.results);
      console.log("Posts:", data.results);
    } catch (error) {
      console.error("Error searching for post:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleCreatePost = async (e) => {
    e.preventDefault();

    if (!username) {
      console.error("Username not found");
      return;
    }

    try {
      const response = await fetch("https://dev.codeleap.co.uk/careers/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          title: title,
          content: content,
        }),
      });

      if (response.ok) {
        setTitle("");
        setContent("");

        fetchPosts();
      } else {
        console.error("Error creating:", await response.text());
      }
    } catch (error) {
      console.error("Error sending:", error);
    }
  };

  const handleOpenEditModal = (post) => {
    setEditingPost(post);
    setTitle(post.title);
    setContent(post.content);
    setShowEditModal(true);
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();

    if (!editingPost || !title.trim() || !content.trim()) return;

    try {
      const response = await fetch(
        `https://dev.codeleap.co.uk/careers/${editingPost.id}/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: title,
            content: content,
          }),
        }
      );

      if (response.ok) {
        setShowEditModal(false);
        setEditingPost(null);
        setTitle("");
        setContent("");

        fetchPosts();
      } else {
        console.error("Error editing:", await response.text());
      }
    } catch (error) {
      console.error("Error updating:", error);
    }
  };

  const handleOpenDeleteModal = (post) => {
    setPostToDelete(post);
    setShowDeleteModal(true);
  };

  const handleDeletePost = async () => {
    if (!postToDelete) return;

    try {
      const response = await fetch(
        `https://dev.codeleap.co.uk/careers/${postToDelete.id}/`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setShowDeleteModal(false);
        setPostToDelete(null);

        fetchPosts();
      } else {
        console.error("Error deleting:", await response.text());
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleCancelEdit = () => {
    setShowEditModal(false);
    setEditingPost(null);
    setTitle("");
    setContent("");
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const isOwnPost = (post) => post.username === username;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-pink-200 p-4">
      <div className="max-w-3xl mx-auto bg-white p-4 rounded-lg shadow-lg">
        <div className="bg-gray-50 p-2 -m-4 mb-4 flex justify-between items-center">
          <span className="text-sm font-medium text-gray-700">
            Welcome, {username}
          </span>
          <button
            onClick={handleLogout}
            className="flex items-center text-indigo-600 hover:text-indigo-800 text-sm font-medium"
          >
            <LogOut size={15} className="mr-1" />
            Logout
          </button>
        </div>

        <header className="mb-8 py-6 text-center border-b border-gray-100">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Your Creative Space
          </h1>
          <p className="text-gray-600">
            Share your thoughts, ideas and stories with our community
          </p>
          <div className="h-1 w-32 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-full mx-auto mt-4"></div>
        </header>

        <PostForm
          title={title}
          setTitle={setTitle}
          content={content}
          setContent={setContent}
          handleCreatePost={handleCreatePost}
        />

        <PostList
          posts={posts}
          handleOpenEditModal={handleOpenEditModal}
          handleOpenDeleteModal={handleOpenDeleteModal}
          isOwnPost={isOwnPost}
          formatDate={formatDate}
        />
      </div>

      {showEditModal && (
        <EditPostModal
          title={title}
          setTitle={setTitle}
          content={content}
          setContent={setContent}
          handleSaveEdit={handleSaveEdit}
          handleCancelEdit={handleCancelEdit}
        />
      )}

      {showDeleteModal && (
        <DeletePostModal
          postToDelete={postToDelete}
          handleDeletePost={handleDeletePost}
          setShowDeleteModal={setShowDeleteModal}
        />
      )}
    </div>
  );
};

export default HomePage;
