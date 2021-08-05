DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;
USE employee_db;





DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;
USE employee_db;

DROP TABLE IF EXISTS department;
CREATE TABLE department (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    dept_name VARCHAR(30) NOT NULL
    
);

INSERT INTO department (dept_name)
VALUES 
    ('Management'),
    ('Marketing'),
    ('Production'),
    ('Research & Development'),
    ('Sales'),
    ('Human Resources'),
    ('Accounting');

DROP TABLE IF EXISTS e_role;
CREATE TABLE e_role (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    dept_id INTEGER, 
    CONSTRAINT fk_dept FOREIGN KEY (dept_id) REFERENCES department(id) 
    -- FOREIGN KEY (dept_id),
    -- REFERENCES department(id),
    -- ON DELETE SET NULL,
      
);

INSERT INTO e_role (title, salary)
VALUES
    ('CEO', 350000),
    ('Digital Marketing Associate', 110000),
    ('Web Developer', 120000),
    ('Research Analyst', 100000),
    ('Sales Representative', 45000),
    ('HR Associate', 85000),
    ('Senior Accountant', 100000);


DROP TABLE IF EXISTS employee; 
CREATE TABLE employee (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER,
    manager_id INTEGER,
    CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES e_role(id) ON DELETE SET NULL
    -- CONSTRAINT fk_manager_id FOREIGN KEY (manager_id) REFERENCES employee(role_id) ON DELETE SET NULL
    -- FOREIGN KEY role_id,
    -- REFERENCES e_role(id),
    
);

INSERT INTO employee (first_name, last_name, manager_id)
VALUES
  ('Ronald', 'Firbank', 102),
  ('Virginia', 'Woolf', NULL),
  ('Piers', 'Gaveston', 442),
  ('Charles', 'LeRoi', 657),
  ('Katherine', 'Mansfield', NULL),
  ('Dora', 'Carrington', 600),
  ('Edward', 'Bellamy', 703),
  ('Montague', 'Summers', NULL),
  ('Octavia', 'Butler', 718),
  ('Unica', 'Zurn', NULL);