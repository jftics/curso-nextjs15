'use client' // ✅ Obligatorio para usar hooks

import { useState } from "react"

export default function ClientCounter(){
    const [count, setCount] =  useState(0)
    const [message, setMessage] = useState('')

    const handleIncrement = ()=>{
       setCount(prev => prev + 1) 
       if(count + 1 === 10){
        setMessage('¡Llegaste a 10! 🎉')
       }
    }
    const handleReset = ()=>{
        setCount(0)
        setMessage('')
    }
    return(
        <div className="bg-gradient-to-br from-green-100 to-green-200 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4 text-green-800">
        🔢      Contador Interactivo
            </h3>
            <div className="text-center">
                <div className="text-4xl font-bold text-green-600 mb-4">
                    {count}
                </div>
                {message && (
                    <div className="bg-yellow-100 border-l-4 border-yellow-500 p-3 mb-4">
                        <p className="text-yellow-700">{message}</p>
                    </div>
                )}
            </div>
            <div className="space-x-3">
                <button onClick={handleIncrement} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors">
                    Incrementar
                </button>
                <button onClick={handleReset} className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors">
                    Reset
                </button>
            </div>
            <p className="text-xs text-green-600 mt-4 text-center">
                🌐 Ejecutándose en el navegador
            </p>
        </div>

    )
}