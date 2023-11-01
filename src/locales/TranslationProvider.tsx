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
  const [locale, setLocale] = useState<AvailableLocales>("en")
  const [translations, setTranslations] = useState<Translations>({ en })

  async function changeLocale(newLocale: AvailableLocales) {
    if (Object.hasOwn(translations, newLocale)) {
      setLocale(newLocale)
      return
    }

    fetch(`./locales/${newLocale}.json`)
      .then(response => response.json())
      .then(json => {
        console.log("Fetched:", json)
        setTranslations(translations => {
          const newTranslations = { ...translations }
          newTranslations[newLocale] = json
          return newTranslations
        })
        setLocale(newLocale)
      })
      .catch(reason => console.error("Error fetching translations:", reason))
  }

  useEffect(() => {
    console.log(translations)
  }, [translations])

  return <TranslationContext.Provider value={{ locale, changeLocale, translations }}>{children}</TranslationContext.Provider>
}
