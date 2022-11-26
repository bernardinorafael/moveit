import { GetServerSideProps } from "next"
import Head from "next/head"
import ChallengeBox from "../components/ChallengeBox"
import CompletedChallenges from "../components/CompletedChallenges"
import Countdown from "../components/Countdown"
import ExperienceBar from "../components/ExperienceBar"
import Profile from "../components/Profile"
import ChallengeProvider from "../context/ChallengeContext"
import CountdownProvider from "../context/CountdownContext"
import styles from "../css/pages/home.module.css"

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { level, currentExperience, challengesCompleted } = ctx.req.cookies

  return {
    props: {
      level: +level!,
      currentExperience: +currentExperience!,
      challengesCompleted: +challengesCompleted!,
    },
  }
}

interface HomeScreenProps {
  level: number
  currentExperience: number
  challengesCompleted: number
}

function HomeScreen({ challengesCompleted, currentExperience, level }: HomeScreenProps) {
  return (
    <>
      <Head>
        <title>move.it</title>
      </Head>

      <ChallengeProvider
        level={level}
        currentExperience={currentExperience}
        challengesCompleted={challengesCompleted}
      >
        <CountdownProvider>
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
        </CountdownProvider>
      </ChallengeProvider>
    </>
  )
}

export default HomeScreen
