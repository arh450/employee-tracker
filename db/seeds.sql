USE employee_tracker;

INSERT INTO department (name) VALUES ("Sales");

INSERT INTO role (title, salary, department_id) VALUES ("Sales Lead", 80000, 1);
INSERT INTO role (title, salary, department_id) VALUES ("Sales Representative", 40000, 1);


INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Michael", "Scott", 1, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Dwight", "Schrute", 2, 2);