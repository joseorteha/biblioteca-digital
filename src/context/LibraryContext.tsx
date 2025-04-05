"use client";

import { createContext, useState, useEffect, ReactNode } from "react";

// Definimos el tipo de los elementos de contenido
export type ContentItem = {
  id: string;
  title: string;
  subject: string;
  type: "book" | "video" | "document";
  url: string;
  description: string; // Añadimos descripción para que coincida con Library.tsx
  views?: number;
  createdAt?: string;
};

// Definimos el tipo del contexto
interface LibraryContextType {
  content: ContentItem[];
  loading: boolean;
  getRecentContent: () => Promise<ContentItem[]>;
  getPopularContent: () => Promise<ContentItem[]>;
  getAllContent: () => Promise<ContentItem[]>;
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
        // Simulamos una carga de datos con más elementos de prueba
        const mockData: ContentItem[] = [
          {
            id: "1",
            title: "Biología: Ecosistemas Marinos",
            subject: "Biología",
            type: "video",
            url: "/content/biologia-ecosistemas-marinos.mp4",
            description: "Un video introductorio sobre los ecosistemas marinos y su biodiversidad.",
            views: 150,
            createdAt: "2025-04-01T10:00:00Z",
          },
          {
            id: "2",
            title: "Química: La Tabla Periódica Explicada",
            subject: "Química",
            type: "book",
            url: "/content/tabla-periodica.pdf",
            description: "Un libro detallado que explica los elementos de la tabla periódica y sus propiedades.",
            views: 200,
            createdAt: "2025-03-15T12:00:00Z",
          },
          {
            id: "3",
            title: "Historia de México: La Revolución Mexicana",
            subject: "Historia",
            type: "book",
            url: "/content/revolucion-mexicana.pdf",
            description: "Un análisis profundo de los eventos y personajes clave de la Revolución Mexicana.",
            views: 300,
            createdAt: "2025-02-20T09:00:00Z",
          },
          {
            id: "4",
            title: "Física: Mecánica Newtoniana",
            subject: "Física",
            type: "video",
            url: "/content/mecanica-newtoniana.mp4",
            description: "Un video educativo que cubre las leyes de Newton y sus aplicaciones prácticas.",
            views: 100,
            createdAt: "2025-04-02T14:00:00Z",
          },
          {
            id: "5",
            title: "Matemáticas: Introducción al Álgebra",
            subject: "Matemáticas",
            type: "document",
            url: "/content/intro-algebra.pdf",
            description: "Un documento con ejercicios y explicaciones sobre los fundamentos del álgebra.",
            views: 180,
            createdAt: "2025-03-10T08:00:00Z",
          },
          {
            id: "6",
            title: "Literatura: Análisis de 'Don Quijote'",
            subject: "Literatura",
            type: "book",
            url: "/content/don-quijote.pdf",
            description: "Un análisis literario de la obra maestra de Miguel de Cervantes.",
            views: 250,
            createdAt: "2025-01-15T11:00:00Z",
          },
          {
            id: "7",
            title: "Biología: Fotosíntesis en Plantas",
            subject: "Biología",
            type: "document",
            url: "/content/fotosintesis.pdf",
            description: "Un documento que explica el proceso de la fotosíntesis en las plantas.",
            views: 120,
            createdAt: "2025-02-01T13:00:00Z",
          },
          {
            id: "8",
            title: "Química: Reacciones Químicas Básicas",
            subject: "Química",
            type: "video",
            url: "/content/reacciones-quimicas.mp4",
            description: "Un video que muestra ejemplos de reacciones químicas simples.",
            views: 90,
            createdAt: "2025-04-03T16:00:00Z",
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
    return [...content]
      .sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime())
      .slice(0, 4);
  };

  const getPopularContent = async () => {
    return [...content]
      .sort((a, b) => (b.views || 0) - (a.views || 0))
      .slice(0, 4);
  };

  const getAllContent = async () => {
    return [...content];
  };

  return (
    <LibraryContext.Provider
      value={{ content, loading, getRecentContent, getPopularContent, getAllContent }}
    >
      {children}
    </LibraryContext.Provider>
  );
};