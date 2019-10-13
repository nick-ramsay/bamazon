var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "data.Dump89",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) {
        throw err
    }
});

currentItems = [];

var separator = "---------------------------------";

function displayItems() {
    connection.query("select * from products;", function (err, res) {
        if (err) {
            throw err;
        } else {
            res.forEach(function (item, index) {
                currentItems.push(res[index].item_id);
                var item = "---- Item ID #: " + res[index].item_id + " ----\n";
                item += "Product: " + res[index].product_name + "\n";
                item += "Price: $" + res[index].price + "\n";
                item += separator;
                console.log(item);
            });
            purchase();
        }
    })
};

function purchase() {
    inquirer
        .prompt([
            {
                name: "id",
                type: "number",
                message: "What item ID would you like to purchase?",
                validate: function (input) {
                    if (currentItems.indexOf(input) == -1) {
                        return "This item ID doesn't exist. Try again.";
                    } else {
                        return true;
                    }
                }
            },
            {
                name: "quantity",
                type: "number",
                message: "How many units of this item would you like to purchase?"
            }
        ]).then(function (answer) {
            var query = connection.query(
                "select * from bamazon.products where item_id = " + answer.id + ";",
                function (err, res) {
                    var itemResults = res;
                    if (err) {
                        throw err;
                    } else if (answer.quantity > res[0].stock_quantity) {
                        console.log("Insufficient quantity!\nTry again.");
                        purchase();
                    } else {
                        var newQuantity = res[0].stock_quantity - answer.quantity;
                        var salesTotal = (answer.quantity * itemResults[0].price);
                        connection.query(
                            "UPDATE products SET stock_quantity = " + newQuantity + ", product_sales = product_sales + " + salesTotal + " where item_id = " + answer.id + ";",
                            function (err, res) {
                                if (err) {
                                    throw err;
                                } else {
                                    console.log("Thank you for purchasing " + answer.quantity + " unit(s) of " + itemResults[0].product_name + ".\nYour total cost was: $" + salesTotal);
                                }
                                shopAgain();
                            });
                    }
                })
        });
}

function shopAgain() {
    inquirer
        .prompt({
            name: "restart",
            type: "confirm",
            message: "Would you like to try another search?",
            default: true
        }).then(function (answer) {
            switch (answer.restart) {
                case true:
                    displayItems();
                    break;
                case false:
                    exit();
                    break;
            }
        }
        )
};

function exit() {
    console.log("Goodbye.");
    connection.end();
};

displayItems();