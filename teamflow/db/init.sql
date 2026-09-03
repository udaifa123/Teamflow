-- DROP TABLE IF EXISTS comments, tasks, project_members, projects, users CASCADE;

-- CREATE TABLE users (
--   id SERIAL PRIMARY KEY,
--   name VARCHAR(100),
--   email VARCHAR(100) UNIQUE,
--   password_hash TEXT,
--   role VARCHAR(20) DEFAULT 'member'
-- );

-- CREATE TABLE projects (
--     id SERIAL PRIMARY KEY,
--     name VARCHAR(100),
--     description TEXT,
--     status VARCHAR(20) DEFAULT 'active',
--     start_date DATE,
--     end_date DATE
-- );

-- CREATE TABLE tasks (
--     id SERIAL PRIMARY KEY,
--     project_id INT REFERENCES projects(id),
--     title VARCHAR(100),
--     description TEXT,
--     status VARCHAR(20) DEFAULT 'todo',
--     priority VARCHAR(20) DEFAULT 'medium',
--     due_date DATE,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

-- CREATE TABLE project_members (
--   id SERIAL PRIMARY KEY,
--   user_id INT REFERENCES users(id),
--   project_id INT REFERENCES projects(id)
-- );

-- CREATE TABLE comments (
--     id SERIAL PRIMARY KEY,
--     message TEXT,
--     task_id INT REFERENCES tasks(id),
--     user_id INT REFERENCES users(id),
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );
