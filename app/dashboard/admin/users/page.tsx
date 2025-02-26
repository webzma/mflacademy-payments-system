"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface User {
  id: string;
  name: string;
  email: string;
  role: "representative" | "admin";
  status: "active" | "inactive";
}

export default function ManageUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [newUser, setNewUser] = useState<Partial<User>>({
    name: "",
    email: "",
    role: "representative",
    status: "active",
  });

  useEffect(() => {
    // Simular la carga de usuarios desde el servidor
    const fetchUsers = async () => {
      // En una aplicación real, esto sería una llamada a tu API
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const exampleUsers: User[] = [
        {
          id: "1",
          name: "Juan Pérez",
          email: "juan@example.com",
          role: "representative",
          status: "active",
        },
        {
          id: "2",
          name: "María García",
          email: "maria@example.com",
          role: "admin",
          status: "active",
        },
        {
          id: "3",
          name: "Carlos Rodríguez",
          email: "carlos@example.com",
          role: "representative",
          status: "inactive",
        },
        {
          id: "4",
          name: "Ana Martínez",
          email: "ana@example.com",
          role: "admin",
          status: "active",
        },
        {
          id: "5",
          name: "Luis Sánchez",
          email: "luis@example.com",
          role: "representative",
          status: "active",
        },
      ];
      setUsers(exampleUsers);
      setFilteredUsers(exampleUsers);
    };
    fetchUsers();
  }, []);

  const handleSearch = () => {
    let result = users;

    // Filtrar por término de búsqueda
    if (searchTerm) {
      result = result.filter(
        (user) =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtrar por rol
    if (roleFilter !== "all") {
      result = result.filter((user) => user.role === roleFilter);
    }

    // Filtrar por estado
    if (statusFilter !== "all") {
      result = result.filter((user) => user.status === statusFilter);
    }

    setFilteredUsers(result);
  };

  const handleAddUser = () => {
    // En una aplicación real, aquí se haría una llamada a la API para agregar el usuario
    const id = (users.length + 1).toString();
    const newUserWithId = { ...newUser, id } as User;
    setUsers([...users, newUserWithId]);
    setFilteredUsers([...filteredUsers, newUserWithId]);
    setIsAddModalOpen(false);
    setNewUser({
      name: "",
      email: "",
      role: "representative",
      status: "active",
    });
  };

  const handleToggleUserStatus = (user: User) => {
    // En una aplicación real, aquí se haría una llamada a la API para cambiar el estado del usuario
    const newStatus = user.status === "active" ? "inactive" : "active";
    const updatedUsers = users.map((u) =>
      u.id === user.id ? { ...u, status: newStatus } : u
    );
  };

  const columns = [
    {
      key: "name",
      header: "Nombre",
      cell: (user: User) => user.name,
    },
    {
      key: "email",
      header: "Correo electrónico",
      cell: (user: User) => user.email,
    },
    {
      key: "role",
      header: "Rol",
      cell: (user: User) => (
        <Badge variant={user.role === "admin" ? "secondary" : "default"}>
          {user.role === "admin" ? "Administrador" : "Representante"}
        </Badge>
      ),
    },
    {
      key: "status",
      header: "Estado",
      cell: (user: User) => (
        <Badge>{user.status === "active" ? "Activo" : "Inactivo"}</Badge>
      ),
    },
    {
      key: "actions",
      header: "Acciones",
      cell: (user: User) => (
        <div className="space-x-2">
          <Button
            onClick={() => {
              setCurrentUser(user);
              setIsEditModalOpen(true);
            }}
            variant="outline"
            size="sm"
          >
            Editar
          </Button>
          <Button
            onClick={() => handleToggleUserStatus(user)}
            variant="outline"
            size="sm"
            className={
              user.status === "active"
                ? "bg-red-500/90 hover:bg-red-600 text-white hover:text-white border-0"
                : "bg-green-500 hover:bg-green-600 text-white"
            }
          >
            {user.status === "active" ? "Desactivar" : "Activar"}
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-800">
          Gestionar Usuarios
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6 space-y-4">
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
            <div className="flex-1">
              <Label htmlFor="search">Buscar por nombre o correo</Label>
              <Input
                id="search"
                placeholder="Buscar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="role">Rol</Label>
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger id="role">
                  <SelectValue placeholder="Seleccionar rol" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="representative">Representante</SelectItem>
                  <SelectItem value="admin">Administrador</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="status">Estado</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger id="status">
                  <SelectValue placeholder="Seleccionar estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="active">Activo</SelectItem>
                  <SelectItem value="inactive">Inactivo</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-between">
            <Button onClick={handleSearch}>Buscar</Button>
            <Button onClick={() => setIsAddModalOpen(true)}>
              Agregar Usuario
            </Button>
          </div>
        </div>
        <DataTable columns={columns} data={filteredUsers} />
      </CardContent>

      {/* Modal para agregar usuario */}

      {/* Modal para editar usuario */}
    </Card>
  );
}
