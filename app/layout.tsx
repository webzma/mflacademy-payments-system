import type React from "react";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Gestor de Pagos - Academia de Inglés",
  description:
    "Sistema de gestión de pagos para representantes y atención al cliente",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
