import React, { useEffect, useState } from "react";
import { useGoogleDriveAPI } from "./GoogleDriveAPI";
import styles from "./BackupWorkouts.module.css";

export default function BackupWorkouts({ workouts }) {
  const { handleCredentialResponse, handleBackup } =
    useGoogleDriveAPI(workouts);

  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    handleCredentialResponse();
  }, [handleCredentialResponse]);

  const handleButtonClick = () => {
    if (workouts.length === 0) {
      setShowMessage(true);
    } else {
      handleBackup();
    }
  };

  return (
    <>
      {showMessage && workouts.length === 0 && (
        <p className={styles.message}>No workouts to backup</p>
      )}
      <button className={styles.backupButton} onClick={handleButtonClick}>
        Backup Workouts
      </button>

      <button className={styles.restoreButton} disabled={true}>
        Restore Workouts From Backup (not yet implemented)
      </button>
    </>
  );
}
