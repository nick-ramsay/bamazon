CREATE table bamazon.departments (
    department_id INTEGER(11) NOT NULL auto_increment,
    department_name VARCHAR(60) NOT NULL,
    over_head_costs INTEGER(11) default 0,
    PRIMARY KEY(department_id)
);