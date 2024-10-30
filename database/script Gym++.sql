
CREATE TABLE Usuario (
    id_usuario INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    senha_hash VARCHAR(255),
    data_nascimento DATE,
    altura DECIMAL(5,2),
    peso DECIMAL(5,2),
    objetivo VARCHAR(100)  -- Exemplo: emagrecimento, hipertrofia
);

CREATE TABLE GrupoMuscular (
    id_grupo INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(50)  -- Exemplo: peito, pernas, abdômen, etc.
);

CREATE TABLE Exercicio (
    id_exercicio INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100),
    descricao TEXT,  -- Explicação do exercício, instruções
    dificuldade ENUM('iniciante', 'intermediário', 'avançado'),
    equipamento_necessario BOOLEAN DEFAULT FALSE  -- Indica se precisa de equipamento
);

CREATE TABLE ExercicioGrupoMuscular (
    id_exercicio INT,
    id_grupo INT,
    PRIMARY KEY (id_exercicio, id_grupo),
    FOREIGN KEY (id_exercicio) REFERENCES Exercicio(id_exercicio),
    FOREIGN KEY (id_grupo) REFERENCES GrupoMuscular(id_grupo)
);

CREATE TABLE Treino (
    id_treino INT PRIMARY KEY AUTO_INCREMENT,
    id_usuario INT,
    nome VARCHAR(100),  -- Exemplo: "Treino de segunda-feira"
    data_criacao DATE,
    objetivo VARCHAR(100),  -- Exemplo: emagrecimento, hipertrofia
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario)
);

CREATE TABLE TreinoExercicio (
    id_treino INT,
    id_exercicio INT,
    series INT,  -- Número de séries
    repeticoes INT,  -- Número de repetições por série
    descanso INT,  -- Tempo de descanso em segundos
    PRIMARY KEY (id_treino, id_exercicio),
    FOREIGN KEY (id_treino) REFERENCES Treino(id_treino),
    FOREIGN KEY (id_exercicio) REFERENCES Exercicio(id_exercicio)
);

CREATE TABLE Progresso (
    id_progresso INT PRIMARY KEY AUTO_INCREMENT,
    id_usuario INT,
    id_exercicio INT,
    data DATE,
    series_completas INT,
    repeticoes_completas INT,
    peso_utilizado DECIMAL(5,2),  -- Peso utilizado no exercício, se aplicável
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario),
    FOREIGN KEY (id_exercicio) REFERENCES Exercicio(id_exercicio)
);


describe progresso;
SHOW CREATE TABLE progresso;

