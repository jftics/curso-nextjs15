"use client";

import { useState, useRef } from "react";
import { createUser } from "../lib/actions";

export default function ServerActionForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    setMessage(null);

    try {
      // Llamar al Server Action
      const result = await createUser(formData);

      if (result.success) {
        setMessage({ type: "success", text: result.message });
        formRef.current?.reset();
      } else {
        setMessage({ type: "error", text: result.message });
      }
    } catch (error) {
      console.error("Error al enviar formulario:", error);
      setMessage({
        type: "error",
        text: "Error inesperado al enviar el formulario",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Crear Usuario (Server Action)</h2>

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

      <form action={handleSubmit} ref={formRef} className="space-y-4">
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
            disabled={isSubmitting}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
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
            disabled={isSubmitting}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
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
            disabled={isSubmitting}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          >
            <option value="">Selecciona un rol</option>
            <option value="user">Usuario</option>
            <option value="admin">Administrador</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isSubmitting ? "Creando usuario..." : "Crear Usuario"}
        </button>
      </form>

      <div className="mt-6 p-4 bg-gray-50 rounded-md">
        <h3 className="font-semibold text-gray-700 mb-2">
          💡 ¿Qué está pasando aquí?
        </h3>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• El formulario se envía usando Server Actions</li>
          <li>• La validación ocurre en el servidor</li>
          <li>• No necesitamos crear endpoints API</li>
          <li>• El código del servidor es seguro</li>
        </ul>
      </div>
    </div>
  );
}
