/* =========================================================================================================

                               bamazon Supervisor - By: Narin R. Sundarabhaya

 =========================================================================================================== */

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
    'Exit': () => { connection.end() }
}

// Inquierer Prompts
let questions = {
    menuQuestion: [{
        name: "menu",
        message: "Please Select Option:",
        type: "list",
        choices: [
            'View Product Sales by Department',
            'Create New Department',
            'Exit'
        ]
    }],
    createDeptQuestion: [{
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
    }]
}

connection.connect();

function menuOptions() {
    console.log("");
    inquirer.prompt(questions.menuQuestion).then((answers) => { options[answers.menu]() })
}

function showDeptSales() {

    connection.query(`SELECT departments.department_id AS 'Department ID', 
                        departments.department_name AS 'Department Name', 
                        departments.over_head_cost as 'Overhead Costs', 
                        SUM(products.product_sales) AS 'Product Sales', 
                        (SUM(products.product_sales) - departments.over_head_cost) AS 'Total Profit'  
                        FROM departments
                        LEFT JOIN products on products.department_name=departments.department_name
                        GROUP BY departments.department_name, departments.department_id, departments.over_head_cost
                        ORDER BY departments.department_id ASC`, function(error, results) {
        if (error) throw error;
        console.log(`\n------------------------------------------------------------------------------------\n`.yellow);
        console.log(columnify(results, { columns: ["Department ID", "Department Name", "Overhead Costs", "Product Sales", "Total Profit"] }));
        console.log(`\n------------------------------------------------------------------------------------\n`.yellow);

        menuOptions();
    })
};

function createDept() {
    inquirer.prompt(questions.createDeptQuestion).then((answers) => {
        connection.query(`INSERT INTO departments (department_name, over_head_cost) VALUES ("${answers.new_dept}", ${answers.new_overhead})`, function(error, results) {})
        console.log(`\n- - - - - - - - -\n`.green);
        console.log(`Department Added Successfully!`);
        console.log(`\n- - - - - - - - -\n`.green);
        menuOptions();
    })
}

menuOptions();