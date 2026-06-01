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
    'hero.badge': 'Disponible para nuevos retos',
    'hero.title': 'Hola, soy <span class="gradient-name">Álvaro</span>',
    'hero.description': '+7 años de experiencia. <strong>Senior DevOps Expert & Solutions Architect</strong> especializado en plataformas Cloud (AWS), SecOps y alta disponibilidad. Apasionado por la automatización, <strong>GitOps</strong> y el diseño de pipelines CI/CD robustas. Desde Sevilla, España.',
    'experience.title': 'Experiencia Laboral',
    'projects.title': 'Arquitecturas Destacadas',
    'footer.rights': 'Casi todos los derechos reservados.',
  },
  en: {
    'nav.experience': 'Experience',
    'nav.projects': 'Projects',
    'nav.about': 'About me',
    'nav.contact': 'Contact',
    'hero.badge': 'Open to new challenges',
    'hero.title': 'Hi, I am <span class="gradient-name">Álvaro</span>',
    'hero.description': '+7 years of experience. <strong>Senior DevOps Expert & Solutions Architect</strong> specialized in Cloud platforms (AWS), SecOps, and high availability. Passionate about automation, <strong>GitOps</strong>, and designing robust CI/CD pipelines. Based in Seville, Spain.',
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
