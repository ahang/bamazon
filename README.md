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
7. Navigate to `bamazonCustomer.js` update the password field with your password to access the database.

Running the App
1. To access the customer store front, type in `node bamazonCustomer.js`
	- In this app, you, the user, can choose which item to purchase.
	- After inputting an appropriate quantity, the quantity will depelete available quantity for a product and also update the appropriate table with sales
2. To access the manager application, type in `node bamazonManager.js`
	- In this app, you, the user, can choose to View available products for sale, View Low Inventory Count, Replinish stock quantity for a product and Add a new product. 
3. To access the supervisor application, type in `node bamazonSupervisor.js`
	- In this app, you, the user, can View Product Sales by Department, which will allow the app to display a summarized table in terminal/bash window. You can also add a new department.

#### App Working

1. Manager App
	![bamazonmanager](https://cloud.githubusercontent.com/assets/8935847/25115744/cf4442c0-23cd-11e7-9dcc-76c5dc90ff28.gif)
2. Supervisor App
	![bamazonsupervisor](https://cloud.githubusercontent.com/assets/8935847/25115745/cf4fa304-23cd-11e7-9e12-6ccb09ee6016.gif)
3. Customer App
	![bamazoncustomer](https://cloud.githubusercontent.com/assets/8935847/25115746/cf5504f2-23cd-11e7-9051-e1049c4c6cd7.gif)