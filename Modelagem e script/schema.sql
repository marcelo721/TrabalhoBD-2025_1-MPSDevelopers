-- Para não ter problemas se já existir um database com o mesmo nome
DROP DATABASE IF EXISTS academic_management;

-- criação do banco 
CREATE DATABASE academic_management;
USE academic_management;

-- tabela de departamento
CREATE TABLE department (
    code BIGINT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL UNIQUE,
    PRIMARY KEY (code)
)AUTO_INCREMENT = 400000;


-- tabela de usuários. todos os Professores, funcionários, alunos e admins terão que ter um user para usar como login 
CREATE TABLE users (
    id BIGINT NOT NULL AUTO_INCREMENT,
    login VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(60) NOT NULL,
    role_user ENUM('TEACHER', 'STUDENT', 'EMPLOYEE', 'ADMIN') NOT NULL,
    PRIMARY KEY (id)
)AUTO_INCREMENT = 400000;


-- tabela de Empregados
CREATE TABLE employee (
    code BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    user_id BIGINT UNIQUE,
    department_id BIGINT,
    CONSTRAINT fk_employee_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_employee_department FOREIGN KEY (department_id) REFERENCES department(code)
)AUTO_INCREMENT = 400000;


-- Tabela de cursos 
CREATE TABLE course (
    code BIGINT NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    min_credits INT NOT NULL,
    department_code BIGINT,
    PRIMARY KEY (code),
    CONSTRAINT fk_course_department FOREIGN KEY (department_code)
        REFERENCES department(code) ON DELETE CASCADE
)AUTO_INCREMENT = 400000;

-- Tabela de professores
CREATE TABLE teacher (
     code BIGINT NOT NULL AUTO_INCREMENT,
     name VARCHAR(255) NOT NULL,
     birth_date DATE NOT NULL,
     hire_date DATE NOT NULL,
     user_id BIGINT UNIQUE,
     CPF VARCHAR(14) NOT NULL UNIQUE,
     department_id BIGINT,
     PRIMARY KEY (code),
     CONSTRAINT fk_teacher_department FOREIGN KEY (department_id)
         REFERENCES department(code) ON DELETE CASCADE,
     CONSTRAINT fk_teacher_user FOREIGN KEY (user_id)
         REFERENCES users(id)
         ON DELETE CASCADE
)AUTO_INCREMENT = 400000;


-- Tabela de estudantes. Não define o tipo do Estudante outra tabela será responsável pelo tipo do estudante
CREATE TABLE student (
    code BIGINT NOT NULL AUTO_INCREMENT,
    name VARCHAR(70) NOT NULL,
    address VARCHAR(255) NOT NULL,
    course_code BIGINT NOT NULL,
    user_id BIGINT UNIQUE,
    student_type VARCHAR(31),
    PRIMARY KEY (code),
    CONSTRAINT fk_student_course FOREIGN KEY (course_code)
        REFERENCES course(code),
    CONSTRAINT fk_student_user FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
)AUTO_INCREMENT = 400000;

-- Tabela que faz associação com a Tabela Estudante quando o mesmo é Estudante de Graduação
CREATE TABLE student_undergraduate (
    code BIGINT NOT NULL,
    admission_year DATE NOT NULL,
    PRIMARY KEY (code),
    CONSTRAINT fk_undergraduate_student FOREIGN KEY (code)
       REFERENCES student(code)
       ON DELETE CASCADE
);

-- Tabela que faz associação com a Tabela Estudante quando o mesmo é Estudante de Pós-Graduação
CREATE TABLE student_post_graduate (
    code BIGINT NOT NULL,
    advisor_id BIGINT,
    CONSTRAINT fk_postgraduate_student FOREIGN KEY (code)
      REFERENCES student(code)
      ON DELETE CASCADE,
    CONSTRAINT fk_postgraduate_advisor FOREIGN KEY (advisor_id)
      REFERENCES teacher(code)
);

-- Tabela que guarda a lista de cursos já cursados pelos estudantes de pós-graduação
CREATE TABLE postgraduate_previous_courses (
    student_code BIGINT NOT NULL,
    subject_name VARCHAR(255) NOT NULL,
    PRIMARY KEY (student_code, subject_name),
    CONSTRAINT fk_pg_prev_courses_student FOREIGN KEY (student_code)
       REFERENCES student_post_graduate(code)
       ON DELETE CASCADE
);

-- Tabela que armazena os Telefones dos estudantes 
CREATE TABLE phone (
    id BIGINT NOT NULL AUTO_INCREMENT,
    description VARCHAR(100) NOT NULL,
    number VARCHAR(20) NOT NULL,
    student_code BIGINT,
    PRIMARY KEY (id),
    CONSTRAINT fk_phone_student FOREIGN KEY (student_code)
       REFERENCES student(code) ON DELETE CASCADE
);

-- Tabela que armazena as disciplinas dos cursos 
CREATE TABLE subject (
    code BIGINT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL UNIQUE,
    credits INT NOT NULL,
    syllabus TEXT NOT NULL,
    course_code BIGINT,
    PRIMARY KEY (code),
    type_subject ENUM('OBLIGATORY', 'OPTIONAL') NOT NULL,
    CONSTRAINT fk_subject_course FOREIGN KEY (course_code)
     REFERENCES course(code) ON DELETE CASCADE
);

-- Tabela que armazena os pré requisitos de cada disciplina 
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

-- Tabela que associa um estudante a uma disciplina ou seja, quando um estudante eestá matriculado em uma determinada disciplina
CREATE TABLE enrollment (
    code BIGINT NOT NULL AUTO_INCREMENT,
    student_code BIGINT,
    subject_code BIGINT,
    final_grade FLOAT,
    attendance FLOAT,
    status_enrollment ENUM('IN_PROGRESS', 'FINISHED') NOT NULL,
    PRIMARY KEY (code),
    CONSTRAINT fk_enrollment_student FOREIGN KEY (student_code)
        REFERENCES student(code) ON DELETE CASCADE,
    CONSTRAINT fk_enrollment_subject FOREIGN KEY (subject_code)
        REFERENCES subject(code) ON DELETE CASCADE
);

-- Tabela que armazena os e-mails dos professores 
CREATE TABLE teacher_emails (
    teacher_id BIGINT NOT NULL,
    email VARCHAR(100),
    PRIMARY KEY (teacher_id, email),
    CONSTRAINT fk_teacher_emails FOREIGN KEY (teacher_id)
        REFERENCES teacher(code)
        ON DELETE CASCADE
);

-- Tabela que armazena o telefone dos professores
CREATE TABLE teacher_phones (
    teacher_id BIGINT NOT NULL,
    phone VARCHAR(20),
    PRIMARY KEY (teacher_id, phone),
    CONSTRAINT fk_teacher_phones FOREIGN KEY (teacher_id)
        REFERENCES teacher(code)
        ON DELETE CASCADE
);


-- tabela que armazena as disciplinas leionadas pelos professores 
CREATE TABLE teacher_subjects (
    teacher_id BIGINT NOT NULL,
    subject_id BIGINT NOT NULL,
    PRIMARY KEY (teacher_id, subject_id),
    FOREIGN KEY (teacher_id) REFERENCES teacher(code) ON DELETE CASCADE,
    FOREIGN KEY (subject_id) REFERENCES subject(code) ON DELETE CASCADE
);
