'use server'

export interface ServerData{
  message: string
  timestamp: string
  memoryUsage: string
  fakeUsers: {
    id: number
    name: string
    email: string
  }[]
}

// Server Action: se ejecuta solo en el servidor
export async function getSecretData():Promise<ServerData>{
    // Simulación de una "consulta a BD"
  const fakeUsers = [
    { id: 1, name: 'Ana Martínez', email: 'ana@example.com' },
    { id: 2, name: 'Carlos Ruiz', email: 'carlos@example.com' },
    { id: 3, name: 'Lucía Gómez', email: 'lucia@example.com' }
  ]

  const memory = process.memoryUsage().heapUsed
  const usedMB = Math.round(memory/1024/1024)

  return{
    message:  'Datos obtenidos del servidor (simulados)',
    timestamp: new Date().toLocaleString(),
    memoryUsage: `${usedMB} MB`,
    fakeUsers
  }
}