CREATE database bamazon;

CREATE table bamazon.products (
	item_id INTEGER(11) NOT NULL auto_increment,
    product_name VARCHAR(60) NOT NULL,
    department_name VARCHAR(60),
    price DECIMAL(13,2) NOT NULL,
    stock_quantity INTEGER(11) NOT NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO bamazon.products(product_name,department_name,price,stock_quantity)
VALUES ("Accordion","Musical Instruments",200,8),
	("Underwear","Clothing",10.00,1000),
    ("Snickers","Food",1.50,10000),
    ("Potato","Food", 5.00,20000),
    ("Trumbone","Musical Instruments",400.00,5),
    ("Muffler","Automotive",100.00,30),
    ("Chromecast","Electronics",50.00,30),
    ("iPhone 11","Electronics",1000.00,15),
    ("Printer Paper","Office Supplies",10.00,50),
    ("Shovel","Lawn and Garden",20.00,10);