// Theme Toggle Functionality & Enhanced Animations
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    // Load saved theme or default to light
    const savedTheme = localStorage.getItem('theme') || 'light';
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
                themeIcon.className = 'fas fa-moon';
            } else {
                themeIcon.className = 'fas fa-sun';
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
