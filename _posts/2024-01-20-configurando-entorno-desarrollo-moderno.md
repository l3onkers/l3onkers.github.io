---
layout: post
title: "Configurando un entorno de desarrollo moderno en 2024"
date: 2024-01-20 14:30:00 +0100
categories: [desarrollo, herramientas]
tags: [vscode, git, node, desarrollo-web, productividad]
author: Tu Nombre
---

Un entorno de desarrollo bien configurado es la base de la productividad de cualquier desarrollador. En este artículo te guiaré a través de la configuración de un entorno moderno y eficiente para desarrollo web.

## Herramientas esenciales

### 1. Editor de código: Visual Studio Code

VS Code se ha convertido en el estándar de facto para desarrollo web. Estas son mis extensiones imprescindibles:

```json
{
  "recommendations": [
    "ms-vscode.vscode-typescript-next",
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "ms-vscode.vscode-eslint",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense"
  ]
}
```

### 2. Control de versiones: Git

Configuración básica recomendada:

```bash
# Configuración global
git config --global user.name "Tu Nombre"
git config --global user.email "tu.email@ejemplo.com"
git config --global init.defaultBranch main

# Aliases útiles
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.cm commit
```

### 3. Node.js y gestores de paquetes

Recomiendo usar **nvm** para gestionar versiones de Node.js:

```bash
# Instalar la última versión LTS
nvm install --lts
nvm use --lts

# Verificar instalación
node --version
npm --version
```

## Configuración del workspace

### Estructura de proyecto recomendada

```
mi-proyecto/
├── .vscode/
│   ├── settings.json
│   ├── extensions.json
│   └── launch.json
├── src/
│   ├── components/
│   ├── utils/
│   └── styles/
├── public/
├── .gitignore
├── package.json
└── README.md
```

### Configuración de VS Code por proyecto

Archivo `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "emmet.includeLanguages": {
    "javascript": "javascriptreact"
  }
}
```

## Herramientas de calidad de código

### ESLint + Prettier

Configuración básica en `package.json`:

```json
{
  "scripts": {
    "lint": "eslint src --ext .js,.jsx,.ts,.tsx",
    "lint:fix": "eslint src --ext .js,.jsx,.ts,.tsx --fix",
    "format": "prettier --write \"src/**/*.{js,jsx,ts,tsx,json,css,md}\""
  },
  "devDependencies": {
    "eslint": "^8.0.0",
    "prettier": "^3.0.0",
    "@typescript-eslint/eslint-plugin": "^6.0.0"
  }
}
```

### Husky para Git hooks

```bash
# Instalar Husky
npm install --save-dev husky

# Configurar pre-commit hook
npx husky add .husky/pre-commit "npm run lint && npm run format"
```

## Terminal y productividad

### Oh My Zsh (macOS/Linux)

```bash
# Instalar Oh My Zsh
sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"

# Plugins recomendados
plugins=(git node npm yarn docker)
```

### PowerShell (Windows)

```powershell
# Instalar Oh My Posh
Install-Module oh-my-posh -Scope CurrentUser
```

## Debugging y testing

### Configuración de debugging en VS Code

Archivo `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug React App",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/node_modules/.bin/react-scripts",
      "args": ["start"],
      "env": {
        "BROWSER": "none"
      }
    }
  ]
}
```

## Consejos adicionales

### 1. Usa un gestor de dotfiles

Mantén tus configuraciones sincronizadas entre diferentes máquinas:

```bash
# Crear repositorio de dotfiles
mkdir ~/dotfiles
cd ~/dotfiles
git init

# Agregar configuraciones
cp ~/.gitconfig .
cp ~/.zshrc .
```

### 2. Automatiza tareas repetitivas

Crea scripts para tareas comunes:

```json
{
  "scripts": {
    "dev": "concurrently \"npm run start\" \"npm run test:watch\"",
    "build:prod": "npm run lint && npm run test && npm run build",
    "deploy": "npm run build:prod && gh-pages -d build"
  }
}
```

### 3. Mantén todo actualizado

```bash
# Actualizar dependencias
npm update
npm audit fix

# Verificar versiones obsoletas
npm outdated
```

## Conclusión

Un entorno bien configurado te ahorrará horas de trabajo y reducirá significativamente los errores. La inversión inicial en configuración se paga rápidamente en productividad.

¿Qué herramientas son imprescindibles en tu flujo de trabajo? ¡Comparte tus recomendaciones en los comentarios!

---

*¿Te ha resultado útil esta guía? ¡Sígueme para más contenido sobre desarrollo web y productividad!*
