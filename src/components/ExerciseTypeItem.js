import { useState } from "react";

function ExerciseTypeItem({ exerciseType, index, onUpdate, onRemove }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newExerciseType, setNewExerciseType] = useState(exerciseType.label);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setNewExerciseType(exerciseType.label);
  };

  const handleSaveClick = () => {
    onUpdate(index, {
      label: newExerciseType,
    });

    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    setNewExerciseType(e.target.value);
  };

  const handleDeleteClick = (e) => {
    onRemove(exerciseType.value);
  };

  if (isEditing) {
    return (
      <tr className={"even:bg-gray-200 dark:even:bg-gray-700"}>
        <td className="w-64">
          <input
            value={newExerciseType}
            onChange={handleInputChange}
            className="px-2 py-1 border rounded-lg w-full dark:bg-gray-700 dark:text-white"
          />
        </td>
        <td className="w-48">
          <button
            onClick={handleSaveClick}
            className="px-2 py-1 bg-blue-500 text-white rounded-lg mr-2 hover:bg-blue-600 transition-colors duration-200 dark:bg-blue-700 dark:hover:bg-blue-800"
          >
            Save
          </button>
          <button
            onClick={handleCancelClick}
            className="px-2 py-1 bg-gray-300 rounded-lg hover:bg-gray-400 transition-colors duration-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-300"
          >
            Cancel
          </button>
        </td>
      </tr>
    );
  } else {
    return (
      <tr className={"even:bg-gray-200 dark:even:bg-gray-700 dark:bg-gray-800"}>
        <td className="px-4 py-2 w-64 dark:text-gray-300">
          {exerciseType.label}
        </td>
        <td className="w-48">
          <button
            onClick={handleEditClick}
            className="px-2 py-1 bg-yellow-300 rounded-lg mr-2 hover:bg-yellow-400 transition-colors duration-200 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:text-gray-900"
          >
            Edit
          </button>
          <button
            onClick={handleDeleteClick}
            className="px-2 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 dark:bg-red-700 dark:hover:bg-red-800"
          >
            Delete
          </button>
        </td>
      </tr>
    );
  }
}

export default ExerciseTypeItem;
