# 📄 Documento de Requerimientos del Sistema (SRS)
## Proyecto: Gallery Pro — Brief 09 (Versión Modular)
**Asignatura:** Desarrollo Web Frontend Esencial (2do Trimestre)  
**Desarrolladores:** Gleiker Altuve & Nomar Arroyo  

---

## 1. Introducción y Objetivo del Sistema
El sistema tiene como objetivo proveer una plataforma web nativa (SPA - Single Page Application) para la gestión, visualización y almacenamiento simulado de imágenes en la nube. La interfaz emula el comportamiento de sistemas operativos modernos como Windows Gallery y OneDrive, implementando una arquitectura desacoplada basada en módulos de JavaScript (ES6) para garantizar el rendimiento, escalabilidad y una separación estricta de responsabilidades.

---

## 2. Requerimientos Funcionales (RF)

### RF-01: Autenticación y Control de Acceso (Multi-usuario)
* **Descripción:** El sistema debe presentar una pantalla de bloqueo translúcida para que el usuario inicie sesión introduciendo su nombre.
* **Comportamiento:** * Si el usuario no existe en el sistema, se debe inicializar un perfil completamente nuevo con un álbum por defecto llamado *"Favoritos"*.
  * Si el usuario ya existe, el sistema debe recuperar de manera íntegra sus fotos, álbumes y foto de perfil previamente guardados.
  * Se debe incluir una opción explícita para **Cerrar Sesión (Logout)**, limpiando la memoria volátil y regresando al usuario a la pantalla de autenticación.

### RF-02: Gestión del Catálogo de Imágenes (Biblioteca)
* **Descripción:** El usuario debe poder registrar nuevas imágenes en su espacio personal de almacenamiento.
* **Comportamiento:** El sistema proveerá un mecanismo para ingresar imágenes asignándoles una URL de origen (`src`), una fecha de captura o subida automática, y un destino inicial de organización.

### RF-03: Gestión de Álbumes Dinámicos
* **Descripción:** El sistema debe permitir la categorización estructurada de las imágenes mediante álbumes.
* **Comportamiento:**
  * El usuario podrá crear nuevos álbumes personalizados con nombres únicos a través de la función *New Album*.
  * El formulario de subida de imágenes debe actualizar dinámicamente sus opciones de destino para permitir asignar una imagen directamente a un álbum creado.
  * Se debe incluir la funcionalidad de eliminar álbumes específicos de la base de datos local.

### RF-04: Visor de Imágenes Avanzado (Modal Interactivo)
* **Descripción:** Al hacer clic sobre cualquier miniatura de la galería, se debe desplegar una vista detallada en alta resolución.
* **Comportamiento:**
  * El visor debe contar con botones de navegación lateral (anterior ❮ y siguiente ❯) para desplazarse por la colección activa.
  * Debe incorporar soporte de navegación mediante el teclado (Flecha Izquierda y Flecha Derecha).
  * Debe incluir una barra de herramientas flotante (*Action Bar*) que permita cambiar la foto de perfil del usuario, asignar la foto a un álbum diferente, descargar la imagen o eliminarla definitivamente del almacenamiento.

---

## 3. Requerimientos No Funcionales (RNF)

### RNF-01: Arquitectura de Software Modular (Módulos ES6)
* **Descripción:** El código JavaScript no debe ser monolítico. Debe segmentarse estrictamente bajo el principio de separación de responsabilidades.
* **Componentes Exigidos:**
  * **Capa de Persistencia (`services/api.js`):** Encargada única y exclusivamente de la lectura y escritura cruda en el `LocalStorage` del navegador bajo la clave única `ultraGalleryData`. No tiene permitido interactuar con el DOM.
  * **Capa de Gestión de Estado (`store/state.js`):** Actúa como la *Fuente Única de Verdad (Single Source of Truth)*. Almacena en memoria el usuario actual, la caché de fotos y controla las mutaciones lógicas de datos (login, logout, borrado) antes de invocar la persistencia.
  * **Capa de Control e Interfaz (`app.js`):** Es el orquestador que interactúa con el HTML mediante `type="module"`. Captura eventos del usuario, lee los datos del estado y manipula dinámicamente el DOM para renderizar la interfaz.

### RNF-02: Diseño de Interfaz de Usuario Avanzado (UI/UX)
* **Estética:** Aplicar la tendencia de diseño **Glassmorphism**, utilizando fondos translúcidos, bordes sutiles de un 8% de opacidad blanca (`rgba(255,255,255,0.08)`) y desenfoque de capa avanzado mediante la propiedad `backdrop-filter: blur()`.
* **Rendimiento Visual:** El fondo de la aplicación debe contar con círculos vectoriales difuminados de gran tamaño que ejecuten animaciones fluidas mediante transformaciones CSS aceleradas por hardware para evitar retrasos (*lag*).

### RNF-03: Adaptabilidad y Responsividad (Responsive Design)
* **Layouts:** La cuadrícula de la galería debe construirse de forma adaptable utilizando layouts modernos de CSS (CSS Grid y Flexbox).
* **Media Queries:** El diseño debe ajustarse perfectamente de manera fluida entre dispositivos móviles compactos, pantallas de tabletas y monitores de escritorio de alta resolución.

### RNF-04: Persistencia Local de Datos
* **Persistencia:** Todos los datos de la aplicación (usuarios, contraseñas, imágenes subidas, asignaciones de álbumes) deben persistir localmente en el navegador a través de la API `LocalStorage`. Los datos se mantendrán almacenados incluso si el navegador se cierra o la página se recarga por completo.

### RNF-05: Restricción de Seguridad CORS y Despliegue
* **Ejecución:** Debido al uso obligatorio de módulos nativos de JavaScript (`import`/`export`), la aplicación no puede ejecutarse localmente abriendo el archivo mediante el protocolo de archivos del sistema (`file://`). El entorno requiere obligatoriamente un servidor HTTP local (como la extensión *Live Server* de VS Code o contenedores Node.js) para cumplir con las políticas CORS del navegador.