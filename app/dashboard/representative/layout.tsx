import type React from "react";
import { AppSidebar } from "@/components/sidebar/sidebar";
import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import ThemeSwitcher from "@/components/theme/theme-switcher";
import { Notifications } from "@/components/ui/notification";

export default function RepresentativeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex h-screen bg-gray-50 flex-1">
        <AppSidebar userType="representative" />
        <SidebarInset className="flex-1 overflow-auto">
          <header className="bg-white dark:bg-card border-b border-gray-200 dark:border-gray-800 p-4 flex items-center justify-between">
            <SidebarTrigger className="lg:hidden" />
            <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
              Panel de Representante
            </h1>
            <div className="flex items-center gap-4">
              <ThemeSwitcher />
              <Notifications />
              <div className="w-10 h-10 bg-primary rounded-full"></div>
            </div>
          </header>
          <main className="p-6">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
