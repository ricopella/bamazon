DROP DATABASE IF EXISTS bamazon; 
CREATE DATABASE bamazon; 

DROP TABLE IF EXISTS products; 

CREATE TABLE products (
item_id INTEGER(10) auto_increment NOT NULL PRIMARY KEY UNIQUE,
product_name VARCHAR(100) NOT NULL,
department_name VARCHAR(100) NOT NULL,
price DECIMAL(5,2) NOT NULL,
stock_quantity INTEGER(5) NOT NULL
);

USE bamazon;

SELECT * FROM products;

INSERT INTO products (product_name, department_name, price, stock_quantity)
	VALUES ("Mouse", "Computer Electornics", 79.99, 10);
    
INSERT INTO products (product_name, department_name, price, stock_quantity)
	VALUES ("iPhone 6 Case", "Accessories", 29.99, 40);

INSERT INTO products (product_name, department_name, price, stock_quantity)
	VALUES ("Water Bottle", "Accessories", 19.99, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
	VALUES ("MacBook Pro", "Computer Electornics", 999.99, 4);
    
INSERT INTO products (product_name, department_name, price, stock_quantity)
	VALUES ("Fidget Cube", "Accessories", 29.99, 10);
    
INSERT INTO products (product_name, department_name, price, stock_quantity)
	VALUES ("Javascript the Hard Parts", "Books", 49.99, 10);
    
INSERT INTO products (product_name, department_name, price, stock_quantity)
	VALUES ("Up & Going", "Books", 19.99, 10);
    
INSERT INTO products (product_name, department_name, price, stock_quantity)
	VALUES ("External Charger", "Accessories", 49.99, 15);
    
INSERT INTO products (product_name, department_name, price, stock_quantity)
	VALUES ("Chromecast", "Computer Electornics", 49.99, 15);
    
INSERT INTO products (product_name, department_name, price, stock_quantity)
	VALUES ("24' LCD Monitor", "Computer Electornics", 249.99, 5);
    
ALTER TABLE products ADD product_sales DECIMAL(10,2) NOT NULL;

DROP TABLE IF EXISTS departments; 
    
CREATE TABLE departments (
department_id INTEGER(10) auto_increment NOT NULL PRIMARY KEY UNIQUE,
department_name VARCHAR(100) NOT NULL,
over_head_cost DECIMAL(10,2) NOT NULL
); 

SELECT * FROM departments;

INSERT INTO departments (department_name, over_head_cost)
	VALUES ("Computer Electornics", 2000);
    
INSERT INTO departments (department_name, over_head_cost)
	VALUES ("Accessories", 1000);
    
INSERT INTO departments (department_name, over_head_cost)
	VALUES ("Books", 800);

SELECT departments.department_name, departments.over_head_cost, products.product_sales
FROM departments
INNER JOIN products
ON departments.department_name = products.department_name;

SELECT department_name AS 'Department', SUM(departments.over_head_cost) AS 'Overhead Cost', SUM(products.product_sales) AS 'Total Sales' 
FROM departments
INNER JOIN `departments` on products.department_name=departments.department_name
GROUP BY departments.department_name;

SELECT department_name AS 'Department', SUM(departments.over_head_cost) AS 'Overhead Cost' FROM departments GROUP BY departments.department_name;	

SELECT department_name AS 'Department', SUM(products.product_sales) AS 'Total Sales' FROM products GROUP BY products.department_name;