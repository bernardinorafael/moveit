import styles from "./styles.module.css"

function ExperienceBar() {
  return (
    <header className={styles.ExperienceBar}>
      <span>0 xp</span>
      <div>
        <div style={{ width: "50%" }} />

        <span className={styles.CurrentExperience} style={{ left: "50%" }}>
          300 xp
        </span>
      </div>
      <span>600 xp</span>
    </header>
  )
}

export default ExperienceBar
