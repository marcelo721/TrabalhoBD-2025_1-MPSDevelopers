DROP DATABASE IF EXISTS academic_management;
CREATE DATABASE academic_management;
USE academic_management;

DROP TABLE IF EXISTS teacher_emails;
DROP TABLE IF EXISTS previous_courses;
DROP TABLE IF EXISTS enrollment;
DROP TABLE IF EXISTS subject_prerequisites;
DROP TABLE IF EXISTS subject;
DROP TABLE IF EXISTS phone;
DROP TABLE IF EXISTS student;
DROP TABLE IF EXISTS teacher;
DROP TABLE IF EXISTS course;
DROP TABLE IF EXISTS department;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS course_subjects;
DROP TABLE IF EXISTS teacher_subject;

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
    type_student ENUM('UNDERGRADUATE', 'POSTGRADUATE') NOT NULL,
    admission_year DATE NOT NULL,
    address VARCHAR(255) NOT NULL,
    advisor_id BIGINT ,
    course_code BIGINT,
    PRIMARY KEY (code),
    CONSTRAINT fk_student_advisor FOREIGN KEY (advisor_id)
        REFERENCES teacher(code),
    CONSTRAINT fk_student_course FOREIGN KEY (course_code)
        REFERENCES course(code)
);

CREATE TABLE phone (
    id BIGINT NOT NULL AUTO_INCREMENT,
    description VARCHAR(100) NOT NULL,
    number VARCHAR(20) NOT NULL,
    student_code BIGINT,
    PRIMARY KEY (id),
    CONSTRAINT fk_phone_student FOREIGN KEY (student_code)
        REFERENCES student(code)
);

CREATE TABLE subject (
    code BIGINT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL UNIQUE,
    credits INT NOT NULL,
    syllabus TEXT NOT NULL,
    course_code BIGINT,
    type_subject ENUM('OBLIGATORY', 'OPTIONAL') NOT NULL,
    PRIMARY KEY (code),
    CONSTRAINT fk_subject_course FOREIGN KEY (course_code)
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
    student_code BIGINT,
    subject_code BIGINT,
    final_grade FLOAT ,
    attendance FLOAT ,
    PRIMARY KEY (code),
    CONSTRAINT fk_enrollment_student FOREIGN KEY (student_code)
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

CREATE TABLE teacher_phones (
    teacher_id BIGINT NOT NULL,
    phone VARCHAR(20),
    CONSTRAINT fk_teacher_phones FOREIGN KEY (teacher_id)
        REFERENCES teacher(code)
        ON DELETE CASCADE
);

CREATE TABLE teacher_subjects (
      teacher_id BIGINT NOT NULL,
      subject_id BIGINT NOT NULL,
      PRIMARY KEY (teacher_id, subject_id),
      FOREIGN KEY (teacher_id) REFERENCES teacher(code),
      FOREIGN KEY (subject_id) REFERENCES subject(code)
);

CREATE TABLE users (
    id BIGINT NOT NULL AUTO_INCREMENT,
    login VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(60) NOT NULL,
    type ENUM('ADMIN', 'EMPLOYEE', 'TEACHER', 'STUDENT') NOT NULL,
   PRIMARY KEY (id)
);

ALTER TABLE student AUTO_INCREMENT = 400000;
ALTER TABLE users AUTO_INCREMENT = 400000;
ALTER TABLE department AUTO_INCREMENT = 400000;
ALTER TABLE course AUTO_INCREMENT = 400000;
ALTER TABLE teacher AUTO_INCREMENT = 400000;





