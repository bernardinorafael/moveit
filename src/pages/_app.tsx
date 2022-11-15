import type { AppProps } from "next/app"

import ExperienceBar from "../components/ExperienceBar"

import "../css/global.css"
import styles from "../css/pages/App.module.css"

function App({ Component, pageProps }: AppProps) {
  return (
    <div className={styles.Container}>
      <ExperienceBar />

      <Component {...pageProps} />
    </div>
  )
}

export default App
