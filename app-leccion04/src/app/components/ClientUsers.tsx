'use client'

import { useState, useEffect } from "react"
import { getSecretData } from "../actions/serverActions"
import { ServerData } from "../actions/serverActions"

export default function ClientUsers(){
    const [data, setData]= useState<ServerData | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(()=>{
       const fetchData = async ()=>{
        try{
            const result = await getSecretData()
            setData(result)
        }
        finally{
            setIsLoading(false)
        }
       }
       fetchData()
    }, [])

    if(isLoading){
        return(
            <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-6 rounded-lg">
                <p>Cargando datos...</p>
            </div>
        )
    }

    return(
        <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4 text-blue-800">📡 Datos desde el servidor al componente cliente</h3>

        <p className="text-gray-600">{data!.message}</p>
        <p className="text-sm text-gray-500">🕒 {data!.timestamp}</p>
        <p className="text-sm text-gray-500">💾 Memoria usada: {data!.memoryUsage}</p>

        <div className="mt-4">
            <h3 className="font-semibold text-gray-700 mb-2">Usuarios de prueba:</h3>
            <div className="flex justify-center space-x-2">
            <ul className="space-y-1">
                {data!.fakeUsers.map(user => (
                <li key={user.id} className="text-sm text-gray-700">
                    👤 {user.name} — {user.email}
                </li>
                ))}
            </ul>
            </div>
        </div>
        
        <p className="text-xs text-blue-600 mt-4 text-center">
            🌐 Server Actions
        </p>
        </div>
    )
}