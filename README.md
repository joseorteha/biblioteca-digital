# 📚 Biblioteca Digital

Una plataforma educativa web para visualizar libros, videos y documentos de forma interactiva.

---

## 🚀 Descripción del Proyecto
**Biblioteca Digital** es una aplicación educativa construida con **Next.js**, **TypeScript** y **React**, enfocada en ofrecer un espacio intuitivo para acceder a material académico. Actualmente maneja datos mockeados y está lista para conectarse a una API o base de datos real.

---

## ✨ Características Principales
- 🔎 **Explora contenido** por tipo (libro, video, PDF) y materia.
- 📺 **Visualiza contenido** en una página dedicada.
- 📱 **Responsive**: Interfaz adaptada para cualquier dispositivo.
- 🔍 **Búsqueda inteligente** por título o descripción.
- 💾 **Mock data** lista para ser reemplazada por datos reales.

---

## 🛠️ Tecnologías Utilizadas
| Tecnología      | Descripción                      |
|----------------|----------------------------------|
| Next.js        | Framework React (Pages Router)   |
| TypeScript     | Tipado estático                  |
| React          | Librería UI                      |
| CSS Modules    | Estilos modulares                |
| Lucide React   | Íconos modernos y accesibles     |
| Git + GitHub   | Control de versiones             |

🔗 Repositorio: [biblioteca-digital](https://github.com/joseorteha/biblioteca-digital)

---

## 📦 Instalación

### 🔧 Requisitos Previos
- Node.js v16+
- npm o yarn
- Git

### 📥 Clonar Repositorio
```bash
git clone https://github.com/joseorteha/biblioteca-digital.git
cd biblioteca-digital
```

### 📦 Instalar Dependencias
```bash
npm install
```

### ▶️ Ejecutar la App
```bash
npm run dev
```
Abre tu navegador en `http://localhost:3000`

---

## 🧬 Estructura del Proyecto
```
📁 pages/
 ┣ 📄 library.tsx → Página para explorar contenido
 ┣ 📄 dashboard.jsx → En desarrollo
 ┗ 📂 view/[id].tsx → Visualización de contenido específico

📁 src/
 ┣ 📁 components/ → Navbar, Sidebar, etc.
 ┣ 📁 context/ → Contextos como LibraryContext.tsx
 ┣ 📁 styles/ → Estilos globales y modulares

📁 public/content/ → Videos y PDFs estáticos
```

---

## 🎯 Uso
- **Explorar contenido**: Navega a `/library` para ver todos los recursos.
- **Ver recurso**: Haz clic en una tarjeta para ir a `/view/[id]`.
- **Datos de prueba**: Se ubican en `LibraryContext.tsx`, listos para ser reemplazados.

---

## 🤝 Contribuir

### 1. Haz Fork del Repositorio
Ve a: [https://github.com/joseorteha/biblioteca-digital](https://github.com/joseorteha/biblioteca-digital)

### 2. Clona tu Fork
```bash
git clone https://github.com/TU-USUARIO/biblioteca-digital.git
cd biblioteca-digital
```

### 3. Crea una Rama
```bash
git checkout -b mi-nueva-funcionalidad
```

### 4. Realiza tus Cambios y Prueba
```bash
npm run dev
```

### 5. Sube los Cambios
```bash
git add .
git commit -m "Agrego mi nueva funcionalidad"
git push origin mi-nueva-funcionalidad
```

### 6. Crea un Pull Request
Desde tu fork en GitHub.

---

## ⚠️ Problemas Conocidos
- Los archivos (videos/PDFs) son ficticios. Para pruebas, colócalos en `public/content/`.
- Las rutas `/dashboard`, `/bookmarks`, `/recent` están en desarrollo.
- Actualmente usa **Pages Router**; posible migración futura a **App Router**.

---

## 🔮 Planes Futuros
- Implementar `/bookmarks`, `/recent`, y `/search`
- Conectar con API real o base de datos
- Mejorar visor de PDF con `react-pdf`
- Añadir autenticación de usuarios

---

## 📫 Contacto
- 👤 Autor: **José Ortega**
- 🔗 GitHub: [@joseorteha](https://github.com/joseorteha)
- 📧 Correo: *(joseortegahac@gmail.com)*

---

> Hecho con ❤️ por José Ortega

