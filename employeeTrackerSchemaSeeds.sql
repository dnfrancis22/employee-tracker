INSERT INTO department (name)
VALUES ("Marketing"),("Sales"),("Engineering");

INSERT INTO role (title, salary, department_id)
VALUES ("Marketing Manager", 50000.00, 1),("Sales Manager", 50000.00, 2),("Engineering Manager", 50000.00,3),("Desigener", 25000.00,1),("Sales Person", 25000.00,2),("Developer", 25000.00, 3),("Marketing Intern", 5000.00, 1),("Sales Intern", 5000.00, 2),("Engineering Intern", 5000.00, 3);

INSERT INTO employee (first_name,last_name,role_id,manager)
VALUES ("Mike", "Smith", 1,null),("Lisa", "Lowe", 4,"Mike Smith"),("Mark", "Doubleu", 7,"Mike Smith"),
("Anna", "Stevens", 2,null),("Bob", "Larry", 5,"Anna Stevens"),("Andrea", "Miller", 8,"Anna Stevens"),
("Potter", "Weasley", 3,null),("Rick", "Micheals", 6,"Potter Weasley"),("Pat", "Neil", 9,"Potter Weasley");