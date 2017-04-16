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

INSERT INTO products (
	product_name,
    department_name,
    price,
    stock_quantity
) VALUES
("Logan", "Movies & TV", 19.99, 100),
("John Wick: Chapter 2", "Movies & TV", 28.37, 99),
("Game of Thrones - 5 Book Set", "Book", 27.97, 50),
("Harry Potter Paperback Box Set (Books 1-7)", "Books", 52.16, 14),
("Betrayal At House on the Hill", "Toys & Games", 31.49, 20),
("Exploding Kittens", "Toys & Games", 16.99, 4),
("Playstation 4 Slim 500GB Console", "Electronics", 249.99, 7),
("Xbox One S 500GB Console", "Electronics", 244, 6),
("Nintendo Switch", "Electronics", 299.99, 0)
;



SELECT * FROM products;
