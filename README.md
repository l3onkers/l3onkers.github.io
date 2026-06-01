# l3onkers.github.io - Álvaro Escobar Portfolio

![Astro](https://img.shields.io/badge/Astro-6.x-FF5D01?style=flat-square&logo=astro&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.x-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)
![NodeJS](https://img.shields.io/badge/Node-24-339933?style=flat-square&logo=nodedotjs&logoColor=white)

Este repositorio contiene el código fuente de mi portfolio personal. Es un escaparate de mi experiencia como **Senior DevOps Expert & Solutions Architect**, mostrando los hitos profesionales, mis skills en arquitecturas Cloud (AWS, Azure) y la filosofía GitOps.

## 🚀 Stack Tecnológico

El proyecto ha sido migrado de Jekyll/Ruby a un ecosistema web moderno y de altísimo rendimiento:

- **Framework**: [Astro 6](https://astro.build/) (Para generación de sitios estáticos ultrarrápidos).
- **Estilos**: [Tailwind CSS](https://tailwindcss.com/) (Animaciones fluidas y diseño adaptativo).
- **Lógica**: TypeScript y JavaScript.
- **Multilingüe**: Soporte nativo de i18n (Inglés/Español).

## ⚙️ Arquitectura CI/CD

Fiel a la cultura DevOps, todo el código base utiliza prácticas de **Integración y Despliegue Continuo**.
Cada vez que se realiza un *Push* o *Merge* en la rama `main`, una pipeline de **GitHub Actions** (`deploy.yml`):
1. Instala el runtime moderno (Node.js 24).
2. Resuelve dependencias y audita la seguridad del código.
3. Compila los artefactos estáticos de Astro.
4. Despliega automáticamente a la rama/entorno de **GitHub Pages**.

## 🛠️ Entorno de Desarrollo Local

Si deseas levantar el proyecto en tu máquina local:

1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/l3onkers/l3onkers.github.io.git
   cd l3onkers.github.io
   ```
2. **Instala las dependencias:**
   ```bash
   npm install --legacy-peer-deps
   ```
3. **Inicia el servidor de desarrollo:**
   ```bash
   npm run dev
   ```
   *El servidor se levantará por defecto en `http://localhost:4321` con recarga activa.*

## 📂 Estructura del Proyecto

```text
/
├── public/           # Assets estáticos (favicon, CV en PDF, imágenes de perfil)
├── src/
│   ├── components/   # Componentes modulares de la interfaz (Hero, Experience, Projects)
│   ├── icons/        # SVGs optimizados
│   ├── i18n/         # Diccionarios de internacionalización (ui.ts)
│   ├── layouts/      # Plantilla principal con metadatos y tipografía compartida
│   └── pages/        # Rutas de la web (índice en Astro)
├── .github/          # Pipelines de despliegue automatizado
└── package.json      # Configuración de dependencias y scripts NPM
```

## 🙏 Agradecimientos

El diseño visual, la disposición de los componentes y la identidad cromática base son una adaptación del excelente portfolio de código abierto creado por **[Midudev](https://github.com/midudev)**. ¡Gracias por aportar tanto a la comunidad de desarrollo!

---
*Casi todos los derechos reservados © Álvaro Escobar Borreguero.*
