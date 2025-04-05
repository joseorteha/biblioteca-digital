"use client";

import { useState } from "react";
import { AuthProvider } from "../src/context/AuthContext";
import { LibraryProvider } from "../src/context/LibraryContext";
import Navbar from "../src/components/Navbar";
import Sidebar from "../src/components/Sidebar";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <AuthProvider>
      <LibraryProvider>
        <div className="flex min-h-screen">
          <Sidebar
            isOpen={sidebarOpen}
            closeSidebar={() => setSidebarOpen(false)}
          />
          <div className="flex-1 flex flex-col">
            <Navbar toggleSidebar={() => setSidebarOpen(true)} />
            <main className="flex-1">{children}</main>
          </div>
        </div>
      </LibraryProvider>
    </AuthProvider>
  );
}