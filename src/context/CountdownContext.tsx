import { createContext, useContext, useEffect, useState } from "react"
import { ChallengeContext } from "./ChallengeContext"

interface CountdownContextProps {
  minutes: number
  seconds: number
  isActive: boolean
  hasFinished: boolean
  handleStartCountdown: () => void
  handleResetCountdown: () => void
}

export const CountdownContext = createContext({} as CountdownContextProps)

let countdownTimeout: NodeJS.Timeout

export default function CountdownProvider({ children }: { children: React.ReactNode }) {
  const { startNewChallenge } = useContext(ChallengeContext)

  const [time, setTime] = useState<number>(0.05 * 60)
  const [isActive, setIsActive] = useState<boolean>(false)
  const [hasFinished, setHasFinished] = useState<boolean>(false)

  const minutes = Math.floor(time / 60)
  const seconds = time % 60

  function handleStartCountdown() {
    setIsActive(true)
  }

  function handleResetCountdown() {
    setTime(0.1 * 60)
    setIsActive(false)
    clearTimeout(countdownTimeout)
  }

  useEffect(() => {
    if (isActive && time > 0) {
      countdownTimeout = setTimeout(() => {
        setTime(time - 1)
      }, 1000)
    } else if (isActive && time === 0) {
      setHasFinished(true)
      setIsActive(false)
      startNewChallenge()
    }
  }, [isActive, startNewChallenge, time])

  return (
    <CountdownContext.Provider
      value={{
        minutes,
        seconds,
        isActive,
        hasFinished,
        handleResetCountdown,
        handleStartCountdown,
      }}
    >
      {children}
    </CountdownContext.Provider>
  )
}
