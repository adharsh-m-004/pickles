'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface Pickle {
    pid: number
    name: string
    price: string | number
    description?: string
}

interface User {
    id: number
    username: string
    email?: string
}

interface CartItem {
    pid: number
    name: string
    price: number
    qty: number
}

export default function Dashboard() {
    const [data, setData] = useState<Pickle[]>([])
    const [cart, setCart] = useState<CartItem[]>([])
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const router = useRouter()

    // =========================
    // FETCH CURRENT USER
    // =========================
    const fetchUser = async () => {
        try {
            const response = await fetch(
                'http://localhost:3001/api/auth/me',
                {
                    credentials: 'include',
                }
            )

            if (!response.ok) {
                router.push('/login')
                return
            }

            const result = await response.json()

            setUser(result.user)
        } catch (err) {
            console.error(err)
            router.push('/login')
        } finally {
            setLoading(false)
        }
    }

    // =========================
    // FETCH PRODUCTS
    // =========================
    const displayPickles = async () => {
        try {
            const response = await fetch(
                'http://localhost:3001/api/products/dashboard',
                {
                    credentials: 'include',
                }
            )

            if (!response.ok) {
                throw new Error(`Error ${response.status}`)
            }

            const result = await response.json()

            setData(result.data || [])
        } catch (err: any) {
            console.error(err)

            setError(
                err.message || 'Failed to fetch products'
            )
        }
    }

    // =========================
    // FETCH CART
    // =========================
    const fetchCart = async () => {
        try {
            const response = await fetch(
                'http://localhost:3001/api/cart/my-cart',
                {
                    credentials: 'include',
                }
            )

            if (!response.ok) {
                throw new Error('Failed to fetch cart')
            }

            const result = await response.json()

            setCart(result.data || [])
        } catch (err) {
            console.error(err)
        }
    }

    // =========================
    // ADD TO CART
    // =========================
    const addCart = async (
        productId: number,
        qty: number
    ) => {
        try {
            const response = await fetch(
                'http://localhost:3001/api/cart',
                {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        pid: productId,
                        qty,
                    }),
                }
            )

            if (!response.ok) {
                throw new Error('Failed to add to cart')
            }

            fetchCart()
        } catch (err) {
            console.error(err)
        }
    }

    // =========================
    // LOGOUT
    // =========================
    const logout = async () => {
        try {
            await fetch(
                'http://localhost:3001/api/auth/logout',
                {
                    method: 'POST',
                    credentials: 'include',
                }
            )
        } catch (err) {
            console.error(err)
        }

        router.push('/login')
    }

    // =========================
    // INITIAL LOAD
    // =========================
    useEffect(() => {
        fetchUser()
    }, [])

    useEffect(() => {
        if (user) {
            displayPickles()
            fetchCart()
        }
    }, [user])

    // =========================
    // LOADING
    // =========================
    if (loading) {
        return (
            <div className="p-8">
                Loading...
            </div>
        )
    }

    // =========================
    // UI
    // =========================
    return (
        <div className="p-8">
            {/* HEADER */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">
                    Welcome, {user?.username}
                </h1>

                <button
                    onClick={logout}
                    className="bg-gray-200 hover:bg-gray-300 py-2 px-4 rounded"
                >
                    Logout
                </button>
            </div>

            {/* ERROR */}
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            {/* PRODUCTS */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.map((item) => (
                    <div
                        key={item.pid}
                        className="border p-4 rounded-lg shadow-sm"
                    >
                        <h2 className="text-xl font-semibold">
                            {item.name}
                        </h2>

                        <p className="text-gray-600 mt-2">
                            ₹{item.price}
                        </p>

                        {item.description && (
                            <p className="text-sm text-gray-500 mt-2">
                                {item.description}
                            </p>
                        )}

                        <div className="flex gap-2 mt-4">
                            <button
                                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                                onClick={() =>
                                    addCart(item.pid, 1)
                                }
                            >
                                Add to Cart
                            </button>

                            <button className="flex-1 border border-blue-500 text-blue-500 hover:bg-blue-50 py-2 px-4 rounded">
                                Buy Now
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* EMPTY PRODUCTS */}
            {data.length === 0 && !error && (
                <p className="mt-6">
                    No pickles found.
                </p>
            )}

            {/* CART */}
            <div className="mt-12">
                <h2 className="text-2xl font-bold mb-4">
                    Your Cart ({cart.length})
                </h2>

                {cart.length > 0 ? (
                    <div className="border rounded-lg overflow-hidden">
                        {cart.map((item, idx) => (
                            <div
                                key={idx}
                                className="p-4 border-b last:border-b-0 flex justify-between"
                            >
                                <span>
                                    {item.name}
                                </span>

                                <span>
                                    Qty: {item.qty}
                                </span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">
                        Your cart is empty.
                    </p>
                )}
            </div>
        </div>
    )
}