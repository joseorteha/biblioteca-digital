"use client";

import { useState, useEffect, useContext } from "react";
import { useParams, useRouter } from "next/navigation"; // Usar next/navigation
import { ArrowLeft, Download, BookOpen, Video, FileText, Clock } from "lucide-react";
import { LibraryContext } from "../context/LibraryContext";
import styles from "./ViewContent.module.css";

const ViewContent = () => {
  const { id: contentId } = useParams(); // Cambiar a useParams de Next.js
  const router = useRouter(); // Reemplazar useNavigate con useRouter
  const { getContentById } = useContext(LibraryContext);
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const data = await getContentById(contentId);
        setContent(data);
      } catch (error) {
        console.error("Error fetching content:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [contentId, getContentById]);

  const getIcon = (type) => {
    switch (type) {
      case "pdf":
        return <FileText className={styles.contentTypeIcon} />;
      case "video":
        return <Video className={styles.contentTypeIcon} />;
      default:
        return <BookOpen className={styles.contentTypeIcon} />;
    }
  };

  const renderContent = () => {
    if (!content) return null;

    switch (content.type) {
      case "pdf":
        return (
          <div className={styles.pdfViewer}>
            <iframe src={content.url} title={content.title} className={styles.pdfFrame} />
          </div>
        );
      case "video":
        return (
          <div className={styles.videoContainer}>
            <video controls className={styles.videoPlayer} poster={content.thumbnail}>
              <source src={content.url} type="video/mp4" />
              Tu navegador no soporta la reproducción de videos.
            </video>
          </div>
        );
      default:
        return (
          <div className={styles.bookViewer}>
            <div className={styles.bookCover}>
              <BookOpen size={64} />
              <h3>{content.title}</h3>
            </div>
            <div className={styles.bookContent}>{content.content}</div>
          </div>
        );
    }
  };

  if (loading) {
    return <div className={styles.loading}>Cargando...</div>;
  }

  if (!content) {
    return (
      <div className={styles.notFound}>
        <h2>Contenido no encontrado</h2>
        <button className={styles.backButton} onClick={() => router.push("/library")}>
          <ArrowLeft size={18} />
          Volver a la biblioteca
        </button>
      </div>
    );
  }

  return (
    <div className={styles.viewContent}>
      <div className={styles.header}>
        <button className={styles.backButton} onClick={() => router.back()}>
          <ArrowLeft size={18} />
          Volver
        </button>
        <button className={styles.downloadButton}>
          <Download size={18} />
          Descargar
        </button>
      </div>

      <div className={styles.contentHeader}>
        <div className={styles.contentTypeIndicator}>
          {getIcon(content.type)}
          <span>{content.type.toUpperCase()}</span>
        </div>
        <h1>{content.title}</h1>
        <div className={styles.contentMeta}>
          <div className={styles.metaItem}>
            <span className={styles.metaLabel}>Materia:</span>
            <span className={styles.metaValue}>{content.subject}</span>
          </div>
          <div className={styles.metaItem}>
            <Clock size={16} />
            <span className={styles.metaValue}>Actualizado: {content.updatedAt}</span>
          </div>
        </div>
        <p className={styles.contentDescription}>{content.description}</p>
      </div>

      <div className={styles.contentViewer}>{renderContent()}</div>
    </div>
  );
};

export default ViewContent;