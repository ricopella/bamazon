# bamazon

### Overview

This application is an Amazon-like storefront with [MySQL](https://www.npmjs.com/package/mysql) & [Node.JS](https://www.npmjs.com/). The app has three modules:

* **Customer Module** - displays product catalog & customers are able to purchase items.
* **Manager Module** - displays product catalog, low inventory, purchase inventory, add new products.
* **Supervisor Module** - displays product sales by department and functionality to create new departments.

# Getting Started

Follow these instructions to clone the project and run on your local drive.

### Prerequisites

You will need [Node.JS](https://www.npmjs.com/) installed on your system.



### Installing

1. Clone project: 

        `git clone https://github.com/ricopella/bamazon.git`

2. Inside the root directory of the cloned filed, run the following command in your terminal/bash:

        `npm install`

* **Please Note**: You must obtain `keys.js` by [@ricopella](https://github.com/ricopella) to gain access to the database credentials.

# Commands to run application

1. `node bamazonCustomer.js`

    * This will start the `Customer Module`. 
    * Product Catalog is displayed with `Product Name`, `Department Name`, `Price`, and `Stock Quantity`.
        * Out-of-Stock items are not displayed.
    * Customers are able to select a product to purchase & number of units.
        * Customers are not able to purchase items with insufficent stock.
    * A `Total Bill` is displayed.
    * Purchased items `Stock Quantity` is decreased.
    

2. `node bamazonManager.js`

    * This will start the `Manager Module`. Managers are able to:
        * `View Products For Sale`
            * Product Catalog is displayed with `Product Name`, `Department Name`, `Price`, and `Stock Quantity`.
            * Out-of-Stock items are not displayed.
        * `View Low Inventory`.
            * Lists all items with an inventory count lower than five.
        * `Add to Inventory`.
            * Manager is able to add more stock to any item currently in store.
        * `Add New Product`.
            * Manager can add a new product to the store.

3. `node bamazonSupervisor.js`

    * This will start the `Supervisor Module`. Supvervisors are able to:
        * `View Product Sales by Department`.
            * This displays a summarized table showing `Department ID`, `Department Name`, `Overhead Costs`, `Product Sales`, and `Total Profits`.
        * `Create New Department`.
            * Supervisors can add a new department to the store.


# Demo

 ![Demo](example.gif) 

# Packages Used

* [Node.JS](https://www.npmjs.com/)
* [Colors](https://www.npmjs.com/package/colors)
* [Inquirer](https://www.npmjs.com/package/inquirer)
* [MySQL](https://www.npmjs.com/package/mysql)
* [Columnify](https://www.npmjs.com/package/columnify)
