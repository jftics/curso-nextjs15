'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"

interface NavigationItem{
    href:string,
    label:string,
    icon?:string
}

interface NavigationProps{
    items:NavigationItem[]
}

export default function Navigation({items}:NavigationProps){
    const pathname = usePathname()

    return(
        <nav className="bg-white shadow-md">
            <div className="container mx-auto px-4">
                <ul className="flex space-x-6">
                    {items.map((item)=>(
                        <li key={item.href}>
                            <Link href={item.href}
                            className={`block py-4 px-2 text-sm font-medium transition-colors ${
                                pathname === item.href
                                ? 'text-blue-600 border-b-2 border-blue-600'
                                : 'text-gray-700 hover:text-blue-600'
                            }`}
                            >
                                {item.icon && <span className="mr-2">{item.icon}</span> }
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    )
}