"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  Home,
  DollarSign,
  FileText,
  Users,
  Settings,
  LogOut,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { logout } from "@/app/(auth)/login/actions";
import { cn } from "@/lib/utils";
import path from "path";

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
      {
        icon: FileText,
        label: "Mis Comprobantes",
        href: "/dashboard/representative/my-receipts",
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
    footerItems: [
      { icon: Settings, label: "Configuración", href: "/settings" },
      { icon: LogOut, label: "Cerrar Sesión", href: "/logout" },
    ],
  };

  const items = menuItems[userType];

  return (
    <Sidebar className="bg-sidebar dark:bg-background border-r border-border">
      <SidebarHeader>
        <div className="p-6">
          <h2 className="text-2xl font-bold text-primary">MFLAcademy</h2>
          <p className="text-sm text-gray-600 font-medium">Sistema de Pagos</p>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton asChild>
                <Link
                  href={item.href}
<<<<<<< HEAD
                  className={cn(
                    "flex items-center space-x-3 px-6 py-3 text-md font-medium transition-colors rounded-lg",
                    pathname === item.href &&
                      "text-blue-600 dark:text-blue-500 bg-gray-100 hover:bg-slate-100 dark:bg-card  hover:text-blue-700 dark:hover:text-blue-600",
                    "ext-muted-foreground hover:text-blue-700 dark:hover:text-blue-500 hover:bg-gray-100"
                  )}
=======
                  className={`flex items-center space-x-3 px-6 py-3 text-md font-medium transition-colors rounded-lg ${
                    pathname === item.href
                      ? "text-blue-600 dark:text-blue-500 bg-gray-100 hover:bg-slate-100 dark:bg-card hover:text-blue-500 dark:hover:text-blue-600 "
                      : "text-muted-foreground hover:text-blue-700 dark:hover:text-blue-500  hover:bg-gray-100"
                  }`}
>>>>>>> 0d5a996976f35c780954b5f6e5d0aa058fc3ac1e
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                  {pathname === item.href && (
                    <motion.div
                      className="absolute left-0 w-1 h-8 bg-blue-500 rounded-r-full"
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
<<<<<<< HEAD
                className="flex items-center space-x-3 px-6 py-3 text-sm font-medium dark:hover:text-blue-500 hover:text-blue-700 transition-colors rounded-lg"
=======
                className="flex items-center space-x-3 px-6 py-3 text-sm font-medium text-muted-foreground hover:text-blue-500 dark:hover:text-blue-500  transition-colors rounded-lg"
>>>>>>> 0d5a996976f35c780954b5f6e5d0aa058fc3ac1e
              >
                <Settings className="h-5 w-5" />
                <span>Configuración</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <button
                onClick={logout}
<<<<<<< HEAD
                className="flex items-center space-x-3 px-6 py-3 text-sm font-medium dark:hover:text-blue-500 hover:text-blue-700 transition-colors rounded-lg"
=======
                className="flex items-center space-x-3 px-6 py-3 text-sm font-medium text-muted-foreground hover:text-blue-500 dark:hover:text-blue-500    transition-colors rounded-lg"
>>>>>>> 0d5a996976f35c780954b5f6e5d0aa058fc3ac1e
              >
                <LogOut className="h-5 w-5" />
                <span>Cerrar Sesión</span>
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
