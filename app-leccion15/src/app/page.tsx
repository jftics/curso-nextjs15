import BasicForm from "./components/BasicForm";
import ValidatedForm from "./components/ValidatedForm";
import ServerActionForm from "./components/ServerActionForm";
import OptimisticForm from "./components/OptimisticForm";
import { getUsers } from "./lib/actions";

export default async function Home() {
  const initialUsers = await getUsers();

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Formularios en Next.js 15 con React 19
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Demostración completa de formularios: básicos, con validación,
            Server Actions y Optimistic UI Updates
          </p>
        </div>

        {/* Navegación entre secciones */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <a
            href="#basic"
            className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
          >
            Formulario Básico
          </a>
          <a
            href="#validated"
            className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
          >
            Con Validación
          </a>
          <a
            href="#server-action"
            className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors"
          >
            Server Actions
          </a>
          <a
            href="#optimistic"
            className="px-4 py-2 bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 transition-colors"
          >
            Optimistic UI
          </a>
        </div>

        <section id="basic" className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              1. Formulario Básico
            </h2>
            <p className="text-gray-600">
              Formulario controlado tradicional con React - useState y manejo de
              eventos
            </p>
          </div>
          <BasicForm></BasicForm>
        </section>

        <section id="validated" className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              2. Formulario con Validación
            </h2>
            <p className="text-gray-600">
              Validación robusta con Zod - feedback en tiempo real y manejo de
              errores
            </p>
          </div>
          <ValidatedForm></ValidatedForm>
        </section>

        <section id="server-action" className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              3. Server Actions
            </h2>
            <p className="text-gray-600">
              Procesamiento seguro en el servidor sin necesidad de API Routes
            </p>
          </div>
          <ServerActionForm></ServerActionForm>
        </section>

        <section id="optimistic" className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              4. Optimistic UI Updates
            </h2>
            <p className="text-gray-600">
              Actualizaciones instantáneas que revierten automáticamente si hay
              errores
            </p>
          </div>
          <OptimisticForm initialUsers={initialUsers}></OptimisticForm>
        </section>
      </div>
    </div>
  );
}
