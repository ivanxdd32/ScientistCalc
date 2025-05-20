import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import ar from './locales/ar.json';
import bn from './locales/bn.json';
import de from './locales/de.json';
import en from './locales/en.json';
import es from './locales/es.json';
import hi from './locales/hi.json';
import ja from './locales/ja.json';
import pt from './locales/pt.json';
import ru from './locales/ru.json';
import zh from './locales/zh.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      ar: { translation: ar },
      bn: { translation: bn },
      de: { translation: de },
      en: { translation: en },
      es: { translation: es },
      hi: { translation: hi },
      ja: { translation: ja },
      pt: { translation: pt },
      ru: { translation: ru },
      zh: { translation: zh },
    },
    lng: localStorage.getItem('lang') || 'es', // Idioma por defecto
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;