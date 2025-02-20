import type React from "react";
import { AppSidebar } from "@/components/sidebar/sidebar";
import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";

export default function RepresentativeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex h-screen">
        <AppSidebar userType="representative" />
        <SidebarInset className="flex-1 overflow-auto">
          <header className="bg-white border-b border-gray-200 p-4">
            <SidebarTrigger />
          </header>
          <main className="p-6">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
