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
        <td>
          <input value={newExerciseType} onChange={handleInputChange} />
        </td>
        <td>
          <button onClick={handleSaveClick}>Save</button>
          <button onClick={handleCancelClick}>Cancel</button>
        </td>
      </tr>
    );
  } else {
    return (
      <tr>
        <td>{exerciseType.label}</td>
        <td>
          <button onClick={handleEditClick}>Edit</button>
          <button onClick={handleDeleteClick}>Delete</button>
        </td>
      </tr>
    );
  }
}

export default ExerciseTypeItem;
