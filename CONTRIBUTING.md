# Guía de Contribución

¡Gracias por tu interés en contribuir a mi sitio web personal! Aunque este es principalmente un proyecto personal, agradezco las contribuciones que mejoren la experiencia, corrijan errores o añadan funcionalidades útiles.

## 🚀 Cómo Contribuir

### Reportar Bugs
1. Busca en los [issues existentes](https://github.com/l3onkers/l3onkers.github.io/issues) para evitar duplicados
2. Usa el [template de bug report](.github/ISSUE_TEMPLATE/bug_report.yml)
3. Incluye información detallada sobre el navegador, dispositivo y pasos para reproducir

### Sugerir Mejoras
1. Revisa las [funcionalidades existentes](https://github.com/l3onkers/l3onkers.github.io/issues?q=label%3Aenhancement)
2. Usa el [template de feature request](.github/ISSUE_TEMPLATE/feature_request.yml)
3. Explica claramente el problema que resuelve y el valor que añade

### Pull Requests
1. **Fork** el repositorio
2. **Crea una rama** descriptiva: `git checkout -b feature/nueva-funcionalidad`
3. **Realiza cambios** siguiendo los estándares del proyecto
4. **Prueba** tus cambios localmente
5. **Commit** con mensajes descriptivos
6. **Push** a tu fork: `git push origin feature/nueva-funcionalidad`
7. **Abre un Pull Request** con descripción detallada

## 📋 Estándares de Desarrollo

### Estructura del Proyecto
```
├── _layouts/          # Plantillas Jekyll
├── _posts/           # Posts del blog (organizado por idioma)
├── _i18n/           # Archivos de traducción
├── assets/          # CSS, JS, imágenes, documentos
├── en/             # Páginas en inglés
└── *.html          # Páginas principales en español
```

### Convenciones de Código

**HTML/Liquid:**
- Usar indentación de 4 espacios
- Incluir atributos `data-translate` para textos multiidioma
- Mantener estructura semántica

**CSS:**
- Usar variables CSS para colores y spacing
- Seguir metodología BEM cuando sea apropiado
- Mantener compatibilidad con modo oscuro/claro

**JavaScript:**
- ES6+ features permitidas
- Comentarios descriptivos para funciones complejas
- Evitar dependencias externas innecesarias

### Multiidioma
- **Español**: Idioma por defecto en raíz del sitio
- **Inglés**: Páginas en directorio `/en/`
- **Traducciones**: Usar archivos `_i18n/es.yml` y `_i18n/en.yml`
- **URLs**: Mantener estructura coherente entre idiomas

### Commits
Usar [Conventional Commits](https://www.conventionalcommits.org/):
```
feat: añadir nueva funcionalidad
fix: corregir bug específico
docs: actualizar documentación
style: cambios de formato/estilo
refactor: refactorización de código
test: añadir o modificar tests
chore: tareas de mantenimiento
```

## 🧪 Testing Local

### Requisitos Previos
- Ruby 2.5+
- Jekyll 4.0+
- Bundler

### Configuración Local
```bash
# Clonar el repositorio
git clone https://github.com/l3onkers/l3onkers.github.io.git
cd l3onkers.github.io

# Instalar dependencias
bundle install

# Ejecutar servidor local
bundle exec jekyll serve --livereload

# Acceder a http://localhost:4000
```

### Verificaciones Antes del PR
- [ ] El sitio se construye sin errores
- [ ] Las páginas cargan correctamente en ambos idiomas
- [ ] El diseño es responsive (móvil/desktop)
- [ ] El modo oscuro/claro funciona correctamente
- [ ] No hay errores de JavaScript en consola
- [ ] Las traducciones están completas

## 🎯 Áreas de Contribución Prioritarias

### Alta Prioridad
- **Accesibilidad**: Mejoras de a11y
- **Performance**: Optimizaciones de velocidad
- **SEO**: Mejoras técnicas de posicionamiento
- **Testing**: Automatización de pruebas

### Media Prioridad
- **Funcionalidades**: Nuevas secciones o características
- **Diseño**: Mejoras visuales y UX
- **Contenido**: Correción de textos o información

### Baja Prioridad
- **Experimentales**: Funcionalidades no críticas
- **Optimizaciones**: Refactoring de código

## 📞 Contacto

- **Email**: contacto@alvaro-escobar.dev
- **LinkedIn**: [alvaro-escobar](https://www.linkedin.com/in/alvaro-escobar/)
- **GitHub Issues**: Para discusiones técnicas

## 📄 Licencia

Al contribuir a este proyecto, aceptas que tus contribuciones serán licenciadas bajo la [Licencia MIT](LICENSE).

---

¡Gracias por ayudar a mejorar este proyecto! 🙏
