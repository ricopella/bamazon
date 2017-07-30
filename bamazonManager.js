/* =========================================================================================================

                               bamazon - By: Narin R. Sundarabhaya

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
    'View Products for Sale': () => { showInventory() },
    'View Low Inventory': () => { lowInventory() },
    'Add to Inventory': () => { addInventory() },
    'Add New Product': () => { addProduct() }
}

// global storage of current catalog
let product_catalog = [];
let product_catalog_names = [];

connection.connect();

function menuOptions() {
    inquirer.prompt([{
        name: "menu",
        message: "Please Select Option:",
        type: "list",
        choices: [
            'View Products for Sale',
            'View Low Inventory',
            'Add to Inventory',
            'Add New Product'
        ]
    }]).then(function(answers) {
        // runs the selected function
        options[answers.menu]();
    })
}

function showInventory() {

    connection.query('SELECT * FROM products', function(error, results) {
        if (error) throw error;
        console.log(`------------------------------------------------------------------------------------`.yellow);
        console.log(columnify(results, { columns: ['item_id', 'product_name', 'department_name', 'price', 'stock_quantity'] }))
        console.log(`------------------------------------------------------------------------------------`.yellow);

        // removes RowDataPacket 
        var newResults = JSON.parse(JSON.stringify(results));

        // store data in new arrays for catalog selection
        newResults.forEach((element) => {
            product_catalog_names.push(element.product_name);
        }, this);
        newResults.forEach((element) => {
            product_catalog.push(element);
        }, this);
        menuOptions();
    });

}

function lowInventory() {

    connection.query('SELECT * FROM products WHERE stock_quantity < 5', function(error, results) {
        if (error) throw error;
        console.log(`\n------------------------------------------------------------------------------------\n`.yellow);
        console.log(columnify(results, { columns: ['item_id', 'product_name', 'department_name', 'price', 'stock_quantity'] }))
        console.log(`\n------------------------------------------------------------------------------------\n`.yellow);
        menuOptions();
    });

}

function addInventory() {
    connection.query('SELECT * FROM products', function(error, results) {
        if (error) throw error;
        let newResults = JSON.parse(JSON.stringify(results));

        // store data in new arrays for catalog selection
        newResults.forEach((element) => {
            product_catalog_names.push(element.product_name);
        }, this);
        newResults.forEach((element) => {
            product_catalog.push(element);
        }, this);

        inquirer.prompt([{
            name: "chosenProduct",
            message: "Which Product Would You Like to add Inventory?",
            type: "list",
            choices: product_catalog_names
        }, {
            name: "chosenAmount",
            message: "How many units to purchase?",
            type: "input",
            validate: (value) => {
                let valid = !isNaN(parseFloat(value));
                return valid || 'Please enter a number'
            }
        }]).then(function(answers) {
            let indexOfProduct = product_catalog_names.indexOf(answers.chosenProduct);
            let newQuantity = parseFloat(product_catalog[indexOfProduct].stock_quantity) + parseFloat(answers.chosenAmount);
            connection.query(`UPDATE products SET stock_quantity = ${newQuantity} WHERE item_id = ${indexOfProduct + 1}`, function(error, results) {})
            console.log(`\n- - - - - - - - - -\n`.green);
            console.log(`Inventory Updated!`);
            console.log(`There are now: ${newQuantity} ${answers.chosenProduct}'s in stock`);
            console.log(`\n- - - - - - - - - -\n`.green);
            menuOptions()
        });
    })
}

function addProduct() {

    connection.query('SELECT * FROM products', function(error, results) {
        if (error) throw error;
        let newResults = JSON.parse(JSON.stringify(results));

        // store data in new arrays for catalog selection
        newResults.forEach((element) => {
            product_catalog.push(element);
        }, this);

        inquirer.prompt([{
            name: "new_name",
            message: "What is the Name of the Product?",
            type: "input",
            validate: (value) => {
                if (value.length < 1) {
                    return "Please enter a Product";
                } else {
                    return true;
                }
            }
        }, {
            name: "department",
            message: "What Department Will This Product Be In?",
            type: "list",
            choices: [
                'Computer Electronics',
                'Accessories',
                'Books'
            ]
        }, {
            name: "new_price",
            message: "What will be the Retail Price?",
            type: "input",
            validate: (value) => {
                let valid = !isNaN(parseFloat(value));
                return valid || 'Please enter a number'
            }
        }, {
            name: "new_stock",
            message: "How Many Units to Purchase?",
            type: "input",
            validate: (value) => {
                let valid = !isNaN(parseFloat(value));
                return valid || 'Please enter a number'
            }
        }]).then(function(answers) {
            console.log(answers.new_name, answers.department, answers.new_price, answers.new_stock);
            connection.query(`INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("${answers.new_name}", "${answers.department}", ${answers.new_price}, ${answers.new_stock})`, function(error, results) {})
            console.log(`\n- - - - - - - - -\n`.green);
            console.log(`Product Added Successfully!`);
            console.log(`\n- - - - - - - - -\n`.green);
            menuOptions()
        })
    })
}

menuOptions();