
-- register/login 
CREATE DATABASE dgtue9kr9mtm6;

-- table for register/login
CREATE TABLE users(
  user_id SERIAL PRIMARY KEY,
  name VARCHAR(90) NOT NULL,
  email VARCHAR(90) UNIQUE NOT NULL,
  password VARCHAR(225) NOT NULL
);

--fake users to test DB
INSERT INTO users (name, email, password)
VALUES ('Kim', 'kim@gmail.com', 'kim1234');