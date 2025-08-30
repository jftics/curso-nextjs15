"use client";

import { useAuth } from "@/hooks/useAuth";

export default function DashboardPage() {
  const { session, isLoading, hasRole } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  if (!session) {
    return null; // El middleware redirigirá
  }

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Panel de Control
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Mi Perfil</h3>
            <div className="space-y-2">
              <p>
                <strong>Nombre:</strong> {session.user.name}
              </p>
              <p>
                <strong>Email:</strong> {session.user.email}
              </p>
              <p>
                <strong>Rol:</strong>
                <span className="ml-1  px-2 py-1 rounded text-sm ">
                  {session.user.role}
                </span>
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Acciones</h3>
            <div className="space-y-2">
              <button className="inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border h-10 px-4 py-2 w-full bg-opacity-20 hover:bg-opacity-30 border-white text-white">
                Editar Perfil
              </button>

              {hasRole("ADMIN") && (
                <button
                  onClick={() => (window.location.href = "/admin")}
                  className="inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border h-10 px-4 py-2 w-full bg-opacity-20 hover:bg-opacity-30 border-white text-white"
                >
                  Panel Admin
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
