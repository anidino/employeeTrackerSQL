// dependencies 
const cTable = require("console.table");
// const mysql = require('mysql2');
const inquirer = require("inquirer");
// const mysql = require("mysql2/promise");
// const bluebird = require("bluebird");
const figlet = require("figlet");
const db = require("./db/connection");
// const util = require("util");
const connection = require("./db/connection");



// use figlet to display bubble text welcome in terminal
figlet("Employee Tracker!", (err, data) => {
    if (err)
        throw err;
    console.log(data);

});

// WOULD LIKE TO HAVE THIS IN CONNECTION.JS BUT CODE BREAKS WHEN REMOVED EVEN WHEN FIRSTQUESTION(); IS LEFT *********************
connection.connect((err) => {
    if (err) {
        throw err
    } else {
        console.log("Welcome to your Employee Tracker!")
    } firstQuestion();
});

// connection.query = util.promisify(connection.query);


// function to begin inquirer prompt questions, use async to make promise
//try this block of code, catch any errors
//use switch to evaluate user answer from OptionsList. If the case matches, execute method then break to end case clause. Move to next
const firstQuestion = async () => {
    try {
        let answer = await inquirer.prompt({
            name: "optionsList",
            type: "list",
            message: "What would you like to do first?",
            choices: ["View all Departments", "View all Roles", "View all Employees", "Add a Department", "Add a Role", "Add an Employee", "Update an Employee Role", "Return"]

        });
        switch (answer.optionsList) {
            case "View all Departments":
                viewDepartments();
                break;

            case "View all Roles":
                viewRoles();
                break;

            case "View all Employees":
                viewEmployees();
                break;

            case "Add a Department":
                addDepartment();
                break;

            case "Add a Role":
                addRole();
                break;

            case "Add an Employee":
                addEmployee();
                break;

            case "Update an Employee role":
                updateRole();
                break;

            case "Return":
                connection.end();
                break;
        };

    } catch (err) {
        console.log(err);

    };
}




function viewDepartments() {
    db.query(`SELECT * FROM department`, (err, rows) => {
        if (err) {
            throw err;
        } else {
            console.log("Viewing All Current Departments")
            console.table(rows);
            firstQuestion();
        }
    });
};

//user can view roles
function viewRoles() {

    db.query(`SELECT * FROM e_role`, (err, rows) => {
        if (err) {
            throw err;
        } else {
            console.log("Viewing All Current Roles");
            console.table(rows);
            firstQuestion();
        }
    });
};

// user can view employees 
function viewEmployees() {
    db.query(`SELECT * FROM employee`, (err, rows) => {
        if (err) {
            throw err;
        } else {
            console.log("Viewing All Current Employees");
            console.table(rows);
            firstQuestion();
        }
    })
};



// if user selects add department, they are asked to enter input for new department
//once information is entered a message appears saying it was added successfully
// then user is taken back to 'home menu' using firstQuestion(); 
// when user then clicks on 'View all Departments" from main menu they can see it was added successfully. 
// use similar process for adding role, employee, and updating employee 
async function addDepartment() {
    let deptAnswer = await inquirer.prompt([
        {
            name: "deptName",
            type: "input",
            message: "Please enter the name of the new department."
        }
    ]);

    connection.query(`INSERT INTO department SET ?`, {
        dept_name: deptAnswer.deptName
    });

    console.log(`${deptAnswer.deptName} was successfully added to departments!`)
    firstQuestion();
};

async function addRole() {
    let deptChoices = await connection.promise().query(`SELECT * FROM department`)
    // console.log("============")
    // console.log(deptChoices[0]);
    // console.log("============")
    let deptArray = [];
    for (let i = 0; i < deptChoices[0].length; i++) {   //deptChoices is massive parent array in console 
        deptArray.push(deptChoices[0][i].dept_name)   //previously departArray.push(deptChoices[0][i].deptName)
        // console.log(deptArray)
    }

    // console.log(" dept array " + JSON.stringify(deptArray))
    // let department = connection.query(`SELECT * FROM department`)
    let userRole = await inquirer.prompt([
        {
            name: "title",
            type: "input",
            message: "Please enter the name of the new role"
        },
        {
            name: "salary",
            type: "input",
            message: "Please enter the salary for this role"
        },
        {
            name: "department",
            type: "list",
            choices: deptArray  // user selects from array of depts 

        }

    ]);
    const deptId = await connection.promise().query('SELECT id FROM department WHERE dept_name = ?', userRole.department);
    // console.log(deptId[0]);
    // console.log(deptId[0][0].id);

    connection.query(`INSERT INTO e_role SET ?`, {
        title: userRole.title,                                          // title on right is not part of /same as title on left 
        salary: userRole.salary,
        dept_id: deptId[0][0].id

    });
    // console.log("test", roleResponse);
    console.log(`${userRole.title} was successfully added to Roles!`)
    // console.log(roleResponse)
    firstQuestion();
};

async function addEmployee() {
    let employeeRoleChoices = await connection.promise().query(`SELECT * FROM e_role `)
    console.log(employeeRoleChoices[0])
    let userEmployeeArray = [];
    for (let i = 0; i < employeeRoleChoices[0].length; i++) {
        userEmployeeArray.push(employeeRoleChoices[0][i].title)
        console.log(userEmployeeArray);
    }

    console.log(" employee array " + JSON.stringify(userEmployeeArray))

    // when user selects add employee, they are prompted to enter first_name, last_name, role, and manager. 
    //once user enters all of the above, a message appears saying it was successfully added. 
    //user is returned to 'home screen' via firstquestion(); 
    // when user clicks view all employees, the new employee is there
    //the employee role id references primary key from e_role. the manager id references any other employee  
    let newEmployee = await inquirer.prompt([
        {
            name: "firstName",
            type: "input",
            message: "Please enter the first name of the new employee"
        },
        {
            name: "lastName",
            type: "input",
            message: "Please enter the last name of the new employee"

        },
        {
            name: "employeeRole",
            type: "list",
            choices: userEmployeeArray

        },
        // {
        //     name: "managerId",
        //     type: "input",
        //     message: "Please enter the id of the manager for this employee"
        // }
    ]);
    const employeeRoleId = await connection.promise().query('SELECT id FROM e_role WHERE role_id = ?', newEmployee.e_role);
    console.log(employeeRoleId[0][0].id);
    let employeeRoleResponse = connection.query(`INSERT INTO employee SET `, {
        role_id: employeeRoleId[0][0].id,
        first_name: newEmployee.first_name,
        last_name: newEmployee.last_name,
        manager_id: newEmployee.managerId
    })
    console.log(employeeRoleResponse)

};


























































































