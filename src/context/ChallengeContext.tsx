/* eslint-disable no-new */
import { createContext, useEffect, useState } from "react"
import challenges from "../../challenges.json"
import Cookies from "js-cookie"
import { Challenge } from "../@types/challenge"

interface ChallengeProviderProps {
  level: number
  currentExperience: number
  children: React.ReactNode
  challengesCompleted: number
}

interface ChallengeContextProps {
  level: number
  currentExperience: number
  activeChallenge: Challenge | null
  challengesCompleted: number
  experienceToNextLevel: number
  startNewChallenge: () => void
  resetChallenge: () => void
  completeChallenge: () => void
}

export const ChallengeContext = createContext({} as ChallengeContextProps)

export default function ChallengeProvider({ children, ...rest }: ChallengeProviderProps) {
  const [level, setLevel] = useState<number>(rest.level ?? 1)
  const [currentExperience, setCurrentExperience] = useState<number>(
    rest.currentExperience ?? 0
  )

  const [challengesCompleted, setChallengesCompleted] = useState<number>(
    rest.challengesCompleted ?? 0
  )

  const [activeChallenge, setActiveChallenge] = useState<Challenge | null>(null)
  const experienceToNextLevel = Math.pow((level + 1) * 5, 2)

  useEffect(() => {
    Notification.requestPermission()
  }, [])

  useEffect(() => {
    Cookies.set("level", String(level))
    Cookies.set("currentExperience", String(currentExperience))
    Cookies.set("challengesCompleted", String(challengesCompleted))
  }, [level, currentExperience, challengesCompleted])

  function levelUp() {
    setLevel(level + 1)
  }

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
    const challenge: Challenge = challenges[randomChallengeIndex]

    setActiveChallenge(challenge)

    new Audio("/notification.mp3").play()
  }

  function resetChallenge() {
    setActiveChallenge(null)
  }

  function completeChallenge() {
    if (!activeChallenge) return null

    const { amount } = activeChallenge

    let finalExperience = currentExperience + amount

    if (finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel
      levelUp()
    }

    setCurrentExperience(finalExperience)
    setActiveChallenge(null)
    setChallengesCompleted(challengesCompleted + 1)
  }

  return (
    <ChallengeContext.Provider
      value={{
        level,
        resetChallenge,
        activeChallenge,
        currentExperience,
        startNewChallenge,
        completeChallenge,
        challengesCompleted,
        experienceToNextLevel,
      }}
    >
      {children}
    </ChallengeContext.Provider>
  )
}
