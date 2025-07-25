# Mi Sitio Web Personal

¡Bienvenido a mi sitio web personal! Este es un sitio web estático construido con Jekyll y alojado en GitHub Pages.

## 🌟 Características

- **Diseño minimalista y moderno**: Interfaz limpia y profesional
- **Modo oscuro/claro**: Selector dinámico de tema con persistencia local
- **Sección CV**: Currículum completo con experiencia, educación y habilidades
- **Blog integrado**: Sistema de blog con posts en Markdown
- **Responsive**: Optimizado para todos los dispositivos
- **SEO optimizado**: Meta tags y estructura semántica
- **Rápido**: Sitio estático con excelente rendimiento

## 🚀 Tecnologías utilizadas

- **Jekyll**: Generador de sitios estáticos
- **GitHub Pages**: Hosting gratuito
- **HTML5 & CSS3**: Estructura y estilos modernos
- **JavaScript ES6+**: Funcionalidad interactiva
- **Font Awesome**: Iconografía
- **Google Fonts**: Tipografía (Inter)

## 📁 Estructura del proyecto

```
.
├── _layouts/          # Plantillas de página
│   ├── default.html   # Layout principal
│   └── post.html      # Layout para posts del blog
├── _posts/            # Artículos del blog
├── assets/            # Recursos estáticos
│   ├── css/
│   │   └── style.css  # Estilos principales
│   └── js/
│       └── main.js    # JavaScript principal
├── _config.yml        # Configuración de Jekyll
├── index.html         # Página de inicio
├── cv.html           # Página del CV
├── blog.html         # Página del blog
├── Gemfile           # Dependencias de Ruby
└── README.md         # Este archivo
```

## 🛠️ Instalación y desarrollo local

### Prerrequisitos

- Ruby 2.7 o superior
- Bundler
- Git

### Configuración

1. **Clona el repositorio**:
   ```bash
   git clone https://github.com/l3onkers/bonkers.github.io.git
   cd bonkers.github.io
   ```

2. **Instala las dependencias**:
   ```bash
   bundle install
   ```

3. **Ejecuta el servidor local**:
   ```bash
   bundle exec jekyll serve
   ```

4. **Abre tu navegador** en `http://localhost:4000`

### Comandos útiles

```bash
# Servidor de desarrollo con recarga automática
bundle exec jekyll serve --livereload

# Construir el sitio para producción
bundle exec jekyll build

# Limpiar archivos generados
bundle exec jekyll clean
```

## ✏️ Personalización

### Información personal

Edita el archivo `_config.yml` para actualizar:

```yaml
title: Tu Nombre
email: tu.email@ejemplo.com
description: Tu descripción
github_username: tu-usuario
linkedin_username: tu-linkedin

author:
  name: Tu Nombre
  bio: Tu biografía
  location: Tu Ciudad, País
```

### Colores y tema

Modifica las variables CSS en `assets/css/style.css`:

```css
:root {
  --primary-color: #2563eb;  /* Color principal */
  --primary-hover: #1d4ed8;  /* Color hover */
  /* ... más variables */
}
```

### Contenido del CV

Edita `cv.html` para actualizar:
- Experiencia profesional
- Formación académica
- Habilidades técnicas
- Proyectos destacados
- Certificaciones
- Idiomas

## 📝 Escribir posts del blog

1. **Crea un nuevo archivo** en `_posts/` con el formato:
   ```
   YYYY-MM-DD-titulo-del-post.md
   ```

2. **Añade el front matter**:
   ```yaml
   ---
   layout: post
   title: "Título del post"
   date: 2024-01-15 10:00:00 +0100
   categories: [categoria1, categoria2]
   tags: [tag1, tag2, tag3]
   author: Tu Nombre
   ---
   ```

3. **Escribe el contenido** en Markdown

### Ejemplo de post

```markdown
---
layout: post
title: "Mi primer post"
date: 2024-01-15 10:00:00 +0100
categories: [desarrollo]
tags: [javascript, tutorial]
author: Tu Nombre
---

# Mi primer post

Este es el contenido de mi post...

## Código de ejemplo

```javascript
console.log('¡Hola mundo!');
```

## 🎨 Características del diseño

### Modo oscuro/claro
- Selector dinámico en la navegación
- Persistencia en localStorage
- Transiciones suaves entre temas
- Variables CSS para fácil personalización

### Responsive
- Mobile-first approach
- Breakpoints optimizados
- Navegación móvil con hamburger menu
- Imágenes adaptativas

### Accesibilidad
- Contraste adecuado en ambos temas
- Navegación por teclado
- Etiquetas ARIA apropiadas
- Estructura semántica HTML5

## 🚀 Despliegue

El sitio se despliega automáticamente en GitHub Pages cuando haces push a la rama `main`.

### Configuración de GitHub Pages

1. Ve a Settings → Pages en tu repositorio
2. Selecciona "Deploy from a branch"
3. Elige la rama `main` y carpeta `/ (root)`
4. Tu sitio estará disponible en `https://l3onkers.github.io/bonkers.github.io/`

### Dominio personalizado (opcional)

1. Añade un archivo `CNAME` con tu dominio:
   ```
   tu-dominio.com
   ```

2. Configura los DNS de tu dominio:
   ```
   A    @    185.199.108.153
   A    @    185.199.109.153
   A    @    185.199.110.153
   A    @    185.199.111.153
   ```

## 📊 SEO y Analytics

### SEO incluido
- Meta tags automáticos
- Open Graph tags
- Sitemap XML generado automáticamente
- Feed RSS para el blog
- URLs amigables

### Google Analytics (opcional)

Añade tu ID de Google Analytics en `_config.yml`:

```yaml
google_analytics: G-XXXXXXXXXX
```

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-caracteristica`)
3. Commit tus cambios (`git commit -m 'Añadir nueva característica'`)
4. Push a la rama (`git push origin feature/nueva-caracteristica`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🙏 Agradecimientos

- [Jekyll](https://jekyllrb.com/) por el excelente generador de sitios estáticos
- [GitHub Pages](https://pages.github.com/) por el hosting gratuito
- [Font Awesome](https://fontawesome.com/) por los iconos
- [Google Fonts](https://fonts.google.com/) por la tipografía

---

¿Tienes preguntas o sugerencias? ¡No dudes en abrir un issue o contactarme!

**Sitio web**: [https://l3onkers.github.io/bonkers.github.io/](https://l3onkers.github.io/bonkers.github.io/)  
**Email**: [tu.email@ejemplo.com](mailto:tu.email@ejemplo.com)  
**LinkedIn**: [Tu perfil](https://linkedin.com/in/tu-linkedin)
