// Este componente usa SSR para datos dinámicos por usuario
import { Suspense } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  lastLogin: string;
}

interface DashboardStats {
  totalViews: number;
  totalUsers: number;
  revenueToday: number;
  activeUsers: number;
}

interface Activity {
  id: string;
  action: string;
  timestamp: string;
  user: string;
}

// Simulamos una API que obtiene datos del usuario autenticado
async function getCurrentUser(): Promise<User> {
  // En una app real, esto vendría de cookies, JWT, etc.
  await new Promise((resolve) => setTimeout(resolve, 300));

  return {
    id: "1",
    name: "Ana Developer",
    email: "ana@example.com",
    lastLogin: new Date().toISOString(),
  };
}

// Simulamos una API que obtiene estadísticas en tiempo real
async function getDashboardStats(): Promise<DashboardStats> {
  await new Promise((resolve) => setTimeout(resolve, 3000));

  return {
    totalViews: Math.floor(Math.random() * 10000) + 5000,
    totalUsers: Math.floor(Math.random() * 1000) + 500,
    revenueToday: Math.floor(Math.random() * 5000) + 1000,
    activeUsers: Math.floor(Math.random() * 100) + 50,
  };
}

// Simulamos una API que obtiene actividad reciente
async function getRecentActivity(): Promise<Activity[]> {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const activities: Activity[] = [
    {
      id: "1",
      action: "Usuario se registró",
      timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
      user: "Carlos García",
    },
    {
      id: "2",
      action: "Nueva compra realizada",
      timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
      user: "María López",
    },
    {
      id: "3",
      action: "Reporte generado",
      timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      user: "Sistema",
    },
  ];

  return activities;
}

// Componente para mostrar estadísticas
async function StatsCards() {
  const stats = await getDashboardStats();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-sm font-medium text-gray-500">Total Vistas</h3>
        <p className="text-3xl font-bold text-blue-600">
          {stats.totalViews.toLocaleString()}
        </p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-sm font-medium text-gray-500">Usuarios Activos</h3>
        <p className="text-3xl font-bold text-green-600">{stats.activeUsers}</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-sm font-medium text-gray-500">Total Usuarios</h3>
        <p className="text-3xl font-bold text-purple-600">
          {stats.totalUsers.toLocaleString()}
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-sm font-medium text-gray-500">Ingresos Hoy</h3>
        <p className="text-3xl font-bold text-orange-600">
          ${stats.revenueToday.toLocaleString()}
        </p>
      </div>
    </div>
  );
}

function StatsLoading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="bg-white p-6 rounded-lg shadow-sm border animate-pulse"
        >
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
          <div className="h-8 bg-gray-200 rounded w-1/2"></div>
        </div>
      ))}
    </div>
  );
}

// Componente para mostrar actividad reciente
async function RecentActivity() {
  const activities = await getRecentActivity();

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h2 className="text-xl font-semibold mb-4">ACTIVIDADES RECIENTES</h2>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-center space-x-3 p-3 bg-gray-50 rounded"
          >
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">
                {activity.action}
              </p>
              <p className="text-xs text-gray-500">
                {activity.user} •{" "}
                {new Date(activity.timestamp).toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ActivityLoading() {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="h-6 bg-gray-200 rounded w-1/3 mb-4">
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="flex items-center space-x-3 p-3 bg-gray-50 rounded animate-pulse"
            >
              <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Componente principal del dashboard (Server Component con SSR)
export default async function DashboardPage() {
  // Obtenemos el usuario actual - esto se ejecuta en cada request
  const user = await getCurrentUser();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Dashboard de {user.name}
          </h2>
          <p className="text-gray-600 mt-2">
            Último acceso: {new Date(user.lastLogin).toLocaleString()}
          </p>
        </header>
        {/* Stats con Suspense para streaming */}
        <Suspense fallback={<StatsLoading></StatsLoading>}>
          <StatsCards></StatsCards>
        </Suspense>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Actividad reciente con Suspense */}
          <Suspense fallback={<ActivityLoading></ActivityLoading>}>
            <RecentActivity></RecentActivity>
          </Suspense>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold mb-4">
              Información de Cuenta
            </h2>
            <div className="space-y-3">
              <div>
                <span className="text-sm font-medium text-gray-500">
                  Nombre:
                </span>
                <p className="text-gray-900">{user.name}</p>
              </div>

              <div>
                <span className="text-sm font-medium text-gray-500">
                  Email:
                </span>
                <p className="text-gray-900">{user.email}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">
                  ID de Usuario:
                </span>
                <p className="text-gray-900 font-mono text-sm">{user.id}</p>
              </div>
            </div>

            {/* Indicador de renderizado */}
            <div className="mt-8 p-4 bg-green-50 rounded-lg">
              <p className="text-sm text-green-800">
                🔄 Esta página usa Server-Side Rendering (SSR). Los datos se
                obtienen en tiempo real del servidor en cada solicitud,
                perfectos para contenido personalizado y dinámico.
              </p>
              <p className="text-xs text-green-700 mt-1">
                Renderizado en: {new Date().toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Esta configuración fuerza el uso de SSR
export const dynamic = "force-dynamic";
