# ☁️ Gallery Pro — Brief 09
### Desarrollo Web Frontend Esencial — Proyecto de Portafolio Avanzado

![Estatus del Proyecto](https://img.shields.io/badge/Proyecto-Completado-brightgreen)
![Stack Utilizado](https://img.shields.io/badge/Stack-HTML5%20%7C%20CSS3%20%7C%20JS%20Vanilla-blue)
![Persistencia](https://img.shields.io/badge/Persistencia-LocalStorage%20Multi--user-orange)

Una aplicación web nativa de gestión y almacenamiento de imágenes en la nube inspirada en la interfaz de usuario y flujos de trabajo de **Windows Gallery** y **OneDrive**. El sistema implementa una estética de diseño de vanguardia basada en **Glassmorphism** (cristal esmerilado) con fondos dinámicos y difuminados vectoriales de alto rendimiento, respetando los criterios exigidos en la **Fase 1** y **Fase 2** del entregable.

---

## 👥 Integrantes del Grupo
- **Gleiker Altuve** — Control de Versiones, Gestión de Repositorios y Maquetación Semántica
- **Nomar Arroyo** — Desarrollador Frontend Líder, Arquitectura del DOM y Lógica de Interactividad

---

## 🏗️ Arquitectura y Flujo del Sistema

La aplicación está diseñada bajo el principio de separación de responsabilidades en tres archivos independientes (`index.html`, `style.css`, `app.js`), asegurando un DOM semántico, estilos reutilizables mediante variables CSS nativas y un estado lógico centralizado.

### 1. Sistema de Autenticación y Persistencia Multiusuario
A diferencia de las soluciones genéricas, este sistema implementa un entorno aislado por usuario utilizando la API de `Web Storage`:
- Al ingresar un nombre de usuario en la ventana central de login, el script inicializa un objeto exclusivo en el espacio local.
- **Cierre de Sesión Seguro:** Al cerrar sesión, los estados del DOM se limpian de inmediato, pero la información permanece blindada en el almacenamiento del navegador, lo que permite que múltiples usuarios compartan el navegador sin mezclar sus fotos ni sus colecciones personalizadas.

### 2. Clasificación Inteligente de "Moments" (Algoritmo de Filtrado)
La pestaña **Moments** se alimenta de un parser automatizado en JavaScript. Al subir imágenes en lote mediante el control de carga:
- El sistema analiza los nombres de archivo mediante expresiones y coincidencias de cadenas.
- Si el archivo contiene palabras clave específicas como `familia`, `vacaciones`, el objeto se clasifica automáticamente con la bandera `isMoment: true`.
- Posteriormente, estas imágenes se renderizan de forma cronológica separadas por separadores dinámicos que se adaptan según el día de la carga.

### 3. Animación Completa de Álbumes (Carpetas)
En la sección **Albums**, las carpetas se generan en tiempo real de acuerdo a la demanda del usuario. Al hacer **Doble Clic** en cualquier cromo de álbum, se dispara una transición de escala que emula la apertura de directorios nativos del sistema operativo, limpiando el contenedor y poblándolo exclusivamente con las imágenes asociadas a ese identificador de carpeta.

---

## 🖥️ Guía de Atajos de Teclado (Navegación Lightbox)

El visor de imágenes a pantalla completa incluye un sistema reactivo de eventos globales que escucha el periférico del teclado de manera inteligente (evitando el scroll accidental de la página):

| Tecla | Acción en el Visor | Impacto UX |
| :---: | :--- | :--- |
| `➡️` ArrowRight | Avanza a la siguiente foto | Carrusel circular continuo infinito |
| `⬅️` ArrowLeft | Retrocede a la foto anterior | Carrusel circular continuo infinito |
| `ESC` Escape | Cierra el lightbox | Oculta el modal y el panel inferior (*Action Bar*) |

---

## 🛠️ Especificaciones Técnicas y Cumplimiento del Brief

### Fase 1: Maquetación y Visor Base
- **Grid de Flexibilidad Fluida:** Diseñado con CSS Grid `repeat(auto-fill, minmax(240px, 1fr))` para una adaptabilidad perfecta en pantallas móviles, tablets y monitores ultra-wide.
- **Control de Propagación:** El lightbox detiene los eventos burbuja (`event.stopPropagation()`) en el contenedor central, permitiendo que la foto se cierre al hacer clic exactamente en las zonas exteriores vacías.

### Fase 2: Interactividad Avanzada y Rendimiento
- **Transiciones Limpias:** Aperturas moduladas con curvas de tiempo Bézier (`cubic-bezier(0.34, 1.56, 0.64, 1)`) que proporcionan un efecto elástico fluido al desplegar el modal sin requerir frameworks de animación pesados.
- **Contador Dinámico de Posición:** Ubicado en la zona del visor, muestra con exactitud el indicador matemático de posición en formato `X / Y` (ej: `2 / 8`) actualizándose sincrónicamente con el teclado o los botones navegacionales.

---

## 🚀 Pasos para Probar el Proyecto de Forma Local

1. **Clonar el repositorio o descargar el código:**
   ```bash
   git clone [https://github.com/tu-usuario/tu-repositorio.git](https://github.com/tu-usuario/tu-repositorio.git)
2. **Abrir el proyecto: Navega hasta la carpeta raíz y ejecuta el archivo index.html directamente en tu navegador habitual, o levanta un servidor local como la extensión Live Server de VS Code.

3. **Flujo de Prueba Sugerido:
-- **Inicia sesión con tu nombre en la ventana esmerilada.
-- **Crea un álbum con el botón New Album.
-- **Sube un par de imágenes utilizando el selector de destino superior para enviarlas a tu nueva carpeta o a la biblioteca general.
-- **Haz clic en cualquier imagen, navega con las flechas de tu teclado y experimenta el cierre rápido con la tecla Escape.

   
