"use client";

import type React from "react";

import { useState } from "react";

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
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-2xl font-bold mb-4">Reportar Pago</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-lg">
        <div className="mb-4">
          <label
            htmlFor="amount"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Monto
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="reference"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Referencia
          </label>
          <input
            type="text"
            id="reference"
            value={reference}
            onChange={(e) => setReference(e.target.value)}
            className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="screenshot"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Captura de pantalla
          </label>
          <input
            type="file"
            id="screenshot"
            onChange={(e) =>
              setScreenshot(e.target.files ? e.target.files[0] : null)
            }
            className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            accept="image/*"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="additionalInfo"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Información adicional
          </label>
          <textarea
            id="additionalInfo"
            value={additionalInfo}
            onChange={(e) => setAdditionalInfo(e.target.value)}
            className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            rows={4}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Enviar Reporte de Pago
        </button>
      </form>
    </div>
  );
}
