"use client";

import  ProtectedRoute  from "../../src/components/ProtectedRoute";

export default function BookmarksPage() {
  return (
    <ProtectedRoute>
      <div>Bookmarks Page (Placeholder)</div>
    </ProtectedRoute>
  );
}