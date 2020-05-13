SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

CREATE TABLE `users` (
 `id` INT(11) NOT NULL,
`name` VARCHAR(150) NOT NULL,
`lastName` VARCHAR(150) NOT NULL,
`studentID` INT(7) default NULL,
`username` VARCHAR(15) NOT NULL,
`password` VARCHAR(150) NOT NULL,
`type` VARCHAR(10) NOT NULL,
`ans` VARCHAR(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


ALTER TABLE `users`
    ADD PRIMARY KEY (`id`);


ALTER TABLE `users`
    MODIFY `id` INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
COMMIT;

INSERT INTO users(id,name,lastName,username,password,type,ans) VALUES (749673972, 'Lior', 'Plag', 'admin1',
                                                                       '567567Ad','admin', 'orange');

CREATE TABLE Products (
                          `id` INT(11) NOT NULL,
                          `name` VARCHAR(150) NOT NULL,
                          `picture` VARCHAR(750),
                          `price` FLOAT(11) NOT NULL,
                          `category` VARCHAR(150)
);

ALTER TABLE Products
    ADD PRIMARY KEY (`id`);

ALTER TABLE Products
    MODIFY `id` INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
COMMIT;

insert into Products values(1, "Milk", "https://assets.sainsburys-groceries.co.uk/gol/181402/1/640x640.jpg",
                            5 ,"dairy");


insert into Products values(2, "Sausage", "https://cdn0.woolworths.media/content/wowproductimages/large/655412.jpg",
                            15 ,"meat");

insert into Products values(3, "Popcorn", "https://images.heb.com/is/image/HEBGrocery/001907864",
                            10 ,"other");

ALTER TABLE Products
    ADD COLUMN quantity INT(11);

UPDATE Products
SET
    quantity = 3
WHERE
        id > 0;

ALTER TABLE Products
    ADD COLUMN brand VARCHAR(150);

ALTER TABLE Products
    ADD COLUMN description VARCHAR(150);

UPDATE Products SET brand = "Tnuva" WHERE id = 1;
UPDATE Products SET description = "1.5 liter milk bottle" WHERE id = 1;

UPDATE Products SET brand = "Zoglovek" WHERE id = 2;
UPDATE Products SET description = "Four large sausages in a box" WHERE id = 2;

UPDATE Products SET brand = "Osem" WHERE id = 3;
UPDATE Products SET description = "For microwave preparation 300g" WHERE id = 3;

insert into Products values(4, "Hamburger", "https://www.kroger.com/product/images/xlarge/front/0001111000917",
                            50 ,"meat", 4, "Zoglovek", "Eight frozen beef burgers");

