drop table products;
drop table users;

CREATE TABLE products(
    product_id integer primary key AUTOINCREMENT,
    product_brand varchar(20),
    product_quantity numeric(3),
    product_size numeric(2)
);

CREATE TABLE users(
    staff_id integer primary key AUTOINCREMENT,
    password varchar(15),
    staff_email varchar(30),
    staff_name varchar(30)
);

insert into products (product_brand, product_quantity, product_size) values ('Vans', 076, 4);
insert into products (product_brand, product_quantity, product_size) values ('Vans', 387, 5);
insert into products (product_brand, product_quantity, product_size) values ('Vans', 123, 6);
insert into products (product_brand, product_quantity, product_size) values ('Vans', 045, 7);
insert into products (product_brand, product_quantity, product_size) values ('Vans', 057, 8);
insert into products (product_brand, product_quantity, product_size) values ('Vans', 075, 9);
insert into products (product_brand, product_quantity, product_size) values ('Vans', 016, 10);
insert into products (product_brand, product_quantity, product_size) values ('Vans', 026, 11);

insert into products (product_brand, product_quantity, product_size) values ('Nike', 067, 4);
insert into products (product_brand, product_quantity, product_size) values ('Nike', 020, 5);
insert into products (product_brand, product_quantity, product_size) values ('Nike', 039, 6);
insert into products (product_brand, product_quantity, product_size) values ('Nike', 008, 7);
insert into products (product_brand, product_quantity, product_size) values ('Nike', 007, 8);
insert into products (product_brand, product_quantity, product_size) values ('Nike', 011, 10);
insert into products (product_brand, product_quantity, product_size) values ('Nike', 027, 20);

insert into products (product_brand, product_quantity, product_size) values ('Adidas', 034, 5);
insert into products (product_brand, product_quantity, product_size) values ('Adidas', 005, 7);
insert into products (product_brand, product_quantity, product_size) values ('Adidas', 023, 8);
insert into products (product_brand, product_quantity, product_size) values ('Adidas', 001, 9);
insert into products (product_brand, product_quantity, product_size) values ('Adidas', 056, 12);

insert into products (product_brand, product_quantity, product_size) values ('Balenciaga', 020, 4);
insert into products (product_brand, product_quantity, product_size) values ('Balenciaga', 003, 8);
insert into products (product_brand, product_quantity, product_size) values ('Balenciaga', 002, 9);

insert into products (product_brand, product_quantity, product_size) values ('Crocs', 800, 4.5);
insert into products (product_brand, product_quantity, product_size) values ('Crocs', 001, 16);
