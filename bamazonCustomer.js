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

connection.connect(function(err){
	if(err) {
		console.log(err);
	} else {
		console.log("connected as id " + connection.threadId);
	}
});
//============================================================
var queryItems = "SELECT * FROM products";

connection.query(queryItems, function(err, res) {
    console.log(`Welcome to Bamazon here is out current items for sell`);
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
        console.log(answer);
        var chosenProduct;
        for (var i = 0; i < res.length; i++) {
            if (res[i].product_name === answer.choice) {
                chosenProduct = res[i];
                console.log(chosenProduct);
            }
        }
    });
});

