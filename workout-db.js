/*

Example of how to use this:

const workoutLog1 = { date: "2022-05-10", exercise: "Bench press", weight: 100, reps: 10 };
const workoutLog2 = { date: "2022-05-11", exercise: "Bench press", weight: 110, reps: 8 };
const workoutLog3 = { date: "2022-05-12", exercise: "Squat", weight: 200, reps: 5 };
addWorkoutLog(workoutLog1);
addWorkoutLog(workoutLog2);
addWorkoutLog(workoutLog3);
getWorkoutLogs();

*/

// open a connection to the workout database
let db;
const request = indexedDB.open("workout_db", 1);

request.onerror = function (event) {
  console.log("Failed to open database:", event.target.error);
};

request.onupgradeneeded = function (event) {
  db = event.target.result;
  const workoutLogs = db.createObjectStore("workout_logs", {
    keyPath: "id",
    autoIncrement: true,
  });
  workoutLogs.createIndex("date", "date", { unique: false });
};

request.onsuccess = function (event) {
  db = event.target.result;
  console.log("Database connection established.");

  const workoutList = document.getElementById("workout-list");
  getWorkoutLogs(workoutList);
};

// add a new workout log to the database
function addWorkoutLog(workoutLog) {
  const transaction = db.transaction(["workout_logs"], "readwrite");
  const workoutLogs = transaction.objectStore("workout_logs");
  const request = workoutLogs.add(workoutLog);

  request.onsuccess = function (event) {
    console.log("Workout log added to database.");
    const workoutList = document.getElementById("workout-list");
    getWorkoutLogs(workoutList);
  };

  request.onerror = function (event) {
    console.log("Failed to add workout log to database:", event.target.error);
  };
}

// retrieve all workout logs from the database and render them in the provided container
function getWorkoutLogs(container) {
  const transaction = db.transaction(["workout_logs"], "readonly");
  const workoutLogs = transaction.objectStore("workout_logs");
  const request = workoutLogs.getAll();

  request.onsuccess = function (event) {
    const workouts = event.target.result;

    // Clear previous workouts
    container.innerHTML = "";

    // Render each workout in the container
    workouts.forEach((workout) => {
      const workoutElement = document.createElement("div");
      workoutElement.textContent = `${workout.date}: ${workout.exercise} - ${workout.weight} lbs x ${workout.reps}`;

      container.appendChild(workoutElement);
    });
  };

  request.onerror = function (event) {
    console.log(
      "Failed to retrieve workout logs from database:",
      event.target.error
    );
  };
}

// search for workout logs by date
function searchWorkoutLogsByDate(date) {
  const transaction = db.transaction(["workout_logs"], "readonly");
  const workoutLogs = transaction.objectStore("workout_logs");
  const index = workoutLogs.index("date");
  const request = index.getAll(IDBKeyRange.only(date));

  request.onsuccess = function (event) {
    console.log("Retrieved workout logs from database:", event.target.result);
  };

  request.onerror = function (event) {
    console.log(
      "Failed to retrieve workout logs from database:",
      event.target.error
    );
  };
}

// Clear all workout logs from the database and the displayed container
function clearWorkouts() {
  const transaction = db.transaction(["workout_logs"], "readwrite");
  const workoutLogs = transaction.objectStore("workout_logs");
  const request = workoutLogs.clear();

  request.onsuccess = function (event) {
    const workoutList = document.getElementById("workout-list");
    workoutList.innerHTML = ""; // Clear the displayed container
    console.log("Workout logs cleared from the database.");
  };

  request.onerror = function (event) {
    console.error(
      "Failed to clear workout logs from the database:",
      event.target.error
    );
  };
}
