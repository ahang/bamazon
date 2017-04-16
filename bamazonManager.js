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
//======================================================

inquirer.prompt([
	{
		name: "choice",
		type: "list",
		message: "Welcome Manager, what would you like to do?",
		choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
	}
]).then(function(answer) {
	console.log(answer);
	if (answer.choice === "View Products for Sale") {
		console.log("Viewing All Products");
		viewProducts();
	} 
	else if (answer.choice === "View Low Inventory") {
		console.log("These items are low");
		viewLow();
	}
	else if(answer.choice === "Add to Inventory") {
		console.log("Adding..");
		addInven();
	}

});


var viewProducts = function() {
	var queryItems = "SELECT * FROM products";

	connection.query(queryItems, function(err, res) {
	    console.log(`These are our available products for sell`);
	    for (var i = 0; i < res.length; i++) {
	        console.log(`${res[i].item_id} | ${res[i].product_name} | ${res[i].department_name} | Cost: $${res[i].price} | Quantity: ${res[i].stock_quantity}`);
	        console.log("=========================================");
	    }
	});
}

var viewLow = function() {
	var queryItems = `SELECT * FROM products GROUP BY product_name HAVING stock_quantity < 5`;

	connection.query(queryItems, function(err, res) {
	    console.log(`The below products need to be replenish. We currently carry less than 5 of the below products.`);
	    console.log("===================================================");
	    //console.log(res);
	    for (var i = 0; i < res.length; i++) {
	        console.log(`${res[i].item_id} | ${res[i].product_name} | ${res[i].department_name} | Cost: $${res[i].price} | Quantity: ${res[i].stock_quantity}`);
	        console.log("=========================================");
	    }
	});

}

var addInven = function() {
	var queryItems = "SELECT * FROM products";

	connection.query(queryItems, function(err, res) {
		inquirer.prompt([
			{
		        name: "choice",
		        type: "list",
		        message: "What item would you like to add available stock quantity for?",
		        choices: function() {
		            var choiceArray = [];
		            for (var i = 0; i < res.length; i++) {
		                choiceArray.push(res[i].product_name);
		            }
		            return choiceArray
		        }
		    }
		]).then(function(response) {
			console.log(response);
	        var chosenProduct;
	        for (var i = 0; i < res.length; i++) {
	            if (res[i].product_name === response.choice) {
	                chosenProduct = res[i];
	                //console.log(chosenProduct);
	                inquirer.prompt([
	                    {
	                        name: "quantity",
	                        type: "input",
	                        message: "How many would you like to add?",
	                        validate: function(value) {
	                            if (isNaN(value) === false) {
	                                return true;
	                            }
	                            return false;
	                        }
	                    }
	                ]).then(function(answer) {
	                	console.log(answer);
	                });
	            }
	        }
		});
	})
}

var addItem = function() {

}


// If a manager selects View Products for Sale, the app should list every available item: the item IDs, names, prices, and quantities.
// If a manager selects View Low Inventory, then it should list all items with a inventory count lower than five.
// If a manager selects Add to Inventory, your app should display a prompt that will let the manager "add more" of any item currently in the store.
// If a manager selects Add New Product, it should allow the manager to add a completely new product to the store.