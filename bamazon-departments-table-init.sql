CREATE table bamazon.departments (
    department_id INTEGER(11) NOT NULL auto_increment,
    department_name VARCHAR(60) NOT NULL,
    over_head_costs INTEGER(11) default 0,
    PRIMARY KEY(department_id)
);

INSERT INTO bamazon.departments (department_name,over_head_costs)
VALUES 
	("Musical Instruments",5000),
	("Clothing",4000),
    ("Food",10000),
    ("Automotive",9000),
    ("Electronics",7000),
    ("Office Supplies",7000),
    ("Lawn and Garden", 3000);