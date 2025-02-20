"use client";

import type React from "react";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function ReportPayment() {
  const [amount, setAmount] = useState("");
  const [reference, setReference] = useState("");
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [additionalInfo, setAdditionalInfo] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí implementaremos la lógica para enviar el reporte de pago
    console.log("Payment report:", {
      amount,
      reference,
      screenshot,
      additionalInfo,
    });
    // Lógica para enviar los datos al servidor
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-800">
            Reportar Pago
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Monto</Label>
              <Input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="input"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reference">Referencia</Label>
              <Input
                type="text"
                id="reference"
                value={reference}
                onChange={(e) => setReference(e.target.value)}
                className="input"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="screenshot">Captura de pantalla</Label>
              <Input
                type="file"
                id="screenshot"
                onChange={(e) =>
                  setScreenshot(e.target.files ? e.target.files[0] : null)
                }
                className="input"
                accept="image/*"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="additionalInfo">Información adicional</Label>
              <Textarea
                id="additionalInfo"
                value={additionalInfo}
                onChange={(e) => setAdditionalInfo(e.target.value)}
                className="input"
                rows={4}
              />
            </div>
            <Button type="submit" className="w-full btn-primary">
              Enviar Reporte de Pago
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
