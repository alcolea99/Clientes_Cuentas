create database motogt;
use motogt;

create table users(
	id INT NOT NULL AUTO_INCREMENT primary key,
	name varchar(50),
	password varchar(20),
	tipo varchar(20)
);
/*select*from users where name= 'hulio' and password = 1234;
drop table users;
*/
insert into users values(0, 'hulio', '1234', 'admin');
insert into users (name, password, tipo) values('sergio', 'sergio', 'consult');
insert into users (name, password, tipo) values('seila', 'seila', 'admin');

        
create table clientes(
	id INT NOT NULL AUTO_INCREMENT primary key,
	name varchar(50),
    user_name varchar(50),
    email varchar(50),
	pwd varchar(20),
    pais varchar(30),
    ciudad varchar(50),
    direccion varchar(50),
	born_date varchar(20)
);
insert into clientes values(0, 'Johan', 'SuperJohan', 'Johan@gmail.com', 'Johan99', 'Francia', 'Le mans', 'C/ Gabacho 10', '1980-03-25');
insert into clientes values(0, 'Francesco', 'SuperFrancesco', 'Francesco@gmail.com', 'Francesco99', 'Italia', 'Florencia', 'C/ dame un euro 27', '1987-03-04');
insert into clientes values(0, 'Oscar', 'SuperOscar', 'Oscar@gmail.com', 'Oscar99', 'Portugal', 'Madeira', 'C/ pobreza 2', '1974-05-04');
insert into clientes values(0, 'Paula', 'SuperPaula', 'Paula@hotmail.com', 'Paula99', 'España', 'Barcelona', 'C/ Valencia 280', '1991-08-16');
insert into clientes values(0, 'German', 'SuperGerman', 'German@gmail.com', 'German99', 'España', 'Barcelona', 'C/ Mallorca 450', '1991-11-05');
insert into clientes values(0, 'Adrian', 'SuperAdrian', 'Adrian@hotmail.com', 'Adrian99', 'España', 'Barcelona', 'C/ Almogavers 130', '1991-05-11');


/*
select*from clientes;
select*from cuentas;
drop table cuentas;
*/
create table cuentas(
	id INT NOT NULL AUTO_INCREMENT primary key,
    link varchar(50),
    user_name varchar(50),
    email varchar(50),
    money int,
	pwd varchar(20),
    comentario varchar(150)
);
insert into cuentas values(0, 'manolo.com', 'Supermanolo', 'manolo@gmail.com', '2350', 'manolo99', 'Pagina para ver lo solo que estoy');
insert into cuentas values(0, 'Juan.com', 'SuperJuan', 'Juan@gmail.com', '5742', 'Juan99', 'Pagina donde se reproduce el anuncion de juan juan eres el numero one en bucle');
insert into cuentas values(0, 'OscarMayer.es', 'SuperOscar', 'Oscar@gmail.com', '6321', 'Oscar99', 'Hoy, mañana y siempre... con oscar mayer en el corazon');
insert into cuentas values(0, 'Paula.org', 'SuperPaula', 'Paula@gmail.com', '32', 'Paula99', 'Pagina de donaciones porque soy pobre, no onlyfans');
insert into cuentas values(0, 'German.cat', 'SuperGerman', 'German@gmail.com', '27000', 'German99', 'Pagina de como gastarte 27000€ en una moto');
insert into cuentas values(0, 'Adrian.es', 'SuperAdrian', 'Adrian@gmail.com', '51236478', 'Adrian99', 'Gana 50.000 al año con mi metodo de MasterClassProgramador... aunque nadie me crea');

        









