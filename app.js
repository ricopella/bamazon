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

connection.connect();

function showInventory() {

    connection.query('SELECT * FROM products', function(error, results, fields) {
        if (error) throw error;
        // console.log(`| Product ID | Product Name | Department | Price | Quantity |`);
        console.log(`-------------------------------------------------------------`.yellow); // console.log(columnify(`|  ${results[i].item_id}  |  ${results[i].product_name}  |  ${results[i].department_name} |  ${results[i].price}  |  ${results[i].stock_quantity}  |`));
        console.log(columnify(results, { columns: ['item_id', 'product_name', 'department_name', 'price', 'stock_quantity'] }))

        console.log(`-------------------------------------------------------------`.yellow);

    });

}

showInventory();


connection.end();