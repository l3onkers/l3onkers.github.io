import { describe, it, expect } from 'vitest';
import { ui, useTranslations, defaultLang } from '../src/i18n/ui';

describe('i18n translations', () => {
  it('should return correct translation for ES', () => {
    const t = useTranslations('es');
    expect(t('nav.experience')).toBe('Experiencia');
  });

  it('should return correct translation for EN', () => {
    const t = useTranslations('en');
    expect(t('nav.experience')).toBe('Experience');
  });

  it('should fallback to ES if key not found (if implemented) or just match default dictionary', () => {
    expect(ui[defaultLang]['hero.title']).toBe('Hola, soy <span class="gradient-name">Álvaro</span>');
  });
});
