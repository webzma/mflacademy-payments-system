"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

interface Payment {
  id: string;
  amount: number;
  reference: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

export default function ManagePayments() {
  const [payments, setPayments] = useState<Payment[]>([]);

  useEffect(() => {
    // Aquí cargaríamos los pagos desde el servidor
    // Por ahora, usaremos datos de ejemplo
    const examplePayments: Payment[] = [
      {
        id: "1",
        amount: 100,
        reference: "REF001",
        status: "pending",
        createdAt: "2023-05-01",
      },
      {
        id: "2",
        amount: 200,
        reference: "REF002",
        status: "approved",
        createdAt: "2023-05-02",
      },
      {
        id: "3",
        amount: 150,
        reference: "REF003",
        status: "rejected",
        createdAt: "2023-05-03",
      },
    ];
    setPayments(examplePayments);
  }, []);

  const handleApprove = (id: string) => {
    // Lógica para aprobar el pago
    console.log("Aprobar pago:", id);
  };

  const handleReject = (id: string) => {
    // Lógica para rechazar el pago
    console.log("Rechazar pago:", id);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-800">
          Gestionar Pagos
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Monto</TableHead>
              <TableHead>Referencia</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell>{payment.id}</TableCell>
                <TableCell>${payment.amount}</TableCell>
                <TableCell>{payment.reference}</TableCell>
                <TableCell>{payment.status}</TableCell>
                <TableCell>{payment.createdAt}</TableCell>
                <TableCell>
                  {payment.status === "pending" && (
                    <>
                      <Button
                        onClick={() => handleApprove(payment.id)}
                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 rounded mr-2"
                      >
                        Aprobar
                      </Button>
                      <Button
                        onClick={() => handleReject(payment.id)}
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded"
                      >
                        Rechazar
                      </Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
