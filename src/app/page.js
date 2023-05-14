import WorkoutTracker from "@/components/WorkoutTracker";
import Credits from "@/components/Credits";
import styles from "@/app/globals.css";

export default function Home() {
  return (
    <main className="flex flex-col bg-light-background dark:bg-dark-background min-h-screen">
      <div>
        <h1 className="text-4xl font-bold text-light-heading dark:text-dark-heading text-center">
          Rep Recorder
        </h1>
        <h2 className="text-2xl font-medium text-light-heading dark:text-dark-heading text-center">
          A workout tracking website
        </h2>
        <Credits />
        <WorkoutTracker className="flex-grow" />
      </div>
    </main>
  );
}
