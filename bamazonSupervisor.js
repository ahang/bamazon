var inquirer = require("inquirer");
var mysql = require("mysql");
var Table = require("cli-table");


//======================================================
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "#",
    database: "Bamazon"
});
//======================================================

//prompts the user what they would like to do
var startSupervisor = function() {
    inquirer.prompt([{
        name: "choice",
        type: "list",
        message: "Welcome Capitan, what would you like to do?",
        choices: ["View Product Sales by Department", "Create New Department"]
    }]).then(function(answer) {
        //console.log(answer);
        if (answer.choice === "View Product Sales by Department") {
            //console.log("Viewing Product sales");
            viewProduct();
        } else {
            //console.log("Adding new Department");
            createDept();
        }

    });
}

var viewProduct = function() {
    //grabbing the department table and spitting it out. Making an alias temporarily to create a total_profit column during the query call
    var query = "SELECT department_id, department_name, over_head_costs, total_sales, (total_sales - over_head_costs) as total_profit FROM departments";
    connection.query(query, function(err, res) {
        //console.log("Working..");
        //instantiates a new table
        var table = new Table({
            //declaring column names
            head: ["Department ID", "Department Name", "Over Head Costs", "Total Sales", "Total Profit"],
            //setting width of table
            colWidths: [25, 30, 25, 25, 25]
        });
        //loops through the results and pushes it into the table
        for (var i = 0; i < res.length; i++) {
            table.push(
                [res[i].department_id, res[i].department_name, "$" + res[i].over_head_costs, "$" + res[i].total_sales, "$" + res[i].total_profit]
            );
        }
        //displays the table
        console.log(table.toString());
        end();
    });
}

var createDept = function() {
    //ask the user the following information
    inquirer.prompt([{
            name: "department",
            type: "input",
            message: "What Department would you like to create?"
        },
        {
            name: "over",
            type: "input",
            message: "What is it's overhead costs?",
            validate: function(value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        }
    ]).then(function(response) {
        var query = "INSERT INTO departments SET ?";
        //makes a connection call to the department table and adds the follow responses to table columns
        connection.query(query, {
            department_name: response.department,
            over_head_costs: response.over,
            total_sales: 0
        }, function(err) {
            if (err) throw err;
            console.log(`Successfully added ${response.department}!`);
            end();
        })
    })
}

var end = function() {
    connection.end(function(err) {
        // The connection is terminated now
    });
}

startSupervisor();