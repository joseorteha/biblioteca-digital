"use client";

import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { Clock, BookOpen, Video, FileText, TrendingUp } from "lucide-react";
import { LibraryContext, ContentItem } from "../context/LibraryContext";
import { AuthContext } from "../context/AuthContext";
import styles from "./Dashboard.module.css";

const Dashboard = () => {
  const context = useContext(LibraryContext);
  const { user } = useContext(AuthContext);

  if (!context) {
    return <div className={styles.loading}>Error: LibraryContext no está disponible</div>;
  }

  const { getRecentContent, getPopularContent, loading } = context;
  const [recentContent, setRecentContent] = useState([]);
  const [popularContent, setPopularContent] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const recent = await getRecentContent();
        const popular = await getPopularContent();
        setRecentContent(recent);
        setPopularContent(popular);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchData();
  }, [getRecentContent, getPopularContent]);

  const getIcon = (type) => {
    switch (type) {
      case "document": // Cambiamos "pdf" por "document" para coincidir con el tipo ContentItem
        return <FileText className={styles.contentIcon} />;
      case "video":
        return <Video className={styles.contentIcon} />;
      case "book":
        return <BookOpen className={styles.contentIcon} />;
      default:
        return <BookOpen className={styles.contentIcon} />;
    }
  };

  if (loading) {
    return <div className={styles.loading}>Cargando...</div>;
  }

  return (
    <div className={styles.dashboard}>
      <section className={styles.welcomeSection}>
        <div className={styles.welcomeText}>
          <h1>Bienvenido, {user?.name || "Estudiante"}</h1>
          <p>Accede a todos los materiales educativos sin necesidad de conexión a internet.</p>
        </div>
      </section>

      <section className={styles.statsSection}>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <BookOpen size={24} />
          </div>
          <div className={styles.statInfo}>
            <h3>Libros</h3>
            <p className={styles.statValue}>120</p>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <Video size={24} />
          </div>
          <div className={styles.statInfo}>
            <h3>Videos</h3>
            <p className={styles.statValue}>85</p>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>
            <FileText size={24} />
          </div>
          <div className={styles.statInfo}>
            <h3>Documentos</h3>
            <p className={styles.statValue}>210</p>
          </div>
        </div>
      </section>

      <section className={styles.contentSection}>
        <div className={styles.sectionHeader}>
          <h2>
            <Clock size={20} /> Contenido Reciente
          </h2>
          <Link href="/library" className={styles.viewAllLink}>
            Ver todo
          </Link>
        </div>
        <div className={styles.contentGrid}>
          {recentContent.map((item) => (
            <Link href={`/view/${item.id}`} key={item.id} className={styles.contentCard}>
              <div className={styles.contentThumbnail}>{getIcon(item.type)}</div>
              <div className={styles.contentInfo}>
                <h3>{item.title}</h3>
                <p>{item.subject}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.contentSection}>
        <div className={styles.sectionHeader}>
          <h2>
            <TrendingUp size={20} /> Contenido Popular
          </h2>
          <Link href="/library" className={styles.viewAllLink}>
            Ver todo
          </Link>
        </div>
        <div className={styles.contentGrid}>
          {popularContent.map((item) => (
            <Link href={`/view/${item.id}`} key={item.id} className={styles.contentCard}>
              <div className={styles.contentThumbnail}>{getIcon(item.type)}</div>
              <div className={styles.contentInfo}>
                <h3>{item.title}</h3>
                <p>{item.subject}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;