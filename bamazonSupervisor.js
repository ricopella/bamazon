const mysql = require('mysql');
const inquirer = require('inquirer');
const keys = require('./keys');
const colors = require('colors');
const columnify = require('columnify');
const connection = mysql.createConnection({
    host: keys.host,
    user: keys.user,
    password: keys.password,
    database: keys.database
});
const options = {
    'View Product Sales by Department': () => { showDeptSales() },
    'Create New Department': () => { createDept() },
    'Exit': () => { connection.end(); }
}

connection.connect();

function menuOptions() {
    inquirer.prompt([{
        name: "menu",
        message: "Please Select Option:",
        type: "list",
        choices: [
            'View Product Sales by Department',
            'Create New Department',
            'Exit'
        ]
    }]).then(function(answers) {
        // runs the selected function
        options[answers.menu]();
    })
}

function showDeptSales() {

}

function createDept() {
    inquirer.prompt([{
        name: "new_dept",
        message: "What is the Name of the new Department?",
        type: "input",
        validate: (value) => {
            if (value.length < 1) {
                return "Please enter a Product";
            } else {
                return true;
            }
        }
    }, {
        name: "new_overhead",
        message: "What is this departments overhead costs",
        type: "input",
        validate: (value) => {
            let valid = !isNaN(parseFloat(value));
            return valid || 'Please enter a number'
        }
    }]).then(function(answers) {
        connection.query(`INSERT INTO departments (department_name, over_head_cost) VALUES ("${answers.new_dept}", ${answers.new_overhead})`, function(error, results) {})
        console.log(`\n- - - - - - - - -\n`.green);
        console.log(`Department Added Successfully!`);
        console.log(`\n- - - - - - - - -\n`.green);
        menuOptions()
    })
}