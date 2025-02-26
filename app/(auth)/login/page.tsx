"use client";
import type React from "react";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { login } from "./actions";

type UserType = "representative" | "admin";

export default function Login() {
  const [userType, setUserType] = useState<UserType>("representative");

  return (
    <div className="min-h-screen bg-white flex">
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <Image
          src="/mflacademy-login-image.jpg"
          alt="MFL Academy Fachada"
          fill
          className="object-cover"
          priority
          quality={100}
        />
        <div className="absolute inset-0 bg-blue-600/20 backdrop-blur-[1px]" />
        <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-blue-600/90 to-transparent">
          <h2 className="text-white text-3xl font-bold">MFL Academy</h2>
          <p className="text-gray-100">Sistema de Gestión de Pagos</p>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gradient-to-br from-gray-50 to-white">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md border border-gray-200"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-black mb-2">Bienvenido</h1>
            <p className="text-gray-600">
              Ingrese sus credenciales para continuar
            </p>
          </div>

          <div className="mb-6">
            <label className="block text-black text-sm font-semibold mb-2">
              Tipo de usuario
            </label>
            <div className="flex justify-center space-x-4">
              <motion.button
                name="userType"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                value={userType}
                onClick={() => setUserType("representative")}
                className={`px-4 py-2 rounded-full transition-colors duration-300 ${
                  userType === "representative"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
              >
                Representante
              </motion.button>
              <motion.button
                value={userType}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setUserType("admin")}
                className={`px-4 py-2 rounded-full transition-colors duration-300 ${
                  userType === "admin"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
              >
                Atención al Cliente
              </motion.button>
            </div>
          </div>

          <form className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-black text-sm font-semibold mb-2"
              >
                Correo electrónico
              </label>
              <input
                type="email"
                id="email"
                placeholder="Correo electrónico"
                name="email"
                className="w-full px-3 py-2 bg-gray-50 text-gray-800 border border-gray-300 rounded-lg
                          focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200
                          transition-colors duration-300 placeholder:text-gray-400"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-black text-sm font-semibold mb-2"
              >
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Contraseña"
                className="w-full px-3 py-2 bg-gray-50 text-gray-800 border border-gray-300 rounded-lg
                          focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200
                          transition-colors duration-300 placeholder:text-gray-400"
                required
              />
            </div>
            <motion.button
              formAction={login}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg
                        transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400
                        focus:ring-opacity-50 mt-6 shadow-md"
            >
              Iniciar Sesión
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
