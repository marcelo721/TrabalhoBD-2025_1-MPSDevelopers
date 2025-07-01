CREATE DATABASE academic_management;

USE academic_management;

CREATE TABLE department (
    code BIGINT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL UNIQUE,
    PRIMARY KEY (code)
);

CREATE TABLE course (
    code BIGINT NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    min_credits INT NOT NULL,
    department_code BIGINT,
    PRIMARY KEY (code),
    CONSTRAINT fk_course_department FOREIGN KEY (department_code)
        REFERENCES department(code)
);

CREATE TABLE teacher (
    code BIGINT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    birth_date DATE NOT NULL,
    hire_date DATE NOT NULL,
    CPF VARCHAR(255) NOT NULL UNIQUE,
    department_id BIGINT,
    PRIMARY KEY (code),
    CONSTRAINT fk_teacher_department FOREIGN KEY (department_id)
        REFERENCES department(code)
);

CREATE TABLE student (
    code BIGINT NOT NULL AUTO_INCREMENT,
    name VARCHAR(70) NOT NULL,
    type_student VARCHAR(50) NOT NULL,
    admission_year DATE NOT NULL,
    address VARCHAR(255) NOT NULL,
    advisor_id BIGINT NOT NULL,
    course_id BIGINT,
    PRIMARY KEY (code),
    CONSTRAINT fk_student_advisor FOREIGN KEY (advisor_id)
        REFERENCES teacher(code),
    CONSTRAINT fk_student_course FOREIGN KEY (course_id)
        REFERENCES course(code)
);

CREATE TABLE phone (
    id BIGINT NOT NULL AUTO_INCREMENT,
    description VARCHAR(100) NOT NULL,
    number VARCHAR(20) NOT NULL,
    student_id BIGINT,
    PRIMARY KEY (id),
    CONSTRAINT fk_phone_student FOREIGN KEY (student_id)
        REFERENCES student(code)
);

CREATE TABLE subject (
    code BIGINT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL UNIQUE,
    credits INT NOT NULL,
    syllabus TEXT NOT NULL,
    course_id BIGINT,
    type_subject VARCHAR(50) NOT NULL,
    PRIMARY KEY (code),
    CONSTRAINT fk_subject_course FOREIGN KEY (course_id)
        REFERENCES course(code)
);

CREATE TABLE subject_prerequisites (
    subject_code BIGINT NOT NULL,
    prerequisite_code BIGINT NOT NULL,
    PRIMARY KEY (subject_code, prerequisite_code),
    CONSTRAINT fk_subject_prereq_subject FOREIGN KEY (subject_code)
        REFERENCES subject(code)
        ON DELETE CASCADE,
    CONSTRAINT fk_subject_prereq_prereq FOREIGN KEY (prerequisite_code)
        REFERENCES subject(code)
        ON DELETE CASCADE
);

CREATE TABLE enrollment (
    code BIGINT NOT NULL AUTO_INCREMENT,
    student_id BIGINT,
    subject_code BIGINT,
    finalGrade FLOAT NOT NULL,
    attendance INT NOT NULL,
    PRIMARY KEY (code),
    CONSTRAINT fk_enrollment_student FOREIGN KEY (student_id)
        REFERENCES student(code),
    CONSTRAINT fk_enrollment_subject FOREIGN KEY (subject_code)
        REFERENCES subject(code)
);

CREATE TABLE previous_courses (
    student_id BIGINT NOT NULL,
    previous_courses VARCHAR(255),
    CONSTRAINT fk_prev_courses_student FOREIGN KEY (student_id)
        REFERENCES student(code)
        ON DELETE CASCADE
);

CREATE TABLE teacher_emails (
    teacher_id BIGINT NOT NULL,
    email VARCHAR(255),
    CONSTRAINT fk_teacher_emails FOREIGN KEY (teacher_id)
        REFERENCES teacher(code)
        ON DELETE CASCADE
);

CREATE TABLE users (
    id BIGINT NOT NULL AUTO_INCREMENT,
    login VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(60) NOT NULL,
    type VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);



