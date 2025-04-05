"use client";

import { useRouter } from "next/router";
import { useState, useEffect, useContext } from "react";
import { LibraryContext, ContentItem } from "../../../src/context/LibraryContext";
import { BookOpen, Video, FileText, ArrowLeft } from "lucide-react";
import Link from "next/link";
import styles from "./View.module.css";

const ViewContent = () => {
  const router = useRouter();
  const { id } = router.query; // Obtenemos el id de la URL
  const context = useContext(LibraryContext);
  const [content, setContent] = useState<ContentItem | null>(null);
  const [loading, setLoading] = useState(true);

  if (!context) {
    return <div className={styles.loading}>Error: LibraryContext no está disponible</div>;
  }

  const { content: allContent } = context;

  useEffect(() => {
    if (id && allContent.length > 0) {
      const foundContent = allContent.find((item) => item.id === id);
      setContent(foundContent || null);
      setLoading(false);
    }
  }, [id, allContent]);

  if (loading) {
    return <div className={styles.loading}>Cargando...</div>;
  }

  if (!content) {
    return (
      <div className={styles.error}>
        <h1>Contenido no encontrado</h1>
        <Link href="/library" className={styles.backLink}>
          <ArrowLeft size={20} />
          Volver a la biblioteca
        </Link>
      </div>
    );
  }

  const getIcon = (type: string) => {
    switch (type) {
      case "document":
        return <FileText className={styles.contentIcon} />;
      case "video":
        return <Video className={styles.contentIcon} />;
      case "book":
        return <BookOpen className={styles.contentIcon} />;
      default:
        return <BookOpen className={styles.contentIcon} />;
    }
  };

  const renderContent = () => {
    switch (content.type) {
      case "video":
        return (
          <video controls className={styles.videoPlayer}>
            <source src={content.url} type="video/mp4" />
            Tu navegador no soporta la reproducción de videos.
          </video>
        );
      case "document":
      case "book":
        return (
          <iframe
            src={content.url}
            className={styles.pdfViewer}
            title={content.title}
          />
        );
      default:
        return <p className={styles.error}>Tipo de contenido no soportado.</p>;
    }
  };

  return (
    <div className={styles.view}>
      <div className={styles.header}>
        <Link href="/library" className={styles.backLink}>
          <ArrowLeft size={20} />
          Volver a la biblioteca
        </Link>
        <div className={styles.contentHeader}>
          <div className={styles.contentThumbnail}>{getIcon(content.type)}</div>
          <div className={styles.contentInfo}>
            <h1>{content.title}</h1>
            <div className={styles.contentMeta}>
              <span className={styles.contentType}>{content.type.toUpperCase()}</span>
              <span className={styles.contentSubject}>{content.subject}</span>
            </div>
            <p className={styles.contentDescription}>{content.description}</p>
          </div>
        </div>
      </div>

      <div className={styles.contentViewer}>{renderContent()}</div>
    </div>
  );
};

export default ViewContent;