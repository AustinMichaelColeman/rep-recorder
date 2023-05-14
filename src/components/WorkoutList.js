import WorkoutItem from "@/components/WorkoutItem";

export default function WorkoutList({ workouts }) {
  return (
    <div className="flex justify-center">
      <ul className="mt-4">
        {workouts.map((workout) => (
          <WorkoutItem key={workout.id} workout={workout} />
        ))}
      </ul>
    </div>
  );
}
