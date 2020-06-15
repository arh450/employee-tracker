USE employee_tracker;

USE employee_tracker;

INSERT INTO department (name) VALUES ("Sales");
INSERT INTO department (name) VALUES ("Engineering");
INSERT INTO department (name) VALUES ("Finance");
INSERT INTO department (name) VALUES ("Legal");

INSERT INTO role (title, salary, department_id) VALUES ("Sales Lead", 80000, 1);
INSERT INTO role (title, salary, department_id) VALUES ("Sales Representative", 40000, 1);
INSERT INTO role (title, salary, department_id) VALUES ("Lead Engineer", 120000, 2);
INSERT INTO role (title, salary, department_id) VALUES ("Software Engineer", 100000, 2);
INSERT INTO role (title, salary, department_id) VALUES ("Financial Analyst", 85000, 3);
INSERT INTO role (title, salary, department_id) VALUES ("Accountant", 55000, 3);
INSERT INTO role (title, salary, department_id) VALUES ("Lawyer", 175000, 4);
INSERT INTO role (title, salary, department_id) VALUES ("Paralegal", 40000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Michael", "Scott", 1, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Dwight", "Schrute", 2, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Jim", "Halpert", 3, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Andy", "Bernard", 4, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Kevin", "Malone", 5, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Ryan", "Howard", 6, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Pam", "Beasley", 7, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Oscar", "Martinez", 8, null);
