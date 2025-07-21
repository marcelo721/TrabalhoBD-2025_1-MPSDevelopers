-- 1. Dado o número (matrícula) do aluno (student.code)
use Equipe554557;
-- 1.1 Disciplinas em que está atualmente matriculado
SELECT s.name AS subject_name
FROM enrollment e
JOIN subject s ON e.subject_code = s.code
WHERE e.student_code = 400000 AND e.status_enrollment = 'IN_PROGRESS';

-- 1.2 Disciplinas que já concluiu
SELECT s.name AS subject_name
FROM enrollment e
JOIN subject s ON e.subject_code = s.code
WHERE e.student_code = 400000 AND e.status_enrollment = 'FINISHED';

-- 1.3 Curso do aluno
SELECT c.name AS course_name
FROM student s
JOIN course c ON s.course_code = c.code
WHERE s.code = 400000;

-- 1.4 Dados pessoais do aluno
SELECT s.code, s.name, s.address, s.student_type, u.login
FROM student s
LEFT JOIN users u ON s.user_id = u.id
WHERE s.code = 400000;

-- 2. Dado o código de um departamento (department.code)

-- 2.1 Cursos do departamento
SELECT c.code, c.name
FROM course c
WHERE c.department_code = 400000;

-- 2.2 Detalhes do departamento
SELECT code, name
FROM department
WHERE code = 400000;

-- 3. Dado um curso (course.code)

-- 3.1 Disciplinas obrigatórias do curso
SELECT s.name
FROM subject s
WHERE s.course_code = 400000 AND s.type_subject = 'OBLIGATORY';

-- 3.2 Disciplinas optativas do curso
SELECT s.name
FROM subject s
WHERE s.course_code = 400000 AND s.type_subject = 'OPTIONAL';

-- 3.3 Alunos do curso
SELECT s.code, s.name
FROM student s
WHERE s.course_code = 400000;

-- 3.4 Alunos que já fizeram todas as disciplinas obrigatórias
SELECT s.code, s.name
FROM student s
WHERE s.course_code = 400000
AND NOT EXISTS (
    SELECT 1
    FROM subject subj
    WHERE subj.course_code = s.course_code
    AND subj.type_subject = 'OBLIGATORY'
    AND subj.code NOT IN (
        SELECT e.subject_code
        FROM enrollment e
        WHERE e.student_code = s.code AND e.status_enrollment = 'FINISHED'
    )
);

-- 3.5 Alunos que não fizeram nenhuma disciplina optativa
SELECT s.code, s.name
FROM student s
WHERE s.course_code = 400000
AND NOT EXISTS (
    SELECT 1
    FROM enrollment e
    JOIN subject subj ON e.subject_code = subj.code
    WHERE e.student_code = s.code
    AND e.status_enrollment = 'FINISHED'
    AND subj.type_subject = 'OPTIONAL'
);

-- 4. Dado uma disciplina (subject.code)

-- 4.1 Alunos matriculados na disciplina
SELECT st.code, st.name
FROM enrollment e
JOIN student st ON e.student_code = st.code
WHERE e.subject_code = 1;

-- 4.2 Pré-requisitos da disciplina
SELECT s2.name AS prerequisite_name
FROM subject_prerequisites sp
JOIN subject s2 ON sp.prerequisite_code = s2.code
WHERE sp.subject_code = 2;

-- 4.3 Disciplinas que têm esta como pré-requisito
SELECT s2.name AS dependent_subject_name
FROM subject_prerequisites sp
JOIN subject s2 ON sp.subject_code = s2.code
WHERE sp.prerequisite_code = 1;

-- 5. Dado um orientador (teacher.code)

-- 5.1 Alunos orientandos do orientador
SELECT s.code, s.name
FROM student_post_graduate pg
JOIN student s ON pg.code = s.code
WHERE pg.advisor_id = 400000;

-- 5.2 Disciplinas dadas pelo orientador
SELECT subj.code, subj.name
FROM teacher_subjects ts
JOIN subject subj ON ts.subject_id = subj.code
WHERE ts.teacher_id = 400000;

-- 5.3 Total de créditos das disciplinas do orientador
SELECT SUM(subj.credits) AS total_credits
FROM teacher_subjects ts
JOIN subject subj ON ts.subject_id = subj.code
WHERE ts.teacher_id = 400000;
