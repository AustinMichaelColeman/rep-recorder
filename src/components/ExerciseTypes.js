import { useState, useEffect } from "react";
import ExerciseTypeItem from "@/components/ExerciseTypeItem";
import { useAuthContext } from "@/context/AuthContext";
import defaultExerciseTypes from "@/data/defaultExerciseTypes";

import {
  getExerciseTypes,
  addExerciseType,
  addExerciseTypes,
  updateExerciseType,
  removeExerciseType,
} from "@/firebase/firestore/exerciseTypes";

const exerciseTypeColumns = ["Exercise Type", "Actions"];

export default function ExerciseTypes() {
  const { user } = useAuthContext();
  const [exerciseTypes, setExerciseTypes] = useState([]);

  const [newExerciseTypeName, setNewExerciseTypeName] = useState("");

  useEffect(() => {
    const fetchExerciseTypes = async () => {
      if (!user || !user.uid) {
        return;
      }

      const { result, error } = await getExerciseTypes(user.uid);

      if (error) {
        console.error("Failed to fetch exercise types:", error);
        return;
      }

      if (result.length === 0) {
        await addExerciseTypes(user.uid, defaultExerciseTypes);
        setExerciseTypes(defaultExerciseTypes);
      } else {
        setExerciseTypes(result);
      }
    };

    fetchExerciseTypes();
  }, [user]);

  const handleAddExerciseType = async () => {
    if (!newExerciseTypeName) return;

    const exerciseTypeData = { label: newExerciseTypeName };
    const { result, error } = await addExerciseType(user.uid, exerciseTypeData);

    if (error) {
      console.error("Failed to add exercise type:", error);
      return;
    }

    setExerciseTypes((prevExerciseTypes) => {
      return [
        ...prevExerciseTypes,
        { value: result.value, label: exerciseTypeData.label },
      ];
    });

    setNewExerciseTypeName("");
  };

  const handleUpdateExerciseType = async (index, updatedData) => {
    const exerciseTypeId = exerciseTypes[index].value;

    const { result, error } = await updateExerciseType(
      user.uid,
      exerciseTypeId,
      updatedData
    );

    if (error) {
      console.error("Failed to update exercise type:", error);
      return;
    }

    setExerciseTypes((prevExerciseTypes) =>
      prevExerciseTypes.map((exerciseType, idx) =>
        idx === index ? { ...exerciseType, ...updatedData } : exerciseType
      )
    );
  };

  const handleRemoveExerciseType = async (exerciseTypeId) => {
    const { error } = await removeExerciseType(user.uid, exerciseTypeId);

    if (error) {
      console.error("Failed to remove exercise type:", error);
      return;
    }

    setExerciseTypes(
      exerciseTypes.filter(
        (exerciseType) => exerciseType.value !== exerciseTypeId
      )
    );
  };

  return (
    <div className="flex-grow overflow-auto p-6">
      <div className="flex items-center mt-4">
        <input
          value={newExerciseTypeName}
          onChange={(e) => setNewExerciseTypeName(e.target.value)}
          placeholder="Exercise Type"
          className="mr-4 px-2 py-1 border rounded-lg"
        />
        <button
          onClick={handleAddExerciseType}
          className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 transition-colors duration-200"
        >
          Add Type
        </button>
      </div>
      <table className="mt-4 w-full">
        <thead>
          {exerciseTypes.length > 0 && (
            <tr className="bg-blue-300 dark:bg-blue-700">
              {exerciseTypeColumns.map((column, index) => (
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
          {exerciseTypes.map((exerciseType, index) => (
            <ExerciseTypeItem
              key={index}
              exerciseType={exerciseType}
              index={index}
              onUpdate={handleUpdateExerciseType}
              onRemove={handleRemoveExerciseType}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
