# bamazon

# About
Created an Amazon-like storefront with MySQL and Node. The app takes in orders from customers and depelte stock from the store's inventory. The app also tracks product sales across store's departments and provides a summary of the highest-grossing department in the store.

### How to use
Setup
1. Clone Repo and extract to an accessible location
2. Navigate in `Git` to root of the folder bamazon
3. Type in `npm -install`
4. Open up the folder in your favorite text editor.
5. Use `schema.sql` to create the necessary database and tables
6. Use `seeds.sql` to generate some data.
7. Navigate to `bamazonCustomer.js`, `bamazonManager.js` and `bamazonSupervisor.js` and update the password field with your password to access the database.

Running the App
1. To access the customer store front, type in `node bamazonCustomer.js`
	- In this app, you, the user, can choose which item to purchase.
	- After inputting an appropriate quantity, the quantity will depelete available quantity for a product and also update the appropriate table with sales
2. To access the manager application, type in `node bamazonManager.js`
	- In this app, you, the user, can choose to View available products for sale, View Low Inventory Count, Replinish stock quantity for a product and Add a new product.
3. To access the supervisor application, type in `node bamazonSupervisor.js`
	- In this app, you, the user, can View Product Sales by Department, which will allow the app to display a summarized table in terminal/bash window. You can also add a new department.

#### App Working

1. Customer App
    ![bamazoncustomer](https://cloud.githubusercontent.com/assets/8935847/25162544/511de54c-2489-11e7-91ed-7badf8a539d3.gif)
2. Manager App
	![bamazonmanager](https://cloud.githubusercontent.com/assets/8935847/25162545/512020be-2489-11e7-9eb8-1c19f15c7780.gif)
3. Supervisor App
	![bamazonsupervisor](https://cloud.githubusercontent.com/assets/8935847/25162546/512071c2-2489-11e7-8253-cfa10cb61cfd.gif)
