"use client"

import { Link, useLocation } from "react-router-dom"
import { Home, BookOpen, Search, Clock, Bookmark, Settings, X } from "lucide-react"
import styles from "./Sidebar.module.css"

const Sidebar = ({ isOpen, closeSidebar }) => {
  const location = useLocation()

  const isActive = (path) => {
    return location.pathname === path
  }

  return (
    <aside className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
      <div className={styles.sidebarHeader}>
        <h2 className={styles.sidebarTitle}>Menú</h2>
        <button className={styles.closeButton} onClick={closeSidebar}>
          <X size={20} />
        </button>
      </div>

      <nav className={styles.sidebarNav}>
        <Link
          to="/dashboard"
          className={`${styles.navItem} ${isActive("/dashboard") ? styles.active : ""}`}
          onClick={closeSidebar}
        >
          <Home size={20} />
          <span>Inicio</span>
        </Link>

        <Link
          to="/library"
          className={`${styles.navItem} ${isActive("/library") ? styles.active : ""}`}
          onClick={closeSidebar}
        >
          <BookOpen size={20} />
          <span>Biblioteca</span>
        </Link>

        <Link
          to="/search"
          className={`${styles.navItem} ${isActive("/search") ? styles.active : ""}`}
          onClick={closeSidebar}
        >
          <Search size={20} />
          <span>Buscar</span>
        </Link>

        <Link
          to="/recent"
          className={`${styles.navItem} ${isActive("/recent") ? styles.active : ""}`}
          onClick={closeSidebar}
        >
          <Clock size={20} />
          <span>Recientes</span>
        </Link>

        <Link
          to="/bookmarks"
          className={`${styles.navItem} ${isActive("/bookmarks") ? styles.active : ""}`}
          onClick={closeSidebar}
        >
          <Bookmark size={20} />
          <span>Guardados</span>
        </Link>
      </nav>

      <div className={styles.sidebarFooter}>
        <Link
          to="/settings"
          className={`${styles.navItem} ${isActive("/settings") ? styles.active : ""}`}
          onClick={closeSidebar}
        >
          <Settings size={20} />
          <span>Configuración</span>
        </Link>
      </div>

      {isOpen && <div className={styles.backdrop} onClick={closeSidebar}></div>}
    </aside>
  )
}

export default Sidebar

