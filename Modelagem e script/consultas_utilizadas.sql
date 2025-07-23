use equipe554557;
-- Consultas utilizadas na construção do trabalho 

-- Buscar usuário por ID
SELECT * FROM users WHERE id = 400000;

-- Buscar aluno por código
SELECT * FROM student WHERE code = 400000;

-- Buscar professor por código
SELECT * FROM teacher WHERE code = 400000;

-- Buscar funcionário por código
SELECT * FROM employee WHERE code = 400000;

-- Buscar curso por código
SELECT * FROM course WHERE code = 400000;

-- Buscar departamento por código
SELECT * FROM department WHERE code = 400000;

-- Buscar disciplina por código
SELECT * FROM subject WHERE code = 2;

-- Buscar matrícula por código
SELECT * FROM enrollment WHERE code = 1;

-- Buscar telefone de aluno por ID
SELECT * FROM phone WHERE id = 1;

-- Buscar disciplinas já cursadas de um aluno
SELECT * FROM enrollment WHERE student_code = 400000 AND status_enrollment = 'FINISHED';

-- Buscar disciplinas em progresso de um aluno
SELECT * FROM enrollment WHERE student_code = 400000 AND status_enrollment = 'IN_PROGRESS';

-- Buscar e-mails de um professor
SELECT * FROM teacher_emails WHERE teacher_id = 400000;

-- Buscar telefones de um professor
SELECT * FROM teacher_phones WHERE teacher_id = 400000;

-- Buscar disciplinas associadas a um professor
SELECT * FROM teacher_subjects WHERE teacher_id = 400000;

-- Buscar disciplinas que é pre requisito de outras disciplinas
SELECT * FROM subject_prerequisites WHERE prerequisite_code = 1;

-- Buscar pré-requisitos de uma disciplina
SELECT * FROM subject_prerequisites WHERE subject_code = 2;

-- Buscar cursos anteriores de um aluno de pós-graduação
SELECT * FROM postgraduate_previous_courses WHERE student_code = 400005;

-- Listar todos os usuários
SELECT * FROM users;

-- Listar todos os alunos
SELECT * FROM student;

-- Listar todos os professores
SELECT * FROM teacher;

-- Listar todos os funcionários
SELECT * FROM employee;

-- Listar todos os cursos
SELECT * FROM course;

-- Listar todos os departamentos
SELECT * FROM department;

-- Listar todas as disciplinas
SELECT * FROM subject;

-- Listar todas as matrículas
SELECT * FROM enrollment;

-- Listar todos os telefones de alunos
SELECT * FROM phone;

-- Listar todos os e-mails de professores
SELECT * FROM teacher_emails;

-- Listar todos os telefones de professores
SELECT * FROM teacher_phones;

-- Listar todas as relações professor-disciplina
SELECT * FROM teacher_subjects;

-- Listar todos os pré-requisitos
SELECT * FROM subject_prerequisites;

-- Listar todos os cursos anteriores de pós-graduação
SELECT * FROM postgraduate_previous_courses;

-- Listar todos os cursos de um determinado departamento 
SELECT c.code, c.name, c.min_credits
FROM course c
WHERE c.department_code = 400000;

-- Listar todos os estudantes de um determinado curso 
SELECT s.code, s.name, s.address, s.student_type
FROM student s
WHERE s.course_code = 400000;

-- Listar todos os professores de um determinado departamento 
SELECT t.code, t.name, t.birth_date, t.hire_date, t.CPF
FROM teacher t
WHERE t.department_id = 400000;

-- Listar todas as discilpinas já cursadas de um determinado estudante 
SELECT subj.code, subj.name, subj.credits, subj.type_subject, e.final_grade, e.attendance
FROM enrollment e
JOIN subject subj ON e.subject_code = subj.code
WHERE e.student_code = 400000 AND e.status_enrollment = 'FINISHED';

-- Listar todas as discilpinas em progresso de um determinado estudante 
SELECT subj.code, subj.name, subj.credits, subj.type_subject, e.attendance
FROM enrollment e
JOIN subject subj ON e.subject_code = subj.code
WHERE e.student_code = 400000 AND e.status_enrollment = 'IN_PROGRESS';

-- Listar todos os empregados dado um determinado departamento 
SELECT e.code, e.name, u.login
FROM employee e
LEFT JOIN users u ON e.user_id = u.id
WHERE e.department_id = 400000;

-- deletar um usuário associado a alguma entidade
DELETE FROM users WHERE id = 400020;

-- Deletar estudante de graduação
DELETE FROM student_undergraduate WHERE code = 400000;

-- Deletar estudante de pós-graduação
DELETE FROM student_post_graduate WHERE code = 400005;

-- Deletar estudante principal
DELETE FROM student WHERE code = 400007;

-- deletar um empregado 
DELETE FROM employee WHERE code = 400004;

-- Deletar e-mails
DELETE FROM teacher_emails WHERE teacher_id = 400000;

-- Deletar telefones
DELETE FROM teacher_phones WHERE teacher_id = 400000;

-- Deletar disciplinas associadas
DELETE FROM teacher_subjects WHERE teacher_id = 400000;

-- Deletar professor
DELETE FROM teacher WHERE code = 400000;

-- deletar um curso pelo código
DELETE FROM course WHERE code = 400000;

-- deletar um departamento
DELETE FROM department WHERE code = 400000;

-- atualizar o nome de um departamento
UPDATE department
SET name = 'Novo Nome do Departamento'
WHERE code = 400001; -- substitua pelo código real do departamento

-- atualizar o nome de um curso 
UPDATE course
SET name = 'Novo Nome do Curso'
WHERE code = 400001;

-- atualizar nome, data de contrato e data de nascimento 
UPDATE teacher
SET name = 'Novo Nome do Professor',
    birth_date = '1980-05-12',
    hire_date = '2020-08-01'
WHERE code = 400001; 

-- inserir novos email e telefones em um perfil do professor
INSERT INTO teacher_emails (teacher_id, email)
VALUES 
    (400001, 'professor.novo1@universidade.edu'),
    (400001, 'professor.novo2@universidade.edu');

-- atualizar nome endereço de um estudante
UPDATE student
SET name = 'Novo Nome do Estudante',
    address = 'Novo Endereço do Estudante'
WHERE code = 400001;

-- adicionar mais disciplinas de pre requisito 
INSERT INTO subject_prerequisites (subject_code, prerequisite_code)
VALUES 
    (400010, 400005),  -- Disciplina 400010 agora tem como pré-requisito a 400005
    (400010, 400006);  -- Disciplina 400010 também tem como pré-requisito a 400006







