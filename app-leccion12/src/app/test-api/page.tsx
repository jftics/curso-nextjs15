"use client";

import { useState } from "react";
import { User } from "../types/user";

export default function APITester() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [newUser, setNewUser] = useState({ name: "", email: "", age: "" });

  // Obtener todos los usuarios
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch("api/users");
      const data = await response.json();
      if (data.success) {
        setUsers(data.data);
      } else {
        alert("Error: " + data.error);
      }
    } catch (error) {
      console.log(error);
      alert("Error al obtener usuarios");
    }
    setLoading(false);
  };

  const createUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer mi-token-secreto",
        },
        body: JSON.stringify({
          name: newUser.name,
          email: newUser.email,
          age: parseInt(newUser.age),
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert("Usuario creado exitosamente");
        setNewUser({ name: "", email: "", age: "" });
        fetchUsers();
      } else {
        alert("Error: " + data.error);
      }
    } catch (error) {
      console.log(error);
      alert("Error al crear usuario");
    }
    setLoading(false);
  };

  const deleteUser = async (id: number) => {
    if (!confirm("¿Estás seguro de eliminar este usuario?")) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/users/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer mi-token-secreto",
        },
      });

      const data = await response.json();

      if (data.success) {
        alert("Usuario eliminado exitosamente");
        fetchUsers();
      } else {
        alert("Error: " + data.error);
      }
    } catch (error) {
      console.log(error);
      alert("Error al eliminar usuario");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Pruebas de APIs</h1>

      {/* Formulario para crear usuario */}
      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <h2 className="text-xl font-semibold mb-4">Crear Nuevo Usuario</h2>
        <form onSubmit={createUser} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Nombre"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Email"
              value={newUser.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <input
              type="number"
              placeholder="Edad"
              value={newUser.age}
              onChange={(e) => setNewUser({ ...newUser, age: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? "Creando..." : "Crear Usuario"}
          </button>
        </form>
      </div>

      <div className="mb-6">
        <button
          onClick={fetchUsers}
          disabled={loading}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50"
        >
          {loading ? "Cargando datos..." : "Obtener Usuarios"}
        </button>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Lista de Usuarios</h2>
        {users.length === 0 ? (
          <p className="text-gray-500">
            No hay usuarios. Haz clic en Obtener Usuarios para cargar.
          </p>
        ) : (
          <div className="grid gap-4">
            {users.map((user) => (
              <div
                key={user.id}
                className="border p-4 rounded-lg flex justify-between items-center"
              >
                <div>
                  <h3 className="font-semibold">{user.name}</h3>
                  <p className="text-gray-600">{user.email}</p>
                  <p className="text-sm text-gray-500">{user.age} años</p>
                </div>
                <button
                  onClick={() => deleteUser(user.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 disabled:opacity-50"
                >
                  Eliminar
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
