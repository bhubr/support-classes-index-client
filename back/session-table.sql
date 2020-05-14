CREATE TABLE session (
  id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  language ENUM('php','js'),
  created_at DATE,
  description TEXT
);

CREATE TABLE resource (
  id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  link VARCHAR(255),
  session_id INTEGER NOT NULL
);

ALTER TABLE resource ADD CONSTRAINT fk_resource_session FOREIGN KEY(session_id) REFERENCES session(id);

