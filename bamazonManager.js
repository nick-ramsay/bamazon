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

var currentItemNames = [];
var currentItemDepartments = [];

function renderCurrentItemNames() {
    connection.query("select * from products;", function (err, res) {
        if (err) {
            throw err;
        } else {
            res.forEach(function (item, index) {
                currentItemNames.push(res[index].product_name);
                if (currentItemDepartments.indexOf(res[index].department_name) == -1) {
                    currentItemDepartments.push(res[index].department_name);
                }
            })
        }
    })
};

var separator = "---------------------------------";

function managerMenu() {
    inquirer
        .prompt([
            {
                name: "action",
                type: "list",
                message: "Welcome. What would you like to do?",
                choices: [
                    "View Products for Sale",
                    "View Low Inventory",
                    "Add to Inventory",
                    "Add New Product"
                ]
            }
        ]).then(function (answer) {
            switch (answer.action) {
                case "View Products for Sale":
                    viewProducts();
                    break;
                case "View Low Inventory":
                    lowInventory();
                    break;
                case "Add to Inventory":
                    addToInventory();
                    break;
                case "Add New Product":
                    addNewProduct();
                    break;
            }
        })
};

function viewProducts() {
    connection.query("select * from products;", function (err, res) {
        if (err) {
            throw err;
        } else {
            res.forEach(function (item, index) {
                var item = "---- Item ID #: " + res[index].item_id + " ----\n";
                item += "Product: " + res[index].product_name + "\n";
                item += "Price: $" + res[index].price + "\n";
                item += "Current Stock: " + res[index].stock_quantity + "\n";
                item += separator;
                console.log(item);
            });
            restartManagerMenu();
        }
    })
};

function lowInventory() {
    connection.query("select * from products where stock_quantity < 5;", function (err, res) {
        if (err) {
            throw err;
        } else {
            res.forEach(function (item, index) {
                var item = "!!! -- Low Inventory Item -- !!!\n---- Item ID #: " + res[index].item_id + " ----\n";
                item += "Product: " + res[index].product_name + "\n";
                item += "Price: $" + res[index].price + "\n";
                item += "Current Stock: " + res[index].stock_quantity + "\n";
                item += separator;
                console.log(item);
            });
            restartManagerMenu();
        }
    })
};

function addToInventory() {
    inquirer
        .prompt([
            {
                name: "item",
                type: "list",
                message: "To which item would you like to add inventory?",
                choices: currentItemNames
            },
            {
                name: "addedQuantity",
                type: "number",
                message: "How many units would you like to add?",
                validate: function (input) {
                    if (Number.isNaN(input)) {
                        return "Not a proper number. Please enter a numerical value.";
                    } else {
                        return true;
                    }
                }
            }
        ]).then(function (answer) {
            connection.query('UPDATE bamazon.products SET stock_quantity = stock_quantity + ' + answer.addedQuantity + ' where product_name = "' + answer.item + '";', function (err) {
                if (err) {
                    throw err;
                } else {
                    console.log(answer.addedQuantity + " unit(s) of " + answer.item + " have been added to inventory");
                }
                restartManagerMenu();
            })
        });
};

function addNewProduct() {
    inquirer
        .prompt([
            {
                name: "productName",
                type: "input",
                message: "What's the name of the new product?"
            },
            {
                name: "productDepartment",
                type: "list",
                message: "To which department does the new product belong?",
                choices: currentItemDepartments
            },
            {
                name: "productPrice",
                type: "number",
                message: "What is the price of this product?",
                validate: function (input) {
                    if (Number.isNaN(input)) {
                        return "Not a proper number. Please enter a numerical value.";
                    } else {
                        return true;
                    }
                }
            },
            {
                name: "productQuantity",
                type: "number",
                message: "What's the initial quantity of this product?",
                validate: function (input) {
                    if (Number.isNaN(input)) {
                        return "Not a proper number. Please enter a numerical value.";
                    } else {
                        return true;
                    }
                }
            }
        ]).then(function (answer) {
            connection.query('INSERT INTO products (product_name,department_name,price,stock_quantity) VALUES ("' + answer.productName + '","' + answer.productDepartment + '",' + answer.productPrice + ',' + answer.productQuantity + ');', function (err) {
                if (err) {
                    throw err;
                } else {
                    console.log(answer.productQuantity + " unit(s) of " + answer.productName + " were added to inventory under the " + answer.productDepartment + " department at a price of $" + answer.productPrice + ".");
                }
                restartManagerMenu();
            })
        });
};


function restartManagerMenu() {
    inquirer
        .prompt({
            name: "restart",
            type: "confirm",
            message: "Return to main menu?",
            default: true
        }).then(function (answer) {
            switch (answer.restart) {
                case true:
                    renderCurrentItemNames();
                    managerMenu();
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

renderCurrentItemNames();
managerMenu();