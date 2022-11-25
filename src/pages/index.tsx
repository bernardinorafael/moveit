import Head from "next/head"
import ChallengeBox from "../components/ChallengeBox"
import CompletedChallenges from "../components/CompletedChallenges"
import Countdown from "../components/Countdown"
import ExperienceBar from "../components/ExperienceBar"
import Profile from "../components/Profile"

import styles from "../css/pages/home.module.css"

function Home() {
  return (
    <>
      <Head>
        <title>move.it</title>
      </Head>

      <div className={styles.container}>
        <ExperienceBar />

        <section>
          <div>
            <Profile />
            <CompletedChallenges />
            <Countdown />
          </div>

          <div>
            <ChallengeBox />
          </div>
        </section>
      </div>
    </>
  )
}

export default Home
