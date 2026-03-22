'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface Pickle {
    pid: number;
    name: string;
    price: string | number;
    description?: string;
}

interface User {
    id: number;
    username: string;
}

interface CartItem {
    pid: number;
    name: string;
    price: number;
    qty: number;
}

export default function Dashboard() {
    const [data, setData] = useState<Pickle[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [cart, setCart] = useState<CartItem[]>([]);
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else {
            router.push('/login');
        }
    }, [router]);

    const displayPickles = async () => {
        const data = localStorage.getItem('data')
        const parsedData = JSON.parse(data)
        console.log("token:", parsedData.token)
        try {
            const apiUrl = 'http://localhost:3001/api/products/dashboard';
            const response = await fetch(apiUrl,
                {
                    headers: {
                        Authorization: `Bearer ${parsedData.token}`
                    }
                }
            )

            if (!response.ok) {
                throw new Error(`Error ${response.status}: Check if your backend route is correct.`);
            }

            const result = await response.json();
            setData(result.data || []);
            console.log(result.data)
        } catch (err: any) {
            console.error("Connection failed. Is the backend server running?", err);
            setError(err.message || "Failed to fetch pickles. Make sure the backend is running.");
        }
    }

    const fetchCart = async (userId: number) => {
        try {
            const apiUrl = 'http://localhost:3001/api/cart';
            const response = await fetch(`${apiUrl}/my-cart?userId=${userId}`);
            if (response.ok) {
                const result = await response.json();
                setCart(result.data || []);
            }
        } catch (err) {
            console.error("Failed to fetch cart", err);
        }
    }

    const addCart = async (userId: number, productId: number, qty: number) => {
        try {
            const apiUrl = 'http://localhost:3001/api/cart';
            const response = await fetch(`${apiUrl}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: userId, pid: productId, qty })
            });

            if (response.ok) {
                // Optimistically update or re-fetch
                fetchCart(userId);
            }
        } catch (err) {
            console.error("Failed to add to cart", err);
        }
    }

    const logout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        router.push('/login');
    }

    useEffect(() => {
        displayPickles();
        if (user) {
            fetchCart(user.id);
        }
    }, [user]);

    if (!user) return <div className="p-8">Loading...</div>;

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Welcome, {user.username}!</h1>
                <button
                    onClick={logout}
                    className="bg-gray-200 hover:bg-gray-300 py-2 px-4 rounded transition-colors"
                >
                    Logout
                </button>
            </div>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <h1> data: {JSON.stringify(data)}</h1>
                {data.map((item) => (
                    <div key={item.pid} className="border p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                        <h2 className="text-xl font-semibold">{item.name}</h2>
                        <p className="text-gray-600 mt-2">${item.price}</p>
                        <div className="flex gap-2 mt-4">
                            <button
                                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition-colors"
                                onClick={() => { console.log(item); addCart(user.id, item.pid, 1) }}
                            >
                                Add to Cart
                            </button>
                            <button className="flex-1 border border-blue-500 text-blue-500 hover:bg-blue-50 py-2 px-4 rounded transition-colors">
                                Buy Now
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {data.length === 0 && !error && <p>No pickles found.</p>}

            <div className="mt-12">
                <h2 className="text-2xl font-bold mb-4">Your Cart ({cart.length})</h2>
                {cart.length > 0 ? (
                    <div className="border rounded-lg overflow-hidden">
                        {cart.map((item, idx) => (
                            <div key={idx} className="p-4 border-b last:border-b-0 flex justify-between">
                                <span>Product ID: {item.pid}</span>
                                <span>Qty: {item.qty}</span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">Your cart is empty.</p>
                )}
            </div>
        </div>
    )
}