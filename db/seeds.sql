INSERT INTO department (name)
VALUES 
('Information Technology'),
('Human Resources'),
('Accounting');


INSERT INTO role (title, salary, department_id)
VALUES
('Software Engineer', 100000, 1),
('Human Resources Representative', 50000, 2),
('Accountant', 75000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Bob', 'Smith', 1, ),
('Tina', 'Turner', 2, ),
('John', 'Johnson', 3, );
