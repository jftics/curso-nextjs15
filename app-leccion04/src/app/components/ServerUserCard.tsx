interface User{
  id: number
  name: string
  email: string
  role: string
}

interface Props{
    user: User
}

export default function ServerUserCard({user}:Props){
     // ✅ Esto se ejecuta en el servidor
     const cardColor  = user.role==='Developer'? 'border-blue-500':
                        user.role  === 'Designer'? 'border-purple-500':
                        'border-green-500'
    return(
        <div className={`border-l-4 ${cardColor} bg-gray-50 p-4 rounded-r-lg`}>
            <h3 className="font-semibold text-gray-800">{user.name}</h3>
            <p className="text-gray-600 text-sm">{user.email}</p>
            <span className="inline-block bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs mt-2">
                {user.role}
            </span>
            <p className="text-xs text-gray-500 mt-2">
        🖥️  Renderizado en el servidor
            </p>
        </div>
    )
}