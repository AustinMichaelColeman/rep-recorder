import { useEffect, useCallback } from "react";
import { clearWorkouts, addWorkoutLog, getWorkoutLogs } from "./workout-db";

// Eventually this will be moved once I make a backend.
// For now I only run this locally.
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;
const REDIRECT_URI = process.env.NEXT_PUBLIC_REDIRECT_URI;

const BASE_PATH = REDIRECT_URI ? new URL(REDIRECT_URI).pathname : "";
const SCOPES = "https://www.googleapis.com/auth/drive.file";
const FOLDER_NAME = "Rep Recorder Backup";

export const useGoogleDriveAPI = (workouts, setWorkouts) => {
  const getOrCreateBackupFolder = useCallback(async (accessToken) => {
    const query = `mimeType='application/vnd.google-apps.folder' and name='${FOLDER_NAME}' and trashed=false`;
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

      if (!response.ok) {
        throw new Error("Failed to fetch folder: " + response.statusText);
      }

      const jsonResponse = await response.json();
      const folders = jsonResponse.files.filter(
        (file) =>
          file.mimeType === "application/vnd.google-apps.folder" &&
          file.name === FOLDER_NAME
      );

      if (folders.length > 0) {
        return folders[0].id;
      } else {
        const folderId = await createBackupFolder(accessToken);
        return folderId;
      }
    } catch (error) {
      console.log("Error checking folder existence:", error);
      throw error;
    }
  }, []);

  const handleBackupCredentialResponse = useCallback(
    async (params) => {
      if (workouts.length === 0) return;

      if (params.has("access_token")) {
        const accessToken = params.get("access_token");
        window.history.replaceState({}, document.title, `${BASE_PATH}`);
        sessionStorage.removeItem("action");

        try {
          const folderId = await getOrCreateBackupFolder(accessToken);
          await createFileInDrive(accessToken, workouts, folderId);
          console.log("Workout logs backed up successfully.");
        } catch (error) {
          console.log("Error backing up workout logs:", error);
        }
      } else if (params.has("error")) {
        const error = params.get("error");
        console.log("Authorization Error:", error);
      }
    },
    [getOrCreateBackupFolder, workouts]
  );

  const handleRestoreCredentialResponse = useCallback(
    async (params) => {
      if (params.has("access_token")) {
        const accessToken = params.get("access_token");
        window.history.replaceState({}, document.title, `${BASE_PATH}`);
        sessionStorage.removeItem("action");

        try {
          await restoreWorkoutLogs(accessToken);
          const workouts = await getWorkoutLogs();
          setWorkouts(workouts);
        } catch (error) {
          console.log("Error restoring workout logs:", error);
        }
      } else if (params.has("error")) {
        const error = params.get("error");
        console.log("Authorization Error:", error);
      }
    },
    [setWorkouts]
  );

  const createBackupFolder = async (accessToken) => {
    const folderMetadata = {
      name: FOLDER_NAME,
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

      if (!response.ok) {
        throw new Error("Failed to create folder: " + response.statusText);
      }

      const folder = await response.json();
      return folder.id;
    } catch (error) {
      console.log("Error creating folder:", error);
      throw error;
    }
  };

  const createFileInDrive = async (accessToken, data, folderId) => {
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

      if (!response.ok) {
        throw new Error("Failed to create file: " + response.statusText);
      }

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
      throw error;
    }
  };

  const restoreWorkoutLogs = async (accessToken) => {
    const query = `mimeType='application/vnd.google-apps.folder' and name='${FOLDER_NAME}' and trashed=false`;
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

      if (!response.ok) {
        throw new Error("Failed to fetch folder: " + response.statusText);
      }

      const jsonResponse = await response.json();
      const folders = jsonResponse.files.filter(
        (file) =>
          file.mimeType === "application/vnd.google-apps.folder" &&
          file.name === FOLDER_NAME
      );

      if (folders.length === 0) {
        throw new Error(`${FOLDER_NAME} folder not found.`);
      }

      const folderId = folders[0].id;

      const fileListResponse = await fetch(
        `https://www.googleapis.com/drive/v3/files?q='${folderId}' in parents&orderBy=modifiedTime desc`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!fileListResponse.ok) {
        throw new Error(
          "Failed to fetch file list: " + fileListResponse.statusText
        );
      }

      const fileList = await fileListResponse.json();

      if (fileList.files.length === 0) {
        throw new Error("No workout file found in the backup folder.");
      }

      const latestFileId = fileList.files[0].id;

      const fileContentResponse = await fetch(
        `https://www.googleapis.com/drive/v3/files/${latestFileId}?alt=media`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!fileContentResponse.ok) {
        throw new Error(
          "Failed to fetch file content: " + fileContentResponse.statusText
        );
      }

      const fileContent = await fileContentResponse.json();

      // Clear existing workout logs
      await clearWorkouts();

      // Restore workout logs
      for (const workoutLog of fileContent) {
        await addWorkoutLog(workoutLog);
      }
    } catch (error) {
      console.log("Error restoring workout logs:", error);
      throw error;
    }
  };

  const handleBackup = () => {
    const authorizationUrl = `https://accounts.google.com/o/oauth2/v2/auth?scope=${encodeURIComponent(
      SCOPES
    )}&include_granted_scopes=true&response_type=token&redirect_uri=${encodeURIComponent(
      REDIRECT_URI
    )}&client_id=${encodeURIComponent(CLIENT_ID)}&request='backup'`;

    sessionStorage.setItem("action", "backup");
    window.location.href = authorizationUrl;
  };

  const handleRestore = () => {
    const authorizationUrl = `https://accounts.google.com/o/oauth2/v2/auth?scope=${encodeURIComponent(
      SCOPES
    )}&include_granted_scopes=true&response_type=token&redirect_uri=${encodeURIComponent(
      REDIRECT_URI
    )}&client_id=${encodeURIComponent(CLIENT_ID)}&request='restore'`;

    sessionStorage.setItem("action", "restore");

    window.location.href = authorizationUrl;
  };

  const handleCredentialResponse = useCallback(async () => {
    const fragment = window.location.hash.substring(1);
    const params = new URLSearchParams(fragment);

    if (params.has("access_token")) {
      try {
        const storedAction = sessionStorage.getItem("action");
        if (storedAction === "backup") {
          await handleBackupCredentialResponse(params);
        } else if (storedAction === "restore") {
          await handleRestoreCredentialResponse(params);
        }
      } catch (error) {
        console.log("Error:", error);
      }
    }
  }, [handleBackupCredentialResponse, handleRestoreCredentialResponse]);

  useEffect(() => {
    handleCredentialResponse();
  }, [handleCredentialResponse]);

  return { handleBackup, handleRestore };
};
