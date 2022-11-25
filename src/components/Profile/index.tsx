import Image from "next/image"
import { useContext } from "react"
import { ChallengeContext } from "../../context/ChallengeContext"
import styles from "./styles.module.css"

function Profile() {
  const { level } = useContext(ChallengeContext)

  return (
    <div className={styles.container}>
      <Image width={88} height={88} src="https://github.com/bernardinorafael.png" alt="" />

      <div>
        <strong>Rafael Bernardino</strong>
        <p>
          <Image height={14} width={12} src="/icons/level.svg" alt="" />
          Level {level}
        </p>
      </div>
    </div>
  )
}

export default Profile
