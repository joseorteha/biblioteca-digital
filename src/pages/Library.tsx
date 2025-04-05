"use client";

import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { Search, Filter, BookOpen, Video, FileText, X } from "lucide-react";
import { LibraryContext, ContentItem } from "../context/LibraryContext";
import styles from "./Library.module.css";

const Library = () => {
  const context = useContext(LibraryContext);
  const [content, setContent] = useState<ContentItem[]>([]);
  const [filteredContent, setFilteredContent] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    type: "",
    subject: "",
  });
  const [showFilters, setShowFilters] = useState(false);

  if (!context) {
    return <div className={styles.loading}>Error: LibraryContext no está disponible</div>;
  }

  const { getAllContent } = context;

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const data = await getAllContent();
        setContent(data);
        setFilteredContent(data);
      } catch (error) {
        console.error("Error fetching content:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [getAllContent]);

  useEffect(() => {
    let result = content;

    if (searchTerm) {
      result = result.filter(
        (item) =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (filters.type) {
      result = result.filter((item) => item.type === filters.type);
    }

    if (filters.subject) {
      result = result.filter((item) => item.subject === filters.subject);
    }

    setFilteredContent(result);
  }, [searchTerm, filters, content]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (name: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      type: "",
      subject: "",
    });
    setSearchTerm("");
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "document": // Cambiamos "pdf" por "document" para coincidir con ContentItem
        return <FileText className={styles.contentIcon} />;
      case "video":
        return <Video className={styles.contentIcon} />;
      case "book":
        return <BookOpen className={styles.contentIcon} />;
      default:
        return <BookOpen className={styles.contentIcon} />;
    }
  };

  const subjects = [...new Set(content.map((item) => item.subject))];

  if (loading) {
    return <div className={styles.loading}>Cargando...</div>;
  }

  return (
    <div className={styles.library}>
      <div className={styles.header}>
        <h1>Biblioteca Digital</h1>
        <p>Explora todos los materiales educativos disponibles</p>
      </div>

      <div className={styles.searchBar}>
        <div className={styles.searchInputWrapper}>
          <Search className={styles.searchIcon} size={18} />
          <input
            type="text"
            placeholder="Buscar por título o descripción..."
            value={searchTerm}
            onChange={handleSearch}
            className={styles.searchInput}
          />
          {searchTerm && (
            <button
              className={styles.clearButton}
              onClick={() => setSearchTerm("")}
              aria-label="Limpiar búsqueda"
            >
              <X size={16} />
            </button>
          )}
        </div>
        <button
          className={styles.filterButton}
          onClick={() => setShowFilters(!showFilters)}
          aria-expanded={showFilters}
        >
          <Filter size={18} />
          <span>Filtros</span>
        </button>
      </div>

      {showFilters && (
        <div className={styles.filtersPanel}>
          <div className={styles.filterGroup}>
            <label>Tipo de Contenido</label>
            <div className={styles.filterOptions}>
              <button
                className={`${styles.filterOption} ${filters.type === "" ? styles.active : ""}`}
                onClick={() => handleFilterChange("type", "")}
              >
                Todos
              </button>
              <button
                className={`${styles.filterOption} ${filters.type === "document" ? styles.active : ""}`}
                onClick={() => handleFilterChange("type", "document")} // Cambiamos "pdf" por "document"
              >
                <FileText size={16} />
                Documentos
              </button>
              <button
                className={`${styles.filterOption} ${filters.type === "video" ? styles.active : ""}`}
                onClick={() => handleFilterChange("type", "video")}
              >
                <Video size={16} />
                Videos
              </button>
              <button
                className={`${styles.filterOption} ${filters.type === "book" ? styles.active : ""}`}
                onClick={() => handleFilterChange("type", "book")}
              >
                <BookOpen size={16} />
                Libros
              </button>
            </div>
          </div>

          <div className={styles.filterGroup}>
            <label>Materia</label>
            <div className={styles.filterOptions}>
              <button
                className={`${styles.filterOption} ${filters.subject === "" ? styles.active : ""}`}
                onClick={() => handleFilterChange("subject", "")}
              >
                Todas
              </button>
              {subjects.map((subject) => (
                <button
                  key={subject}
                  className={`${styles.filterOption} ${filters.subject === subject ? styles.active : ""}`}
                  onClick={() => handleFilterChange("subject", subject)}
                >
                  {subject}
                </button>
              ))}
            </div>
          </div>

          <button className={styles.clearFiltersButton} onClick={clearFilters}>
            Limpiar filtros
          </button>
        </div>
      )}

      <div className={styles.resultsInfo}>
        <p>Mostrando {filteredContent.length} de {content.length} recursos</p>
      </div>

      <div className={styles.contentGrid}>
        {filteredContent.length > 0 ? (
          filteredContent.map((item) => (
            <Link href={`/view/${item.id}`} key={item.id} className={styles.contentCard}>
              <div className={styles.contentThumbnail}>{getIcon(item.type)}</div>
              <div className={styles.contentInfo}>
                <h3>{item.title}</h3>
                <div className={styles.contentMeta}>
                  <span className={styles.contentType}>{item.type.toUpperCase()}</span>
                  <span className={styles.contentSubject}>{item.subject}</span>
                </div>
                <p className={styles.contentDescription}>{item.description}</p>
              </div>
            </Link>
          ))
        ) : (
          <div className={styles.noResults}>
            <p>No se encontraron resultados para tu búsqueda.</p>
            <button className={styles.clearFiltersButton} onClick={clearFilters}>
              Limpiar filtros
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Library;