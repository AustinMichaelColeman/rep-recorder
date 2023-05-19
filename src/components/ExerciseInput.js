import React from "react";

export default function ExerciseInput({
  selectedExercise,
  exerciseOptions,
  handleInputChange,
  handleAddExercise,
}) {
  return (
    <div className="mb-4">
      <label
        htmlFor="exercise"
        className="mr-2 text-lg text-light-label dark:text-dark-label"
      >
        Exercise
      </label>
      <select
        id="exercise"
        name="exercise"
        value={selectedExercise}
        onChange={handleInputChange}
        required
        className="border rounded p-2"
      >
        {exerciseOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
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
