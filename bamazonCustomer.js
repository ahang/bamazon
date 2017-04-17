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
var queryItems = "SELECT * FROM products";

connection.query(queryItems, function(err, res) {
    console.log(`Welcome to Bamazon! Below is our current invetory available for purchase. Here at Bamazon we strive for top notch customer service. Please do not hestitate to reach out`);
    for (var i = 0; i < res.length; i++) {
        console.log(`${res[i].item_id} | ${res[i].product_name} | ${res[i].department_name} | Cost: $${res[i].price} | Quantity: ${res[i].stock_quantity}`);
        console.log("=========================================");
    }
    inquirer.prompt([{
        name: "choice",
        type: "list",
        message: "What item would you like to purchase?",
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
        for (var i = 0; i < res.length; i++) {
            if (res[i].product_name === answer.choice) {
                chosenProduct = res[i];
                //console.log(chosenProduct);
                inquirer.prompt([{
                    name: "quantity",
                    type: "input",
                    message: "How many would you like to purchase?",
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
                        console.log(`I am sorry. We do not carry that many items in stock. Please input a valid quantity for ${chosenProduct.product_name}. We currently only have ${chosenProduct.stock_quantity} in our inventory`);
                    } else {
                        var query = "UPDATE products SET stock_quantity = stock_quantity - ?, product_sales = product_sales + (price * ?) WHERE product_name = ?";
                        connection.query(query, [answer.quantity, answer.quantity, chosenProduct.product_name], function(err, res) {
                            //console.log(`This is the price of the product: ${chosenProduct.price}`);
                            //console.log(`This is the product_sales that is being added to the table ${chosenProduct.product_sales}`);
                            //console.log(`Users quantity: ${answer.quantity}`);
                            if (err) throw err;

                            //console.log(res);
                            var total = answer.quantity * chosenProduct.price;
                            // var dept = chosenProduct.department_name.toString();
                            // console.log(dept);
                            // var deptQuery = "UPDATE departments SET total_sales = total_sales + total WHERE department_name = dept";
                            // connection.query(deptQuery, function(err, res) {
                            //     if (err) throw err;
                            //     console.log("Great Success");
                            // });
                            var orderNum = Math.floor(Math.random() * 90000) + 10000;
                            console.log(total);
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