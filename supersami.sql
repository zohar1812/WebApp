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
                                                                       'Sa123456','admin', 'orange');

INSERT INTO users(id,name,lastName,username,password,type,ans) VALUES (749673973, 'yose', 'yose', 'regular',
                                                                       'Sa123456','regular', 'orange');
INSERT INTO users(id,name,lastName,username,password,type,ans) VALUES (749673974, 'sami', 'sami', 'student',
                                                                       'Sa123456','student', 'orange');

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
insert into Products values(5, "Chiken Breast", "https://www.kroger.com/product/images/xlarge/front/0026082900000",
                            30 ,"meat", 4, "Tyson", "4 chicken breasts ");
insert into Products values(6, "Chiken nuggets", "https://www.kroger.com/product/images/medium/front/0002370002847",
                            40 ,"meat", 4, "Tyson", "One 650g package of Chicken Nuggets");
insert into Products values(7, "Steak", "https://assets.sainsburys-groceries.co.uk/gol/7915774/1/640x640.jpg",
                            70 ,"meat", 10, "Zoglovek", "600g Steak.");
insert into Products values(8, "Homestyle Beef Patties", "https://www.kroger.com/product/images/medium/front/0001111096732",
                            55 ,"meat", 14, "Tyson", "Six frozen Beef Patties");

insert into Products values(9, "Yolo", "https://super-click.co.il/wp-content/uploads/2019/10/111528.jpg",
                            4 ,"dairy", 12, "Tnuva", "YOLO white chocolate yogurt with raspberry");
insert into Products values(10, "Shredded Mozzarella Cheese", "https://www.kroger.com/product/images/medium/front/0001111050159",
                            20 ,"dairy", 16, "Kroger", "170g of Shredded Mozzarella Cheese");
insert into Products values(11, "Cream Cheese", "https://www.kroger.com/product/images/medium/front/0001111089202",
                            15 ,"dairy", 13, "Kroger", "220g of Cream Cheese");
insert into Products values(12, "Butter", "https://www.kroger.com/product/images/medium/front/0001111089301",
                            18 ,"dairy", 24, "Kroger", "110g of Butter");
insert into Products values(13, "Choclate Milk", "https://m.pricez.co.il/ProductPictures/7290000057934.jpg",
                            10 ,"dairy", 13, "Tnuva", "Liter of Choclate Milk");

 insert into Products values(14, "Chips", "https://www.strauss-group.co.il/wp-content/blogs.dir/1/files/446x303-6.jpg",
                            3 ,"other", 14, "Elit", "50g of chips");
insert into Products values(15, "Bamba", "https://m.pricez.co.il/ProductPictures/7290000068787.jpg",
                            5 ,"other", 14, "Osem", "25g of peanut snack");
insert into Products values(16, "Nacho Doritos", "https://www.strauss-group.co.il/wp-content/blogs.dir/1/files/Doritos-Nacho-446x303.jpg",
                            4 ,"Elit", 14, "Osem", "55g of Nacho flavored Doritos snack");
insert into Products values(17, "Bisli Grill", "https://osemcat.signature-it.com//images/Fittings/osem-hq/Upload_Pictures/Prod_Pic/6930925/Custom/6930925_7290000066196_L.png",
                            5 ,"other", 20, "Osem", "35g of grill flavored Bisli ");
insert into Products values(18, "Ketchup", "https://osemcat.signature-it.com//images/Fittings/osem-hq/Upload_Pictures/Prod_Pic/6929362/Custom/6929362_7290000072623_L.png",
                            10 ,"other", 14, "Osem", "30g of KetChup");

CREATE TABLE Orders(
`orderId` INT(11) NOT NULL,
`consumer_type` VARCHAR(8) NOT NULL,
`date` date,
`total_price` FLOAT(11) NOT NULL,
primary key (`orderId`)
);

insert into Orders values(1, "regular", "2020-05-30",63);
insert into Orders values(2, "student", "2020-04-20",378);
insert into Orders values(3, "regular", "2020-05-11",101);
insert into Orders values(4, "student", "2020-04-20",47);
insert into Orders values(5, "regular", "2020-05-11",53);
insert into Orders values(6, "student", "2020-04-20",42);
insert into Orders values(7, "student", "2020-04-20",47);


CREATE TABLE OrderProducts (
`orderId` INT(11) NOT NULL,
`productId` VARCHAR(150) NOT NULL,
`quantity` INT(150),
`totalPrice` FLOAT(11) NOT NULL,
`picture` VARCHAR(750),
`name` VARCHAR(150) NOT NULL,
`brand` VARCHAR(150),
`category` VARCHAR(150),
 primary key (`orderId`, `productId`)
);

insert into OrderProducts values(1, 1, 3,15
			,"https://m.pricez.co.il/ProductPictures/7290000042442.jpg", "Milk","Tnuva","dairy");
insert into OrderProducts values(1, 14, 6,18
			,"https://www.strauss-group.co.il/wp-content/blogs.dir/1/files/446x303-6.jpg", "Chips","Elit","other");
insert into OrderProducts values(1, 17, 6,30
			,"https://osemcat.signature-it.com//images/Fittings/osem-hq/Upload_Pictures/Prod_Pic/6930925/Custom/6930925_7290000066196_L.png", "Bisli Grill","Osem","other");

insert into OrderProducts values(2, 5, 3,90
			,"https://m.pricez.co.il/ProductPictures/7290000042442.jpg", "Hamburger", "Zoglovek","meat");
insert into OrderProducts values(2, 6, 6,240
			,"https://www.kroger.com/product/images/medium/front/0002370002847", "Chiken Breast","Tyson","meat");
insert into OrderProducts values(2, 7, 3,210
			,"https://assets.sainsburys-groceries.co.uk/gol/7915774/1/640x640.jpg", "Steak" ,"Zoglovek","meat");

insert into OrderProducts values(3, 1, 4,20
			,"https://m.pricez.co.il/ProductPictures/7290000042442.jpg", "Milk","Tnuva","dairy");
insert into OrderProducts values(3, 14, 7,21
			,"https://www.strauss-group.co.il/wp-content/blogs.dir/1/files/446x303-6.jpg", "Chips","Elit","other");
insert into OrderProducts values(3, 17, 8,40
			,"https://osemcat.signature-it.com//images/Fittings/osem-hq/Upload_Pictures/Prod_Pic/6930925/Custom/6930925_7290000066196_L.png", "Bisli Grill","Osem","other");

insert into OrderProducts values(4, 1, 8,40
			,"https://m.pricez.co.il/ProductPictures/7290000042442.jpg", "Milk","Tnuva","dairy");
insert into OrderProducts values(4, 14, 4,12
			,"https://www.strauss-group.co.il/wp-content/blogs.dir/1/files/446x303-6.jpg", "Chips","Elit","other");
insert into OrderProducts values(4, 17, 3,15
			,"https://osemcat.signature-it.com//images/Fittings/osem-hq/Upload_Pictures/Prod_Pic/6930925/Custom/6930925_7290000066196_L.png", "Bisli Grill","Osem","other");


insert into OrderProducts values(5, 1, 5,25
			,"https://m.pricez.co.il/ProductPictures/7290000042442.jpg", "Milk","Tnuva","dairy");
insert into OrderProducts values(5, 14, 6,18
			,"https://www.strauss-group.co.il/wp-content/blogs.dir/1/files/446x303-6.jpg", "Chips","Elit","other");
insert into OrderProducts values(5, 17, 2,10
			,"https://osemcat.signature-it.com//images/Fittings/osem-hq/Upload_Pictures/Prod_Pic/6930925/Custom/6930925_7290000066196_L.png", "Bisli Grill","Osem","other");


insert into OrderProducts values(6, 1, 4,20
			,"https://m.pricez.co.il/ProductPictures/7290000042442.jpg", "Milk","Tnuva","dairy");
insert into OrderProducts values(6, 14, 4,12
			,"https://www.strauss-group.co.il/wp-content/blogs.dir/1/files/446x303-6.jpg", "Chips","Elit","other");
insert into OrderProducts values(6, 17, 3,15
			,"https://osemcat.signature-it.com//images/Fittings/osem-hq/Upload_Pictures/Prod_Pic/6930925/Custom/6930925_7290000066196_L.png", "Bisli Grill","Osem","other");


insert into OrderProducts values(7, 1, 8,40
			,"https://m.pricez.co.il/ProductPictures/7290000042442.jpg", "Milk","Tnuva","dairy");
insert into OrderProducts values(7, 14, 4,12
			,"https://www.strauss-group.co.il/wp-content/blogs.dir/1/files/446x303-6.jpg", "Chips","Elit","other");
insert into OrderProducts values(7, 17, 3,15
			,"https://osemcat.signature-it.com//images/Fittings/osem-hq/Upload_Pictures/Prod_Pic/6930925/Custom/6930925_7290000066196_L.png", "Bisli Grill","Osem","other");


CREATE TABLE IncomeByType(
`ptype` VARCHAR(10) NOT NULL,
`total_income` FLOAT(11) NOT NULL
);

insert into IncomeByType values("meat",378);
insert into IncomeByType values("other",171);
insert into IncomeByType values("dairy",169);
