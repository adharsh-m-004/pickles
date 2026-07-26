'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface CartItem {
    pid: number
    name: string
    price: number
    qty: number
}

interface User {
    id: number
    username: string
    email?: string
}

export default function CartPage() {
    const router = useRouter()
    const [user, setUser] = useState<User | null>(null)
    const [cart, setCart] = useState<CartItem[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchCart()
    }, [])
    const fetchUser = async () => {
        try {
            const response = await fetch('/api/auth/me', {
                method: 'POST',
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
    const fetchCart = async () => {
        try {
            const response = await fetch('/api/cart/my-cart', {
                credentials: 'include',
            })

            const result = await response.json()

            if (response.ok) {
                setCart(result.data || [])
            }
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    const increaseQty = async (pid: number) => {
        try {
            const response = await fetch(`/api/cart/cart/${pid}`, {
                method: 'PATCH',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    action: 'increase',
                }),
            })

            if (response.ok) {
                fetchCart()
            }
        } catch (err) {
            console.error(err)
        }
    }

    const decreaseQty = async (pid: number) => {
        try {
            const response = await fetch(`/api/cart/cart/${pid}`, {
                method: 'PATCH',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    action: 'decrease',
                }),
            })

            if (response.ok) {
                fetchCart()
            }
        } catch (err) {
            console.error(err)
        }
    }

    const removeItem = async (pid: number) => {
        try {
            const response = await fetch(`/api/cart/cart/${pid}`, {
                method: 'DELETE',
                credentials: 'include',
            })

            if (response.ok) {
                fetchCart()
            }
        } catch (err) {
            console.error(err)
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                Loading...
            </div>
        )
    }

    const totalItems = cart.length

    const totalQuantity = cart.reduce((sum, item) => sum + item.qty, 0)

    const totalPrice = cart.reduce(
        (sum, item) => sum + item.price * item.qty,
        0
    )

    return (
        <div className="min-h-screen bg-gray-100 py-10">
            <div className="max-w-6xl mx-auto px-6">

                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-bold">🛒 My Cart</h1>

                    <button
                        onClick={() => router.push('/dashboard')}
                        className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
                    >
                        Continue Shopping
                    </button>
                </div>

                {cart.length === 0 ? (
                    <div className="bg-white rounded-xl shadow p-12 text-center">

                        <h2 className="text-2xl font-bold">
                            Your cart is empty
                        </h2>

                        <p className="mt-3 text-gray-500">
                            Add some delicious pickles.
                        </p>

                        <button
                            onClick={() => router.push('/dashboard')}
                            className="mt-6 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
                        >
                            Browse Products
                        </button>

                    </div>
                ) : (
                    <div className="grid lg:grid-cols-3 gap-8">

                        <div className="lg:col-span-2 space-y-5">

                            {cart.map((item) => (

                                <div
                                    key={item.pid}
                                    className="bg-white rounded-xl shadow p-6"
                                >

                                    <div className="flex justify-between">

                                        <div>

                                            <h2 className="text-2xl font-bold">
                                                {item.name}
                                            </h2>

                                            <p className="text-gray-500 mt-2">
                                                ₹{item.price} each
                                            </p>

                                        </div>

                                        <button
                                            onClick={() => removeItem(item.pid)}
                                            className="text-red-600 hover:text-red-800"
                                        >
                                            Remove
                                        </button>

                                    </div>

                                    <div className="flex justify-between items-center mt-6">

                                        <div className="flex items-center gap-3">

                                            <button
                                                onClick={() => decreaseQty(item.pid)}
                                                className="w-10 h-10 rounded bg-gray-200 hover:bg-gray-300"
                                            >
                                                -
                                            </button>

                                            <span className="text-xl font-bold w-8 text-center">
                                                {item.qty}
                                            </span>

                                            <button
                                                onClick={() => increaseQty(item.pid)}
                                                className="w-10 h-10 rounded bg-gray-200 hover:bg-gray-300"
                                            >
                                                +
                                            </button>

                                        </div>

                                        <div className="text-right">

                                            <p className="text-gray-500">
                                                Total
                                            </p>

                                            <p className="text-2xl font-bold text-green-700">
                                                ₹{item.qty * item.price}
                                            </p>

                                        </div>

                                    </div>

                                </div>

                            ))}

                        </div>

                        <div>

                            <div className="bg-white rounded-xl shadow p-6 sticky top-6">

                                <h2 className="text-2xl font-bold mb-6">
                                    Order Summary
                                </h2>

                                <div className="flex justify-between mb-3">
                                    <span>Products</span>
                                    <span>{totalItems}</span>
                                </div>

                                <div className="flex justify-between mb-3">
                                    <span>Quantity</span>
                                    <span>{totalQuantity}</span>
                                </div>

                                <hr className="my-4" />

                                <div className="flex justify-between text-2xl font-bold">
                                    <span>Total</span>
                                    <span>₹{totalPrice}</span>
                                </div>

                                <button className="mt-8 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold">
                                    Proceed to Checkout
                                </button>

                            </div>

                        </div>

                    </div>
                )}

            </div>
        </div>
    )
}