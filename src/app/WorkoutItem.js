import styles from "./WorkoutTracker.module.css";

export default function WorkoutItem({ workout }) {
  return (
    <li className={styles.workoutItem}>
      <span className={styles.workoutDate}>{workout.date}</span>
      <span className={styles.workoutDetails}>
        {workout.exercise} - {workout.weight} lbs x {workout.reps}
      </span>
    </li>
  );
}
