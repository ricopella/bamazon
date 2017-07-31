/* =========================================================================================================

                               bamazon Customer - By: Narin R. Sundarabhaya

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

var runProgram = {
    product_catalog: [],
    product_catalog_names: [],
    addProduct_catalog_names: function() {
        newResults.forEach((element) => {
            this.product_catalog_names.push(element.product_name);
        }, this);
    },
    addProduct_catalog: function() {
        newResults.forEach((element) => {
            this.product_catalog.push(element);
        }, this);
    },

    showInventory: function() {
        // only display items in stock
        connection.query('SELECT * FROM products WHERE stock_quantity != 0', function(error, results) {
            if (error) throw error;
            console.log(`------------------------------------------------------------------------------------`.yellow);
            console.log(columnify(results, { columns: ['item_id', 'product_name', 'department_name', 'price', 'stock_quantity'] }))
            console.log(`------------------------------------------------------------------------------------`.yellow);

            // removes RowDataPacket 
            var newResults = JSON.parse(JSON.stringify(results));

            // store data in new arrays for catalog selection

        }, this.purchase(this.product_catalog, this.product_catalog_names), this.addProduct_catalog(newResults), this.addProduct_catalog_names(newResults));

    },
    purchase: function(product_catalog, product_catalog_names) {
        console.log("");
        inquirer.prompt([{
                name: "purchase_id",
                message: "Which product would you like to purchase?",
                type: "list",
                choices: product_catalog_names,
            },
            {
                name: "purchase_amount",
                message: "How many units would you like to purchase?",
                type: "input",
                validate: (value) => {
                    let valid = !isNaN(parseFloat(value));
                    return valid || 'Please enter a number'
                }
            }
        ]).then(function(answers) {
            // refrences id of chosen product
            let chosen_id = product_catalog_names.indexOf(answers.purchase_id) + 1;

            // stores product selected by user to edit db
            let chosen_product = product_catalog[chosen_id - 1];

            // validate if product is in stock
            if (chosen_product.stock_quantity < answers.purchase_amount) {
                console.log(`\n - - - - -  - - - - - - - - - - - - - - - - - - \n`.red);
                console.log('Insufficient quantity!'.red);
                console.log(`\n - - - - -  - - - - - - - - - - - - - - - - - - \n`.red);

                this.purchase(product_catalog, product_catalog_names);
            } else {
                // store current stock amount
                let current_quantity = chosen_product.stock_quantity - answers.purchase_amount;
                let totalSale = Math.round(answers.purchase_amount * chosen_product.price);
                let increaseSales = Math.round(chosen_product.product_sales) + totalSale;
                // update db of stock quantity
                connection.query(`UPDATE products SET stock_quantity=${current_quantity}, product_sales=${increaseSales} WHERE item_id = ${chosen_id}`, function(error, results) {
                    console.log(`\n - - - - -  - - - - - - - - - - - - - - - - - - \n`.green);
                    console.log(`Items Purchased:\n`);
                    console.log(`${chosen_product.product_name} = ${chosen_product.price} x ${answers.purchase_amount}`);
                    console.log(`Your total will be: $${chosen_product.price * answers.purchase_amount}\n`);
                    console.log(`\n - - - - -  - - - - - - - - - - - - - - - - - - \n`.green);

                    this.showInventory();
                })
            }
        });
    }
}

runProgram.showInventory();