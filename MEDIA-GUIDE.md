# 📁 Guía de Gestión de Contenido Media

Esta guía te ayudará a organizar y gestionar todo el contenido multimedia de tu sitio web personal.

## 🗂️ Estructura de Carpetas

```
assets/
├── images/
│   ├── profile/           # Fotos de perfil y personales
│   ├── projects/          # Screenshots y media de proyectos
│   ├── blog/             # Imágenes para artículos del blog
│   └── general/          # Imágenes generales del sitio
├── documents/            # PDFs y documentos descargables
├── css/                  # Archivos de estilos
└── js/                   # Archivos JavaScript
```

## 📸 Gestión de Imágenes

### Formatos Recomendados:
- **Fotos de perfil**: JPG/PNG (400x400px mínimo)
- **Screenshots de proyectos**: PNG (1200x800px recomendado)
- **Imágenes de blog**: JPG/PNG (800x450px para featured images)
- **Iconos**: SVG o PNG (64x64px, 128x128px)

### Nombres de Archivo:
- Usa nombres descriptivos en inglés
- Sin espacios (usa guiones: `-`)
- Incluye dimensiones si es relevante
- Ejemplos:
  - `profile-photo-400x400.jpg`
  - `project-ecommerce-screenshot-1200x800.png`
  - `blog-featured-desarrollo-web-800x450.jpg`

## 🖼️ Optimización de Imágenes

### Herramientas Recomendadas:
1. **TinyPNG** (tinypng.com) - Compresión automática
2. **ImageOptim** - App para Mac
3. **Squoosh** (squoosh.app) - Web app de Google
4. **GIMP/Photoshop** - Edición avanzada

### Configuración de Calidad:
- **JPG**: Calidad 80-90% para fotos
- **PNG**: Para imágenes con transparencia
- **WebP**: Formato moderno (cuando sea compatible)

## 📄 Documentos

### Tipos de Documentos:
- CV en PDF (`cv-alvaro-escobar-2025.pdf`)
- Portfolio PDF (`portfolio-alvaro-escobar.pdf`)
- Certificaciones (`cert-aws-solutions-architect.pdf`)

### Buenas Prácticas:
- Máximo 5MB por archivo
- Nombres descriptivos con fecha
- Versiones en inglés y español si es necesario

## 🎨 Assets para Proyectos

### Para cada proyecto incluye:
1. **Screenshot principal** (1200x800px)
2. **Logo/icono** del proyecto (256x256px)
3. **Capturas adicionales** (800x600px)
4. **Mockups** si están disponibles

### Naming Convention:
```
project-[nombre]/
├── main-screenshot.png
├── logo.png
├── screenshot-dashboard.png
├── screenshot-mobile.png
└── mockup-devices.png
```

## 🔗 Referencias en el Código

### En HTML:
```html
<!-- Imagen optimizada con lazy loading -->
<img src="/assets/images/projects/ecommerce-main.png" 
     alt="E-commerce Platform Dashboard" 
     loading="lazy"
     width="800" 
     height="600">
```

### En Markdown (Posts):
```markdown
![Descripción de la imagen](/assets/images/blog/tutorial-screenshot.png)
```

### En Jekyll (Liquid):
```html
<img src="{{ '/assets/images/profile/avatar.jpg' | relative_url }}" 
     alt="{{ site.author.name }}">
```

## ⚡ Optimización para Performance

### Técnicas Implementadas:
1. **Lazy Loading**: `loading="lazy"` en imágenes
2. **Responsive Images**: Diferentes tamaños según dispositivo
3. **WebP con Fallback**: Formato moderno con compatibilidad
4. **CDN**: Considera usar Cloudinary o ImageKit

### Ejemplo de Imagen Responsiva:
```html
<picture>
  <source srcset="/assets/images/project-800w.webp 800w,
                  /assets/images/project-1200w.webp 1200w" 
          type="image/webp">
  <source srcset="/assets/images/project-800w.jpg 800w,
                  /assets/images/project-1200w.jpg 1200w" 
          type="image/jpeg">
  <img src="/assets/images/project-800w.jpg" 
       alt="Descripción del proyecto">
</picture>
```

## 📊 Monitoreo y Analytics

### Métricas a Seguir:
- Tiempo de carga de imágenes
- Tamaño total de la página
- Core Web Vitals (LCP, FID, CLS)

### Herramientas:
- Google PageSpeed Insights
- GTmetrix
- Lighthouse (DevTools)

## 🚀 Workflow Recomendado

### Para Nuevos Proyectos:
1. Crear carpeta en `/assets/images/projects/[nombre-proyecto]/`
2. Subir imágenes optimizadas
3. Actualizar `/proyectos.html` con las nuevas rutas
4. Probar en local antes de commit
5. Hacer commit con mensaje descriptivo

### Para Posts del Blog:
1. Crear imágenes en `/assets/images/blog/`
2. Referenciar en el front matter del post:
   ```yaml
   ---
   featured_image: /assets/images/blog/post-featured.jpg
   ---
   ```

### Para Updates del CV:
1. Subir nuevo PDF a `/assets/documents/`
2. Actualizar enlace en `/cv.html`
3. Mantener versión anterior por compatibilidad

## 🔧 Mantenimiento

### Tareas Regulares:
- [ ] Revisar tamaños de archivo mensualmente
- [ ] Optimizar imágenes nuevas antes de subir
- [ ] Limpiar archivos no utilizados
- [ ] Actualizar documentos con nueva información
- [ ] Verificar enlaces rotos a media

### Backup:
- Mantener copia local de todos los assets
- Usar Git LFS para archivos grandes (>10MB)
- Considerar storage externo para archivos muy pesados

## 📝 Checklist Pre-Deploy

Antes de hacer push al repositorio:

- [ ] Todas las imágenes están optimizadas
- [ ] Los nombres de archivo siguen la convención
- [ ] Las rutas en el código son correctas
- [ ] Se han probado en diferentes dispositivos
- [ ] Los alt texts están incluidos
- [ ] No hay archivos duplicados o innecesarios

---

**💡 Tip**: Mantén este documento actualizado conforme añadas nuevos tipos de contenido o cambies la estructura.
