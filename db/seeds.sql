USE employee_tracker;

INSERT INTO department (name) VALUES ("Sales");
INSERT INTO department (name) VALUES ("Accounting");
INSERT INTO department (name) VALUES ("Warehouse");


INSERT INTO role (title, salary, department_id) VALUES ("Regional Manager", 80000, 1);
INSERT INTO role (title, salary, department_id) VALUES ("Sales Representative I", 53000, 1);
INSERT INTO role (title, salary, department_id) VALUES ("Sales Representative II", 43000, 1);
INSERT INTO role (title, salary, department_id) VALUES("Lead Accountant", 60000, 2);
INSERT INTO role(title, salary, department_id) VALUES("Accountant I", 50000, 2);
INSERT INTO role(title, salary, department_id) VALUES("Accountant II", 40000, 2);
INSERT INTO role(title, salary, department_id) VALUES("Warehouse Lead", 55000, 3);
INSERT INTO role(title, salary, department_id) VALUES("Warehouse Associate I", 40000, 3);
INSERT INTO role(title, salary, department_id) VALUES("Warehouse Associate II", 30000, 3);


INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Michael", "Scott", 1, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Dwight", "Schrute", 2, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Jim", "Halpert", 3, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Oscar", "Martinez", 4, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Kevin", "Malone", 5, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Angela", "Martin", 6, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Darryl", "Philbin", 7, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Roy", "Anderson", 8, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Lonny", "Collins", 9, 3);