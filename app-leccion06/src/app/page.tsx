'use client'

export default function HomePage(){
  return(
    <div className="container mx-auto px-4 py-8">

      <h1 className="text-3xl font-bold mb-6">🏠 Página Principal</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Demostración de diferencia Layout vs Template */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-blue-800">
            🏗️ Estado del Layout (Persiste)
          </h2>
          <p className="text-blue-700 mb-2">
            • El contador del header persiste entre páginas
          </p>
          <p className="text-blue-700 mb-2">
            • El reloj sigue funcionando
          </p>
          <p className="text-blue-700">
            • No se re-renderiza al navegar
          </p>
        </div>

        <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-red-800">
            🔄 Estado del Template (Se Reinicia)
          </h2>
          <p className="text-red-700 mb-2">
            • El contador de renders aumenta
          </p>
          <p className="text-red-700 mb-2">
            • Las animaciones se ejecutan de nuevo
          </p>
          <p className="text-red-700">
            • El estado se reinicia completamente
          </p>
        </div>
      </div>
    </div>
  )
}