export const languages = {
  es: 'Español',
  en: 'English',
};

export const defaultLang = 'es';

export const ui = {
  es: {
    'site.title': 'Portfolio de Álvaro Escobar - Senior DevOps / SRE Specialist & Solutions Architect',
    'nav.experience': 'Experiencia',
    'nav.projects': 'Proyectos',
    'nav.about': 'Sobre mí',
    'nav.contact': 'Contacto',
    'hero.badge': 'Disponible para nuevos retos',
    'hero.title': 'Hola, soy <span class="gradient-name">Álvaro</span>',
    'hero.description': '+7 años de experiencia. <strong>Especialista Senior DevOps - SRE & Arquitecto de Soluciones</strong> especializado en plataformas Cloud (AWS), automatización CI/CD, GitOps y alta disponibilidad. Apasionado por la observabilidad, la automatización y la cultura DevOps. Desde Sevilla, España.',
    'experience.title': 'Experiencia Laboral',
    'projects.title': 'Proyectos',
    'footer.rights': 'Casi todos los derechos reservados.',
  },
  en: {
    'site.title': 'Álvaro Escobar Portfolio - Senior DevOps / SRE Specialist & Solutions Architect',
    'nav.experience': 'Experience',
    'nav.projects': 'Projects',
    'nav.about': 'About me',
    'nav.contact': 'Contact',
    'hero.badge': 'Open to new challenges',
    'hero.title': 'Hi, I am <span class="gradient-name">Álvaro</span>',
    'hero.description': '+7 years of experience. <strong>Senior DevOps / SRE Specialist & Solutions Architect</strong> specialized in Cloud platforms (AWS), CI/CD automation, GitOps, and high availability. Passionate about observability, automation, and DevOps culture. Based in Seville, Spain.',
    'experience.title': 'Work Experience',
    'projects.title': 'Projects',
    'footer.rights': 'Almost all rights reserved.',
  }
} as const;

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof typeof ui[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key];
  }
}
