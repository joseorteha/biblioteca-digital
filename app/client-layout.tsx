"use client";

import { AuthProvider } from "../src/context/AuthContext";
import { LibraryProvider } from "../src/context/LibraryContext";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <LibraryProvider>{children}</LibraryProvider>
    </AuthProvider>
  );
}