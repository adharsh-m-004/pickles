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

    const fetchUser = async () => {
        try {
            const response = await fetch('/api/auth/me', {  // ✅ fixed
                method: 'POST',                              // ✅ your /me route is POST
                credentials: 'include',
            })
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

    const displayPickles = async () => {
        try {
            const response = await fetch('/api/products/dashboard', {  // ✅ fixed
                credentials: 'include',
            })
            if (!response.ok) throw new Error(`Error ${response.status}`)
            const result = await response.json()
            setData(result.data || [])
        } catch (err: any) {
            setError(err.message || 'Failed to fetch products')
        }
    }

    const fetchCart = async () => {
        try {
            const response = await fetch('/api/cart/my-cart', {  // ✅ no ?userId= needed
                credentials: 'include',
            })
            if (!response.ok) throw new Error('Failed to fetch cart')
            const result = await response.json()
            setCart(result.data || [])
        } catch (err) {
            console.error(err)
        }
    }

    const addCart = async (productId: number, qty: number) => {
        if (!user) {
            router.push('/login')
            return
        }
        try {
            const response = await fetch('/api/cart/cart', {  // ✅ fixed
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: user.id, pid: productId, qty }),
            })
            if (!response.ok) throw new Error('Failed to add to cart')
            fetchCart()
        } catch (err) {
            console.error(err)
        }
    }

    const logout = async () => {
        try {
            await fetch('/api/auth/logout', {  // ✅ fixed
                method: 'POST',
                credentials: 'include',
            })
        } catch (err) {
            console.error(err)
        }
        router.push('/')
    }

    useEffect(() => {
        fetchUser()
    }, [])

    useEffect(() => {
        if (user) {
            displayPickles()
            fetchCart()
        }
    }, [user])

    if (loading) return <div className="p-8">Loading...</div>

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Welcome, {user?.username}</h1>
                <button onClick={logout} className="bg-gray-200 hover:bg-gray-300 py-2 px-4 rounded">
                    Logout
                </button>
            </div>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.map((item) => (
                    <div key={item.pid} className="border p-4 rounded-lg shadow-sm">
                        <h2 className="text-xl font-semibold">{item.name}</h2>
                        <p className="text-gray-600 mt-2">₹{item.price}</p>
                        {item.description && (
                            <p className="text-sm text-gray-500 mt-2">{item.description}</p>
                        )}
                        <div className="flex gap-2 mt-4">
                            <button
                                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                                onClick={() => addCart(item.pid, 1)}
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

            {data.length === 0 && !error && <p className="mt-6">No pickles found.</p>}

            <div className="mt-12">
                <h2 className="text-2xl font-bold mb-4">Your Cart ({cart.length})</h2>
                {cart.length > 0 ? (
                    <div className="border rounded-lg overflow-hidden">
                        {cart.map((item, idx) => (
                            <div key={idx} className="p-4 border-b last:border-b-0 flex justify-between">
                                <span>{item.name}</span>
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