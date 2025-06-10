import Navigation from "../components/Navigation"

const dashboardNavItems = [
    { href:'/dashboard', label:'Inicio', icon:'🏠'},
    { href: '/dashboard/analytics', label: 'Analíticas', icon: '📊' },
    { href: '/dashboard/settings', label: 'Configuración', icon: '⚙️' }
]

interface DashboardLayoutProps{
  children: React.ReactNode
}

export default function DashBoardLayout({children}:DashboardLayoutProps){
    return(

        <div className="min-h-screen bg-gray-100">

            <Navigation items={dashboardNavItems}></Navigation>

            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
<aside className="lg:col-span-1">
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-lg font-semibold mb-4">Panel de Control</h2>
                        <div className="space-y-2">
                            <div className="p-3 bg-blue-50 rounded">
                                <p className="text-sm text-blue-800">Usuario conectado</p>
                                <p className="font-medium">admin@example.com</p>
                            </div>
                            <div className="p-3 bg-green-50 rounded">
                                <p className="text-sm text-green-800">Estado</p>
                                <p className="font-medium">En línea</p>
                            </div>
                        </div>
                    </div>
                </aside>
                <div className="lg:col-span-3">
                    <div className="bg-white rounded-lg shadow p-6">
                        {children}
                    </div>
                </div>
                </div>
                
            </div>
        </div>

    )
}