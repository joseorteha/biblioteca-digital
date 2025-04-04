"use client";

import { createContext, useState, useEffect, ReactNode } from "react";

// Definimos el tipo de los elementos de contenido
export type ContentItem = {
  id: string;
  title: string;
  subject: string; // Usamos "subject" para coincidir con dashboard.jsx
  type: "book" | "video" | "document";
  url: string;
  views?: number; // Opcional, para popularidad
  createdAt?: string; // Opcional, para ordenar por lo reciente
};

// Definimos el tipo del contexto
interface LibraryContextType {
  content: ContentItem[];
  loading: boolean;
  getRecentContent: () => Promise<ContentItem[]>;
  getPopularContent: () => Promise<ContentItem[]>;
}

// Creamos el contexto con un valor inicial
export const LibraryContext = createContext<LibraryContextType | undefined>(
  undefined
);

// Proveedor del contexto
export const LibraryProvider = ({ children }: { children: ReactNode }) => {
  const [content, setContent] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        // Simulamos una carga de datos
        const mockData: ContentItem[] = [
          {
            id: "1",
            title: "Biología: Ecosistemas",
            subject: "Biología",
            type: "video",
            url: "/content/biologia-ecosistemas.mp4",
            views: 150,
            createdAt: "2025-04-01T10:00:00Z",
          },
          {
            id: "2",
            title: "Química: Tabla Periódica",
            subject: "Química",
            type: "book",
            url: "/content/tabla-periodica.pdf",
            views: 200,
            createdAt: "2025-03-15T12:00:00Z",
          },
          {
            id: "3",
            title: "Historia de México: Revolución Mexicana",
            subject: "Historia",
            type: "book",
            url: "/content/revolucion-mexicana.pdf",
            views: 300,
            createdAt: "2025-02-20T09:00:00Z",
          },
          {
            id: "4",
            title: "Física: Mecánica Newtoniana",
            subject: "Física",
            type: "video",
            url: "/content/mecanica-newtoniana.mp4",
            views: 100,
            createdAt: "2025-04-02T14:00:00Z",
          },
        ];
        setContent(mockData);
      } catch (error) {
        console.error("Error fetching content:", error);
        setContent([]);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  const getRecentContent = async () => {
    // Ordenamos por fecha de creación (más reciente primero)
    return [...content]
      .sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime())
      .slice(0, 4);
  };

  const getPopularContent = async () => {
    // Ordenamos por número de vistas (más popular primero)
    return [...content]
      .sort((a, b) => (b.views || 0) - (a.views || 0))
      .slice(0, 4);
  };

  return (
    <LibraryContext.Provider
      value={{ content, loading, getRecentContent, getPopularContent }}
    >
      {children}
    </LibraryContext.Provider>
  );
};