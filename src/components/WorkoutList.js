import WorkoutItem from "@/components/WorkoutItem";
import styles from "@/components/WorkoutList.module.css";

export default function WorkoutList({ workouts }) {
  return (
    <ul className={styles.workoutList}>
      {workouts.map((workout) => (
        <WorkoutItem key={workout.id} workout={workout} />
      ))}
    </ul>
  );
}
