import WorkoutItem from "@/components/WorkoutItem";

const workoutColumns = ["Date", "Exercise", "Weight (lbs)", "Reps"];

export default function WorkoutList({ workouts }) {
  return (
    <div className="flex justify-center">
      <table className="mt-4 w-full">
        <thead>
          {workouts.length > 0 && (
            <tr className="bg-blue-300 dark:bg-blue-700">
              {workoutColumns.map((column, index) => (
                <th
                  className="py-4 px-4 text-light-heading dark:text-dark-heading font-medium"
                  key={index}
                >
                  {column}
                </th>
              ))}
            </tr>
          )}
        </thead>
        <tbody className="bg-white divide-y divide-gray-300 dark:bg-dark-background dark:divide-gray-700">
          {workouts.map((workout, index) => (
            <WorkoutItem key={workout.id} workout={workout} index={index} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
