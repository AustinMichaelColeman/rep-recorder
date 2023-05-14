export default function WorkoutItem({ workout }) {
  return (
    <li className="flex justify-between items-center py-2 space-x-4 border-b border-gray-300 dark:border-gray-700">
      <span className="text-light-heading dark:text-dark-heading">
        {workout.date}
      </span>
      <span className="text-light-label dark:text-dark-label">
        {workout.exercise} - {workout.weight} lbs x {workout.reps}
      </span>
    </li>
  );
}
