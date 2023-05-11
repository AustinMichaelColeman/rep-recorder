import React, { useCallback, useState } from "react";
import { useGoogleDriveAPI } from "./GoogleDriveAPI";
import styles from "./BackupWorkouts.module.css";

export default function BackupWorkouts({ workouts, setWorkouts }) {
  const { handleBackup, handleRestore } = useGoogleDriveAPI(
    workouts,
    setWorkouts
  );

  const handleBackupClick = useCallback(() => {
    if (workouts.length === 0) {
      window.alert(
        "Your workout data is empty. Please add workout logs before attempting to back up."
      );
    } else {
      handleBackup();
    }
  }, [handleBackup, workouts]);

  const handleRestoreClick = useCallback(() => {
    const confirmRestore = window.confirm(
      "Are you sure you want to restore? This will replace your local workout data with what was most recently backed up."
    );
    if (confirmRestore) {
      handleRestore();
    }
  }, [handleRestore]);

  return (
    <>
      <button className={styles.backupButton} onClick={handleBackupClick}>
        Backup Workouts
      </button>

      <button className={styles.restoreButton} onClick={handleRestoreClick}>
        Restore Workouts From Backup
      </button>
    </>
  );
}
