CREATE DATABASE Bamazon;

USE Bamazon;

CREATE TABLE products (
	item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(100),
	price DECIMAL(10,4),
    stock_quantity INTEGER(11),
    PRIMARY KEY (item_id)
);
