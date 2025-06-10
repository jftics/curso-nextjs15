'use client'

import { useState, useEffect } from "react"

interface dataProps {
  label: string,
  value: number
}

export default function DashboardPage(){
    const [data, setData] = useState<dataProps[]>([])
    useEffect(()=>{
        setData([
        { label: 'Usuarios', value: Math.floor(Math.random() * 1000) + 500 },
        { label: 'Ventas', value: Math.floor(Math.random() * 50000) + 10000 },
        { label: 'Visitas', value: Math.floor(Math.random() * 10000) + 2000 },
      ])
    }, [])

    return(
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">📊 Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {data.map((item)=>(
                    <div key={item.label} className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-lg font-semibold text-gray-700">{item.label}</h3>
                        <p className="text-3xl font-bold text-blue-600">{item.value.toLocaleString()}</p>

                    </div>
                ))}
            </div>
        </div>
    )
}