import React, { useCallback, useEffect } from "react";
import styles from "./BackupWorkouts.module.css";

export default function BackupWorkouts({ workouts }) {
  const CLIENT_ID =
    "";
  const REDIRECT_URI = "https://www.austincoleman.dev/rep-recorder";
  //   const REDIRECT_URI = "http://localhost:3000";
  const SCOPES = "https://www.googleapis.com/auth/drive.file";

  const createFileInDrive = useCallback(async (accessToken, data) => {
    const checkFolderExists = async () => {
      const query = `mimeType='application/vnd.google-apps.folder' and name='Rep Recorder Backup' and trashed=false`;
      const encodedQuery = encodeURIComponent(query);

      try {
        const response = await fetch(
          `https://www.googleapis.com/drive/v3/files?q=${encodedQuery}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const jsonResponse = await response.json();
        const folders = jsonResponse.files.filter(
          (file) =>
            file.mimeType === "application/vnd.google-apps.folder" &&
            file.name === "Rep Recorder Backup"
        );

        if (folders.length > 0) {
          return folders[0].id;
        } else {
          const folderId = await createFolder();
          return folderId;
        }
      } catch (error) {
        console.log("Error checking folder existence:", error);
      }
    };

    const createFolder = async () => {
      const folderMetadata = {
        name: "Rep Recorder Backup",
        mimeType: "application/vnd.google-apps.folder",
      };

      try {
        const response = await fetch(
          "https://www.googleapis.com/drive/v3/files",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(folderMetadata),
          }
        );
        const folder = await response.json();
        return folder.id;
      } catch (error) {
        console.log("Error creating folder:", error);
      }
    };

    const createFile = async (folderId) => {
      const metadata = {
        name: "workouts.json",
        mimeType: "application/json",
        parents: [folderId],
      };

      const fileContent = JSON.stringify(data);

      try {
        const response = await fetch(
          "https://www.googleapis.com/drive/v3/files",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(metadata),
          }
        );
        const file = await response.json();
        const fileId = file.id;

        // Upload file content
        await fetch(
          `https://www.googleapis.com/upload/drive/v3/files/${fileId}?uploadType=media`,
          {
            method: "PATCH",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
            body: fileContent,
          }
        );
      } catch (error) {
        console.log("Error creating and uploading file:", error);
      }
    };

    try {
      const folderId = await checkFolderExists();
      createFile(folderId);
    } catch (error) {
      console.log("Error:", error);
    }
  }, []);

  const handleCredentialResponse = useCallback(() => {
    const fragment = window.location.hash.substring(1);
    const params = new URLSearchParams(fragment);

    if (workouts.length === 0) return;

    if (params.has("access_token")) {
      const accessToken = params.get("access_token");
      window.history.replaceState({}, document.title, "/");

      createFileInDrive(accessToken, workouts);
    } else if (params.has("error")) {
      const error = params.get("error");
      console.log("Authorization Error:", error);
    }
  }, [workouts, createFileInDrive]);

  useEffect(() => {
    handleCredentialResponse();
  }, [handleCredentialResponse]);

  const handleBackup = () => {
    const authorizationUrl = `https://accounts.google.com/o/oauth2/v2/auth?scope=${encodeURIComponent(
      SCOPES
    )}&include_granted_scopes=true&response_type=token&redirect_uri=${encodeURIComponent(
      REDIRECT_URI
    )}&client_id=${encodeURIComponent(CLIENT_ID)}`;

    window.location.href = authorizationUrl;
  };

  return (
    <>
      <button className={styles.backupButton} onClick={handleBackup}>
        Backup Workouts
      </button>
    </>
  );
}
