import { createContext, useContext } from "react"
import { TranslationContext } from "./TranslationProvider"

export default function useTranslation() {
  const { locale, changeLocale, translations } = useContext(TranslationContext)

  function t(key: string, values?: { [key: string]: string | number }) {
    if (!Object.hasOwn(translations, locale)) return key
    if (!Object.hasOwn(translations[locale], key)) return key
    let translation = translations[locale][key]
    if (values) {
      for (let i = 0; i < Object.keys(values).length; i++) {
        const key = Object.keys(values)[i]
        const value = values[key]
        console.log("replacing", key, "for", value)
        translation = translation.replaceAll(`{${key}}`, String(value))
      }
    }

    return translation
  }
  return { t, changeLocale }
}
