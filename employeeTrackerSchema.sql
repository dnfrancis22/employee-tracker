DROP DATABASE IF EXISTS employee_trackerDB;
CREATE DATABASE employee_trackerDB;
USE employee_trackerDB;

CREATE TABLE department (
id INT NOT NULL AUTO_INCREMENT,
name VARCHAR(30) NOT NULL,
PRIMARY KEY (id)
);

CREATE TABLE role (
id INT NOT NULL AUTO_INCREMENT,
title VARCHAR(30) NOT NULL,
salary DECIMAL(10,2) NOT NULL,
department_id INT,
PRIMARY KEY (id)
);

CREATE TABLE employee (
id INT NOT NULL AUTO_INCREMENT,
first_name VARCHAR(30) NOT NULL,
last_name VARCHAR(30) NOT NULL,
role_id INT NOT NULL,
manager_id INT NULL,
PRIMARY KEY (id)
);

SELECT * FROM  department;

SELECT * FROM  role;

SELECT * FROM  employee;

INSERT INTO department (name)
VALUES ("Marketing");

INSERT INTO role (title, salary, department_id)
VALUES ("Manager", 50000.00, 1),("Developer", 25000.00, 1),("Intern", 5000.00, 1);

INSERT INTO employee (first_name,last_name,role_id,manager_id)
VALUES ("Mike", "Smith", 1, 0),("Bob", "Larry", 2, 1),("Mark", "Doubleu", 3, 1);