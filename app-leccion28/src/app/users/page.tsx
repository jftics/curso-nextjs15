"use client";

import { useState, useEffect } from "react";
import Button from "@/app/components/Button";

interface User {
  id: number;
  name: string;
  email: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.users);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Cargando usuarios...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Usuarios</h1>
      <div className="space-y-2">
        {users.map((user) => (
          <div
            key={user.id}
            className="p-4 border rounded"
            data-testid="user-card"
          >
            <h3 className="font-semibold">{user.name}</h3>
            <p className="text-gray-600">{user.email}</p>
          </div>
        ))}
      </div>
      <Button>Agregar Usuario</Button>
    </div>
  );
}
