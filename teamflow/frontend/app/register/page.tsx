"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const router = useRouter();

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const res = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    // check response before parsing
    if (!res.ok) {
      const text = await res.text(); // backend error (HTML)
      console.error("Server error:", text);
      alert("Registration failed");
      return;
    }

const data = await res.json();
console.log("Response:", data);

    alert("Registered Successfully");
    router.push("/login");

  } catch (err) {
    console.error(err);
    alert("Something went wrong");
  }
};

  return (
    <div style={{ padding: 20 }}>
      <h2>Register</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        /><br />

        <input
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        /><br />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        /><br />

        <button type="submit">Register</button>
      </form>
    </div>
  );
}