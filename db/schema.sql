DROP TABLE IF EXISTS employee;  
DROP TABLE IF EXISTS e_role;
DROP TABLE IF EXISTS department;


CREATE TABLE department (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    dept_name VARCHAR(30) NOT NULL
    
);

CREATE TABLE e_role (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL,
    dept_id INTEGER, 
    CONSTRAINT fk_dept FOREIGN KEY (dept_id) REFERENCES department(id) 
   
    -- REFERENCES department(id),
    -- ON DELETE SET NULL,
      
);

CREATE TABLE employee (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER,
    manager_id INTEGER,
    CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES e_role(id) ON DELETE SET NULL
);


-- SELECT employee.id, employee.first_name, employee.last_name, employee_role.title, employee_role.salary FROM employeetracker_db.employee LEFT JOIN employee_role on employee_role.id = employee.role_id


-- CONSTRAINT fk_manager_id FOREIGN KEY (manager_id) REFERENCES employee(role_id) ON DELETE SET NULL
    -- FOREIGN KEY role_id,
    -- REFERENCES e_role(id),