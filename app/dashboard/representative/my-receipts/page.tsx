"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import Image from "next/image";
import Loader from "@/components/loader/loader";
import { cn } from "@/lib/utils";

interface Receipt {
  id: string;
  reference: string;
  date: string;
  concept: string;
  total: number;
  status: "pendiente" | "aprobado" | "rechazado";
  paymentMethod: string;
  students: string[];
  screenshot: string;
}

export default function MyReceipts() {
  const [receipts, setReceipts] = useState<Receipt[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedReceipt, setSelectedReceipt] = useState<Receipt | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Simular la carga de datos desde una API
    const fetchReceipts = async () => {
      // En una aplicación real, esto sería una llamada a tu API
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const mockReceipts: Receipt[] = [
        {
          id: "1",
          reference: "REF001",
          date: "2023-05-01",
          concept: "Mensualidad",
          total: 100,
          status: "aprobado",
          paymentMethod: "Transferencia",
          students: ["Juan Pérez"],
          screenshot: "/placeholder.svg?height=300&width=300",
        },
        {
          id: "2",
          reference: "REF002",
          date: "2023-05-15",
          concept: "Material",
          total: 50,
          status: "pendiente",
          paymentMethod: "Pago Móvil",
          students: ["María García", "Carlos Rodríguez"],
          screenshot: "/placeholder.svg?height=300&width=300",
        },
        {
          id: "3",
          reference: "REF003",
          date: "2023-06-01",
          concept: "Mensualidad",
          total: 100,
          status: "aprobado",
          paymentMethod: "Transferencia",
          students: ["Juan Pérez"],
          screenshot: "/placeholder.svg?height=300&width=300",
        },
        {
          id: "4",
          reference: "REF004",
          date: "2023-06-15",
          concept: "Recuperativo",
          total: 30,
          status: "rechazado",
          paymentMethod: "Pago Móvil",
          students: ["Carlos Rodríguez"],
          screenshot: "/placeholder.svg?height=300&width=300",
        },
        {
          id: "5",
          reference: "REF005",
          date: "2023-07-01",
          concept: "Mensualidad",
          total: 100,
          status: "pendiente",
          paymentMethod: "Transferencia",
          students: ["María García"],
          screenshot: "/placeholder.svg?height=300&width=300",
        },
      ];
      setReceipts(mockReceipts);
      setIsLoading(false);
    };

    fetchReceipts();
  }, []);

  const columns = [
    {
      key: "reference",
      header: "Número de Referencia",
      cell: (receipt: Receipt) => receipt.reference,
    },
    {
      key: "date",
      header: "Fecha",
      cell: (receipt: Receipt) => new Date(receipt.date).toLocaleDateString(),
    },
    {
      key: "concept",
      header: "Concepto",
      cell: (receipt: Receipt) => receipt.concept,
    },
    {
      key: "total",
      header: "Total",
      cell: (receipt: Receipt) => `$${receipt.total.toFixed(2)}`,
    },
    {
      key: "status",
      header: "Estado",
      cell: (receipt: Receipt) => (
        <Badge
          className={cn({
            "bg-green-500": receipt.status === "aprobado",
            "bg-yellow-500": receipt.status === "pendiente",
            "bg-red-500": receipt.status === "rechazado",
          })}
        >
          {receipt.status.charAt(0).toUpperCase() + receipt.status.slice(1)}
        </Badge>
      ),
    },
    {
      key: "actions",
      header: "Acciones",
      cell: (receipt: Receipt) => (
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleViewReceipt(receipt)}
        >
          <Eye className="h-4 w-4 mr-2" />
          Ver
        </Button>
      ),
    },
  ];

  const handleViewReceipt = (receipt: Receipt) => {
    setSelectedReceipt(receipt);
    setIsModalOpen(true);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-800">
            Mis Comprobantes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={receipts} />
        </CardContent>
      </Card>
      <Dialog open={isModalOpen} onOpenChange={() => setIsModalOpen(false)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Detalles del Comprobante</DialogTitle>
            <DialogDescription>
              Información completa del comprobante seleccionado
            </DialogDescription>
          </DialogHeader>

          {selectedReceipt && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="text-right font-medium">Referencia:</span>
                <span className="col-span-3">{selectedReceipt.reference}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="text-right font-medium">Fecha:</span>
                <span className="col-span-3">
                  {new Date(selectedReceipt.date).toLocaleDateString()}
                </span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="text-right font-medium">Concepto:</span>
                <span className="col-span-3">{selectedReceipt.concept}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="text-right font-medium">Total:</span>
                <span className="col-span-3">
                  ${selectedReceipt.total.toFixed(2)}
                </span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="text-right font-medium">Estado:</span>
                <span className="col-span-3">
                  <Badge
                    className={cn({
                      "bg-green-500": selectedReceipt.status === "aprobado",
                      "bg-yellow-500": selectedReceipt.status === "pendiente",
                      "bg-red-500": selectedReceipt.status === "rechazado",
                    })}
                  >
                    {selectedReceipt.status.charAt(0).toUpperCase() +
                      selectedReceipt.status.slice(1)}
                  </Badge>
                </span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="text-right font-medium">Método de pago:</span>
                <span className="col-span-3">
                  {selectedReceipt.paymentMethod}
                </span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="text-right font-medium">Estudiantes:</span>
                <span className="col-span-3">
                  {selectedReceipt.students.join(", ")}
                </span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="text-right font-medium">Captura de pago:</span>
                <div className="col-span-3">
                  <Image
                    src={selectedReceipt.screenshot || "/placeholder.svg"}
                    alt="Captura de pago"
                    width={300}
                    height={300}
                    className="rounded-md"
                  />
                </div>
              </div>
            </div>
          )}
          <Button
            className="bg-blue-500 hover:bg-blue-600"
            onClick={() => setIsModalOpen(false)}
          >
            Cerrar
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
