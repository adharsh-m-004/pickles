'use client'
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function Register() {
    const [credentials, setCredentials] = useState({ username: "", password: "", email: "" });
    const router = useRouter();

    const handleSubmit = async () => {
        try {
            const response = await fetch("/api/auth/register", {  // ✅ fixed URL
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(credentials)
            });

            const data = await response.json();

            if (response.ok) {
                alert("User registered successfully");
                router.push("/login");  // ✅ go to login, not dashboard (user isn't logged in yet)
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

                <input
                    className="border p-2 rounded"
                    type="text"
                    placeholder="Username"
                    value={credentials.username}
                    onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                />
                <input
                    className="border p-2 rounded"
                    type="password"
                    placeholder="Password"
                    value={credentials.password}
                    onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                />
                <input
                    className="border p-2 rounded"
                    type="email"
                    placeholder="Email"
                    value={credentials.email}
                    onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                />

                <button
                    className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
                    onClick={handleSubmit}
                >
                    Register
                </button>
            </div>
        </div>
    )
}