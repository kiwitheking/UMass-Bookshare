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
