import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import Library from "./pages/Library"
import ViewContent from "./pages/ViewContent"
import Layout from "./components/Layout"
import { AuthProvider } from "./context/AuthContext"
import { LibraryProvider } from "./context/LibraryContext"
import ProtectedRoute from "./components/ProtectedRoute"

function App() {
  return (
    <Router>
      <AuthProvider>
        <LibraryProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }
            >
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/library" element={<Library />} />
              <Route path="/view/:contentId" element={<ViewContent />} />
            </Route>
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </LibraryProvider>
      </AuthProvider>
    </Router>
  )
}

export default App

