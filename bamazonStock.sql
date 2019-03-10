drop database if exists bamazon_db;

create database bamazon_db;
use bamazon_db;
create table bamazonStock (
    id int auto_increment not null,
    product_name varchar(75) not null,
    department_name varchar(50),
    price decimal(10,2) not null,
    stock_quantity int(10),
    primary key(id)
);

insert into bamazonStock (product_name, department_name, price, stock_quantity)
values ("fuzzy dice", "toys and games", 10, 100);

insert into bamazonStock (product_name, department_name, price, stock_quantity)
values ("yoga matt", "sporting goods", 25.99, 50);

insert into bamazonStock (product_name, department_name, price, stock_quantity)
values ("deluxe kitty tower", "pets", 299.99, 5);
