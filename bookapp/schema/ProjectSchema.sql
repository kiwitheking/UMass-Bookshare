create table Users(
	username CHAR(20),
	password CHAR(128),
	firstName CHAR(30),
	lastName CHAR(30),
	email CHAR(50),
	phone CHAR(12),
	institution CHAR(60),
	age INTEGER,
	sex CHAR(1),
	profilepic VARCHAR(255),
	PRIMARY KEY(username)
);

create table Book(
	title VARCHAR(255),
	author CHAR(60),
	isbn10 CHAR(10),
	isbn13 CHAR(13),
	publicationDate DATE,
	version SMALLINT,
	cover VARCHAR(255),
	PRIMARY KEY(isbn13)
);

create table Wishlist(
	username CHAR(20),
	isbn13 CHAR(13),
	wishDate DATE,
	PRIMARY KEY(username, isbn13),
	FOREIGN KEY(username) REFERENCES Users,
	FOREIGN KEY(isbn13) REFERENCES Book
);

create table Listing( 
	listID CHAR(32),
	username CHAR(20),
	isbn13 CHAR(13),
	forRent BOOLEAN,
	rentPrice CHAR(10),
	forSale BOOLEAN,
	sellPrice CHAR(10),
	forBorrow BOOLEAN,
	available BOOLEAN,
	listDate TIMESTAMP,
	description CHAR(500),
	PRIMARY KEY(listID),
	FOREIGN KEY(username) REFERENCES Users,
	FOREIGN KEY(isbn13) REFERENCES Book
);

create table Rating(
	ratedUser CHAR(20),
	ratingUser CHAR(20),
	rating INTEGER,
	PRIMARY KEY(ratedUser, ratingUser),
	FOREIGN KEY(ratedUser) REFERENCES Users(username),
	FOREIGN KEY(ratingUser) REFERENCES Users(username)
);

CREATE INDEX uNameIndex
ON users (username);

CREATE INDEX TitleIndex
ON book (title);

CREATE INDEX AuthorIndex
ON book (author);

CREATE UNIQUE INDEX isbn10Index
ON book (isbn10);

CREATE UNIQUE INDEX isbn13Index
ON book (isbn13);

CREATE INDEX userWishIndex
ON wishlist (username);

CREATE INDEX listIDIndex
ON listing (listid);

CREATE INDEX userListIndex
ON listing (username);

CREATE INDEX isbnListIndex
ON listing (isbn13);

CREATE INDEX listDateIndex
on listing (listdate);


insert into Users values('bianca', 'password', 'bianca', 'tamaskar', 'btamaska@umass.edu', '9788888888', 'UMass Amherst');
insert into Users values('walter', 'password', 'walter', 'doan', 'wdoan@umass.edu', '9788888888', 'UMass Amherst');

insert into Book values('To Kill a Mockingbird', 'Harper Lee', '0446310786', '1234567890123', '1988-10-11', 1);
insert into Book values('The Great Gatsby', 'F. Scott Fitzgerald', '0743273567', '1234567890124', '2004-09-30', 3);

insert into Wishlist values('walter',1234567890123,'1999-01-08');

insert into Listing values(1, 'bianca', '1234567890123', 'true', 1, 'true', 2, 'true', 'true', '2000-09-09', 'This is a description!');
insert into Listing values(2, 'walter', '1234567890123', 'true', 3, 'true', 4, 'true', 'true', '2000-09-09', 'This is a description!');
insert into Listing values(3, 'walter', '1234567890124', 'true', 5, 'true', 6, 'true', 'true', '2000-09-09', 'This is a description!');
