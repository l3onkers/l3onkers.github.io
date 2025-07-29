---
layout: post
title: "Setting up a modern development environment in 2024"
date: 2024-01-20 14:30:00 +0100
categories: [development, tools]
tags: [vscode, git, node, web-development, productivity]
author: Álvaro Escobar
lang: en
---

A well-configured development environment is the foundation of any developer's productivity. In this article I'll guide you through setting up a modern and efficient environment for web development.

## Essential Tools

### 1. Code Editor: Visual Studio Code

VS Code has become the de facto standard for web development. These are my essential extensions:

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

### 2. Version Control: Git

Recommended basic configuration:

```bash
# Global configuration
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
git config --global init.defaultBranch main

# Useful aliases
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.cm commit
```

### 3. Node.js and package managers

I recommend using **nvm** to manage Node.js versions:

```bash
# Install nvm (Linux/macOS)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Install and use the latest LTS version
nvm install --lts
nvm use --lts
```

For Windows, use **nvm-windows** or **fnm**.

### 4. Package managers

I prefer **pnpm** for its efficiency:

```bash
# Install pnpm
npm install -g pnpm

# Use pnpm instead of npm
pnpm install
pnpm add react
pnpm run dev
```

## Terminal Setup

### 1. Modern terminal

**Recommendations by OS:**
- **Windows**: Windows Terminal + PowerShell 7
- **macOS**: iTerm2 or built-in Terminal
- **Linux**: Gnome Terminal, Konsole, or Alacritty

### 2. Oh My Zsh (macOS/Linux)

```bash
# Install Oh My Zsh
sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"

# Recommended plugins
plugins=(git node npm yarn docker)
```

### 3. Useful aliases

Add to your `.bashrc`, `.zshrc` or PowerShell profile:

```bash
# Navigation
alias ll="ls -la"
alias la="ls -la"
alias ..="cd .."
alias ...="cd ../.."

# Git shortcuts
alias gs="git status"
alias ga="git add"
alias gc="git commit"
alias gp="git push"
alias gl="git log --oneline"

# Development
alias serve="python -m http.server 8000"
alias dev="npm run dev"
alias build="npm run build"
```

## Docker for Development

### Basic Docker setup

```dockerfile
# Example Dockerfile for Node.js app
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000
CMD ["npm", "start"]
```

### Docker Compose for full stack

```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=development
    volumes:
      - .:/app
      - /app/node_modules

  database:
    image: postgres:14
    environment:
      POSTGRES_DB: myapp
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

## Database Tools

### 1. Database clients

- **PostgreSQL**: pgAdmin, DBeaver
- **MongoDB**: MongoDB Compass, Robo 3T
- **Redis**: RedisInsight
- **Multi-database**: DBeaver, TablePlus

### 2. Database containers for development

```bash
# PostgreSQL
docker run --name postgres-dev -e POSTGRES_PASSWORD=password -p 5432:5432 -d postgres:14

# MongoDB
docker run --name mongo-dev -p 27017:27017 -d mongo:5

# Redis
docker run --name redis-dev -p 6379:6379 -d redis:7
```

## Productivity Tools

### 1. Task automation

**Package.json scripts:**

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext .js,.jsx,.ts,.tsx",
    "lint:fix": "eslint . --ext .js,.jsx,.ts,.tsx --fix",
    "format": "prettier --write .",
    "type-check": "tsc --noEmit",
    "test": "vitest",
    "test:coverage": "vitest --coverage"
  }
}
```

### 2. Environment management

**.env files:**

```bash
# .env.local
DATABASE_URL=postgresql://user:password@localhost:5432/myapp
API_KEY=your-api-key
NODE_ENV=development
```

### 3. Code quality

**ESLint + Prettier configuration:**

```json
// .eslintrc.json
{
  "extends": [
    "eslint:recommended",
    "@typescript-eslint/recommended",
    "prettier"
  ],
  "plugins": ["@typescript-eslint"],
  "rules": {
    "no-console": "warn",
    "no-unused-vars": "error"
  }
}
```

## Browser Tools

### Essential browser extensions

1. **React Developer Tools**
2. **Vue.js devtools**
3. **Redux DevTools**
4. **Lighthouse**
5. **Web Developer**
6. **JSON Viewer**

## Continuous Integration

### GitHub Actions example

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run tests
      run: npm test
    
    - name: Build
      run: npm run build
```

## Final Tips

1. **Backup your configuration**: Keep your configs in a dotfiles repository
2. **Document your setup**: Create a README with installation steps
3. **Keep it updated**: Regularly update your tools and dependencies
4. **Automate repetitive tasks**: Use scripts and aliases
5. **Learn keyboard shortcuts**: Improve your efficiency

A good development environment is an investment in your productivity. Take time to configure it properly and adjust it to your workflow!

---

**What tools do you use in your development environment?** I'd love to know your recommendations in the comments or through [LinkedIn](https://www.linkedin.com/in/alvaro-escobar/).
