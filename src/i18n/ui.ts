export const languages = {
  es: 'Español',
  en: 'English',
};

export const defaultLang = 'es';

export const ui = {
  es: {
    'nav.experience': 'Experiencia',
    'nav.projects': 'Proyectos',
    'nav.about': 'Sobre mí',
    'nav.contact': 'Contacto',
    'hero.badge': 'Disponible para trabajar',
    'hero.title': 'Hola, soy <span class="gradient-name">Álvaro</span>',
    'hero.description': '+5 años de experiencia. <strong>Cloud & DevOps Engineer</strong> especializado en infraestructuras escalables y arquitecturas Serverless. Apasionado por la automatización y la <strong>cultura GitOps</strong>. De Madrid, España.',
    'experience.title': 'Experiencia Laboral',
    'projects.title': 'Arquitecturas Destacadas',
    'footer.rights': 'Casi todos los derechos reservados.',
  },
  en: {
    'nav.experience': 'Experience',
    'nav.projects': 'Projects',
    'nav.about': 'About me',
    'nav.contact': 'Contact',
    'hero.badge': 'Available for hire',
    'hero.title': 'Hi, I am <span class="gradient-name">Álvaro</span>',
    'hero.description': '+5 years of experience. <strong>Cloud & DevOps Engineer</strong> specialized in scalable infrastructures and Serverless architectures. Passionate about automation and <strong>GitOps culture</strong>. From Madrid, Spain.',
    'experience.title': 'Work Experience',
    'projects.title': 'Featured Architectures',
    'footer.rights': 'Almost all rights reserved.',
  }
} as const;

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof typeof ui[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key];
  }
}
