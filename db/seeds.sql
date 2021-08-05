INSERT INTO department (dept_name)
VALUES 
    ('Management'),
    ('Marketing'),
    ('Production'),
    ('Research & Development'),
    ('Sales'),
    ('Human Resources'),
    ('Accounting');


INSERT INTO e_role (title, salary)
VALUES
    ('CEO', 350000),
    ('Digital Marketing Associate', 110000),
    ('Web Developer', 120000),
    ('Research Analyst', 100000),
    ('Sales Representative', 45000),
    ('HR Associate', 85000),
    ('Senior Accountant', 100000);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
  ('Ronald', 'Firbank', 2, 102),
  ('Virginia', 'Woolf', 1, NULL),
  ('Piers', 'Gaveston', 3, 442),
  ('Charles', 'LeRoi', 5, 657),
  ('Katherine', 'Mansfield', 4, NULL),
  ('Dora', 'Carrington', 4, 600),
  ('Edward', 'Bellamy', 3, 703),
  ('Montague', 'Summers', 6, NULL),
  ('Octavia', 'Butler', 5, 718),
  ('Unica', 'Zurn', 7, NULL);










