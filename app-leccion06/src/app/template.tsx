'use client'

import { useState, useEffect } from 'react'

interface TemplateProps {
  children: React.ReactNode
}

export default function Template({children}: TemplateProps){
    const [isLoading, setIsLoading] = useState(true)
    const [fadeIn, setFadeIn] = useState(false)

    useEffect(()=>{
        // Simula carga de página
        const timer= setTimeout(()=>{
            setIsLoading(false)
            setFadeIn(true)
        }, 800) 

        return()=> clearTimeout(timer)
    }, [])

    if(isLoading){
        return(
            <div className='min-h-screen flex items-center justify-center'>
                <div className='text-center'>
                    <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4'></div>
                    <p className='text-gray-600'>Cargando pagina...</p>
                </div>
            </div>
        )
    }
    return(
        <div className={`transition-opacity duration-500 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
            {children}
        </div>
    )
}   
    