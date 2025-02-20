"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Home, DollarSign, Users, Settings, LogOut } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

type SidebarProps = {
  userType: "representative" | "admin";
};

export function AppSidebar({ userType }: SidebarProps) {
  const pathname = usePathname();

  const menuItems = {
    representative: [
      { icon: Home, label: "Inicio", href: "/dashboard/representative" },
      {
        icon: DollarSign,
        label: "Reportar Pago",
        href: "/dashboard/representative/report-payment",
      },
    ],
    admin: [
      { icon: Home, label: "Inicio", href: "/dashboard/admin" },
      {
        icon: DollarSign,
        label: "Gestionar Pagos",
        href: "/dashboard/admin/payments",
      },
      { icon: Users, label: "Usuarios", href: "/dashboard/admin/users" },
    ],
  };

  const items = menuItems[userType];

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="p-4">
          <h2 className="text-2xl font-bold text-black">MFL Academy</h2>
          <p className="text-sm text-gray-600">Sistema de Pagos</p>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton asChild>
                <Link
                  href={item.href}
                  className={`transition pl-5 flex items-center space-x-2 ${
                    pathname === item.href
                      ? "text-blue-600"
                      : "text-gray-600 hover:text-blue-600"
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                  {pathname === item.href && (
                    <motion.div
                      className="absolute left-0 w-1 h-8 bg-blue-600 rounded-r-full"
                      layoutId="sidebar-indicator"
                    />
                  )}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link
                href="/settings"
                className="flex items-center space-x-2 text-gray-600 hover:text-blue-600"
              >
                <Settings className="h-5 w-5" />
                <span>Configuración</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link
                href="/logout"
                className="flex items-center space-x-2 text-gray-600 hover:text-blue-600"
              >
                <LogOut className="h-5 w-5" />
                <span>Cerrar Sesión</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
