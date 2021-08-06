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

// WHY DOES THE CODE BREAK WHEN I TRY TO PUT THIS BLOCK IN CONNECTION.JS (MINUS THE FIRSTQUESTION FUNCTION THAT STAYS HERE) *********************
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

            case "Add a Role":
                addRole();

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
        // firstQuestion();
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
    db.query(`SELECT * FROM e_role`, (err, rows) => {
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
            name: deptName,
            type: input,
            message: "Please enter the name of the new department."
        }
    ]);

    let response = connection.query(`INSERT INTO department SET ?`, {
        dept_name: deptAnswer.deptName
    });
    console.log(response);
    console.log(`${deptName} was successfully added to departments!`)
    firstQuestion();
}

























































































