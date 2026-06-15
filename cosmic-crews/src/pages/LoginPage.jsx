import React, { useState } from 'react';
import { User, Lock } from "lucide-react";
import InputField from "../components/InputField";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <main className="min-h-screen flex items-center justify-center relative p-6 pt-24 bg-slate-950 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="absolute inset-0 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="stars-pattern" width="120" height="120" patternUnits="userSpaceOnUse">
              <circle cx="25" cy="25" r="1.5" fill="#f1f5f9" opacity="0.7" />
              <circle cx="85" cy="45" r="1" fill="#e2e8f0" opacity="0.4" />
              <circle cx="45" cy="95" r="1.5" fill="#f8fafc" opacity="0.5" />
              <circle cx="105" cy="105" r="1" fill="#cbd5e1" opacity="0.6" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#stars-pattern)" />
        </svg>
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="bg-slate-900/60 backdrop-blur-xl border border-purple-500/30 rounded-3xl p-8 shadow-[0_0_40px_rgba(168,85,247,0.15)] flex flex-col gap-8 transition-all hover:border-purple-500/50">
          
          <div className="text-center flex flex-col gap-2">
            <h2 className="font-display text-3xl font-bold text-white tracking-tight">
              Welcome Back, Observer. 🌙
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed px-4">
              Log in to access your dashboard and connect with the community.
            </p>
          </div>

          <form 
            className="flex flex-col gap-5" 
            onSubmit={(e) => {
              e.preventDefault();
              if (username.toLowerCase() === 'admin') {
                login({ id: 0, username: 'Admin', role: 'ADMIN' }, 'admin-token');
                navigate('/admin');
              } else {
                login({ id: 1, username: username || 'Observer1', role: 'user' }, 'dummy-token');
                navigate('/dashboard');
              }
            }}
          >
            <InputField
              label="Username"
              type="text"
              placeholder="Enter 'admin' for Admin access"
              icon={User}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <div className="flex flex-col gap-3">
              <InputField
                label="Password"
                type="password"
                placeholder="Enter your password"
                icon={Lock}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="flex justify-end">
                <a href="#forgot" className="text-xs font-medium text-purple-400 hover:text-purple-300 transition-colors">
                  Forgot Password?
                </a>
              </div>
            </div>

            <button
              type="submit"
              className="mt-2 w-full py-3.5 rounded-xl text-white font-semibold text-sm transition-all duration-300 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 shadow-lg shadow-purple-900/40 hover:shadow-purple-500/30 hover:-translate-y-0.5"
            >
              Log In
            </button>
          </form>

          <div className="text-center pt-2 border-t border-white/5">
            <p className="text-sm text-slate-400">
              Don't have an account?{" "}
              <a href="/register" className="font-semibold text-purple-400 hover:text-purple-300 transition-colors">
                Sign Up
              </a>
            </p>
          </div>
          
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
