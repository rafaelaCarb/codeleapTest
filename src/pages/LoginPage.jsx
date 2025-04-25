"use client";

import React from "react";
import Login from "../components/Login";
const LoginPage = () => {
  return (
    <div className="flex h-screen w-full">
      <div className="hidden md:block md:w-1/2 relative">
        <img
          src="https://images.unsplash.com/photo-1508780709619-79562169bc64?auto=format&fit=crop&w=1740&q=80"
          alt="Sala"
          className="h-full w-full object-cover"
        />
      </div>
      <Login />
    </div>
  );
};

export default LoginPage;
