'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface CartItem {
    pid: number
    name: string
    price: number
    qty: number
}

export default function CartPage() {
    const router = useRouter()

    const [cart, setCart] = useState<CartItem[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchCart()
    }, [])

    const fetchCart = async () => {
        try {
            const response = await fetch('/api/cart/my-cart', {
                credentials: 'include',
            })

            if (!response.ok) {
                throw new Error('Failed to fetch cart')
            }

            const result = await response.json()

            setCart(result.data || [])
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    const increaseQty = async (pid: number) => {
        const item = cart.find((x) => x.pid === pid)

        if (!item) return

        try {
            const response = await fetch('/api/cart/cart', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    pid,
                    qty: 1,
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
                    qty: -1,
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
            <div className="flex justify-center items-center min-h-screen">
                Loading...
            </div>
        )
    }

    const totalItems = cart.length

    const totalQuantity = cart.reduce((sum, item) => sum + item.qty, 0)

    const totalPrice = cart.reduce(
        (sum, item) => sum + item.qty * item.price,
        0
    )

    return (
        <div className="min-h-screen bg-gray-100">

            <div className="max-w-6xl mx-auto py-10 px-6">

                <div className="flex justify-between items-center mb-8">

                    <h1 className="text-4xl font-bold">
                        🛒 My Cart
                    </h1>

                    <button
                        onClick={() => router.push('/dashboard')}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
                    >
                        Continue Shopping
                    </button>

                </div>

                {cart.length === 0 ? (
                    <div className="bg-white rounded-xl shadow p-16 text-center">

                        <h2 className="text-2xl font-semibold">
                            Your cart is empty
                        </h2>

                        <p className="text-gray-500 mt-3">
                            Add some delicious pickles to get started.
                        </p>

                        <button
                            onClick={() => router.push('/dashboard')}
                            className="mt-8 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
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
                                    className="bg-white rounded-xl shadow-md p-6"
                                >

                                    <div className="flex justify-between">

                                        <div>

                                            <h2 className="text-2xl font-bold">
                                                {item.name}
                                            </h2>

                                            <p className="text-gray-500 mt-2">
                                                Price per item
                                            </p>

                                            <p className="text-xl font-semibold text-green-700">
                                                ₹{item.price}
                                            </p>

                                        </div>

                                        <button
                                            onClick={() => removeItem(item.pid)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            Remove
                                        </button>

                                    </div>

                                    <div className="flex justify-between items-center mt-6">

                                        <div className="flex items-center gap-3">

                                            <button
                                                onClick={() => decreaseQty(item.pid)}
                                                className="w-10 h-10 rounded bg-gray-200 hover:bg-gray-300 text-xl"
                                            >
                                                -
                                            </button>

                                            <span className="text-xl font-semibold w-10 text-center">
                                                {item.qty}
                                            </span>

                                            <button
                                                onClick={() => increaseQty(item.pid)}
                                                className="w-10 h-10 rounded bg-gray-200 hover:bg-gray-300 text-xl"
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

                            <div className="bg-white rounded-xl shadow-md p-6 sticky top-6">

                                <h2 className="text-2xl font-bold mb-6">
                                    Order Summary
                                </h2>

                                <div className="flex justify-between mb-4">
                                    <span>Unique Products</span>
                                    <span>{totalItems}</span>
                                </div>

                                <div className="flex justify-between mb-4">
                                    <span>Total Quantity</span>
                                    <span>{totalQuantity}</span>
                                </div>

                                <hr className="my-5" />

                                <div className="flex justify-between text-2xl font-bold">

                                    <span>Total</span>

                                    <span>
                                        ₹{totalPrice}
                                    </span>

                                </div>

                                <button
                                    className="mt-8 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold"
                                >
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