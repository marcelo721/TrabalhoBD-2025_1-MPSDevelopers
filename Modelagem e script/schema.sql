-- Para não ter problemas se já existir um database com o mesmo nome
DROP DATABASE IF EXISTS Equipe554557;

-- criação do banco 
CREATE DATABASE Equipe554557;
USE Equipe554557;

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
    CONSTRAINT fk_employee_department FOREIGN KEY (department_id) 
    REFERENCES department(code) 
    ON DELETE CASCADE -- alteração 
)AUTO_INCREMENT = 400000;


-- Tabela de cursos 
CREATE TABLE course (
    code BIGINT NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    min_credits INT NOT NULL,
    department_code BIGINT,
    PRIMARY KEY (code),
    CONSTRAINT fk_course_department FOREIGN KEY (department_code)
        REFERENCES department(code) ON DELETE CASCADE -- alteração 
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
         REFERENCES department(code) 
         ON DELETE CASCADE,
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
        REFERENCES course(code)
        ON DELETE CASCADE,
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
      ON DELETE CASCADE -- alteração 
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



-- (22/07/2024) adicionado trigger para verificar se uma disciplina tem mais de dois professores
DELIMITER $$

CREATE TRIGGER trg_limit_teachers_per_subject
BEFORE INSERT ON teacher_subjects
FOR EACH ROW
BEGIN
    DECLARE teacher_count INT;

    SELECT COUNT(*) INTO teacher_count
    FROM teacher_subjects
    WHERE subject_id = NEW.subject_id;

    IF teacher_count >= 2 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Não é permitido associar mais de dois professores a uma disciplina.';
    END IF;
END$$

DELIMITER ;


-- (22/07/2024) adicionado trigger para verificar se a quantidades de creditos de uma disciplina é maior que 0

DELIMITER $$

CREATE TRIGGER trg_check_min_credits_before_insert
BEFORE INSERT ON course
FOR EACH ROW
BEGIN
    IF NEW.min_credits <= 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'O número mínimo de créditos deve ser maior que zero.';
    END IF;
END$$

CREATE TRIGGER trg_check_min_credits_before_update
BEFORE UPDATE ON course
FOR EACH ROW
BEGIN
    IF NEW.min_credits <= 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'O número mínimo de créditos deve ser maior que zero.';
    END IF;
END$$

DELIMITER ;


-- (22/07/2024) adicionado trigger para verificar emails repetidos

DELIMITER $$

CREATE TRIGGER trg_check_duplicate_teacher_email
BEFORE INSERT ON teacher_emails
FOR EACH ROW
BEGIN
    IF EXISTS (
        SELECT 1 FROM teacher_emails
        WHERE teacher_id = NEW.teacher_id AND email = NEW.email
    ) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Email duplicado para esse professor.';
    END IF;
END$$

DELIMITER ;

-- (22/07/2024) adicionado trigger para verificar numeros de telefones repetidos
DELIMITER $$

CREATE TRIGGER trg_check_duplicate_phone
BEFORE INSERT ON phone
FOR EACH ROW
BEGIN
    IF EXISTS (
        SELECT 1 FROM phone
        WHERE student_code = NEW.student_code AND number = NEW.number
    ) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Telefone duplicado para esse estudante.';
    END IF;
END$$

DELIMITER ;


