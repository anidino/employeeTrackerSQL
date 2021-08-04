DROP TABLE IF EXISTS employee;  
DROP TABLE IF EXISTS employee_role;
DROP TABLE IF EXISTS department;


CREATE TABLE employee (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER NOT NULL,
    manager_id INTEGER,
    CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES employee_role(id) ON DELETE SET NULL
    CONSTRAINT fk_manager_id FOREIGN KEY (manager_id) REFERENCES employee(role_id) ON DELETE SET NULL
);

CREATE TABLE employee_role (
    id INTEGER PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    dept_id INTEGER, 
    CONSTRAINT fk_dept FOREIGN KEY (dept_id) REFERENCES department(id) ON DELETE SET NULL  
);

CREATE TABLE department (
    id INTEGER PRIMARY KEY,
    dept_name VARCHAR(30) NOT NULL
);

