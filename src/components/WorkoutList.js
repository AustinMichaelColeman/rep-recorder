import WorkoutItem from "@/components/WorkoutItem";
import removeWorkout from "@/firebase/firestore/removeWorkout";
import { useAuthContext } from "@/context/AuthContext";

const workoutColumns = ["Date", "Exercise", "Weight (lbs)", "Reps", "Actions"];

export default function WorkoutList({ workouts, setWorkouts }) {
  const { user } = useAuthContext();

  const handleRemoveWorkout = async (workoutId) => {
    const { result, error } = await removeWorkout(user.uid, workoutId);
    if (error) {
      console.error("Failed to remove workout:", error);
      return;
    }
    setWorkouts(workouts.filter((workout) => workout.id !== workoutId));
  };

  return (
    <div className="flex-grow overflow-auto">
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
            <WorkoutItem
              key={workout.id}
              workout={workout}
              index={index}
              onRemove={() => handleRemoveWorkout(workout.id)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
