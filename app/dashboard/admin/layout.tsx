import type React from "react";
import { AppSidebar } from "@/components/sidebar/sidebar";
import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import ThemeSwitcher from "@/components/theme/theme-switcher";
import { Notifications } from "@/components/ui/notification";
import Image from "next/image";

export default function RepresentativeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex h-screen bg-background w-full">
        <AppSidebar userType="admin" />
        <SidebarInset className="flex-1 overflow-auto">
          <header className="bg-card border-b border-border p-4 flex items-center justify-between">
            <SidebarTrigger className="lg:hidden" />
            <h1 className="text-xl font-semibold text-foreground">
              Panel de administrador
            </h1>
            <div className="flex items-center space-x-4">
              <ThemeSwitcher />
              <Notifications />
              <div className="w-10 h-10 border-none rounded-full">
                <Image
                  src="/avatar.webp"
                  alt="Avatar image"
                  width={100}
                  height={100}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
            </div>
          </header>
          <main className="p-6">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
