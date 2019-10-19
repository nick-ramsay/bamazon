# Bamazon

## Problem Summary 
- As an store owner, I would like a tool that enables me to perform all my transactions including sales to customers and inventory control.

## Overview
- Bamazon is a mock sales and inventory control tool comprised of three applications. The customer application (```node bamazonCustomer.js```) allows customers to pick an item of their choice and purchase a specific quantity which updates the total sales and stock quantity of the item.

## Installation & Prerequisites

![Dependent Packages](https://github.com/nick-ramsay/readme-images/blob/master/bamazon/dependencies.jpg?raw=true)

- bamazon is dependent upon three packages:
 1. Inquirer
 2. MySQL
 3. Table
 
- If you have cloned the repository with the package.json file, these packages can be installed using the ```npm-install``` command.

- You will also need to create a MySQL database to support the application. This can be done by first running the ```bamazon-database-init.sql``` script and, after, running the ```bamazon-departments-table-init.sql``` script.

- After creating the database, create a .env file that is set up as follows:
![Dependent Packages](https://github.com/nick-ramsay/readme-images/blob/master/bamazon/bamazon-envexample.jpg?raw=true)
  - Replace ```[MySQL Port Number]``` with your actual MySQL port number and replace ```[MySQL Password]``` with your actual MySQL password. The bamazon applications will use these credentials to interact with the database.

## Instructions

### bamazonCustomer

  - To start, enter following command in terminal: ```node bamazonCustomer.js```
  - A list of items will appear from which you can choose.
    - Enter the item ID number for the product you'd like to purchase
    - Enter the quantity of the product that you would like to purchase
  - After upon executing the purchase, the application will show via console log which item you purchased, how many units were purchased, and your total cost. If there wasn't enough stock for you to make your purchase, you will receive the following message in the console log and be asked to attempt your purchase again:
![Bamazon Customer Functionality](https://github.com/nick-ramsay/readme-images/blob/master/bamazon/bamazonCustomer-insufficient-quantity.jpg?raw=true)

### bamazonManager
  - To start, enter following command in terminal: ```node bamazonManager.js```
  - You will be presented with four actions actions from which you can chose, "View Products for Sale", "View Low Inventory", "Add to Inventory", or "Add New Product".
    - View Products for Sale: This will show you a list of items currently for sale giving you the item ID, product name, product price, and current stock.
    ![Bamazon Manager Functionality](https://github.com/nick-ramsay/readme-images/blob/master/bamazon/bamazonManager-products-for-sale.jpg?raw=true)
      - You can then either return to the main menu to pick your next action or close the application.
    - View Low Inventory: This will show you a list of items currently for sale which have a low inventory, meaning stock is below 5 units. The list will give you the item ID, product name, product price, and current stock.
    ![Bamazon Manager Functionality](https://github.com/nick-ramsay/readme-images/blob/master/bamazon/bamazonManager-low-inventory.jpg?raw=true)
      - You can then either return to the main menu to pick your next action or close the application.
    - Add Inventory: This will show you a list of current items to which you can add inventory. After selecting an item, enter the inventory quantity you would like to add. After entering the values, you will receive a message via console log that the quantity you selected has been added to the inventory of the item you chose.
    ![Bamazon Manager Functionality](https://github.com/nick-ramsay/readme-images/blob/master/bamazon/bamazonManager-add-inventory-item-selection.jpg?raw=true)
    ![Bamazon Manager Functionality](https://github.com/nick-ramsay/readme-images/blob/master/bamazon/bamazonManager-add-inventory-quantity-selection.jpg?raw=true)
      - You can then either return to the main menu to pick your next action or close the application.
    - Add Inventory: This will allow you to add a product by entering a name, a department to which it belongs, a price, and the initial quantity of the product. After entering the values, you will receive a message via console log confirming that the product you entered has been added to the database with the price and quanity you specified.
    ![Bamazon Manager Functionality](https://github.com/nick-ramsay/readme-images/blob/master/bamazon/bamazonManager-add-item.jpg?raw=true)
      - You can then either return to the main menu to pick your next action or close the application.

### bamazonSupervisor

  - To start, enter following command in terminal: ```node bamazonSupervisor.js```
  - You will be presented with two actions from which you can chose, "View Product Sales by Department" or "Create New Department"
  ![Bamazon Supervisor Functionality](https://github.com/nick-ramsay/readme-images/blob/master/bamazon/bamazonSupervisor-main-menu.jpg?raw=true)
    - View Product Sales by Department: This will show you a table that outlines, by department, total costs, total sales (revenue), and the profit or loss each department has accrued.
    ![Bamazon Supervisor Functionality](https://github.com/nick-ramsay/readme-images/blob/master/bamazon/bamazonSupervisor-product-sales.jpg?raw=true)
      - You can then either return to the main menu to pick your next action or close the application.
    - Create New Department: Will allow you to create a new department for the store by entering a name for the department and specifying the over head costs of the department.
    ![Bamazon Supervisor Functionality](https://github.com/nick-ramsay/readme-images/blob/master/bamazon/bamazonSupervisor-new-department.jpg?raw=true)
      - You can then either return to the main menu to pick your next action or close the application.


## Built With
- The bamazon application was built using Node.js and a MySQL database. Supporting Node.js, the following Node Package Manage modules were used:

 1. Inquirer
 2. MySQL
 3. Table

## Authors 
- Developer: Nick Ramsay @nick-ramsay