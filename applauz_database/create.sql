DROP TABLE IF EXISTS users;

CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
  name VARCHAR(30)
);

-- INSERT INTO users (name) VALUES ('name');