INSERT INTO department(id, name) VALUES (1, "Softwareentwicklung");
INSERT INTO department(id, name) VALUES (2, "Vertrieb");

INSERT INTO employee(id, department_id, first_name, last_name, job_title, entry_date) VALUES (1, 1, "Noel", "Lang", "Fachinformatiker", CURRENT_DATE);
INSERT INTO employee(id, department_id, first_name, last_name, job_title, entry_date) VALUES (2, 1, "Max", "Mustermann", "Produktdesigner", CURRENT_DATE);
INSERT INTO employee(id, department_id, first_name, last_name, job_title, entry_date) VALUES (3, 1, "Dieter", "Bauer", "Front-End Entwickler", CURRENT_DATE);
INSERT INTO employee(id, department_id, first_name, last_name, job_title, entry_date) VALUES (4, 1, "Mike", "Kirsch", "Front-End Entwickler", CURRENT_DATE);
