import language from '@/translate/language'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
    en: {
        translation: require('./english.json'),
    },
      th: {
        translation: require('./thai.json'),
    },
    cn: {
        translation: {
            "test": language.cn,
        }
    }
} as const

i18n.use(initReactI18next).init({
    resources,
    lng: "th",
    fallbackLng: 'th',
})

export default i18n