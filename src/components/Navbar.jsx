"use client"

import { useState, useContext } from "react"
import { Link } from "react-router-dom"
import { Menu, BookOpen, Bell, User } from "lucide-react"
import { AuthContext } from "../context/AuthContext"
import styles from "./Navbar.module.css"

const Navbar = ({ toggleSidebar }) => {
  const { user, logout } = useContext(AuthContext)
  const [showUserMenu, setShowUserMenu] = useState(false)

  const handleLogout = () => {
    logout()
  }

  return (
    <header className={styles.navbar}>
      <div className={styles.navbarLeft}>
        <button className={styles.menuButton} onClick={toggleSidebar}>
          <Menu size={24} />
        </button>
        <Link to="/dashboard" className={styles.logo}>
          <BookOpen size={24} />
          <span>Biblioteca Digital</span>
        </Link>
      </div>
      <div className={styles.navbarRight}>
        <button className={styles.iconButton}>
          <Bell size={20} />
        </button>
        <div className={styles.userMenuContainer}>
          <button className={styles.userButton} onClick={() => setShowUserMenu(!showUserMenu)}>
            <div className={styles.userAvatar}>
              <User size={20} />
            </div>
            <span className={styles.userName}>{user?.name || "Usuario"}</span>
          </button>
          {showUserMenu && (
            <div className={styles.userMenu}>
              <div className={styles.userInfo}>
                <div className={styles.userAvatar}>
                  <User size={24} />
                </div>
                <div>
                  <div className={styles.userFullName}>{user?.name || "Usuario"}</div>
                  <div className={styles.userRole}>{user?.role || "Estudiante"}</div>
                </div>
              </div>
              <div className={styles.menuDivider}></div>
              <button className={styles.menuItem} onClick={handleLogout}>
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Navbar

