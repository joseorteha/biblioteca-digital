"use client";

import  ProtectedRoute  from "../../src/components/ProtectedRoute";

export default function SettingsPage() {
  return (
    <ProtectedRoute>
      <div>Settings Page (Placeholder)</div>
    </ProtectedRoute>
  );
}