import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, ChevronRight } from "lucide-react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setIsButtonDisabled(!username.trim());
  }, [username]);

  const handleChange = (e) => {
    setUsername(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("username", username);
    navigate("/homepage");
  };

  return (
    <div className="w-full md:w-1/2 flex items-center justify-center p-8 animate-fadeIn">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-2 text-gray-800">Welcome to CodeLeap network!</h1>
          <p className="text-gray-600">
            Enter your username to continue.
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
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={handleChange}
              placeholder="John Doe"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300 transition-all duration-300"
            />
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
            Enter
            <ChevronRight size={16} className={isButtonDisabled ? "" : "animate-pulse"} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
