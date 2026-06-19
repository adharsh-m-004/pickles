'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Register() {
    const [credentials, setCredentials] = useState({
        username: '',
        password: '',
        email: '',
    });

    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

    const router = useRouter();

    const handleSubmit = async () => {
        try {
            // Clear previous errors
            setFieldErrors({});

            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            });

            const data = await response.json();

            if (response.ok) {
                alert('User registered successfully');
                router.push('/login');
            } else {
                if (data.errors) {
                    const mappedErrors: Record<string, string> = {};

                    data.errors.forEach(
                        (error: { field: string; message: string }) => {
                            mappedErrors[error.field] = error.message;
                        }
                    );

                    setFieldErrors(mappedErrors);
                } else {
                    alert(data.message || 'Registration failed');
                }
            }
        } catch (error) {
            console.error('Fetch error:', error);
            alert('Could not connect to the server.');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="flex flex-col gap-3 p-8 bg-white shadow-md rounded-lg w-96">
                <h1 className="text-2xl font-bold text-center">
                    Create Account
                </h1>

                {/* Username */}
                <div>
                    <input
                        className={`border p-2 rounded w-full ${fieldErrors.username
                                ? 'border-red-500'
                                : 'border-gray-300'
                            }`}
                        type="text"
                        placeholder="Username"
                        value={credentials.username}
                        onChange={(e) =>
                            setCredentials({
                                ...credentials,
                                username: e.target.value,
                            })
                        }
                    />

                    {fieldErrors.username && (
                        <p className="text-red-500 text-sm mt-1">
                            {fieldErrors.username}
                        </p>
                    )}
                </div>

                {/* Email */}
                <div>
                    <input
                        className={`border p-2 rounded w-full ${fieldErrors.email
                                ? 'border-red-500'
                                : 'border-gray-300'
                            }`}
                        type="email"
                        placeholder="Email"
                        value={credentials.email}
                        onChange={(e) =>
                            setCredentials({
                                ...credentials,
                                email: e.target.value,
                            })
                        }
                    />

                    {fieldErrors.email && (
                        <p className="text-red-500 text-sm mt-1">
                            {fieldErrors.email}
                        </p>
                    )}
                </div>

                {/* Password */}
                <div>
                    <input
                        className={`border p-2 rounded w-full ${fieldErrors.password
                                ? 'border-red-500'
                                : 'border-gray-300'
                            }`}
                        type="password"
                        placeholder="Password"
                        value={credentials.password}
                        onChange={(e) =>
                            setCredentials({
                                ...credentials,
                                password: e.target.value,
                            })
                        }
                    />

                    {fieldErrors.password && (
                        <p className="text-red-500 text-sm mt-1">
                            {fieldErrors.password}
                        </p>
                    )}
                </div>

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