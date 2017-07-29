const mysql = require('mysql');
const inquirer = require('inquirer');
const keys = require('./keys');

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
        console.log(results);
    });

}

showInventory();


// connection.end();