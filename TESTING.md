# 🧪 Testing Guide

Este proyecto incluye una suite completa de tests automatizados para garantizar la calidad y funcionamiento del sitio web.

## 🚀 CI/CD Pipeline

### GitHub Actions Workflow: `ci-cd.yml`

Un workflow unificado que ejecuta:

**Para Pull Requests:**
- ⚡ Validación rápida (YAML, JS, Jekyll config)
- 🔨 Tests de build (desarrollo y producción)
- 📝 Validación de contenido y traducciones

**Para Push a main:**
- Todo lo anterior +
- 🏭 Build de producción
- 🚀 Deploy a GitHub Pages
- 🌐 Validación post-deployment

### Flujo de ejecución:
1. **Setup** → Ruby + Node.js + dependencias
2. **Quick Tests** → Validación rápida de sintaxis
3. **Build Tests** → Jekyll build en dev y prod
4. **Content Tests** → Validación de traducciones
5. **Deploy** → Solo en push a main
6. **Post-deploy** → Tests de URLs en vivo

## 🧪 Tests Locales

### 1. Tests de URLs Rápidos
Tests básicos que verifican accesibilidad de páginas y códigos HTTP correctos.

**PowerShell (Windows):**
```powershell
.\scripts\test.ps1
```

**Bash (Linux/macOS):**
```bash
chmod +x scripts/test.sh
./scripts/test.sh
```

**Ruby:**
```ruby
ruby scripts/test.rb
```

### 2. Tests de Integración Completos (RSpec)
Tests comprehensivos usando automatización de navegador para testear funcionalidad, elementos UI e interacciones de usuario.

**Prerrequisitos:**
- Ruby con Bundler
- Chrome o Chromium browser
- ChromeDriver (gestionado automáticamente por webdrivers gem)

**Setup:**
```bash
bundle install
```

**Ejecutar tests:**
```bash
bundle exec rspec spec/
```

## 🏗️ Tests de Build

### Jekyll Build Local
```bash
# Development build
JEKYLL_ENV=development bundle exec jekyll build

# Production build
JEKYLL_ENV=production bundle exec jekyll build

# Serve locally
bundle exec jekyll serve
```

### Validación de Configuración
```bash
# Check Jekyll configuration
bundle exec jekyll doctor

# Test YAML syntax
ruby -e "require 'yaml'; YAML.load_file('_config.yml')"
```

## 📊 Estructura de Tests

```
spec/
├── spec_helper.rb          # Configuración de tests y helpers
└── site_spec.rb           # Suite principal de tests

scripts/
├── test.ps1               # Tests PowerShell
├── test.sh                # Tests Bash
└── test.rb                # Tests Ruby

.github/workflows/
└── ci-cd.yml              # Pipeline CI/CD unificado
```

## 🎯 Cobertura de Tests

### ✅ Tests Automatizados
- **Sintaxis**: YAML, JavaScript, Jekyll config
- **Build**: Jekyll en modo desarrollo y producción
- **Contenido**: Validación de traducciones de posts
- **Accesibilidad**: Páginas principales y navegación
- **Performance**: Verificación de tamaños de archivos
- **Deployment**: URLs en vivo post-deployment

### 🔍 Tests Manuales Recomendados
- Responsive design en diferentes dispositivos
- Funcionalidad de formularios de contacto
- Enlaces externos y social media
- SEO y meta tags
- Velocidad de carga en diferentes conexiones

## 🚨 Troubleshooting

### Build Errors
```bash
# Clear Jekyll cache
bundle exec jekyll clean

# Regenerate site
bundle exec jekyll build --verbose

# Check for bundle issues
bundle doctor
```

### Test Failures
```bash
# Update test dependencies
bundle update

# Run single test file
bundle exec rspec spec/site_spec.rb

# Run with verbose output
bundle exec rspec spec/ --format documentation
```

## 📝 Añadir Nuevos Tests

### Para páginas nuevas:
1. Añadir URL a `scripts/test.rb`
2. Añadir test de navegación a `spec/site_spec.rb`
3. Actualizar lista de archivos requeridos en `ci-cd.yml`

### Para funcionalidad nueva:
1. Crear test RSpec en `spec/site_spec.rb`
2. Verificar que los tests pasen localmente
3. Commit y push para validar en CI/CD

## 🎉 Tests en Producción

El pipeline automáticamente ejecuta tests post-deployment para verificar:
- ✅ URLs principales responden correctamente
- ✅ Assets (CSS/JS) se cargan sin errores
- ✅ Páginas en ambos idiomas funcionan
- ✅ Navegación entre secciones

Los resultados están disponibles en la pestaña **Actions** de GitHub.
