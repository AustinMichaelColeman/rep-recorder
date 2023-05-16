export default function WorkoutItem({ workout }) {
  return (
    <tr
      className="
      font-semibold
      text-center text-gray-900 dark:text-gray-100
      border-b border-gray-300 dark:border-gray-700
      bg-blue-50 even:bg-blue-100 dark:bg-blue-950 dark:even:bg-blue-900"
    >
      <td className="py-4 px-4">{workout.date}</td>
      <td className="py-4 px-4">{workout.exercise}</td>
      <td className="py-4 px-4">{workout.weight}</td>
      <td className="py-4 px-4">{workout.reps}</td>
    </tr>
  );
}
