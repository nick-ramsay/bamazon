# Bamazon

## Problem Summary 
- As an store owner, I would like a tool that enables me to perform all my transactions including sales to customers and inventory control.

## Overview
- Bamazon is a mock sales and inventory control tool comprised of three applications. The customer application (```node bamazonCustomer.js```) allows customers to pick an item of their choice and purchase a specific quantity which updates the total sales and stock quantity of the item.

## Installation & Prerequisites

![Dependent Packages](https://github.com/nick-ramsay/readme-images/blob/master/constructor-word-guess/dependencies.jpg?raw=true)

- The constructor-word-guess is dependent upon four packages:
 1. Inquirer
 2. MySQL
 3. Table
 
- If you have cloned the repository with the package.json file, these packages can be installed using the npm-install command.

![Dependent Packages](https://github.com/nick-ramsay/readme-images/blob/master/bamazon/dependent_packages_install.jpg?raw=true)

## Instructions
- The constructor-word-guess application is opened with the following command: ```node index.js```

-- bamazonCustomer
![Bamazon Customer Functionality](https://github.com/nick-ramsay/readme-images/blob/master/bamazon/bamazonCustomer-instructions.jpg?raw=true)

--- To start, enter following command in terminal: ```node bamazonCustomer.js```
--- A list of items will appear from which you can choose.
---- Enter the item ID number for the product you'd like to purchase
---- Enter the quantity of the product that you would like to purchase
--- After upon executing the purchase, the application will show via console log which item you purchased, how many units were purchased, and your total cost. If there wasn't enough stock for you to make your purchase, you will receive the following message in the console log and be asked to attempt your purchase again:
![Bamazon Customer Functionality](https://github.com/nick-ramsay/readme-images/blob/master/bamazon/bamazonCustomer-insufficient-quantity.jpg?raw=true)


## Built With
- The bamazon application was built using Node.js and a MySQL database. Supporting Node.js, the following Node Package Manage modules were used:

 1. Inquirer
 2. MySQL
 3. Table

## Authors 
- Developer: Nick Ramsay @nick-ramsay