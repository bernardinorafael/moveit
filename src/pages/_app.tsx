import type { AppProps } from "next/app"
import ChallengeProvider from "../context/ChallengeContext"
import CountdownProvider from "../context/CountdownContext"

import "../css/global.css"

function App({ Component, pageProps }: AppProps) {
  return (
    <ChallengeProvider>
      <CountdownProvider>
        <Component {...pageProps} />
      </CountdownProvider>
    </ChallengeProvider>
  )
}

export default App
