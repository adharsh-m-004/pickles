'use client'
// 1. Import useRouter instead of redirect
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function Register() {
    const [credentials, setCredentials] = useState({ username: "", password: "", email: "" });
    const router = useRouter(); // 2. Initialize the router

    const handleSubmit = async () => {
        try {
            const response = await fetch("http://localhost:3001/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(credentials)
            });

            const data = await response.json(); // Parse the JSON response

            if (response.ok) {
                alert("User registered successfully");
                // 3. Use router.push for client-side navigation
                router.push("/");
            } else {
                alert(data.message || "Registration failed");
            }
        } catch (err) {
            console.error("Fetch error:", err);
            alert("Could not connect to the server.");
        }
    }

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="flex flex-col gap-4 p-8 bg-white shadow-md rounded-lg">
                <h1 className="text-xl font-bold text-center">Create Account</h1>

                {/* Added some basic Tailwind classes so you can see the inputs */}
                <input
                    className="border p-2 rounded"
                    type="text"
                    placeholder="Username"
                    value={credentials.username}
                    onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                    required
                />
                <input
                    className="border p-2 rounded"
                    type="password"
                    placeholder="Password"
                    value={credentials.password}
                    onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                    required
                />
                <input
                    className="border p-2 rounded"
                    type="email"
                    placeholder="Email"
                    value={credentials.email}
                    onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                    required
                />

                <button
                    className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
                    onClick={handleSubmit}
                >
                    Register
                </button>
            </div>
        </div>
    );
}