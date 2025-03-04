"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Student, PaymentConcept, PaymentMethod, PaymentReport } from "@/types"

// Datos de ejemplo (en una aplicación real, estos vendrían de una API)
const exampleStudents: Student[] = [
  { id: "1", name: "Juan Pérez", isRepresentative: true },
  { id: "2", name: "María García", isRepresentative: false },
  { id: "3", name: "Carlos Rodríguez", isRepresentative: false },
]

const paymentConcepts: PaymentConcept[] = ["mensualidad", "material", "recuperativo", "inscripción"]
const paymentMethods: PaymentMethod[] = ["transferencia", "pago móvil"]

export default function ReportPayment() {
  const [selectedStudents, setSelectedStudents] = useState<string[]>([])
  const [concept, setConcept] = useState<PaymentConcept>("mensualidad")
  const [method, setMethod] = useState<PaymentMethod>("transferencia")
  const [reference, setReference] = useState("")
  const [screenshot, setScreenshot] = useState<File | null>(null)
  const [paymentDate, setPaymentDate] = useState("")
  const [totalAmount, setTotalAmount] = useState("")

  const handleStudentChange = (studentId: string, isChecked: boolean) => {
    setSelectedStudents((prev) => (isChecked ? [...prev, studentId] : prev.filter((id) => id !== studentId)))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedStudents.length === 0) {
      alert("Por favor, seleccione al menos un estudiante.")
      return
    }

    const paymentReport: PaymentReport = {
      studentIds: selectedStudents,
      concept,
      method,
      reference,
      screenshot,
      paymentDate,
      totalAmount: Number.parseFloat(totalAmount),
    }

    console.log("Reporte de pago:", paymentReport)
    // Aquí iría la lógica para enviar el reporte al servidor
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-800 dark:text-white">Reportar Pago</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <Label>Seleccione los estudiantes</Label>
            {exampleStudents.map((student) => (
              <div key={student.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`student-${student.id}`}
                  checked={selectedStudents.includes(student.id)}
                  onCheckedChange={(checked) => handleStudentChange(student.id, checked as boolean)}
                />
                <Label htmlFor={`student-${student.id}`}>
                  {student.name} {student.isRepresentative && "(Representante)"}
                </Label>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <Label htmlFor="concept">Concepto de pago</Label>
            <Select value={concept} onValueChange={(value: PaymentConcept) => setConcept(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccione el concepto" />
              </SelectTrigger>
              <SelectContent>
                {paymentConcepts.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Método de pago</Label>
            <RadioGroup value={method} onValueChange={(value: PaymentMethod) => setMethod(value)}>
              {paymentMethods.map((m) => (
                <div key={m} className="flex items-center space-x-2">
                  <RadioGroupItem value={m} id={`method-${m}`} />
                  <Label htmlFor={`method-${m}`}>{m}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="reference">Número de referencia</Label>
            <Input id="reference" value={reference} onChange={(e) => setReference(e.target.value)} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="screenshot">Captura de pantalla</Label>
            <Input
              id="screenshot"
              type="file"
              onChange={(e) => setScreenshot(e.target.files ? e.target.files[0] : null)}
              accept="image/*"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="paymentDate">Fecha de pago</Label>
            <Input
              id="paymentDate"
              type="date"
              value={paymentDate}
              onChange={(e) => setPaymentDate(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="totalAmount">Total pagado</Label>
            <Input
              id="totalAmount"
              type="number"
              value={totalAmount}
              onChange={(e) => setTotalAmount(e.target.value)}
              required
            />
          </div>

          <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600">
            Enviar Reporte de Pago
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
