"use client"

import { createContext, useState, useEffect } from "react"

export const LibraryContext = createContext()

// Mock data for demonstration
const mockContent = [
  {
    id: "1",
    title: "Matemáticas: Álgebra Básica",
    description: "Introducción a los conceptos fundamentales del álgebra, ecuaciones lineales y cuadráticas.",
    type: "pdf",
    subject: "Matemáticas",
    url: "/content/algebra.pdf",
    updatedAt: "15/03/2023",
    views: 245,
  },
  {
    id: "2",
    title: "Historia de México: Revolución Mexicana",
    description: "Análisis detallado de las causas, desarrollo y consecuencias de la Revolución Mexicana (1910-1920).",
    type: "book",
    subject: "Historia",
    url: "/content/revolucion.html",
    updatedAt: "10/04/2023",
    views: 189,
  },
  {
    id: "3",
    title: "Biología: Ecosistemas",
    description: "Estudio de los diferentes ecosistemas, biodiversidad y conservación ambiental.",
    type: "video",
    subject: "Biología",
    url: "/content/ecosistemas.mp4",
    thumbnail: "/thumbnails/ecosistemas.jpg",
    updatedAt: "05/05/2023",
    views: 320,
  },
  {
    id: "4",
    title: "Literatura: Análisis de textos",
    description: "Técnicas para el análisis literario de diferentes géneros y épocas.",
    type: "pdf",
    subject: "Literatura",
    url: "/content/literatura.pdf",
    updatedAt: "22/02/2023",
    views: 156,
  },
  {
    id: "5",
    title: "Física: Mecánica Newtoniana",
    description: "Leyes del movimiento de Newton y sus aplicaciones en la física clásica.",
    type: "video",
    subject: "Física",
    url: "/content/mecanica.mp4",
    thumbnail: "/thumbnails/mecanica.jpg",
    updatedAt: "18/03/2023",
    views: 210,
  },
  {
    id: "6",
    title: "Química: Tabla Periódica",
    description: "Estudio completo de la tabla periódica de los elementos y sus propiedades.",
    type: "book",
    subject: "Química",
    url: "/content/tabla_periodica.html",
    updatedAt: "30/04/2023",
    views: 175,
  },
]

export const LibraryProvider = ({ children }) => {
  const [content, setContent] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real app, this would fetch from your API
    // For demo purposes, we'll use the mock data
    const fetchContent = async () => {
      try {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setContent(mockContent)
      } catch (error) {
        console.error("Error fetching content:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchContent()
  }, [])

  const getAllContent = async () => {
    // In a real app, this would fetch from your API
    return content
  }

  const getContentById = async (id) => {
    // In a real app, this would fetch from your API
    return content.find((item) => item.id === id) || null
  }

  const getRecentContent = async () => {
    // In a real app, this would fetch from your API
    // For demo, we'll sort by updatedAt
    return [...content]
      .sort((a, b) => {
        const dateA = new Date(a.updatedAt.split("/").reverse().join("/"))
        const dateB = new Date(b.updatedAt.split("/").reverse().join("/"))
        return dateB - dateA
      })
      .slice(0, 4)
  }

  const getPopularContent = async () => {
    // In a real app, this would fetch from your API
    // For demo, we'll sort by views
    return [...content].sort((a, b) => b.views - a.views).slice(0, 4)
  }

  return (
    <LibraryContext.Provider
      value={{
        content,
        loading,
        getAllContent,
        getContentById,
        getRecentContent,
        getPopularContent,
      }}
    >
      {children}
    </LibraryContext.Provider>
  )
}

