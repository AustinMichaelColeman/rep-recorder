import styles from "./page.module.css";
import WorkoutTracker from "./WorkoutTracker";
import Footer from "./Footer"

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>Rep Recorder</h1>
      <h2>A workout tracking website</h2>
      <WorkoutTracker />
      <Footer />
    </main>
  );
}
