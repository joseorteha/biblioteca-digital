"use client";

import Dashboard from "../src/pages/Dashboard";
import ProtectedRoute from "../src/components/ProtectedRoute";

export default function Home() {
  return (
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  );
}