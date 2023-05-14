import styles from "@/app/page.module.css";
import WorkoutTracker from "@/components/WorkoutTracker";
import Footer from "@/components/Footer";

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
