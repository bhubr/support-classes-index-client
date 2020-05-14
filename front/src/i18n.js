import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import { en, fr } from './locales';

console.log(en, fr);
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: { en, fr },
    fallbackLng: 'en',
    debug: true,
  });


export default i18n;
