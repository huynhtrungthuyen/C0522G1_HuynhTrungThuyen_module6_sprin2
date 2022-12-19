create database if not exists project_module_6_sprint2;

use project_module_6_sprint2;

create table if not exists user(
	username varchar(30) primary key,
    password varchar(200),
    is_delete bit default 0
);

create table  if not exists role(
	id int primary key auto_increment,
    name varchar(30),
    is_delete bit default 0
);

create table if not exists user_role(
	username varchar(50),
    role_id int,
    is_delete bit default 0,
    foreign key(username) references user(username),
    foreign key(role_id) references role(id),
    primary key(username, role_id)
);

create table if not exists size(
	id int primary key auto_increment,
    name varchar(30),
	is_delete bit default 0
);

create table if not exists shoe_type(
	id int primary key auto_increment,
    name varchar(30),
    is_delete bit default 0
);

create table if not exists shoe(
	id int primary key auto_increment,
    name varchar(100),
    price int,
    discount int,
    manufacturer varchar(50),
    image text,
    describes text,
	is_delete bit default 0,
    shoe_type_id int,
    foreign key(shoe_type_id) references shoe_type(id)
);

create table if not exists shoe_size(
	id int primary key auto_increment,
	is_delete bit default 0,
    quantity int,
    shoe_id int,
    size_id int,
	foreign key(shoe_id) references shoe(id),
	foreign key(size_id) references size(id)
);

create table if not exists customer(
	id int primary key auto_increment,
	name varchar(100),
	is_delete bit default 0,
	birthday varchar(30),
	gender int,
	id_card varchar(12),
	email varchar(100),
	address varchar(200),
	phone_number varchar(15),
	username varchar(30) unique,
	foreign key (username) references user(username)
);

create table if not exists employee(
	id int primary key auto_increment,
	name varchar(100),
	is_delete bit default 0,
	birthday varchar(30),
	gender int,
	id_card varchar(12),
	email varchar(100),
	address varchar(200),
	phone_number varchar(15),
	username varchar(30) unique,
	foreign key (username) references user(username)
);

create table if not exists order_detail(
	id int primary key auto_increment,
    date_payment date,
    quantity int,
	is_delete bit default 0,
	is_pay bit default 0,
    customer_id int,
    shoe_size_id int,
    foreign key (customer_id) references customer(id),
    foreign key (shoe_size_id) references shoe_size(id)
);

-- select shoe.id as id, shoe.name as name, shoe.price as price, shoe.discount as discount, shoe.image as image from shoe join shoe_size on shoe.id = shoe_size.shoe_id join shoe_type on shoe.shoe_type_id = shoe_type.id where shoe.name like "%a%" and shoe.manufacturer like "%nike%" and shoe_type.name like "%Nam%" and (shoe.price between 1400000 and 1600000) group by shoe.id having sum(shoe_size.quantity) > 0 order by price desc;
-- select shoe.id as id, shoe.name as name, shoe.price as price, shoe.discount as discount, shoe.image as image, sum(order_detail.quantity) as quantityPay from shoe join shoe_size on shoe.id = shoe_size.shoe_id join shoe_type on shoe.shoe_type_id = shoe_type.id join order_detail on order_detail.shoe_size_id = shoe_size.id where shoe.name like "%a%" and shoe.manufacturer like "%nike%" and shoe_type.name like "%Nam%" group by shoe.id having sum(shoe_size.quantity) > 0;
-- select manufacturer from shoe group by manufacturer;
-- join order_detail on shoe_size.id = order_detail.shoe_size_id
-- select shoe_size.id as id, shoe_size.quantity as quantity, size.name as size from shoe_size join shoe on shoe.id = shoe_size.shoe_id join size on size.id = shoe_size.size_id where shoe.id = 12 and shoe.is_delete = 0 and shoe_size.quantity > 0;
-- select * from customer where is_delete = 0 and username = "adelucef";
-- select * from employee where is_delete = 0 and username = "admin";

-- select * from order_detail where is_pay = 0 and customer_id = 15 and shoe_size_id = 1;
-- insert into order_detail (date_payment, quantity, customer_id, shoe_size_id) values (now(), 1, 1, 1);
-- update order_detail set quantity = 2 where is_pay = 0 and customer_id = 1 and shoe_size_id = 1;
-- select sum(order_detail.quantity) from order_detail join shoe_size on shoe_size.id = order_detail.shoe_size_id join shoe on shoe.id = shoe_size.shoe_id where order_detail.is_pay = 1 and shoe.id = 1;
-- select order_detail.id as id, shoe.name as name, size.name as size, shoe.price as price, shoe.discount as discount, order_detail.quantity as quantity from order_detail join shoe_size on shoe_size.id = order_detail.shoe_size_id join shoe on shoe.id = shoe_size.shoe_id join size on size.id = shoe_size.size_id where order_detail.is_pay = 0 and order_detail.is_delete = 0 and order_detail.customer_id = 15;
-- update order_detail set quantity = (quantity + 1) where is_pay = 0 and id = 1011;
-- select sum(quantity) as sumQuantityCart from order_detail where is_pay = 0 and customer_id = 15;
update order_detail set date_payment = now(), is_pay = 1 where is_pay = 0 and customer_id = 2;
select * from order_detail where customer_id = 2;