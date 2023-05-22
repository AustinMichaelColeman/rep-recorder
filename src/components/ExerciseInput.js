export default function ExerciseInput({
  selectedExercise,
  exerciseOptions,
  handleExerciseSelectChange,
  name,
}) {
  return (
    <div className="mb-4">
      <label
        htmlFor={name}
        className="mr-2 text-lg text-light-label dark:text-dark-label"
      >
        Exercise
      </label>
      <select
        id={name}
        name={name}
        value={selectedExercise}
        onChange={handleExerciseSelectChange}
        required
        className="border rounded p-2"
      >
        {exerciseOptions.map((option) => {
          return (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          );
        })}
      </select>
    </div>
  );
}
