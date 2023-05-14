import React, { useCallback, useEffect, useState } from "react";
import { useGoogleDriveAPI } from "@/utils/googleDriveAPI";
import styles from "@/components/BackupWorkouts.module.css";

export default function BackupWorkouts({ workouts, setWorkouts }) {
  const { handleBackup, handleRestore } = useGoogleDriveAPI(
    workouts,
    setWorkouts
  );

  const [isRunningInProduction, setIsRunningInProduction] = useState(false);

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

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_CLIENT_ID === undefined) {
      setIsRunningInProduction(true);
    } else {
      setIsRunningInProduction(false);
    }
  }, [setIsRunningInProduction]);

  return (
    <>
      {isRunningInProduction && (
        <p className={styles.backupMessage}>
          Backup only works when running locally for now until I implement a
          backend.
        </p>
      )}
      <button
        className={styles.backupButton}
        onClick={handleBackupClick}
        disabled={isRunningInProduction}
      >
        Backup Workouts
      </button>

      <button
        className={styles.restoreButton}
        onClick={handleRestoreClick}
        disabled={isRunningInProduction}
      >
        Restore Workouts From Backup
      </button>
    </>
  );
}
