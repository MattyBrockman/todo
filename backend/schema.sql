CREATE USER todo@localhost IDENTIFIED BY 'todo';

CREATE DATABASE IF NOT EXISTS todo;

GRANT ALL PRIVILEGES ON todo.* TO todo@localhost;

CREATE TABLE IF NOT EXISTS todos(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    completed INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO todos(id, title, completed) VALUES 
    (1, 'Learn HTML', 1),
    (2, 'Learn CSS', 1),
    (3, 'Learn Client-side JavaScript', 0),
    (4, 'Learn Server-side JavaScript', 0),
    (5, 'Create a todo application with HTML, CSS and JavaScript', 0);