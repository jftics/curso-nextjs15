import { getSecretData } from "../actions/serverActions";

export default async function ServerUsers(){
    const data =  await getSecretData()

    return (
        <div  className="bg-gradient-to-br from-blue-100 to-blue-200 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4 text-blue-800">
                📡 Datos desde el servidor
            </h3>
            <p className="text-gray-600">{data.message}</p>
            <p className="text-gray-500">🕒 {data.timestamp}</p>
            <p className="text-gray-500">💾 Memoria usada: {data.memoryUsage}</p>

            <div className="mt-4">
                <h3 className="font-semibold text-gray-700 mb-2">
                    Usuarios de prueba:
                </h3>
                <div className="flex justify-center space-x-2">
                    <ul className="space-y-1">
                        {data.fakeUsers.map(user => (
                            <li className="text-sm text-gray-700" key={user.id}>
                                👤 {user.name} - {user.email}
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