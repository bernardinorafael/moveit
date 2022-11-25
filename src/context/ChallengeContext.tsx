import { createContext, useState } from "react"
import challenges from "../../challenges.json"
import { Challenge } from "../@types/challenge"

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

export default function ChallengeProvider({ children }: { children: React.ReactNode }) {
  const [level, setLevel] = useState<number>(1)
  const [currentExperience, setCurrentExperience] = useState<number>(0)
  const [challengesCompleted, setChallengesCompleted] = useState<number>(0)
  const [activeChallenge, setActiveChallenge] = useState<Challenge | null>(null)

  const experienceToNextLevel = Math.pow((level + 1) * 5, 2)

  function levelUp() {
    setLevel(level + 1)
  }

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
    const challenge: Challenge = challenges[randomChallengeIndex]

    setActiveChallenge(challenge)
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
