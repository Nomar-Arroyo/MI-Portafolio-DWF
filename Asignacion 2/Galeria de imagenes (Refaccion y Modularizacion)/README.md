# ☁️ Gallery Pro — Brief 09 (Versión Modular)

> **Desarrollo Web Frontend Esencial — Proyecto de Portafolio Avanzado**

---

## 👥 Integrantes del Grupo

- **Gleiker Altuve** — Control de Versiones, Gestión de Repositorios y Maquetación Semántica
- **Nomar Arroyo** — Desarrollador Frontend Líder, Arquitectura del DOM y Lógica de Interactividad

---

![Estatus del Proyecto](https://img.shields.io/badge/Proyecto-Refactorizado-brightgreen)  
![Stack Utilizado](https://img.shields.io/badge/Stack-HTML5%20%7C%20CSS3%20%7C%20JS%20Modules-blue)  
![Persistencia](https://img.shields.io/badge/Persistencia-LocalStorage%20Multi--user-orange)

---

## 📌 Descripción General

Una aplicación web nativa de gestión y almacenamiento de imágenes en la nube inspirada en la interfaz de usuario y flujos de trabajo de **Windows Gallery** y **OneDrive**.

El sistema implementa una estética visual moderna basada en **Glassmorphism** (*cristal esmerilado*) con fondos dinámicos y difuminados vectoriales optimizados para alto rendimiento.

Esta versión representa una **refactorización completa** del proyecto original, migrando desde una arquitectura monolítica hacia una estructura profesional basada en **Módulos Nativos de JavaScript (ES6 Modules)**, aplicando el principio de:

> **Separación de Responsabilidades (SoC — Separation of Concerns)**

---

# 🏗️ Arquitectura del Sistema y Modularización

La lógica de la aplicación fue dividida estratégicamente en módulos independientes especializados para mejorar:

- Escalabilidad
- Mantenibilidad
- Reutilización
- Legibilidad del código

---

## 📂 Estructura del Proyecto

```txt
📂 Galeria de Imagenes/
┃
┣ 📄 index.html
┃   ┗ Estructura semántica de la interfaz de usuario
┃
┣ 📄 style.css
┃   ┗ Estilos visuales, layouts y diseño responsivo
┃
┣ 📂 store/
┃ ┗ 📄 state.js
┃     ┗ MÓDULO STATE:
┃       Manejo, persistencia y estado global de la app
┃
┣ 📂 services/
┃ ┗ 📄 api.js
┃     ┗ MÓDULO API:
┃       Comunicación exclusiva con LocalStorage
┃
┗ 📄 app.js
    ┗ ORQUESTADOR PRINCIPAL:
      Controlador del DOM e inicialización
```

---

# 🧠 Detalle de los Módulos JavaScript

---

## 📦 `services/api.js`
### Capa de Datos / Persistencia

Contiene la lógica exclusiva encargada de:

- Leer datos desde `LocalStorage`
- Escribir datos persistentes
- Abstraer operaciones CRUD simuladas
- Gestionar la “base de datos” local (`ultraGalleryData`)

### Características:

- Totalmente desacoplado del DOM
- No contiene lógica visual
- Arquitectura limpia y reutilizable

```js
saveDataToStorage(data);
loadDataFromStorage();
```

---

## 🧩 `store/state.js`
### Capa de Estado — *Single Source of Truth*

Representa la fuente única de verdad de la aplicación.

Centraliza:

- Sesión activa (`currentUser`)
- Caché de imágenes y álbumes
- Estado de navegación
- Índices internos
- Pestañas activas

### Funcionalidades principales:

- `loginUser()`
- `logoutUser()`
- Sincronización automática con API
- Gestión reactiva del estado global

```js
state.currentUser
state.memoryStore
state.activeTab
```

---

## 🎛️ `app.js`
### Controlador Principal / UI Layer

Actúa como el orquestador principal del frontend.

Declarado en el HTML mediante:

```html
<script type="module" src="app.js"></script>
```

### Responsabilidades:

- Captura de eventos del usuario
- Renderizado dinámico
- Gestión reactiva del DOM
- Apertura/cierre de modales
- Navegación interna
- Control visual del visor de imágenes

### Eventos gestionados:

```js
click
submit
keydown
change
```

---

# 🎨 Características e Interactividad Avanzada

---

## ✨ Diseño UI Premium (Glassmorphism)

Implementación visual moderna utilizando:

- `backdrop-filter: blur()`
- Transparencias dinámicas
- Fondos vectoriales animados
- Sombras suaves multicapa

Resultado:

- Estética elegante
- Interfaz tipo sistema operativo moderno
- Alto rendimiento visual

---

## 🎞️ Transiciones Fluidas

Sistema de animaciones optimizado mediante:

```css
cubic-bezier(0.34, 1.56, 0.64, 1)
```

### Beneficios:

- Efecto elástico profesional
- Animaciones suaves
- Sin dependencias externas pesadas

---

## 📁 Gestión Dinámica de Álbumes

El usuario puede:

- Crear carpetas personalizadas
- Organizar imágenes
- Eliminar fotos permanentemente
- Clasificar contenido en tiempo real

### Álbumes incluidos:

- Favoritos
- Biblioteca General
- Álbumes personalizados

---

## 🖼️ Visor y Acciones Rápidas

Sistema de visualización interactiva con:

- Modal deslizable
- Barra flotante de acciones
- Navegación entre imágenes
- Descarga simulada
- Cambio de foto de perfil

### Técnicas utilizadas:

```js
event.stopPropagation()
```

Permite:

- Cierre táctil externo
- Control limpio de eventos
- Mejor experiencia de usuario

---

# 🛠️ Tecnologías Utilizadas

---

## 🌐 HTML5

- Marcado semántico
- Estructuración accesible
- Buenas prácticas de documentación

---

## 🎨 CSS3

- Variables CSS nativas
- Flexbox
- CSS Grid
- Animaciones con `@keyframes`
- Glassmorphism moderno

---

## ⚡ JavaScript Moderno (ES6+)

### Implementaciones utilizadas:

- `import / export`
- Funciones flecha
- Desestructuración
- Métodos declarativos

```js
.find()
.forEach()
.map()
.filter()
```

### Además:

- Manipulación avanzada del DOM
- Arquitectura modular
- Estado centralizado

---

# 📦 Pasos para Probar el Proyecto Localmente

> Debido al uso de módulos nativos (`type="module"`), los navegadores bloquean la ejecución directa desde disco local por políticas CORS.

Es obligatorio utilizar un servidor local.

---

## 1️⃣ Clonar el Repositorio

```bash
git clone https://github.com/Nomar-Arroyo/Galeria-de-Imagenes.git
```

---

## 2️⃣ Navegar al Proyecto

```bash
cd Galeria-de-Imagenes
```

---

## 3️⃣ Levantar un Servidor Local

### Opción recomendada — VS Code

- Click derecho sobre `index.html`
- Seleccionar:

```txt
Open with Live Server
```

---

### Alternativa — Node.js

```bash
npx http-server .
```

---

# 🧪 Flujo de Prueba Recomendado

1. Iniciar sesión con cualquier nombre.
2. Crear un álbum personalizado.
3. Subir imágenes al sistema.
4. Organizar imágenes dentro de carpetas.
5. Abrir el visor interactivo.
6. Navegar entre imágenes.
7. Probar acciones rápidas desde la Action Bar.

---

# 🚀 Objetivos del Proyecto

Este proyecto fue diseñado para demostrar competencias avanzadas en:

- Arquitectura frontend moderna
- Modularización ES6
- Gestión de estado
- Diseño UI/UX contemporáneo
- Manipulación reactiva del DOM
- Persistencia local multiusuario
- Buenas prácticas de ingeniería frontend

---

# 📚 Conceptos Técnicos Aplicados

| Concepto | Implementación |
|---|---|
| Separación de responsabilidades | Arquitectura modular |
| Persistencia local | LocalStorage |
| Single Source of Truth | `state.js` |
| Programación modular | ES6 Modules |
| Diseño responsive | Flexbox + Grid |
| UI moderna | Glassmorphism |
| Interactividad reactiva | Manipulación dinámica del DOM |

---

# 📄 Licencia

Proyecto desarrollado con fines educativos y de portafolio profesional.
