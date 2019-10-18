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

## Instructions

### bamazonCustomer

![Bamazon Customer Functionality](https://github.com/nick-ramsay/readme-images/blob/master/bamazon/bamazonCustomer-instructions.jpg?raw=true)

  - To start, enter following command in terminal: ```node bamazonCustomer.js```
  - A list of items will appear from which you can choose.
    - Enter the item ID number for the product you'd like to purchase
    - Enter the quantity of the product that you would like to purchase
  - After upon executing the purchase, the application will show via console log which item you purchased, how many units were purchased, and your total cost. If there wasn't enough stock for you to make your purchase, you will receive the following message in the console log and be asked to attempt your purchase again:
![Bamazon Customer Functionality](https://github.com/nick-ramsay/readme-images/blob/master/bamazon/bamazonCustomer-insufficient-quantity.jpg?raw=true)

### bamazonSupervisor

![Bamazon Supervisor Functionality](https://github.com/nick-ramsay/readme-images/blob/master/bamazon/bamazonSupervisor-instructions.jpg?raw=true)

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