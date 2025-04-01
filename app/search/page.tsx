"use client";

import  ProtectedRoute  from "../../src/components/ProtectedRoute";

export default function SearchPage() {
  return (
    <ProtectedRoute>
      <div>Search Page (Placeholder)</div>
    </ProtectedRoute>
  );
}