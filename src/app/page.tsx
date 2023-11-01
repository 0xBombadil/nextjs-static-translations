"use client"
import Image from "next/image"
import styles from "./page.module.css"
import useTranslation from "@/locales/useTranslation"

export default function Home() {
  const { t, changeLocale } = useTranslation()

  return (
    <main className={styles.main}>
      <div>
        <div>{t("home", { number: 42 })}</div>
        <div>
          <button onClick={() => changeLocale("en")}>English</button>
          <button onClick={() => changeLocale("zh")}>Chinese</button>
        </div>
      </div>
    </main>
  )
}
