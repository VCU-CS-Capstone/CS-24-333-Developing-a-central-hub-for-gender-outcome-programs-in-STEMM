# CS_24_333-ddl.sql

## DO NOT RENAME OR OTHERWISE CHANGE THE SECTION TITLES OR ORDER.

# Section 1
# Drops all tables.  This section should be amended as new tables are added.

SET FOREIGN_KEY_CHECKS=0;
DROP TABLE IF EXISTS paper;
DROP TABLE IF EXISTS author;
DROP TABLE IF EXISTS agieCategory;
DROP TABLE IF EXISTS keyword;
DROP TABLE IF EXISTS paperKeyword;
DROP TABLE IF EXISTS paperCategory;
DROP TABLE IF EXISTS authorPaper;
# ... 
SET FOREIGN_KEY_CHECKS=1;

# Section 2
# Create author(authorID, authorName)

drop table if exists author;
CREATE TABLE author (
    authorID int primary key,
    authorName varchar(255) NOT NULL
);

select * from author;

# populate author
insert into author(authorID, authorName) values
    (1, 'Deidra Crews'),
    (2, 'Katherine Wilson'),
    (3, 'Taylor Barongan');

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
# Create agieCategory(categoryID, categoryName)

drop table if exists agieCategory;
CREATE TABLE agieCategory (
    categoryID int primary key,
    categoryName varchar(255)
);

select * from agieCategory;

# populate agieCategory
insert into agieCategory(categoryID, categoryName) values
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

select * from agieCategory;


# Section 5
# Create paper(paperPMID, title, content, paperURL, publishedDate)

drop table if exists paper;
create table paper (
    paperPMID int NOT NULL,
    title varchar(255) NOT NULL,
    content varchar(255),
    paperURL varchar(255) NOT NULL,
    publishedDate date,
    primary key (paperPMID)
);

select * from paper;


# populate paper 
insert into paper(paperPMID, title, paperURL, publishedDate) values
    (32096414, 'Helping Scholars Overcome Socioeconomic Barriers to Medical and Biomedical Careers: Creating a Pipeline Initiative', 'https://pubmed-ncbi-nlm-nih-gov.proxy.library.vcu.edu/32096414/',
    '2020-02-25'),
    (37736045, 'Project Strengthen: An STEMM-focused career development workshop to prepare underrepresented minority students for graduate school', 'https://pubmed.ncbi.nlm.nih.gov/37736045/',
    '2023-10-20');

select * from paper;


# Section 6
# Create paperKeyword(paperKeywordID, paperPMID, keywordID)

drop table if exists paperKeyword;
CREATE TABLE paperKeyword (
    paperKeywordID int auto_increment,
    paperPMID int NOT NULL,
    keywordID int,
    foreign key (paperPMID) references paper(paperPMID),
    foreign key (keywordID) references keyword(keywordID),
    primary key (paperKeywordID)
);

select * from paperKeyword;

# populate paperKeyword
insert into paperKeyword(paperPMID, keywordID) values
    (32096414, 3),
    (37736045, 1);

select * from paperKeyword;


# Section 7
# Create paperCategory(paperCategoryID, paperPMID, categoryID)
drop table if exists paperCategory;
CREATE TABLE paperCategory (
    paperCategoryID int auto_increment,
    paperPMID int NOT NULL,
    categoryID int,
    foreign key (paperPMID) references paper(paperPMID),
    foreign key (categoryID) references agieCategory(categoryID),
    primary key (paperCategoryID)
);

select * from paperCategory;


# populate paperCategory

insert into paperCategory(paperPMID, categoryID) values
    (32096414, 2),
    (32096414, 4),
    (32096414, 9),
    (32096414, 10),
    (37736045, 4),
    (37736045, 5),
    (37736045, 10),
    (37736045, 11);

select * from paperCategory;


# Section 8
# Create authorPaper(AuthorPaperID, AuthorID, paperPMID)
drop table if exists authorPaper;
CREATE TABLE authorPaper (
    AuthorPaperID int auto_increment,
    authorID int,
    paperPMID int NOT NULL,
    foreign key (authorID) references author(authorID),
    foreign key (paperPMID) references paper(paperPMID),
    primary key (AuthorPaperID)
);

select * from authorPaper;

# populate authorPaper
insert into authorPaper(authorID, paperPMID) values
    (1, 32096414),
    (2, 37736045),
    (2, 37736045);

select * from authorPaper;

