import WorkoutItem from "./WorkoutItem";
import styles from "./WorkoutList.module.css";

export default function WorkoutList({ workouts }) {
  return (
    <ul className={styles.workoutList}>
      {workouts.map((workout) => (
        <WorkoutItem key={workout.id} workout={workout} />
      ))}
    </ul>
  );
}
