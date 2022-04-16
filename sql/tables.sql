CREATE TABLE users (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	first_name VARCHAR(90) NOT NULL,
	last_name VARCHAR(90) NOT NULL,
	email VARCHAR(255) NOT NULL
);

CREATE TABLE champions (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	title VARCHAR(255) NOT NULL,
	content TEXT,
	image VARCHAR(255) NOT NULL,
	category VARCHAR(255) NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	user_id INT, 
	KEY user_id_idx(user_id)
);

CREATE TABLE category (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	description TEXT,
	category VARCHAR(255) NOT NULL
);

INSERT INTO category (description, category) VALUES (
	"", "Asesino"
);

INSERT INTO category (description, category) VALUES (
	"", "Luchador"
);

INSERT INTO category (description, category) VALUES (
	"", "Mago"
);

INSERT INTO category (description, category) VALUES (
	"", "Tirador"
);

INSERT INTO category (description, category) VALUES (
	"", "Soporte"
);

INSERT INTO category (description, category) VALUES (
	"", "Tanque"
);

INSERT INTO users (first_name, last_name, email) VALUES (
	"Ámbar", "Adriazola", "contacto@AAAQ.cl"
);