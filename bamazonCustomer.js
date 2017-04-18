var inquirer = require("inquirer");
var mysql = require("mysql");
//======================================================
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "mypass",
    database: "Bamazon"
});

// connection.connect(function(err){
//  if(err) {
//      console.log(err);
//  } else {
//      console.log("connected as id " + connection.threadId);
//  }
// });
//============================================================

//query string to display all products user can select from
var queryItems = "SELECT * FROM products";

connection.query(queryItems, function(err, res) {
    console.log(`Welcome to Bamazon! Below is our current invetory available for purchase. Here at Bamazon we strive for top notch customer service. Please do not hestitate to reach out`);
    //after connection is establish loop through to display the available items.
    for (var i = 0; i < res.length; i++) {
        console.log(`${res[i].item_id} | ${res[i].product_name} | ${res[i].department_name} | Cost: $${res[i].price} | Quantity: ${res[i].stock_quantity}`);
        console.log("=========================================");
    }
    inquirer.prompt([{
        name: "choice",
        type: "list",
        message: "What item would you like to purchase?",
        //pushes the product name to an array and return the array. Allows the user to selects from it
        choices: function() {
            var choiceArray = [];
            for (var i = 0; i < res.length; i++) {
                choiceArray.push(res[i].product_name);
            }
            return choiceArray
        }
    }]).then(function(answer) {
        //console.log(answer);
        var chosenProduct;
        //loops through all available products and checks to see what the user selected 
        for (var i = 0; i < res.length; i++) {
            if (res[i].product_name === answer.choice) {
                chosenProduct = res[i];
                //console.log(chosenProduct);
                inquirer.prompt([{
                    name: "quantity",
                    type: "input",
                    message: "How many would you like to purchase?",
                    //validating user value
                    validate: function(value) {
                        if (isNaN(value) === false) {
                            return true;
                        }
                        return false;
                    }
                }]).then(function(answer) {
                    //console.log(answer);
                    //console.log(chosenProduct.stock_quantity);
                    //console.log(`This is the selected product ${chosenProduct.name}`);

                    if (answer.quantity > chosenProduct.stock_quantity) {
                        //if the user quantity is greater than the available product spit the below message
                        console.log(`I am sorry. We do not carry that many items in stock. Please input a valid quantity for ${chosenProduct.product_name}. We currently only have ${chosenProduct.stock_quantity} in our inventory`);
                    } else {
                        //if the user quantity is less then the stock quantity, update the product table accordingly with the users quantity, also adds the product_sales based on the product price multiplied by the users quantity.
                        var query = "UPDATE products SET stock_quantity = stock_quantity - ?, product_sales = product_sales + (price * ?) WHERE product_name = ?";
                        connection.query(query, [answer.quantity, answer.quantity, chosenProduct.product_name], function(err, res) {
                            //console.log(`This is the price of the product: ${chosenProduct.price}`);
                            //console.log(`This is the product_sales that is being added to the table ${chosenProduct.product_sales}`);
                            //console.log(`Users quantity: ${answer.quantity}`);
                            if (err) throw "Something went wrong. Please try again";

                            //console.log(res);
                            var total = answer.quantity * chosenProduct.price; // gets the total the user will be paying
                            var dept = chosenProduct.department_name; // grabbing the department name of the chosen item
                            //console.log(dept);
                            var deptQuery = "UPDATE departments SET total_sales = total_sales + ? WHERE department_name = ?";
                            //do another connection query to update the departments table with the total sales made
                            connection.query(deptQuery, [total, dept], function(err, res) {
                                if (err) throw "Something went wrong. Please try again";
                                //console.log("Great Success");
                            });
                            var orderNum = Math.floor(Math.random() * 90000) + 10000; //random order number
                            //console.log(total);
                            console.log(`Thank you for purchasing from Bamazon. Your total is $${total.toFixed(2)}. Your order will be delivered in 9 days after confirmation of payment. Please make sure your billing information is up to date. You will be charged shortly.`);
                            console.log("=================================================");
                            console.log(`Transaction completed. Your Order Number is #${orderNum}. Have a nice day. We thank you for for shopping at Bamazon!`);
                            end();
                        });
                    }
                })

            }
        }
    });
});

var end = function() {
    connection.end(function(err) {
        // The connection is terminated now 
    });
}