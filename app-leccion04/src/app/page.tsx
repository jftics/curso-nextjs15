import ServerUserCard from "./components/ServerUserCard"
import ClientCounter from "./components/ClientCounter"
//import ServerUsers from "./components/ServerUsers"
import ClientUsers from "./components/ClientUsers"
async function fetchUsers() {
  // Simula una llamada a API en el servidor
  await new Promise(resolve=>setTimeout(resolve, 1000))
  return [
    { id: 1, name: 'Ana García', email: 'ana@example.com', role: 'Developer' },
    { id: 2, name: 'Carlos López', email: 'carlos@example.com', role: 'Designer' },
    { id: 3, name: 'María Silva', email: 'maria@example.com', role: 'Project Manager' }
  ]
}
export default async function HomePage(){
  const serverTime =  new Date().toLocaleString()
  const users = await fetchUsers()

  return(

    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Next.js 15: Server vs Client Components
        </h1>
        <p className="text-gray-600 text-lg">Datos generados en el servidor a las:<strong>{serverTime}</strong></p>
      </div>

      {/* Server Component - renderizado en el servidor */}
      <section className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4 text-blue-600">
          👥 Server Components (Datos del Servidor)
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          {users.map(user => (
            <ServerUserCard key={user.id} user={user}></ServerUserCard>
          ))}
        </div>
      </section>

      {/* Client Components - interactividad en el navegador */}
      <section className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4 text-green-600">
          🖱️ Use Client y Use Server
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <ClientCounter></ClientCounter>
          {/* <ServerUsers></ServerUsers> */}
          <ClientUsers></ClientUsers>
        </div>
      </section>

    </div>

  )
}