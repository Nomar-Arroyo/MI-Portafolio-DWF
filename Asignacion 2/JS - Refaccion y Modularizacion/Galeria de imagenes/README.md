# 🖼️ GlassGallery — Sistema Modular de Galería de Imágenes

![Proyecto](https://img.shields.io/badge/Proyecto-GlassGallery-brightgreen)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow)
![Arquitectura](https://img.shields.io/badge/Arquitectura-Modular-blue)
![Persistencia](https://img.shields.io/badge/Persistencia-LocalStorage-orange)

> Aplicación web interactiva de gestión de archivos fotográficos desarrollada con **JavaScript Vanilla (ES6+)**. Implementa una interfaz moderna basada en **Glassmorphism** y **Dark Neumorphism**, junto con una arquitectura modular escalable.

---

# 📖 Tabla de Contenidos

- Descripción General
- Características Principales
- Arquitectura del Proyecto
- Descripción de Módulos
- Instalación Local
- Tecnologías Utilizadas
- Integrantes del Proyecto

---

# 📘 Descripción General

GlassGallery es una aplicación web interactiva para la gestión de imágenes y álbumes fotográficos.

El proyecto fue refactorizado desde una estructura monolítica hacia una arquitectura modular basada en ES6 Modules, aplicando separación de responsabilidades para mejorar:

- Escalabilidad
- Mantenibilidad
- Legibilidad
- Reutilización de código

---

# ✨ Características Principales

## 🔐 Autenticación Local Basada en Sesión

- Pantalla de inicio de sesión estilo Dark Neumorphism.
- Carga independiente de datos por usuario.
- Persistencia automática de preferencias.

## 📁 Gestión Dinámica de Álbumes

- Creación de álbumes en tiempo real.
- Filtrado interactivo mediante menús desplegables.
- Organización flexible de imágenes.

## 📤 Carga de Imágenes Múltiple

Uso de la API nativa:

```js
FileReader
```

Permite:

- Conversión Base64.
- Vista previa inmediata.
- Almacenamiento local.

## 🌟 Sección Inteligente de Momentos

- Agrupación automática de imágenes destacadas.
- Filtrado dinámico de contenido.

## 🖼️ Lightbox Avanzado

### Funcionalidades

- Navegación con flechas del teclado.
- Cierre mediante Escape.
- Cierre por clic externo.
- Descarga directa.
- Copiado al portapapeles.
- Eliminación de imágenes.

---

# 🏗️ Arquitectura del Proyecto

```text
├── index.html
├── style.css
└── js/
    ├── domElements.js
    ├── store.js
    ├── components.js
    ├── handlers.js
    └── main.js
```

---

# 🧠 Descripción de los Módulos

## 📄 index.html

Punto de entrada principal de la aplicación.

## 🎯 domElements.js

Centraliza y exporta los selectores del DOM.

## 🗄️ store.js

Gestiona:

- Estado global.
- Persistencia LocalStorage.
- Lectura y escritura de datos.

## 🧩 components.js

Contiene funciones puras para generar componentes HTML reutilizables.

## ⚙️ handlers.js

Orquesta:

- Descargas.
- Apertura de modales.
- Mutaciones visuales.
- Actualización de estado.

## 🚀 main.js

Controlador principal encargado de:

- Inicialización.
- Delegación de eventos.
- Integración entre módulos.

---

# 🚀 Instalación y Despliegue Local

## Clonar el repositorio

```bash
git clone https://github.com/TU_USUARIO/glass-gallery.git
```

## Acceder al proyecto

```bash
cd glass-gallery
```

## Ejecutar servidor local

### VS Code

Open with Live Server

### Python

```bash
python -m http.server 5500
```

### Node.js

```bash
npm install -g http-server
http-server -p 5500
```

## Abrir en el navegador

```text
http://localhost:5500
```

---

# 🛠️ Tecnologías Utilizadas

| Tecnología | Uso |
|------------|-----|
| HTML5 | Estructura semántica |
| CSS3 | Diseño y animaciones |
| JavaScript ES6+ | Lógica de negocio |
| FileReader API | Gestión de imágenes |
| Clipboard API | Copiado de enlaces |
| LocalStorage | Persistencia local |

---

# 👥 Integrantes del Proyecto

- Nomar Arroyo
- Gleiker Altuve

---

# 📄 Licencia

Proyecto desarrollado con fines educativos y de portafolio profesional.
