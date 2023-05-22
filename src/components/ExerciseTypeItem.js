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
      <tr>
        <td className="w-64">
          <input
            value={newExerciseType}
            onChange={handleInputChange}
            className="px-2 py-1 border rounded-lg w-full"
          />
        </td>
        <td className="w-48">
          <button
            onClick={handleSaveClick}
            className="px-2 py-1 bg-blue-500 text-white rounded-lg mr-2 hover:bg-blue-600 transition-colors duration-200"
          >
            Save
          </button>
          <button
            onClick={handleCancelClick}
            className="px-2 py-1 bg-gray-300 rounded-lg hover:bg-gray-400 transition-colors duration-200"
          >
            Cancel
          </button>
        </td>
      </tr>
    );
  } else {
    return (
      <tr>
        <td className="px-4 py-2 w-64">{exerciseType.label}</td>
        <td className="w-48">
          <button
            onClick={handleEditClick}
            className="px-2 py-1 bg-yellow-300 rounded-lg mr-2 hover:bg-yellow-400 transition-colors duration-200"
          >
            Edit
          </button>
          <button
            onClick={handleDeleteClick}
            className="px-2 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
          >
            Delete
          </button>
        </td>
      </tr>
    );
  }
}

export default ExerciseTypeItem;
