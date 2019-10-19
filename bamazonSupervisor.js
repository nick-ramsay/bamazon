require("dotenv").config();

var keys = require("./keys.js");
var mysql = require("mysql");
var inquirer = require("inquirer");
const { table } = require("table");

/**
 * @typedef {string} table~cell
 */

/**
 * @typedef {table~cell[]} table~row
 */

/**
 * @typedef {Object} table~columns
 * @property {string} alignment Cell content alignment (enum: left, center, right) (default: left).
 * @property {number} width Column width (default: auto).
 * @property {number} truncate Number of characters are which the content will be truncated (default: Infinity).
 * @property {number} paddingLeft Cell content padding width left (default: 1).
 * @property {number} paddingRight Cell content padding width right (default: 1).
 */

/**
 * @typedef {Object} table~border
 * @property {string} topBody
 * @property {string} topJoin
 * @property {string} topLeft
 * @property {string} topRight
 * @property {string} bottomBody
 * @property {string} bottomJoin
 * @property {string} bottomLeft
 * @property {string} bottomRight
 * @property {string} bodyLeft
 * @property {string} bodyRight
 * @property {string} bodyJoin
 * @property {string} joinBody
 * @property {string} joinLeft
 * @property {string} joinRight
 * @property {string} joinJoin
 */

/**
 * Used to dynamically tell table whether to draw a line separating rows or not.
 * The default behavior is to always return true.
 *
 * @typedef {function} drawHorizontalLine
 * @param {number} index 
 * @param {number} size 
 * @return {boolean} 
 */

/**
 * @typedef {Object} table~config
 * @property {table~border} border
 * @property {table~columns[]} columns Column specific configuration.
 * @property {table~columns} columnDefault Default values for all columns. Column specific settings overwrite the default values.
 * @property {table~drawHorizontalLine} drawHorizontalLine
 */

/**
 * Generates a text table.
 *
 * @param {table~row[]} rows 
 * @param {table~config} config 
 * @return {String} 
 */

let data,
    output;

var connection = mysql.createConnection({
    host: "localhost",
    port: keys.mysql.port,
    user: "root",
    password: keys.mysql.pw,
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) {
        throw err
    }
});

function menuSupervisor() {
    inquirer
        .prompt([
            {
                name: "action",
                type: "list",
                message: "Welcome. What would you like to do?",
                choices: [
                    "View Product Sales by Department",
                    "Create New Department"
                ]
            }
        ]).then(function (answer) {
            switch (answer.action) {
                case "View Product Sales by Department":
                    viewSales();
                    break;
                case "Create New Department":
                    newDepartment();
                    break;
            }
        })
};

function newDepartment() {
    inquirer
        .prompt([
            {
                name: "departmentName",
                message: "What is the name of the new department?",
                type: "input"
            },
            {
                name: "overHeadCosts",
                message: "What is the new department's overhead cost?",
                type: "number"
            }
        ]).then(function (answer) {
            connection.query('INSERT INTO departments (department_name,over_head_costs) VALUE ("' + answer.departmentName + '",' + answer.overHeadCosts + ');', function (err, res) {
                if (err) {
                    throw err;
                } else {
                    console.log("The " + answer.departmentName + " department was added with an overhead cost of $" + answer.overHeadCosts + '.');
                    restartManagerMenu();
                };
            })
        });
};

function viewSales() {
    connection.query("select distinct departments.department_id department_id, departments.department_name department_name, departments.over_head_costs department_cost, SUM(products.product_sales) product_sales,(SUM(products.product_sales) - departments.over_head_costs) profit from bamazon.products join bamazon.departments on products.department_name = departments.department_name group by departments.department_id, departments.department_name, departments.over_head_costs;", function (err, res) {
        if (err) {
            throw err;
        } else {
            data = [["\u001b[32;1mDepartment ID\u001b[0m", "\u001b[32;1mDepartment Name\u001b[0m", "\u001b[32;1mOverhead Costs\u001b[0m", "\u001b[32;1mTotal Sales ($)\u001b[0m", "\u001b[32;1mTotal Profit/Loss ($)\u001b[0m"]];
            for (i = 0; i < res.length; i++) {
                var row = [];
                row.push(res[i].department_id);
                row.push(res[i].department_name);
                row.push(res[i].department_cost);
                row.push(res[i].product_sales);
                row.push(res[i].profit);
                data.push(row);
            };
            output = table(data);
            console.log(output);
            restartManagerMenu();
        };
    })
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
                    menuSupervisor();
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

menuSupervisor();