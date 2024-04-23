# login_form_submission.sql

# Section 1
# Create login(username, password)

drop table if exists login;
CREATE TABLE login (
    username varchar(255) primary key,
    password varchar(255) NOT NULL
);

select * from login;

# Section 2
# Create formSubmission(fullName, email, message)

drop table if exists formSubmission;
CREATE TABLE formSubmission (
    formSubmissionID int auto_increment primary key,
    fullName varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    message varchar(1000) NOT NULL
);

select * from formSubmission;
