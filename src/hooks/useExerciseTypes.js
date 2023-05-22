import { useState, useEffect } from "react";
import { useAuthContext } from "@/context/AuthContext";
import defaultExerciseTypes from "@/data/defaultExerciseTypes";
import { getExerciseTypes } from "@/firebase/firestore/exerciseTypes";

export default function useExerciseTypes() {
  const { user } = useAuthContext();
  const [exerciseOptions, setExerciseOptions] = useState(defaultExerciseTypes);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (user !== null) {
      getExerciseTypes(user.uid)
        .then(({ result }) => {
          if (result.length > 0) {
            const options = result.map((exerciseType) => ({
              value: exerciseType.value,
              label: exerciseType.label,
            }));
            setExerciseOptions(options);
          }
          setIsLoading(false); // data has been fetched
        })
        .catch((error) => {
          setIsError(true); // an error occurred
          console.error("Failed to get exercise types:", error);
        });
    } else {
      setIsLoading(false); // no user, so no data to fetch
    }
  }, [user]);

  return { exerciseOptions, isLoading, isError };
}
