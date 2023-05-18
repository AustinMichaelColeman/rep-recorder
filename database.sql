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

-- Create the users table
CREATE TABLE users (
    user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) NOT NULL,
    created_at TIMESTAMP with time zone default timezone('utc'::text, now()) not null,
    updated_at TIMESTAMP with time zone default timezone('utc'::text, now()) not null
);

-- template_categories are associated with exercise_templates
-- For example "Cardio", "Bicep", "Back"
CREATE TABLE template_categories (
    template_categories_id SERIAL PRIMARY KEY,
    category_name VARCHAR(255) NOT NULL, -- (eg 'Cardio', 'Bicep', 'Back')
    user_id UUID REFERENCES users(user_id),
    created_at TIMESTAMP with time zone default timezone('utc'::text, now()) not null,
    updated_at TIMESTAMP with time zone default timezone('utc'::text, now()) not null
);

-- exercise_templates are the specific types of exercises a user can perform
-- (eg 'Treadmill', 'Dumbbell Curl', 'Deadlift')
CREATE TABLE exercise_templates (
    exercise_template_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    exercise_name VARCHAR(255) NOT NULL, -- (eg 'Treadmill', 'Dumbbell Curl', 'Deadlift')
    category_id INT REFERENCES template_categories(template_categories_id), -- (eg 'Cardio', 'Bicep', 'Back')
    user_id UUID REFERENCES users(user_id),
    notes TEXT, -- (eg 'Treadmill on the left side of gym', 'Free weight Dumbbell Curls')
    created_at TIMESTAMP with time zone default timezone('utc'::text, now()) not null,
    updated_at TIMESTAMP with time zone default timezone('utc'::text, now()) not null
);

-- training_session_exercises represent the exercises 
-- performed during a training session. For example,
-- it might include 'Treadmill', 'Dumbbell Curl', and 'Deadlift' sets.
-- They all get correlated to a training session, so that they all have one date.
-- The user can also take notes on their training session
CREATE TABLE training_session_exercises (
    training_session_exercise_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(user_id),
    exercise_template_id UUID REFERENCES exercise_templates(exercise_template_id), -- (eg 'Treadmill', 'Dumbbell Curl', 'Deadlift')
    workout_date DATE NOT NULL, -- intended to be a day (eg 5-16-2023)
    exercise_notes TEXT, -- (eg 'Mostly an upper body day, back was tight today but exercise helped')
    created_at TIMESTAMP with time zone default timezone('utc'::text, now()) not null,
    updated_at TIMESTAMP with time zone default timezone('utc'::text, now()) not null
);

-- exercise_logs stores logs of individual exercises performed during
-- training sessions. 
CREATE TABLE exercise_logs (
    log_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(user_id),
    training_session_exercise_id UUID REFERENCES training_session_exercises(training_session_exercise_id),
    weight DECIMAL(5,2),
    reps INT,
    duration INTERVAL,
    distance DECIMAL(5,2),
    calories_burned DECIMAL(5,2),
    level INT,
    notes TEXT,
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

-- Update the trigger for the users table
CREATE TRIGGER update_modtime_users 
BEFORE UPDATE ON users
FOR EACH ROW 
EXECUTE FUNCTION update_modified_column();

-- Update the trigger for the template_categories table
CREATE TRIGGER update_modtime_templatecategories 
BEFORE UPDATE ON template_categories
FOR EACH ROW 
EXECUTE FUNCTION update_modified_column();

-- Update the trigger for the exercise_templates table
CREATE TRIGGER update_modtime_exercisetemplates 
BEFORE UPDATE ON exercise_templates
FOR EACH ROW 
EXECUTE FUNCTION update_modified_column();

-- Update the trigger for the training_session_exercises table
CREATE TRIGGER update_modtime_trainingsessionexercises 
BEFORE UPDATE ON training_session_exercises
FOR EACH ROW 
EXECUTE FUNCTION update_modified_column();

-- Update the trigger for the exercise_logs table
CREATE TRIGGER update_modtime_exerciselogs 
BEFORE UPDATE ON exercise_logs
FOR EACH ROW 
EXECUTE FUNCTION update_modified_column();


--------------------------------------------------------------------------------
-- Example Creation Queries

-- Create a new user
INSERT INTO users (email)
VALUES ('email@example.com');

-- Create a new template category for the user
INSERT INTO template_categories (category_name, user_id)
VALUES ('Cardio', (SELECT user_id FROM users WHERE email = 'email@example.com'));

-- Create a new exercise template for the user
INSERT INTO exercise_templates (exercise_name, category_id, user_id, notes)
VALUES ('Treadmill', (SELECT template_categories_id FROM template_categories WHERE category_name = 'Cardio' AND user_id = (SELECT user_id FROM users WHERE email = 'email@example.com')), (SELECT user_id FROM users WHERE email = 'email@example.com'), 'Treadmill on the left side of gym');

-- Create a new training session exercise for the user
INSERT INTO training_session_exercises (user_id, exercise_template_id, workout_date, exercise_notes)
VALUES ((SELECT user_id FROM users WHERE email = 'email@example.com'), (SELECT exercise_template_id FROM exercise_templates WHERE exercise_name = 'Treadmill' AND user_id = (SELECT user_id FROM users WHERE email = 'email@example.com')), '2023-05-16', 'Mostly an upper body day, back was tight today but exercise helped');

-- Insert exercise logs
INSERT INTO exercise_logs (
    user_id,
    training_session_exercise_id,
    weight,
    reps,
    duration,
    distance,
    calories_burned,
    level,
    notes
)
VALUES (
    (SELECT user_id FROM users WHERE email = 'email@example.com'), -- user_id
    (SELECT training_session_exercise_id
     FROM training_session_exercises
     WHERE user_id = (SELECT user_id FROM users WHERE email = 'email@example.com')
       AND exercise_template_id = (SELECT exercise_template_id FROM exercise_templates WHERE exercise_name = 'Treadmill')), -- training_session_exercise_id
    NULL, -- weight
    NULL, -- reps
    INTERVAL '45 minutes', -- duration
    3.5, -- distance
    500.0, -- calories_burned
    3, -- level
    'Good cardio session' -- notes
);

----------------------------------------------------

-- users Table:

-- Read user information
SELECT user_id, email
FROM users
WHERE user_id = (SELECT user_id FROM users WHERE email = 'email@example.com');

-- Update user information
UPDATE users
SET email = 'johndoe'
WHERE user_id = (SELECT user_id FROM users WHERE email = 'email@example.com');

-- Delete a user
DELETE FROM users
WHERE user_id = (SELECT user_id FROM users WHERE email = 'email@example.com');

----------------------------------------------------

-- template_categories Table:

-- Read template category information
SELECT template_categories_id, category_name
FROM template_categories
WHERE user_id = (SELECT user_id FROM users WHERE email = 'email@example.com');

-- Update template category information
UPDATE template_categories
SET category_name = 'Cardiovascular'
WHERE template_categories_id = (SELECT template_categories_id FROM template_categories WHERE category_name = 'Cardio' AND user_id = (SELECT user_id FROM users WHERE email = 'email@example.com'));

-- Delete a template category
DELETE FROM template_categories
WHERE template_categories_id = (SELECT template_categories_id FROM template_categories WHERE category_name = 'Cardiovascular' AND user_id = (SELECT user_id FROM users WHERE email = 'email@example.com'));

----------------------------------------------------

-- exercise_templates Table:

-- Read exercise template information
SELECT exercise_template_id, exercise_name, category_id, user_id, notes
FROM exercise_templates
WHERE user_id = (SELECT user_id FROM users WHERE email = 'email@example.com');

-- Update exercise template information
UPDATE exercise_templates
SET exercise_name = 'Treadmill Workout', notes = 'New treadmill notes'
WHERE exercise_template_id = (SELECT exercise_template_id FROM exercise_templates WHERE exercise_name = 'Treadmill' AND user_id = (SELECT user_id FROM users WHERE email = 'email@example.com'));

-- Delete an exercise template
DELETE FROM exercise_templates
WHERE exercise_template_id = (SELECT exercise_template_id FROM exercise_templates WHERE exercise_name = 'Treadmill Workout' AND user_id = (SELECT user_id FROM users WHERE email = 'email@example.com'));

----------------------------------------------------

-- training_session_exercises Table

-- Read training session exercise information
SELECT training_session_exercise_id, user_id, exercise_template_id, workout_date, exercise_notes
FROM training_session_exercises
WHERE user_id = (SELECT user_id FROM users WHERE email = 'email@example.com');

-- Update training session exercise information
UPDATE training_session_exercises
SET exercise_notes = 'Focused on legs today'
WHERE training_session_exercise_id = (SELECT training_session_exercise_id FROM training_session_exercises WHERE exercise_notes = 'Mostly an upper body day, back was tight today but exercise helped' AND user_id = (SELECT user_id FROM users WHERE email = 'email@example.com'));

-- Delete a training session exercise
DELETE FROM training_session_exercises
WHERE training_session_exercise_id = (SELECT training_session_exercise_id FROM training_session_exercises WHERE exercise_notes = 'Focused on legs today' AND user_id = (SELECT user_id FROM users WHERE email = 'email@example.com'));

----------------------------------------------------

-- exercise_logs Table

-- Read exercise log information
SELECT log_id, user_id, training_session_exercise_id, weight, reps, duration, distance, calories_burned, level, notes
FROM exercise_logs
WHERE user_id = (SELECT user_id FROM users WHERE email = 'email@example.com');

-- Update exercise log information
UPDATE exercise_logs
SET reps = 15, duration = INTERVAL '1 hour', calories_burned = 600.0, level = 4, notes = 'Increased intensity'
WHERE log_id = (SELECT log_id FROM exercise_logs WHERE user_id = (SELECT user_id FROM users WHERE email = 'email@example.com') LIMIT 1);

-- Delete an exercise log
DELETE FROM exercise_logs
WHERE log_id = (SELECT log_id FROM exercise_logs WHERE user_id = (SELECT user_id FROM users WHERE email = 'email@example.com') LIMIT 1);

