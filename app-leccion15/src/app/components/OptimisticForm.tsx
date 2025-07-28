"use client";

import { useState, useRef, useOptimistic, startTransition } from "react";
import { createUser, User } from "../lib/actions";

interface OptimisticFormProps {
  initialUsers: User[];
}

export default function OptimisticForm({ initialUsers }: OptimisticFormProps) {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const formRef = useRef<HTMLFormElement>(null);

  const [optimisticUsers, addOptimisticUser] = useOptimistic(
    users,
    (state: User[], newUser: User) => [...state, newUser]
  );

  const handleCreateUser = async (formData: FormData) => {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const role = formData.get("role") as string;

    const optimisticUser: User = {
      id: Date.now(), // id temporal
      name,
      email,
      role,
      createdAt: new Date(),
    };

    startTransition(() => {
      addOptimisticUser(optimisticUser);
    });

    setMessage(null);

    try {
      const result = await createUser(formData);
      if (result.success) {
        // Actualizar con los datos reales del servidor
        setUsers((prev) => [...prev, result.data!]);
        setMessage({ type: "success", text: result.message });
        formRef.current?.reset();
      } else {
        setMessage({ type: "error", text: result.message });
      }
    } catch (error) {
      console.error("Error al crear usuario:", error);
      setMessage({
        type: "error",
        text: "Error inesperado al crear el usuario",
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">
        Gestión de Usuarios (Optimistic UI)
      </h2>

      {message && (
        <div
          className={`mb-4 p-3 rounded-md ${
            message.type === "success"
              ? "bg-green-100 text-green-700 border border-green-300"
              : "bg-red-100 text-red-700 border border-red-300"
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">Crear Nuevo Usuario</h3>

          <form action={handleCreateUser} ref={formRef} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Nombre *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-700"
              >
                Rol *
              </label>
              <select
                id="role"
                name="role"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Selecciona un rol</option>
                <option value="user">Usuario</option>
                <option value="admin">Administrador</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              Crear Usuario
            </button>
          </form>
        </div>

        {/* Lista de usuarios */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Usuarios</h3>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {optimisticUsers.map((user) => (
              <div
                key={user.id}
                className={`p-4 border rounded-lg transition-all duration-200 ${
                  user.id > 1000000000 // IDs temporales son timestamps
                    ? "bg-blue-50 border-blue-200 opacity-70" // Estilo para usuarios optimistas
                    : "bg-gray-50 border-gray-200"
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{user.name}</h4>
                    <p className="text-sm text-gray-600">{user.email}</p>
                    <span
                      className={`inline-block px-2 py-1 text-xs rounded-full mt-2 ${
                        user.role === "admin"
                          ? "bg-purple-100 text-purple-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {user.role}
                    </span>
                    {user.id > 1000000000 && (
                      <span className="ml-2 inline-block px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">
                        Creando...
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
