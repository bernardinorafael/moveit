import { useContext } from "react"
import { CountdownContext } from "../../context/CountdownContext"
import styles from "./styles.module.css"

function Countdown() {
  const {
    minutes,
    seconds,
    isActive,
    hasFinished,
    handleResetCountdown,
    handleStartCountdown,
  } = useContext(CountdownContext)

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, "0").split("")
  const [secondLeft, secondRight] = String(seconds).padStart(2, "0").split("")

  return (
    <div>
      <div className={styles.container}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>

      {hasFinished ? (
        <button disabled className={styles.countdownButton}>
          Ciclo encerrado
        </button>
      ) : (
        <>
          {isActive ? (
            <button
              onClick={handleResetCountdown}
              className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
              type="button"
            >
              Abandonar ciclo
            </button>
          ) : (
            <button
              onClick={handleStartCountdown}
              className={styles.countdownButton}
              type="button"
            >
              Iniciar um ciclo
            </button>
          )}
        </>
      )}
    </div>
  )
}

export default Countdown
