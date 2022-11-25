import { useContext } from "react"
import { ChallengeContext } from "../../context/ChallengeContext"
import styles from "./styles.module.css"

function CompletedChallenges() {
  const { challengesCompleted } = useContext(ChallengeContext)

  return (
    <div className={styles.container}>
      <span>Desafios completos</span>
      <span>{challengesCompleted}</span>
    </div>
  )
}

export default CompletedChallenges
