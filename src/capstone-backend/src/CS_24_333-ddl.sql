# CS_24_333-ddl.sql

## DO NOT RENAME OR OTHERWISE CHANGE THE SECTION TITLES OR ORDER.

# Section 1
# Drops all tables.  This section should be amended as new tables are added.

SET FOREIGN_KEY_CHECKS=0;
DROP TABLE IF EXISTS paper;
DROP TABLE IF EXISTS author;
DROP TABLE IF EXISTS category;
DROP TABLE IF EXISTS keyword;
DROP TABLE IF EXISTS paperkeyword;
# ... 
SET FOREIGN_KEY_CHECKS=1;

# Section 2
# Create author(authorID, firstName, lastName, email)

drop table if exists author;
CREATE TABLE author (
    authorID int primary key,
    firstName varchar(255) NOT NULL,
    lastName varchar(255) NOT NULL,
    email varchar(255)
);

select * from author;

# populate author
insert into author(authorID, firstName, lastName) values
    (1, 'Deidra', 'Crews'),
    (2, 'Taylor', 'Barongan');

select * from author;


# Section 3
# Create keyword (keywordID, keywordName)

drop table if exists keyword;
create table keyword (
    keywordID int primary key,
    keywordName varchar(255)
);

select * from keyword;

# populate keyword
insert into keyword(keywordID, keywordName) values
    (1, 'diversity'),
    (2, 'gender'),
    (3, 'under-represented');

select * from keyword;


# Section 4
# Create category(categoryID, categoryName)

drop table if exists category;
CREATE TABLE category (
    categoryID int primary key,
    categoryName varchar(255)
);

select * from category;

# populate category
insert into category(categoryID, categoryName) values
    (1, 'Gender'),
    (2, 'Graduate'),
    (3, 'Post-Doctural'),
    (4, 'Undergrad'),
    (5, 'Race'),
    (6, 'K-12'),
    (7, 'Faculty'),
    (8, 'Leadership'),
    (9, 'Socioeconomic status'),
    (10, 'Intervention'),
    (11, 'Cost'),
    (12, 'Speed');

select * from category;


# Section 5
# Create paper(paperID, title, content, paperURL, submissionDate, authorID, categoryID)

drop table if exists paper;
create table paper (
    paperID int auto_increment,
    title varchar(255) NOT NULL,
    paperURL varchar(255) NOT NULL,
    submissionDate date,
    authorID int,
    foreign key (authorID) references author(authorID),
    primary key (paperID)
);

select * from paper;


# populate paper 
insert into paper(title, paperURL, submissionDate, authorID) values
    ('Helping Scholars Overcome Socioeconomic Barriers to Medical and Biomedical Careers: Creating a Pipeline Initiative', 'https://pubmed-ncbi-nlm-nih-gov.proxy.library.vcu.edu/32096414/',
    '2020-02-25', 1),
    ('Project Strengthen: An STEMM-focused career development workshop to prepare underrepresented minority students for graduate school', 'https://pubmed.ncbi.nlm.nih.gov/37736045/',
    '2023-10-20', 2);

select * from paper;


# Section 6
# Create paperKeyword(paperKeywordID, paperID, keywordID)

drop table if exists paperKeyword;
CREATE TABLE paperKeyword (
    paperKeywordID int auto_increment,
    paperID int,
    keywordID int,
    foreign key (paperID) references paper(paperID),
    foreign key (keywordID) references keyword(keywordID),
    primary key (paperKeywordID)
);

select * from paperKeyword;

# populate paperKeyword
insert into paperKeyword(paperKeywordID, paperID, keywordID) values
    (1, 1, 3),
    (2, 2, 1);

select * from keyword;


# Section 7
# Create paperCategory(paperID, categoryID)
drop table if exists paperCategory;
CREATE TABLE paperCategory (
    paperCategoryID int auto_increment,
    paperID int,
    categoryID int,
    foreign key (paperID) references paper(paperID),
    foreign key (categoryID) references category(categoryID),
    primary key (paperCategoryID)
);

select * from paperCategory;


# populate paperCategory

insert into paperCategory(paperID, categoryID) values
    (1, 2),
    (1, 4),
    (1, 9),
    (1, 10),
    (2, 4),
    (2, 5),
    (2, 10),
    (2, 11);

select * from paperCategory;



