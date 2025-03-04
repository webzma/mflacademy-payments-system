"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface Payment {
  id: string;
  amount: number;
  reference: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
  studentName: string;
}

export default function ManagePayments() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [filteredPayments, setFilteredPayments] = useState<Payment[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [dateFilter, setDateFilter] = useState<string>("all");

  useEffect(() => {
    // Simular la carga de pagos desde el servidor
    const fetchPayments = async () => {
      // En una aplicación real, esto sería una llamada a tu API
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const examplePayments: Payment[] = [
        {
          id: "1",
          amount: 100,
          reference: "REF001",
          status: "pending",
          createdAt: "2023-05-01",
          studentName: "Juan Pérez",
        },
        {
          id: "2",
          amount: 200,
          reference: "REF002",
          status: "approved",
          createdAt: "2023-05-02",
          studentName: "María García",
        },
        {
          id: "3",
          amount: 150,
          reference: "REF003",
          status: "rejected",
          createdAt: "2023-05-03",
          studentName: "Carlos Rodríguez",
        },
        {
          id: "4",
          amount: 300,
          reference: "REF004",
          status: "pending",
          createdAt: "2023-05-04",
          studentName: "Ana Martínez",
        },
        {
          id: "5",
          amount: 250,
          reference: "REF005",
          status: "approved",
          createdAt: "2023-05-05",
          studentName: "Luis Sánchez",
        },
      ];
      setPayments(examplePayments);
      setFilteredPayments(examplePayments);
    };
    fetchPayments();
  }, []);

  const handleSearch = () => {
    let result = payments;

    // Filtrar por término de búsqueda
    if (searchTerm) {
      result = result.filter(
        (payment) =>
          payment.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
          payment.studentName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtrar por estado
    if (statusFilter !== "all") {
      result = result.filter((payment) => payment.status === statusFilter);
    }

    // Filtrar por fecha
    if (dateFilter !== "all") {
      const today = new Date();
      const filterDate = new Date(
        today.setDate(today.getDate() - Number.parseInt(dateFilter))
      );
      result = result.filter(
        (payment) => new Date(payment.createdAt) >= filterDate
      );
    }

    setFilteredPayments(result);
  };

  const handleApprove = (id: string) => {
    // Lógica para aprobar el pago
    console.log("Aprobar pago:", id);
  };

  const handleReject = (id: string) => {
    // Lógica para rechazar el pago
    console.log("Rechazar pago:", id);
  };

  const columns = [
    {
      key: "id",
      header: "ID",
      cell: (payment: Payment) => payment.id,
    },
    {
      key: "amount",
      header: "Monto",
      cell: (payment: Payment) => `$${payment.amount.toFixed(2)}`,
    },
    {
      key: "reference",
      header: "Referencia",
      cell: (payment: Payment) => payment.reference,
    },
    {
      key: "studentName",
      header: "Estudiante",
      cell: (payment: Payment) => payment.studentName,
    },
    {
      key: "status",
      header: "Estado",
      cell: (payment: Payment) => (
        <Badge
          className={cn({
            "bg-green-500": payment.status === "approved",
            "bg-yellow-500": payment.status === "pending",
            "bg-red-500": payment.status === "rejected",
          })}
        >
          {payment.status === "approved"
            ? "Aprobado"
            : payment.status === "rejected"
            ? "Rechazado"
            : "Pendiente"}
        </Badge>
      ),
    },
    {
      key: "createdAt",
      header: "Fecha",
      cell: (payment: Payment) =>
        new Date(payment.createdAt).toLocaleDateString(),
    },
    {
      key: "actions",
      header: "Acciones",
      cell: (payment: Payment) =>
        payment.status === "pending" ? (
          <div className="space-x-2">
            <Button
              onClick={() => handleApprove(payment.id)}
              variant="outline"
              size="sm"
              className="bg-green-500 hover:bg-green-600 text-white"
            >
              Aprobar
            </Button>
            <Button
              onClick={() => handleReject(payment.id)}
              variant="outline"
              size="sm"
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              Rechazar
            </Button>
          </div>
        ) : null,
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-800 dark:text-white">
          Gestionar Pagos
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6 space-y-4">
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
            <div className="flex-1">
              <Label htmlFor="search">Buscar por referencia o estudiante</Label>
              <Input
                id="search"
                placeholder="Buscar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="status">Estado</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger id="status">
                  <SelectValue placeholder="Seleccionar estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="pending">Pendiente</SelectItem>
                  <SelectItem value="approved">Aprobado</SelectItem>
                  <SelectItem value="rejected">Rechazado</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="date">Fecha</Label>
              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger id="date">
                  <SelectValue placeholder="Seleccionar fecha" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="7">Últimos 7 días</SelectItem>
                  <SelectItem value="30">Últimos 30 días</SelectItem>
                  <SelectItem value="90">Últimos 90 días</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button
            onClick={handleSearch}
            className="bg-blue-700 hover:bg-blue-800"
          >
            Buscar
          </Button>
        </div>
        <DataTable columns={columns} data={filteredPayments} />
      </CardContent>
    </Card>
  );
}
