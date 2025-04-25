import React from 'react'
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, Key, ChevronRight } from "lucide-react";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const { username, password } = formData;
    setIsButtonDisabled(!username.trim() || !password.trim());
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("username", formData.username);
    navigate("/homepage");
  };

  return (
    <div className="w-full md:w-1/2 flex items-center justify-center p-8 animate-fadeIn">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-2 text-gray-800">Welcome to CodeLeap network!</h1>
          <p className="text-gray-600">
            Fill in your credentials to access your account.
          </p>
          <div className="h-1 w-24 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-full mx-auto mt-4"></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2 duration-300 rounded-lg">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 flex items-center gap-2"
            >
              <User size={16} className="text-indigo-500" />
              Username
            </label>
            <input
              type="username"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="John Doe"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300 transition-all duration-300"
            />
          </div>

          <div className="space-y-2 transition-all duration-300 rounded-lg">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 flex items-center gap-2"
            >
              <Key size={16} className="text-indigo-500" />
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300 transition-all duration-300"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="lembrar"
                className="h-3 w-3 text-indigo-500 border-gray-300 rounded-lg focus:ring-indigo-300"
              />
              <label
                htmlFor="lembrar"
                className="ml-2 block text-sm text-gray-700"
              >
                Remember-me
              </label>
            </div>
            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-indigo-500 hover:text-indigo-600 transition-colors"
              >
                Forgot your password?
              </a>
            </div>
          </div>

          <button
            type="submit"
            disabled={isButtonDisabled}
            className={`w-full py-3 px-4 rounded-md text-white font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
              isButtonDisabled
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-indigo-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600 transform hover:-translate-y-1 hover:shadow-lg cursor-pointer"
            }`}
          >
            Entrar
            <ChevronRight size={16} className={isButtonDisabled ? "" : "animate-pulse"} />
          </button>

          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Dont have an account yet?{" "}
              <a
                href="#"
                className="font-medium text-indigo-500 hover:text-indigo-600 transition-colors"
              >
                Sign-up
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login