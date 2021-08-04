// dependencies 
const cTable = require("console.table");
const inquirer = require("inquirer");
const mysql = require("mysql2/promise");
// const bluebird = require("bluebird");
const figlet = require("figlet");
const db = require("./db/connection");
const util = require("util");


const PORT = process.env.PORT || 3001;

db.query = util.promisify(db.query);

// use figlet to display bubble text welcome
figlet("Your Employee Tracker!", (err, data) => {
    if (err) {
        throw err;
    } else {
        console.table(data);
    }
});

db.connect(err => {
    if (err) {
        throw err;
    } else {
        console.log("Welcome to your Employee Tracker!");
    }
});

// function to begin inquirer prompt questions 
const firstQuestion = () => {
    return inquirer.prompt([
        {
            name: "optionsList",
            type: "list",
            message: "What would you like to do first?",
            choices: ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update an employee role"]

        }

    ]).then((answer) => {
        switch (answer.optionsList) {
            case "View all Departments":
                viewDepartments();
                break;

            case "View all Roles":
                viewRoles();
                break;

            case "View all Employess":
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

            case "Update an Employee":
                updateEmployee();
                break;

            case "Return":
                db.end();
                break;



        }
    });


};



firstQuestion();








// start server after db connection
// db.connect(err => {
//     if (err) throw err;
//     console.log("Database connected");
//     app.listen(PORT, () => {
//         console.log(`Server running on port ${PORT}`);
//     });
// });