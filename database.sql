-- This file contains the PostgreSQL database schema
-- I plan to use for my backend, along with 
-- example queries.

\c postgres

-- Delete the database
DROP DATABASE IF EXISTS workout_tracker;

-- Create the database
CREATE DATABASE workout_tracker;

-- Connect to the database
\c workout_tracker;

-- Create the Users table
CREATE TABLE Users (
    UserID UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    Username VARCHAR(255) NOT NULL,
    PasswordHash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP with time zone default timezone('utc'::text, now()) not null,
    updated_at TIMESTAMP with time zone default timezone('utc'::text, now()) not null
);

-- TemplateCategories are associated with ExerciseTemplates
-- For example "Cardio", "Bicep", "Back"
CREATE TABLE TemplateCategories (
    TemplateCategoriesID SERIAL PRIMARY KEY,
    CategoryName VARCHAR(255) NOT NULL, -- (eg 'Cardio', 'Bicep', 'Back')
    UserID UUID REFERENCES Users(UserID),
    created_at TIMESTAMP with time zone default timezone('utc'::text, now()) not null,
    updated_at TIMESTAMP with time zone default timezone('utc'::text, now()) not null
);

-- ExerciseTemplates are the specific types of exercises a user can perform
-- (eg 'Treadmill', 'Dumbbell Curl', 'Deadlift')
CREATE TABLE ExerciseTemplates (
    ExerciseTemplateID UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ExerciseName VARCHAR(255) NOT NULL, -- (eg 'Treadmill', 'Dumbbell Curl', 'Deadlift')
    CategoryID INT REFERENCES TemplateCategories(TemplateCategoriesID), -- (eg 'Cardio', 'Bicep', 'Back')
    UserID UUID REFERENCES Users(UserID),
    Notes TEXT, -- (eg 'Treadmill on the left side of gym', 'Free weight Dumbbell Curls')
    created_at TIMESTAMP with time zone default timezone('utc'::text, now()) not null,
    updated_at TIMESTAMP with time zone default timezone('utc'::text, now()) not null
);

-- TrainingSessionExercises represent the exercises 
-- performed during a training session. For example,
-- it might include 'Treadmill', 'Dumbbell Curl', and 'Deadlift' sets.
-- They all get correlated to a training session, so that they all have one date.
-- The user can also take notes on their training session
CREATE TABLE TrainingSessionExercises (
    TrainingSessionExerciseID UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    UserID UUID REFERENCES Users(UserID),
    ExerciseTemplateID UUID REFERENCES ExerciseTemplates(ExerciseTemplateID), -- (eg 'Treadmill', 'Dumbbell Curl', 'Deadlift')
    WorkoutDate DATE NOT NULL, -- intended to be a day (eg 5-16-2023)
    ExerciseNotes TEXT, -- (eg 'Mostly an upper body day, back was tight today but exercise helped')
    created_at TIMESTAMP with time zone default timezone('utc'::text, now()) not null,
    updated_at TIMESTAMP with time zone default timezone('utc'::text, now()) not null
);

-- ExerciseLogs stores logs of individual exercises performed during
-- training sessions. 
CREATE TABLE ExerciseLogs (
    LogID UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    UserID UUID REFERENCES Users(UserID),
    TrainingSessionExerciseID UUID REFERENCES TrainingSessionExercises(TrainingSessionExerciseID),
    Weight DECIMAL(5,2),
    Reps INT,
    Duration INTERVAL,
    Distance DECIMAL(5,2),
    CaloriesBurned DECIMAL(5,2),
    Level INT,
    Notes TEXT,
    created_at TIMESTAMP with time zone default timezone('utc'::text, now()) not null,
    updated_at TIMESTAMP with time zone default timezone('utc'::text, now()) not null
);

--------------------------------------------------------------------------------
-- make updated_at work properly for each table:
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = current_timestamp;
   RETURN NEW; 
END;
$$ LANGUAGE 'plpgsql';

-- Update the trigger for the Users table
CREATE TRIGGER update_modtime_users 
BEFORE UPDATE ON Users
FOR EACH ROW 
EXECUTE FUNCTION update_modified_column();

-- Update the trigger for the TemplateCategories table
CREATE TRIGGER update_modtime_templatecategories 
BEFORE UPDATE ON TemplateCategories
FOR EACH ROW 
EXECUTE FUNCTION update_modified_column();

-- Update the trigger for the ExerciseTemplates table
CREATE TRIGGER update_modtime_exercisetemplates 
BEFORE UPDATE ON ExerciseTemplates
FOR EACH ROW 
EXECUTE FUNCTION update_modified_column();

-- Update the trigger for the TrainingSessionExercises table
CREATE TRIGGER update_modtime_trainingsessionexercises 
BEFORE UPDATE ON TrainingSessionExercises
FOR EACH ROW 
EXECUTE FUNCTION update_modified_column();

-- Update the trigger for the ExerciseLogs table
CREATE TRIGGER update_modtime_exerciselogs 
BEFORE UPDATE ON ExerciseLogs
FOR EACH ROW 
EXECUTE FUNCTION update_modified_column();


--------------------------------------------------------------------------------
-- Example Creation Queries

-- Create a new user
INSERT INTO Users (Username, PasswordHash)
VALUES ('john_doe', 'hashed_password');

-- Create a new template category for the user
INSERT INTO TemplateCategories (CategoryName, UserID)
VALUES ('Cardio', (SELECT UserID FROM Users WHERE Username = 'john_doe'));

-- Create a new exercise template for the user
INSERT INTO ExerciseTemplates (ExerciseName, CategoryID, UserID, Notes)
VALUES ('Treadmill', (SELECT TemplateCategoriesID FROM TemplateCategories WHERE CategoryName = 'Cardio' AND UserID = (SELECT UserID FROM Users WHERE Username = 'john_doe')), (SELECT UserID FROM Users WHERE Username = 'john_doe'), 'Treadmill on the left side of gym');

-- Create a new training session exercise for the user
INSERT INTO TrainingSessionExercises (UserID, ExerciseTemplateID, WorkoutDate, ExerciseNotes)
VALUES ((SELECT UserID FROM Users WHERE Username = 'john_doe'), (SELECT ExerciseTemplateID FROM ExerciseTemplates WHERE ExerciseName = 'Treadmill' AND UserID = (SELECT UserID FROM Users WHERE Username = 'john_doe')), '2023-05-16', 'Mostly an upper body day, back was tight today but exercise helped');

-- Insert exercise logs
INSERT INTO ExerciseLogs (
    UserID,
    TrainingSessionExerciseID,
    Weight,
    Reps,
    Duration,
    Distance,
    CaloriesBurned,
    Level,
    Notes
)
VALUES (
    (SELECT UserID FROM Users WHERE Username = 'john_doe'), -- UserID
    (SELECT TrainingSessionExerciseID
     FROM TrainingSessionExercises
     WHERE UserID = (SELECT UserID FROM Users WHERE Username = 'john_doe')
       AND ExerciseTemplateID = (SELECT ExerciseTemplateID FROM ExerciseTemplates WHERE ExerciseName = 'Treadmill')), -- TrainingSessionExerciseID
    NULL, -- Weight
    NULL, -- Reps
    INTERVAL '45 minutes', -- Duration
    3.5, -- Distance
    500.0, -- CaloriesBurned
    3, -- Level
    'Good cardio session' -- Notes
);

----------------------------------------------------

-- Users Table:

-- Read user information
SELECT UserID, Username, PasswordHash
FROM Users
WHERE UserID = (SELECT UserID FROM Users WHERE Username = 'john_doe');

-- Update user information
UPDATE Users
SET Username = 'johndoe'
WHERE UserID = (SELECT UserID FROM Users WHERE Username = 'john_doe');

-- Delete a user
DELETE FROM Users
WHERE UserID = (SELECT UserID FROM Users WHERE Username = 'john_doe');

----------------------------------------------------

-- TemplateCategories Table:

-- Read template category information
SELECT TemplateCategoriesID, CategoryName
FROM TemplateCategories
WHERE UserID = (SELECT UserID FROM Users WHERE Username = 'john_doe');

-- Update template category information
UPDATE TemplateCategories
SET CategoryName = 'Cardiovascular'
WHERE TemplateCategoriesID = (SELECT TemplateCategoriesID FROM TemplateCategories WHERE CategoryName = 'Cardio' AND UserID = (SELECT UserID FROM Users WHERE Username = 'john_doe'));

-- Delete a template category
DELETE FROM TemplateCategories
WHERE TemplateCategoriesID = (SELECT TemplateCategoriesID FROM TemplateCategories WHERE CategoryName = 'Cardiovascular' AND UserID = (SELECT UserID FROM Users WHERE Username = 'john_doe'));

----------------------------------------------------

-- ExerciseTemplates Table:

-- Read exercise template information
SELECT ExerciseTemplateID, ExerciseName, CategoryID, UserID, Notes
FROM ExerciseTemplates
WHERE UserID = (SELECT UserID FROM Users WHERE Username = 'john_doe');

-- Update exercise template information
UPDATE ExerciseTemplates
SET ExerciseName = 'Treadmill Workout', Notes = 'New treadmill notes'
WHERE ExerciseTemplateID = (SELECT ExerciseTemplateID FROM ExerciseTemplates WHERE ExerciseName = 'Treadmill' AND UserID = (SELECT UserID FROM Users WHERE Username = 'john_doe'));

-- Delete an exercise template
DELETE FROM ExerciseTemplates
WHERE ExerciseTemplateID = (SELECT ExerciseTemplateID FROM ExerciseTemplates WHERE ExerciseName = 'Treadmill Workout' AND UserID = (SELECT UserID FROM Users WHERE Username = 'john_doe'));

----------------------------------------------------

-- TrainingSessionExercises Table

-- Read training session exercise information
SELECT TrainingSessionExerciseID, UserID, ExerciseTemplateID, WorkoutDate, ExerciseNotes
FROM TrainingSessionExercises
WHERE UserID = (SELECT UserID FROM Users WHERE Username = 'john_doe');

-- Update training session exercise information
UPDATE TrainingSessionExercises
SET ExerciseNotes = 'Focused on legs today'
WHERE TrainingSessionExerciseID = (SELECT TrainingSessionExerciseID FROM TrainingSessionExercises WHERE ExerciseNotes = 'Mostly an upper body day, back was tight today but exercise helped' AND UserID = (SELECT UserID FROM Users WHERE Username = 'john_doe'));

-- Delete a training session exercise
DELETE FROM TrainingSessionExercises
WHERE TrainingSessionExerciseID = (SELECT TrainingSessionExerciseID FROM TrainingSessionExercises WHERE ExerciseNotes = 'Focused on legs today' AND UserID = (SELECT UserID FROM Users WHERE Username = 'john_doe'));

----------------------------------------------------

-- ExerciseLogs Table

-- Read exercise log information
SELECT LogID, UserID, TrainingSessionExerciseID, Weight, Reps, Duration, Distance, CaloriesBurned, Level, Notes
FROM ExerciseLogs
WHERE UserID = (SELECT UserID FROM Users WHERE Username = 'john_doe');

-- Update exercise log information
UPDATE ExerciseLogs
SET Reps = 15, Duration = INTERVAL '1 hour', CaloriesBurned = 600.0, Level = 4, Notes = 'Increased intensity'
WHERE LogID = (SELECT LogID FROM ExerciseLogs WHERE UserID = (SELECT UserID FROM Users WHERE Username = 'john_doe') LIMIT 1);

-- Delete an exercise log
DELETE FROM ExerciseLogs
WHERE LogID = (SELECT LogID FROM ExerciseLogs WHERE UserID = (SELECT UserID FROM Users WHERE Username = 'john_doe') LIMIT 1);

