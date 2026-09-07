"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { API_URL } from "@/lib/api";


export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        alert("Login failed");
        return;
      }

      const data = await res.json();
      localStorage.setItem("token", data.token);

      alert("Login Success");
      router.push("/dashboard");

    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#080B14] relative overflow-hidden">

      {/* 🔥 Background Glow */}
      <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-[#C9A227]/20 blur-[120px]" />
      <div className="absolute bottom-[-100px] right-[-100px] w-[300px] h-[300px] bg-[#5B8DEF]/20 blur-[120px]" />

      {/* 🧊 Glass Card */}
<div className="relative z-10 w-full max-w-md mx-4 sm:mx-0 rounded-2xl border border-white/10 bg-white/[0.05] backdrop-blur-xl p-6 sm:p-8 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)]">
        <h2 className="text-2xl font-semibold text-white mb-6 text-center">
          Welcome back
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 rounded-lg bg-white/[0.06] border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-[#C9A227]"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded-lg bg-white/[0.06] border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-[#C9A227]"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          {/* Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-lg font-semibold text-[#241A05] bg-gradient-to-b from-[#E7C766] to-[#B5871F] hover:opacity-90 transition"
          >
            Login
          </button>
        </form>

        {/* Register Link */}
        <p className="text-sm text-white/50 text-center mt-6">
          Don’t have an account?{" "}
          <span
            onClick={() => router.push("/register")}
            className="text-[#C9A227] cursor-pointer hover:underline"
          >
            Register
          </span>
        </p>

      </div>
    </div>
  );
}