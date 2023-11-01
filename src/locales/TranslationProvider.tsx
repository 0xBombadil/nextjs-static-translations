"use client"
import { createContext, useEffect, useState } from "react"
import en from "../../public/locales/en.json"

type AvailableLocales = "en" | "zh"
type Translations = { [locale: string]: { [key: string]: string } }

type TranslationContextType = {
  locale: AvailableLocales
  changeLocale: (locale: AvailableLocales) => void
  translations: Translations
}

const initialState: TranslationContextType = {
  locale: "en",
  changeLocale: (locale: AvailableLocales) => {},
  translations: { en },
}

export const TranslationContext = createContext<TranslationContextType>(initialState)

export function TranslationProvider({ children }: { children: React.ReactNode }) {
  const [currentLocale, setCurrentLocale] = useState<AvailableLocales>("en")
  const [translations, setTranslations] = useState<Translations>({ en })

  useEffect(() => {
    fetch(`./locales/${currentLocale}.json`)
      .then(response => response.json())
      .then(json => {
        console.log("Fetched:", json)
        setTranslations(translations => {
          const newTranslations = { ...translations }
          newTranslations[currentLocale] = json
          return newTranslations
        })
      })
  }, [currentLocale])

  useEffect(() => {
    console.log(translations)
  }, [translations])

  return (
    <TranslationContext.Provider
      value={{ locale: currentLocale, changeLocale: (locale: AvailableLocales) => setCurrentLocale(locale), translations }}
    >
      {children}
    </TranslationContext.Provider>
  )
}
