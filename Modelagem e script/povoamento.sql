USE academic_management;

-- Inserir departamentos
INSERT INTO department (name) VALUES 
('Ciência da Computação'),
('Engenharia Elétrica'),
('Matemática'),
('Física'),
('Administração');

-- Inserir usuários
INSERT INTO users (login, password, role_user) VALUES 
-- Administradores
('admin1', '$2a$10$xD7TzL5.U9vYH7J7u8JQ.eZ.6d9r1Q1VJZ1JZ1JZ1JZ1JZ1JZ1JZ1', 'ADMIN'),
('admin2', '$2a$10$xD7TzL5.U9vYH7J7u8JQ.eZ.6d9r1Q1VJZ1JZ1JZ1JZ1JZ1JZ1JZ1', 'ADMIN'),
-- Funcionários
('emp1', '$2a$10$xD7TzL5.U9vYH7J7u8JQ.eZ.6d9r1Q1VJZ1JZ1JZ1JZ1JZ1JZ1JZ1', 'EMPLOYEE'),
('emp2', '$2a$10$xD7TzL5.U9vYH7J7u8JQ.eZ.6d9r1Q1VJZ1JZ1JZ1JZ1JZ1JZ1JZ1', 'EMPLOYEE'),
-- Professores
('prof1', '$2a$10$xD7TzL5.U9vYH7J7u8JQ.eZ.6d9r1Q1VJZ1JZ1JZ1JZ1JZ1JZ1JZ1', 'TEACHER'),
('prof2', '$2a$10$xD7TzL5.U9vYH7J7u8JQ.eZ.6d9r1Q1VJZ1JZ1JZ1JZ1JZ1JZ1JZ1', 'TEACHER'),
('prof3', '$2a$10$xD7TzL5.U9vYH7J7u8JQ.eZ.6d9r1Q1VJZ1JZ1JZ1JZ1JZ1JZ1JZ1', 'TEACHER'),
('prof4', '$2a$10$xD7TzL5.U9vYH7J7u8JQ.eZ.6d9r1Q1VJZ1JZ1JZ1JZ1JZ1JZ1JZ1', 'TEACHER'),
-- Alunos
('aluno1', '$2a$10$xD7TzL5.U9vYH7J7u8JQ.eZ.6d9r1Q1VJZ1JZ1JZ1JZ1JZ1JZ1JZ1', 'STUDENT'),
('aluno2', '$2a$10$xD7TzL5.U9vYH7J7u8JQ.eZ.6d9r1Q1VJZ1JZ1JZ1JZ1JZ1JZ1JZ1', 'STUDENT'),
('aluno3', '$2a$10$xD7TzL5.U9vYH7J7u8JQ.eZ.6d9r1Q1VJZ1JZ1JZ1JZ1JZ1JZ1JZ1', 'STUDENT'),
('aluno4', '$2a$10$xD7TzL5.U9vYH7J7u8JQ.eZ.6d9r1Q1VJZ1JZ1JZ1JZ1JZ1JZ1JZ1', 'STUDENT'),
('aluno5', '$2a$10$xD7TzL5.U9vYH7J7u8JQ.eZ.6d9r1Q1VJZ1JZ1JZ1JZ1JZ1JZ1JZ1', 'STUDENT'),
('aluno6', '$2a$10$xD7TzL5.U9vYH7J7u8JQ.eZ.6d9r1Q1VJZ1JZ1JZ1JZ1JZ1JZ1JZ1', 'STUDENT');

-- Inserir funcionários
INSERT INTO employee (name, user_id, department_id) VALUES 
('João Silva', 400002, 400000),
('Maria Oliveira', 400003, 400001);

-- Inserir cursos
INSERT INTO course (name, min_credits, department_code) VALUES 
('Bacharelado em Ciência da Computação', 240, 400000),
('Engenharia Elétrica', 300, 400001),
('Licenciatura em Matemática', 240, 400002),
('Bacharelado em Física', 240, 400003),
('Administração de Empresas', 240, 400004),
('Mestrado em Ciência da Computação', 60, 400000),
('Doutorado em Física', 90, 400003);

-- Inserir professores
INSERT INTO teacher (name, birth_date, hire_date, user_id, CPF, department_id) VALUES 
('Carlos Magno', '1970-05-15', '2005-03-10', 400004, '111.111.111-11', 400000),
('Ana Paula', '1980-08-20', '2010-07-15', 400005, '222.222.222-22', 400001),
('Roberto Santos', '1975-11-30', '2008-02-20', 400006, '333.333.333-33', 400002),
('Fernanda Lima', '1982-03-25', '2015-09-05', 400007, '444.444.444-44', 400003);

-- Inserir emails dos professores
INSERT INTO teacher_emails (teacher_id, email) VALUES 
(400000, 'carlos.magno@universidade.edu'),
(400000, 'carlos.magno.pessoal@gmail.com'),
(400001, 'ana.paula@universidade.edu'),
(400002, 'roberto.santos@universidade.edu'),
(400003, 'fernanda.lima@universidade.edu');

-- Inserir telefones dos professores
INSERT INTO teacher_phones (teacher_id, phone) VALUES 
(400000, '(11) 99999-9999'),
(400000, '(11) 3333-3333'),
(400001, '(11) 88888-8888'),
(400002, '(11) 77777-7777'),
(400003, '(11) 66666-6666');

-- Inserir alunos
INSERT INTO student (name, address, course_code, user_id, student_type) VALUES 
-- Alunos de graduação
('Pedro Alves', 'Rua A, 123 - São Paulo', 400000, 400008, 'UNDERGRADUATE'),
('Juliana Costa', 'Av. B, 456 - São Paulo', 400000, 400009, 'UNDERGRADUATE'),
('Marcos Ribeiro', 'Rua C, 789 - São Paulo', 400001, 400010, 'UNDERGRADUATE'),
('Laura Mendes', 'Av. D, 101 - São Paulo', 400002, 400011, 'UNDERGRADUATE'),
-- Alunos de pós-graduação
('Ricardo Oliveira', 'Rua E, 202 - São Paulo', 400005, 400012, 'POSTGRADUATE'),
('Patrícia Souza', 'Av. F, 303 - São Paulo', 400006, 400013, 'POSTGRADUATE');

-- Inserir alunos de graduação
INSERT INTO student_undergraduate (code, admission_year) VALUES 
(400000, '2020-03-01'),
(400001, '2021-03-01'),
(400002, '2019-03-01'),
(400003, '2022-03-01');

-- Inserir alunos de pós-graduação
INSERT INTO student_post_graduate (code, advisor_id) VALUES 
(400004, 400000),
(400005, 400003);

-- Inserir cursos anteriores de pós-graduandos
INSERT INTO postgraduate_previous_courses (student_code, subject_name) VALUES 
(400004, 'Algoritmos Avançados'),
(400004, 'Inteligência Artificial'),
(400005, 'Física Quântica'),
(400005, 'Mecânica Estatística');

-- Inserir telefones dos alunos
INSERT INTO phone (description, number, student_code) VALUES 
('Celular', '(11) 99999-1111', 400000),
('Residencial', '(11) 3333-1111', 400000),
('Celular', '(11) 99999-2222', 400001),
('Celular', '(11) 99999-3333', 400002),
('Celular', '(11) 99999-4444', 400003),
('Celular', '(11) 99999-5555', 400004),
('Celular', '(11) 99999-6666', 400005);

-- Inserir disciplinas
INSERT INTO subject (name, credits, syllabus, course_code, type_subject) VALUES 
-- Disciplinas de Ciência da Computação
('Introdução à Programação', 4, 'Fundamentos de programação usando Python', 400000, 'OBLIGATORY'),
('Estruturas de Dados', 4, 'Listas, pilhas, filas, árvores e grafos', 400000, 'OBLIGATORY'),
('Algoritmos', 4, 'Análise de algoritmos e técnicas de projeto', 400000, 'OBLIGATORY'),
('Banco de Dados', 4, 'Modelagem e implementação de bancos de dados relacionais', 400000, 'OBLIGATORY'),
('Inteligência Artificial', 4, 'Fundamentos de IA e machine learning', 400000, 'OPTIONAL'),
('Computação Gráfica', 4, 'Fundamentos de gráficos computacionais', 400000, 'OPTIONAL'),

-- Disciplinas de Engenharia Elétrica
('Circuitos Elétricos', 6, 'Análise de circuitos em corrente contínua e alternada', 400001, 'OBLIGATORY'),
('Eletrônica Digital', 4, 'Portas lógicas e sistemas digitais', 400001, 'OBLIGATORY'),
('Sistemas de Controle', 4, 'Teoria de controle clássico', 400001, 'OBLIGATORY'),

-- Disciplinas de Matemática
('Cálculo I', 6, 'Limites, derivadas e integrais', 400002, 'OBLIGATORY'),
('Álgebra Linear', 4, 'Matrizes, espaços vetoriais e transformações lineares', 400002, 'OBLIGATORY'),
('Geometria Analítica', 4, 'Geometria no plano e no espaço', 400002, 'OBLIGATORY'),

-- Disciplinas de Pós-graduação
('Tópicos Avançados em IA', 4, 'Técnicas avançadas de inteligência artificial', 400005, 'OBLIGATORY'),
('Pesquisa em Computação', 4, 'Metodologia científica em computação', 400005, 'OBLIGATORY'),
('Física Teórica Avançada', 4, 'Tópicos avançados em física teórica', 400006, 'OBLIGATORY');

-- Inserir pré-requisitos
INSERT INTO subject_prerequisites (subject_code, prerequisite_code) VALUES 
(2, 1), -- Estruturas de Dados requer Introdução à Programação
(3, 2), -- Algoritmos requer Estruturas de Dados
(4, 1), -- Banco de Dados requer Introdução à Programação
(5, 1), -- Inteligência Artificial requer Algoritmos
(8, 7);

-- Inserir professores em disciplinas
INSERT INTO teacher_subjects (teacher_id, subject_id) VALUES 
(400000, 1), -- Carlos ensina Introdução à Programação
(400000, 2), -- Carlos ensina Estruturas de Dados
(400000, 3), -- Carlos ensina Algoritmos
(400001, 4), -- Ana ensina Circuitos Elétricos
(400001, 5), -- Ana ensina Eletrônica Digital
(400002, 6), -- Roberto ensina Cálculo I
(400002, 7), -- Roberto ensina Álgebra Linear
(400003, 8), -- Fernanda ensina Geometria Analítica
(400000, 9), -- Carlos ensina Tópicos Avançados em IA
(400003, 10); -- Fernanda ensina Física Teórica Avançada

-- Inserir matrículas
INSERT INTO enrollment (student_code, subject_code, final_grade, attendance, status_enrollment) VALUES 
-- Matrículas em andamento
(400000, 1, NULL, 75.5, 'IN_PROGRESS'),
(400000, 3, NULL, 80.0, 'IN_PROGRESS'),
(400001, 2, NULL, 90.0, 'IN_PROGRESS'),
(400002, 1, NULL, 85.0, 'IN_PROGRESS'),
(400003, 4, NULL, 95.0, 'IN_PROGRESS'),
(400004, 5, NULL, 100.0, 'IN_PROGRESS'),
(400005, 6, NULL, 100.0, 'IN_PROGRESS'),

-- Matrículas concluídas
(400000, 2, 8.5, 90.0, 'FINISHED'),
(400001, 1, 7.8, 85.0, 'FINISHED'),
(400001, 3, 9.0, 95.0, 'FINISHED'),
(400002, 4, 6.5, 75.0, 'FINISHED'),
(400003, 5, 8.0, 90.0, 'FINISHED'),
(400004, 7, 9.5, 100.0, 'FINISHED');