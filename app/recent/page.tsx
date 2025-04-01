"use client";

import  ProtectedRoute  from "../../src/components/ProtectedRoute";

export default function RecentPage() {
  return (
    <ProtectedRoute>
      <div>Recent Page (Placeholder)</div>
    </ProtectedRoute>
  );
}