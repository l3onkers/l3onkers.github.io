// Theme Toggle Functionality & Enhanced Animations
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    // Load saved theme or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    // Load banner state
    const bannerHidden = localStorage.getItem('construction-banner-hidden');
    if (bannerHidden === 'true') {
        const banner = document.getElementById('construction-banner');
        if (banner) {
            banner.classList.add('hidden');
        }
    }
    
    // Enhanced theme toggle with animation
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // Add transition class
        document.body.classList.add('theme-transitioning');
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
        
        // Remove transition class after animation
        setTimeout(() => {
            document.body.classList.remove('theme-transitioning');
        }, 500);
    });
    
    // Enhanced theme icon update with rotation
    function updateThemeIcon(theme) {
        themeIcon.style.transform = 'rotate(180deg)';
        setTimeout(() => {
            if (theme === 'dark') {
                themeIcon.className = 'fa-solid fa-moon';
            } else {
                themeIcon.className = 'fa-solid fa-sun';
            }
            themeIcon.style.transform = 'rotate(0deg)';
        }, 150);
    }
    
    // Mobile navigation toggle
    navToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
    
    // Close mobile nav when clicking on a link
    const navLinksItems = navLinks.querySelectorAll('a');
    navLinksItems.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add scroll effect to header
    let lastScrollTop = 0;
    const header = document.querySelector('.site-header');
    
    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Add loading animation for images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
    });
    
    // Copy code blocks functionality
    const codeBlocks = document.querySelectorAll('pre code');
    codeBlocks.forEach(block => {
        const button = document.createElement('button');
        button.className = 'copy-button';
        button.innerHTML = '<i class="fas fa-copy"></i>';
        button.title = 'Copiar código';
        
        const pre = block.parentElement;
        pre.style.position = 'relative';
        pre.appendChild(button);
        
        button.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(block.textContent);
                button.innerHTML = '<i class="fas fa-check"></i>';
                button.style.color = '#10b981';
                
                setTimeout(() => {
                    button.innerHTML = '<i class="fas fa-copy"></i>';
                    button.style.color = '';
                }, 2000);
            } catch (err) {
                console.error('Error al copiar:', err);
            }
        });
    });
    
    // Add reading time estimation for blog posts
    const postContent = document.querySelector('.post-content');
    if (postContent) {
        const text = postContent.textContent;
        const wordsPerMinute = 200;
        const words = text.trim().split(/\s+/).length;
        const readingTime = Math.ceil(words / wordsPerMinute);
        
        const readingTimeElement = document.createElement('span');
        readingTimeElement.className = 'reading-time';
        readingTimeElement.innerHTML = `<i class="fas fa-clock"></i> ${readingTime} min de lectura`;
        
        const postMeta = document.querySelector('.post-meta');
        if (postMeta) {
            postMeta.appendChild(readingTimeElement);
        }
    }
    
    // Parallax effect on scroll
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.hero');
        if (parallax) {
            const speed = scrolled * 0.5;
            parallax.style.transform = `translateY(${speed}px)`;
        }
    });
    
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.card, .project-card, .cv-section, .skill-tag').forEach(el => {
        observer.observe(el);
    });
    
    // Enhanced button ripple effect
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Cursor trail effect (optional, subtle)
    let mouseX = 0;
    let mouseY = 0;
    let trail = [];
    
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        trail.push({x: mouseX, y: mouseY, opacity: 1});
        if (trail.length > 20) {
            trail.shift();
        }
    });
    
    // Add loading class removal after page load
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });
    
    // Add fade-in animation to cards
    const cards = document.querySelectorAll('.card, .project-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('fade-in-up');
    });
    
    // Language selector functionality
    const languageToggle = document.getElementById('language-toggle');
    const languageDropdown = document.getElementById('language-dropdown');
    const currentLangSpan = document.getElementById('current-lang');
    const languageOptions = document.querySelectorAll('.language-option');
    
    // Load saved language or default to Spanish
    const savedLanguage = localStorage.getItem('language') || 'es';
    setLanguage(savedLanguage);
    
    // Language toggle event listener
    if (languageToggle) {
        languageToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            languageDropdown.classList.toggle('show');
            languageToggle.classList.toggle('active');
        });
    }
    
    // Language option event listeners
    languageOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const selectedLang = this.getAttribute('data-lang');
            setLanguage(selectedLang);
            
            // Close dropdown
            languageDropdown.classList.remove('show');
            languageToggle.classList.remove('active');
            
            // Show language change notification
            showLanguageNotification(selectedLang);
        });
    });
    
    // Close language dropdown when clicking outside
    document.addEventListener('click', function() {
        languageDropdown.classList.remove('show');
        languageToggle.classList.remove('active');
    });
    
    // Set language function
    function setLanguage(lang) {
        localStorage.setItem('language', lang);
        currentLangSpan.textContent = lang.toUpperCase();
        
        // Update active state
        languageOptions.forEach(option => {
            option.classList.remove('active');
            if (option.getAttribute('data-lang') === lang) {
                option.classList.add('active');
            }
        });
        
        // Apply translations
        applyTranslations(lang);
        
        // Redirect to appropriate language version if available
        redirectToLanguageVersion(lang);
    }
    
    // Redirect to language version
    function redirectToLanguageVersion(lang) {
        const currentPath = window.location.pathname;
        const baseUrl = window.location.origin;
        
        // Only redirect if we're changing to a different language
        const currentLang = getCurrentLanguageFromPath();
        if (currentLang === lang) return;
        
        // Page mapping between languages
        const pageMapping = {
            es: {
                '/proyectos': '/proyectos',
                '/cv': '/cv',
                '/blog': '/blog',
                '/': '/'
            },
            en: {
                '/proyectos': '/en/projects',
                '/cv': '/en/resume', 
                '/blog': '/en/blog',
                '/': '/en/',
                '/projects': '/en/projects',
                '/resume': '/en/resume'
            }
        };
        
        // Reverse mapping for English to Spanish
        const reverseMapping = {
            '/en/projects': '/proyectos',
            '/en/resume': '/cv',
            '/en/blog': '/blog',
            '/en/': '/'
        };
        
        // Special handling for blog posts
        if (currentPath.includes('/blog/')) {
            // For blog posts, redirect to the blog index page
            if (lang === 'en') {
                window.location.href = baseUrl + '/en/blog/';
            } else {
                window.location.href = baseUrl + '/blog/';
            }
            return;
        }
        
        // Handle page mapping
        if (lang === 'en') {
            // Going to English
            const mappedPath = pageMapping.en[currentPath];
            if (mappedPath) {
                window.location.href = baseUrl + mappedPath;
            } else if (!currentPath.startsWith('/en/')) {
                // Fallback: add /en prefix for unmapped pages
                let newPath = '/en' + currentPath;
                if (currentPath === '/' || currentPath === '/index.html') {
                    newPath = '/en/';
                }
                window.location.href = baseUrl + newPath;
            }
        } else {
            // Going to Spanish
            const mappedPath = reverseMapping[currentPath];
            if (mappedPath) {
                window.location.href = baseUrl + mappedPath;
            } else if (currentPath.startsWith('/en/')) {
                // Fallback: remove /en prefix for unmapped pages
                let newPath = currentPath.replace('/en', '');
                if (!newPath || newPath === '/') {
                    newPath = '/';
                }
                window.location.href = baseUrl + newPath;
            }
        }
    }
    
    // Get current language from URL path
    function getCurrentLanguageFromPath() {
        const path = window.location.pathname;
        if (path.startsWith('/en/')) {
            return 'en';
        }
        return 'es';
    }
    
    // Apply translations function
    function applyTranslations(lang) {
        // Advanced translations using nested keys
        const translations = {
            es: {
                'nav.home': 'Inicio',
                'nav.cv': 'CV',
                'nav.projects': 'Proyectos',
                'nav.blog': 'Blog',
                'nav.contact': 'Contacto',
                'home.hero.greeting': '¡Hola! Soy',
                'home.hero.tagline': 'Desarrollador Full Stack especializado en tecnologías web modernas. Apasionado por crear soluciones innovadoras y compartir conocimiento con la comunidad.',
                'home.sections.development.title': 'Desarrollo',
                'home.sections.development.description': 'Especializado en tecnologías web modernas, creando aplicaciones escalables y experiencias de usuario excepcionales.',
                'home.sections.blog.title': 'Blog',
                'home.sections.blog.description': 'Comparto conocimientos sobre desarrollo, tecnología y mejores prácticas a través de artículos técnicos.',
                'home.sections.latest_posts': 'Últimas Publicaciones',
                'home.sections.all_articles': 'Ver todos los artículos',
                'buttons.read_more': 'Leer más →',
                'buttons.see_projects': 'Ver proyectos →',
                'buttons.see_cv': 'Ver mi CV',
                'buttons.read_blog': 'Leer mi Blog',
                'buttons.contact_email': 'Contactar por Email',
                'buttons.download_pdf': 'Descargar PDF',
                'buttons.demo': 'Demo',
                'buttons.code': 'Código',
                'buttons.connect_linkedin': 'Conectar en LinkedIn',
                'buttons.see_github': 'Ver en GitHub',
                'cv.title': 'Currículum Vitae',
                'cv.personal_info': 'Información Personal',
                'cv.download_cv': 'Descargar CV',
                'cv.download_description': 'Descarga una versión en PDF de mi currículum para tener una copia offline.',
                'cv.sections.experience': 'Experiencia Profesional',
                'cv.sections.education': 'Formación Académica',
                'cv.sections.skills': 'Habilidades Técnicas',
                'cv.sections.certifications': 'Certificaciones',
                'cv.sections.projects': 'Proyectos Destacados',
                'cv.sections.languages': 'Idiomas',
                'cv.fields.name': 'Nombre',
                'cv.fields.location': 'Ubicación',
                'cv.fields.email': 'Email',
                'cv.fields.bio': 'Bio',
                'cv.fields.company': 'Empresa',
                'cv.fields.period': 'Período',
                'cv.fields.present': 'Presente',
                'cv.fields.technologies': 'Tecnologías',
                'cv.fields.date': 'Fecha',
                'cv.fields.id': 'ID',
                'cv.fields.native': 'Nativo',
                'cv.fields.advanced': 'Avanzado',
                'cv.fields.intermediate': 'Intermedio',
                'projects.title': 'Mis Proyectos',
                'projects.description': 'Una selección de proyectos personales y profesionales que demuestran mis habilidades técnicas y creatividad.',
                'projects.featured': 'Destacado',
                'projects.collaboration.title': '¿Interesado en colaborar?',
                'projects.collaboration.description': 'Siempre estoy abierto a nuevos proyectos y colaboraciones interesantes.',
                'blog.title': 'Blog',
                'blog.description': 'Comparto mis experiencias, aprendizajes y reflexiones sobre desarrollo web, tecnología y mejores prácticas.',
                'blog.read_full': 'Leer artículo completo →',
                'blog.no_posts': 'Próximamente...',
                'footer.links': 'Enlaces',
                'footer.follow': 'Sígueme',
                'footer.rights': 'Todos los derechos reservados',
                'system.under_construction': '¡Sitio en construcción! 🚧',
                'system.construction_message': 'Estoy trabajando para ofrecerte la mejor experiencia. Algunas funciones pueden estar limitadas.',
                'system.language_changed': 'Idioma cambiado a Español'
            },
            en: {
                'nav.home': 'Home',
                'nav.cv': 'Resume',
                'nav.projects': 'Projects',
                'nav.blog': 'Blog',
                'nav.contact': 'Contact',
                'home.hero.greeting': 'Hello! I\'m',
                'home.hero.tagline': 'Full Stack Developer specialized in modern web technologies. Passionate about creating innovative solutions and sharing knowledge with the community.',
                'home.sections.development.title': 'Development',
                'home.sections.development.description': 'Specialized in modern web technologies, creating scalable applications and exceptional user experiences.',
                'home.sections.blog.title': 'Blog',
                'home.sections.blog.description': 'I share knowledge about development, technology and best practices through technical articles.',
                'home.sections.latest_posts': 'Latest Posts',
                'home.sections.all_articles': 'View all articles',
                'buttons.read_more': 'Read more →',
                'buttons.see_projects': 'View projects →',
                'buttons.see_cv': 'View my Resume',
                'buttons.read_blog': 'Read my Blog',
                'buttons.contact_email': 'Contact via Email',
                'buttons.download_pdf': 'Download PDF',
                'buttons.demo': 'Demo',
                'buttons.code': 'Code',
                'buttons.connect_linkedin': 'Connect on LinkedIn',
                'buttons.see_github': 'View on GitHub',
                'cv.title': 'Curriculum Vitae',
                'cv.personal_info': 'Personal Information',
                'cv.download_cv': 'Download Resume',
                'cv.download_description': 'Download a PDF version of my resume to have an offline copy.',
                'cv.sections.experience': 'Professional Experience',
                'cv.sections.education': 'Education',
                'cv.sections.skills': 'Technical Skills',
                'cv.sections.certifications': 'Certifications',
                'cv.sections.projects': 'Featured Projects',
                'cv.sections.languages': 'Languages',
                'cv.fields.name': 'Name',
                'cv.fields.location': 'Location',
                'cv.fields.email': 'Email',
                'cv.fields.bio': 'Bio',
                'cv.fields.company': 'Company',
                'cv.fields.period': 'Period',
                'cv.fields.present': 'Present',
                'cv.fields.technologies': 'Technologies',
                'cv.fields.date': 'Date',
                'cv.fields.id': 'ID',
                'cv.fields.native': 'Native',
                'cv.fields.advanced': 'Advanced',
                'cv.fields.intermediate': 'Intermediate',
                'projects.title': 'My Projects',
                'projects.description': 'A selection of personal and professional projects that demonstrate my technical skills and creativity.',
                'projects.featured': 'Featured',
                'projects.collaboration.title': 'Interested in collaborating?',
                'projects.collaboration.description': 'I\'m always open to new projects and interesting collaborations.',
                'blog.title': 'Blog',
                'blog.description': 'I share my experiences, learnings and reflections on web development, technology and best practices.',
                'blog.read_full': 'Read full article →',
                'blog.no_posts': 'Coming soon...',
                'footer.links': 'Links',
                'footer.follow': 'Follow me',
                'footer.rights': 'All rights reserved',
                'system.under_construction': 'Site under construction! 🚧',
                'system.construction_message': 'I\'m working to provide you with the best experience. Some features may be limited.',
                'system.language_changed': 'Language changed to English'
            }
        };
        
        const currentTranslations = translations[lang] || translations['es'];
        
        // Apply translations to elements with data-translate attributes
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            if (currentTranslations[key]) {
                element.textContent = currentTranslations[key];
            }
        });
        
        // Update page language attribute
        document.documentElement.setAttribute('lang', lang);
    }
    
    // Show language change notification
    function showLanguageNotification(lang) {
        const notifications = {
            es: 'Idioma cambiado a Español',
            en: 'Language changed to English'
        };
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'language-notification';
        notification.textContent = notifications[lang] || notifications['es'];
        
        // Add notification to page
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => notification.classList.add('show'), 100);
        
        // Hide and remove notification
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => document.body.removeChild(notification), 300);
        }, 3000);
    }
    
    // Reading Progress & Table of Contents
    initReadingProgress();
});

// Construction Banner Functions
function closeBanner() {
    const banner = document.getElementById('construction-banner');
    if (banner) {
        banner.style.transition = 'all 0.5s ease';
        banner.classList.add('hidden');
        localStorage.setItem('construction-banner-hidden', 'true');
    }
}

// Optional: Auto-hide banner after 30 seconds
setTimeout(() => {
    const banner = document.getElementById('construction-banner');
    const bannerHidden = localStorage.getItem('construction-banner-hidden');
    if (banner && bannerHidden !== 'true') {
        // Add a subtle pulse to remind user they can close it
        banner.style.animation = 'pulse 1s ease-in-out 3';
    }
}, 30000);

// Add CSS for copy button
const style = document.createElement('style');
style.textContent = `
    .copy-button {
        position: absolute;
        top: 0.5rem;
        right: 0.5rem;
        background: var(--bg-secondary);
        border: 1px solid var(--border-color);
        border-radius: 0.25rem;
        padding: 0.5rem;
        cursor: pointer;
        opacity: 0;
        transition: opacity 0.3s ease;
        color: var(--text-secondary);
    }
    
    pre:hover .copy-button {
        opacity: 1;
    }
    
    .copy-button:hover {
        background: var(--primary-color);
        color: white;
        border-color: var(--primary-color);
    }
    
    .reading-time {
        color: var(--text-secondary);
        font-size: 0.9rem;
    }
    
    .reading-time i {
        margin-right: 0.25rem;
    }
    
    .nav-toggle.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .nav-toggle.active span:nth-child(2) {
        opacity: 0;
    }
    
    .nav-toggle.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
    
    /* Theme transition */
    .theme-transitioning {
        transition: background-color 0.5s ease, color 0.5s ease;
    }
    
    /* Parallax hero section */
    .hero {
        position: relative;
        overflow: hidden;
    }
    
    .hero::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: inherit;
        z-index: 1;
        transform: translateZ(0);
    }
    
    /* Animate in class for Intersection Observer */
    .animate-in {
        opacity: 1;
        transform: translateY(0);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    /* Ripple effect for buttons */
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .btn .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.7);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Clickable Cards Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Make cards with data-href clickable
    const clickableCards = document.querySelectorAll('.card-clickable[data-href]');
    
    clickableCards.forEach(card => {
        const href = card.getAttribute('data-href');
        
        // Handle click events
        card.addEventListener('click', function(e) {
            // Don't navigate if clicking on a nested link
            if (e.target.tagName === 'A' || e.target.closest('a')) {
                return;
            }
            
            if (href) {
                window.location.href = href;
            }
        });
        
        // Handle keyboard navigation
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                if (href) {
                    window.location.href = href;
                }
            }
        });
        
        // Add visual feedback on hover and focus
        card.addEventListener('mouseenter', function() {
            // Let CSS handle the hover effect, no need to override
        });
        
        card.addEventListener('mouseleave', function() {
            // Let CSS handle the hover effect, no need to override
        });
        
        card.addEventListener('focus', function() {
            this.style.outline = '2px solid var(--primary-color)';
            this.style.outlineOffset = '2px';
        });
        
        card.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
});

// Blog Filters Functionality
function initBlogFilters() {
    // Check if we're on a blog page
    const postList = document.getElementById('post-list');
    if (!postList) return;
    
    const categoryFilter = document.getElementById('category-filter');
    const yearFilter = document.getElementById('year-filter');
    const clearFiltersBtn = document.getElementById('clear-filters');
    const clearFiltersLink = document.getElementById('clear-filters-link');
    const resultsCount = document.getElementById('results-count');
    const noResults = document.getElementById('no-results');
    
    const posts = Array.from(postList.querySelectorAll('.post-preview'));
    
    // Initialize results counter
    updateResultsCounter();
    
    // Filter event listeners
    if (categoryFilter) {
        categoryFilter.addEventListener('change', applyFilters);
    }
    
    if (yearFilter) {
        yearFilter.addEventListener('change', applyFilters);
    }
    
    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', clearAllFilters);
    }
    
    if (clearFiltersLink) {
        clearFiltersLink.addEventListener('click', clearAllFilters);
    }
    
    // Load filters from URL on page load
    loadFiltersFromURL();
    
    function applyFilters() {
        const selectedCategory = categoryFilter ? categoryFilter.value : '';
        const selectedYear = yearFilter ? yearFilter.value : '';
        
        let visibleCount = 0;
        
        posts.forEach(post => {
            const postCategories = post.dataset.categories || '';
            const postYear = post.dataset.year || '';
            
            let matchesCategory = true;
            let matchesYear = true;
            
            // Category filter (supports multiple values separated by comma)
            if (selectedCategory) {
                const categoryValues = selectedCategory.split(',');
                matchesCategory = categoryValues.some(cat => 
                    postCategories.toLowerCase().includes(cat.toLowerCase())
                );
            }
            
            // Year filter
            if (selectedYear) {
                matchesYear = postYear === selectedYear;
            }
            
            // Show/hide post with animation
            if (matchesCategory && matchesYear) {
                showPost(post);
                visibleCount++;
            } else {
                hidePost(post);
            }
        });
        
        // Update results counter and no results message
        updateResultsCounter(visibleCount);
        toggleNoResultsMessage(visibleCount === 0);
        
        // Update URL with current filters
        updateURL();
    }
    
    function showPost(post) {
        post.classList.remove('hidden');
        post.style.display = '';
    }
    
    function hidePost(post) {
        post.classList.add('hidden');
        // After animation, hide completely
        setTimeout(() => {
            if (post.classList.contains('hidden')) {
                post.style.display = 'none';
            }
        }, 300);
    }
    
    function updateResultsCounter(count = null) {
        if (!resultsCount) return;
        
        if (count === null) {
            count = posts.filter(post => !post.classList.contains('hidden')).length;
        }
        
        const currentLang = document.documentElement.lang || 'es';
        const resultsText = currentLang === 'es' ? 
            `${count} resultado(s) encontrado(s)` : 
            `${count} result(s) found`;
            
        resultsCount.textContent = resultsText;
    }
    
    function toggleNoResultsMessage(show) {
        if (!noResults) return;
        
        if (show) {
            noResults.style.display = 'block';
            postList.style.display = 'none';
        } else {
            noResults.style.display = 'none';
            postList.style.display = '';
        }
    }
    
    function clearAllFilters() {
        if (categoryFilter) categoryFilter.value = '';
        if (yearFilter) yearFilter.value = '';
        
        // Show all posts
        posts.forEach(showPost);
        updateResultsCounter();
        toggleNoResultsMessage(false);
        
        // Clear URL
        updateURL();
    }
    
    function updateURL() {
        const params = new URLSearchParams();
        
        if (categoryFilter && categoryFilter.value) {
            params.set('category', categoryFilter.value);
        }
        
        if (yearFilter && yearFilter.value) {
            params.set('year', yearFilter.value);
        }
        
        const newURL = params.toString() ? 
            `${window.location.pathname}?${params.toString()}` : 
            window.location.pathname;
            
        window.history.replaceState({}, '', newURL);
    }
    
    function loadFiltersFromURL() {
        const params = new URLSearchParams(window.location.search);
        
        const categoryParam = params.get('category');
        const yearParam = params.get('year');
        
        if (categoryParam && categoryFilter) {
            categoryFilter.value = categoryParam;
        }
        
        if (yearParam && yearFilter) {
            yearFilter.value = yearParam;
        }
        
        // Apply filters if any were loaded from URL
        if (categoryParam || yearParam) {
            applyFilters();
        }
    }
}

// Initialize blog filters on DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    initBlogFilters();
});

// Reading Progress & Table of Contents Functionality
function initReadingProgress() {
    const progressBar = document.getElementById('reading-progress-bar');
    const readingTimeElement = document.getElementById('reading-time');
    const postContent = document.getElementById('post-content');
    const tocContainer = document.getElementById('table-of-contents');
    const tocList = document.getElementById('toc-list');
    const tocToggle = document.getElementById('toc-toggle');
    
    // Only initialize on post pages
    if (!progressBar || !postContent) return;
    
    // Calculate and display reading time
    calculateReadingTime();
    
    // Generate table of contents
    generateTableOfContents();
    
    // Update progress on scroll
    window.addEventListener('scroll', updateReadingProgress);
    window.addEventListener('resize', updateReadingProgress);
    
    // TOC toggle functionality
    if (tocToggle && tocList) {
        tocToggle.addEventListener('click', toggleTableOfContents);
    }
    
    function calculateReadingTime() {
        if (!readingTimeElement || !postContent) return;
        
        const text = postContent.textContent || postContent.innerText;
        const wordCount = text.trim().split(/\s+/).length;
        const wordsPerMinute = 200; // Average reading speed
        const minutes = Math.ceil(wordCount / wordsPerMinute);
        
        const currentLang = document.documentElement.lang || 'es';
        let timeText;
        
        if (minutes < 1) {
            timeText = currentLang === 'es' ? 
                'Menos de 1 min de lectura' : 
                'Less than 1 min read';
        } else {
            timeText = currentLang === 'es' ? 
                `${minutes} min de lectura` : 
                `${minutes} min read`;
        }
        
        // Update the reading time display
        const timeSpan = readingTimeElement.querySelector('span');
        if (timeSpan) {
            timeSpan.textContent = timeText;
        }
    }
    
    function generateTableOfContents() {
        if (!tocContainer || !tocList || !postContent) return;
        
        const headers = postContent.querySelectorAll('h1, h2, h3, h4, h5, h6');
        
        if (headers.length < 2) {
            // Hide TOC if there are fewer than 2 headers
            tocContainer.style.display = 'none';
            return;
        }
        
        // Show TOC
        tocContainer.style.display = 'block';
        
        // Clear existing TOC
        tocList.innerHTML = '';
        
        headers.forEach((header, index) => {
            // Generate unique ID for header if it doesn't have one
            if (!header.id) {
                header.id = `heading-${index}`;
            }
            
            // Create TOC item
            const tocItem = document.createElement('li');
            const tocLink = document.createElement('a');
            
            tocLink.href = `#${header.id}`;
            tocLink.textContent = header.textContent;
            tocLink.className = `toc-${header.tagName.toLowerCase()}`;
            
            // Add click handler for smooth scrolling
            tocLink.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.getElementById(header.id);
                if (target) {
                    const offsetTop = target.getBoundingClientRect().top + window.pageYOffset - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    
                    // Update active state
                    updateActiveTocItem(tocLink);
                }
            });
            
            tocItem.appendChild(tocLink);
            tocList.appendChild(tocItem);
        });
        
        // Set initial active state
        updateActiveTocItem();
    }
    
    function updateReadingProgress() {
        if (!progressBar || !postContent) return;
        
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        progressBar.style.width = Math.min(100, Math.max(0, scrollPercent)) + '%';
        
        // Update active TOC item based on scroll position
        updateActiveTocItemOnScroll();
    }
    
    function updateActiveTocItemOnScroll() {
        if (!tocList) return;
        
        const headers = postContent.querySelectorAll('h1, h2, h3, h4, h5, h6');
        const tocLinks = tocList.querySelectorAll('a');
        
        let activeHeader = null;
        const scrollTop = window.pageYOffset + 100; // Offset for better detection
        
        // Find the current active header
        headers.forEach(header => {
            const headerTop = header.getBoundingClientRect().top + window.pageYOffset;
            if (headerTop <= scrollTop) {
                activeHeader = header;
            }
        });
        
        // Update active TOC item
        tocLinks.forEach(link => {
            link.classList.remove('active');
            if (activeHeader && link.getAttribute('href') === `#${activeHeader.id}`) {
                link.classList.add('active');
            }
        });
    }
    
    function updateActiveTocItem(activeLink = null) {
        if (!tocList) return;
        
        const tocLinks = tocList.querySelectorAll('a');
        tocLinks.forEach(link => link.classList.remove('active'));
        
        if (activeLink) {
            activeLink.classList.add('active');
        } else {
            // Set first item as active by default
            const firstLink = tocLinks[0];
            if (firstLink) {
                firstLink.classList.add('active');
            }
        }
    }
    
    function toggleTableOfContents() {
        if (!tocList || !tocToggle) return;
        
        const isCollapsed = tocList.classList.contains('collapsed');
        
        if (isCollapsed) {
            tocList.classList.remove('collapsed');
            tocToggle.classList.remove('collapsed');
        } else {
            tocList.classList.add('collapsed');
            tocToggle.classList.add('collapsed');
        }
    }
}
