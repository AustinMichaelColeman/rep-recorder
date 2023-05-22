export default function ExerciseInput({
  selectedExercise,
  exerciseOptions,
  handleExerciseSelectChange,
  handleAddExercise,
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
      <button
        type="button"
        onClick={handleAddExercise}
        className="bg-light-button-background text-light-button-text dark:bg-dark-button-background dark:text-dark-button-text rounded px-4 py-2 ml-2"
      >
        Add Exercise
      </button>
    </div>
  );
}
