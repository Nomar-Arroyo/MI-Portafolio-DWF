### `REQUIREMENTS.md`

En los proyectos de JavaScript de Front-End puro (Vanilla sin Node/npm) no se suele usar un archivo `requirements.txt` tradicional. En su lugar, se crea un documento de requerimientos funcionales y de entorno llamado `REQUIREMENTS.md`. 

Crea un archivo llamado `REQUIREMENTS.md` y pega este contenido:

```markdown
# 📋 Requerimientos del Sistema - GlassGallery

Este documento detalla las especificaciones técnicas, requerimientos funcionales y compatibilidades de entorno necesarias para la correcta ejecución del sistema modular GlassGallery.

---

## 💻 Requerimientos de Entorno de Desarrollo y Ejecución

Al ser una aplicación basada puramente en tecnologías de cliente (*Client-Side App*), no requiere de base de datos relacional externa ni de un servidor de backend (como Node.js, PHP o Python) para procesar datos. Sin embargo, cuenta con restricciones de seguridad del navegador.

### 1. Servidor de Estáticos (Obligatorio para Desarrollo)
El navegador requiere resolver las rutas de los módulos de JS mediante el protocolo `http://` o `https://`. No es compatible con el protocolo de archivos locales `file:///`.
- **Software recomendado:** Live Server (VS Code Extension), Python `http.server`, o Node.js `http-server`.

### 2. Compatibilidad de Navegadores (Browsers)
El código utiliza características modernas de ECMAScript 6 y propiedades CSS de última generación. Los navegadores deben cumplir con las siguientes versiones mínimas:
- **Google Chrome:** Versión 61 o superior (Soporte completo de Módulos ES6 y `backdrop-filter`).
- **Mozilla Firefox:** Versión 60 o superior.
- **Microsoft Edge:** Versión 79 o superior.
- **Safari:** Versión 11 o superior.

---

## ⚙️ Requerimientos Funcionales (Especificaciones de Código)

Para mantener la estabilidad de la aplicación durante futuras actualizaciones o fases de desarrollo, cualquier modificación debe cumplir rigurosamente con los siguientes requisitos:

### Capa de Datos e Inmutabilidad (`store.js`)
- **Mutación Segura:** No se permite reasignar la variable global `state` (ej. `state = data`). Toda inserción o actualización de configuraciones de usuario debe realizarse mediante clonación de propiedades usando `Object.assign(state, data)` para evitar la pérdida de referencias de memoria en los módulos que importan el estado.
- **Persistencia:** Toda inserción en el array `state.photos` o `state.albums` debe ir acompañada inmediatamente de la ejecución del método `saveToLocalStorage()` bajo la firma de la clave única del usuario en sesión (`gallery_state_username`).

### Capa de Interfaz y UI (`components.js` y `handlers.js`)
- **Aislamiento Dom:** Ninguna función dentro de `handlers.js` o `components.js` puede realizar consultas directas al DOM mediante `document.getElementById` o `querySelector`. Se debe consumir estrictamente el mapa de propiedades del objeto `dom` importado desde `domElements.js`.
- **Renderizado Limpio:** Las funciones encargadas de inyectar plantillas de texto deben asegurar la limpieza de los contenedores usando métodos iterativos nativos (`.map().join('')`) antes de asignarlos a la propiedad `.innerHTML`.

### Capa de Control de Eventos (`main.js`)
- **Delegación de Eventos:** Queda estrictamente prohibido enlazar escuchadores de eventos individuales a las tarjetas de fotos (`.photo-card`) debido a su naturaleza volátil y dinámica. Las capturas de clics, aperturas de menús flotantes o eliminación de elementos se deben delegar obligatoriamente a los contenedores padre estáticos: `dom.galleryGrid` y `dom.momentsGrid`.