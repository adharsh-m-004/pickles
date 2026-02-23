'use client'
import React, { useState, useEffect } from 'react'

export default function Dashboard() {
    const [data, setData] = useState([]);
    //const [loading, setLoading] = useState(true);
    const displayPickles = async () => {
        try {
            const response = await fetch('http://localhost:3001/dashboard');

            // 1. Check if the request actually worked
            if (!response.ok) {
                console.error(`Error ${response.status}: Check if your backend route is correct.`);
                return;
            }

            const result = await response.json();
            // 2. Safely set data (assuming your API returns { data: [...] })
            setData(result.data || []);
        } catch (error) {
            console.error("Connection failed. Is the backend server running?", error);
        }
    }
    useEffect(() => {
        displayPickles();
    }, []);
    return (
        <div>
            <h1>Dashboard</h1>
            {data.map((item: any) => (
                <div key={item.id}>
                    <h2>{item.name}</h2>
                    <p>{item.price}</p>
                </div>
            ))}
        </div>
    )
}