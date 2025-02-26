export interface Student {
    id: string
    name: string
    isRepresentative: boolean
  }

  export interface Representative {
    id: string
    name: string
    students: Student[]
  }

  export type PaymentConcept = "mensualidad" | "material" | "recuperativo" | "inscripción"
  export type PaymentMethod = "transferencia" | "pago móvil"

  export interface PaymentReport {
    studentIds: string[]
    concept: PaymentConcept
    method: PaymentMethod
    reference: string
    screenshot: File | null
    paymentDate: string
    totalAmount: number
  }
