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
    'hero.title': 'Hola, soy Álvaro',
    'hero.description': '+5 años de experiencia. Desarrollador Full Stack especializado en tecnologías web modernas. Apasionado por crear soluciones innovadoras y compartir conocimiento con la comunidad. De Madrid, España.',
    'experience.title': 'Experiencia Laboral',
    'projects.title': 'Proyectos Destacados',
    'footer.rights': 'Casi todos los derechos reservados.',
  },
  en: {
    'nav.experience': 'Experience',
    'nav.projects': 'Projects',
    'nav.about': 'About me',
    'nav.contact': 'Contact',
    'hero.badge': 'Available for hire',
    'hero.title': 'Hi, I am Álvaro',
    'hero.description': '+5 years of experience. Full Stack Developer specialized in modern web technologies. Passionate about creating innovative solutions and sharing knowledge with the community. From Madrid, Spain.',
    'experience.title': 'Work Experience',
    'projects.title': 'Featured Projects',
    'footer.rights': 'Almost all rights reserved.',
  }
} as const;

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof typeof ui[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key];
  }
}
