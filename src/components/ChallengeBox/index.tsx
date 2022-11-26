import Image from "next/image"
import { useContext } from "react"
import { ChallengeContext } from "../../context/ChallengeContext"
import { CountdownContext } from "../../context/CountdownContext"
import styles from "./styles.module.css"

function ChallengeBox() {
  const { activeChallenge, resetChallenge, completeChallenge } = useContext(ChallengeContext)
  const { handleResetCountdown } = useContext(CountdownContext)

  function handleChallengeSucceeded() {
    completeChallenge()
    handleResetCountdown()
  }

  function handleChallengeFailed() {
    handleResetCountdown()
    resetChallenge()
  }

  return (
    <div className={styles.container}>
      {activeChallenge ? (
        <div className={styles.challengeActive}>
          <header>
            <span>Ganhe {activeChallenge.amount} xp</span>
          </header>

          <main>
            <Image
              alt=""
              width={140}
              height={112}
              src={`/icons/${activeChallenge.type}.svg`}
            />
            <strong>Novo desafio</strong>
            <p>{activeChallenge.description}</p>

            <footer>
              <button
                type="button"
                onClick={handleChallengeFailed}
                className={styles.challengeFailedButton}
              >
                Falhei
              </button>

              <button
                onClick={handleChallengeSucceeded}
                className={styles.challengeCompletedButton}
                type="button"
              >
                Completei
              </button>
            </footer>
          </main>
        </div>
      ) : (
        <div className={styles.challengeNotActive}>
          <strong>Finalize um ciclo para receber um desafio</strong>

          <p>
            <Image width={58} height={80} src="/icons/level-up.svg" alt="" />
            Avance de levels completando desafios
          </p>
        </div>
      )}
    </div>
  )
}

export default ChallengeBox
