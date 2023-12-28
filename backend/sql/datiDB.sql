INSERT INTO registi (nome, datanascita, origine)
VALUES
('Steven Spielberg', '1946-12-18', 'USA'),
('Christopher Nolan', '1970-07-30', 'UK'),
('Quentin Tarantino', '1963-03-27', 'USA'),
('Martin Scorsese', '1942-11-17', 'USA'),
('Sofia Coppola', '1971-05-14', 'USA');

INSERT INTO users (username, password, role)
VALUES
('admin', '123456', 'admin'),
('user1', 'password1', 'user'),
('user2', 'password2', 'user'),
('user3', 'password3', 'user'),
('user4', 'password4', 'user');

INSERT INTO film (id_regista, titolo, genere, idGestore)
VALUES
(1, 'Jurassic Park', 'Avventura', 1),
(1, 'Schindler List', 'Drammatico', 2),
(2, 'Inception', 'Fantascienza', 3),
(2, 'The Dark Knight', 'Azione', 4),
(3, 'Pulp Fiction', 'Crime', 5),
(3, 'Kill Bill', 'Azione', 1),
(4, 'The Departed', 'Crime', 2),
(4, 'The Wolf of Wall Street', 'Commedia', 3),
(5, 'Lost in Translation', 'Commedia', 4),
(5, 'The Virgin Suicides', 'Drammatico', 5);

INSERT INTO noleggi (datanoleggio, id_film)
VALUES
('2023-01-01', 1),
('2023-01-02', 2),
('2023-01-03', 3),
('2023-01-04', 4),
('2023-01-05', 5),
('2023-01-06', 6),
('2023-01-07', 7),
('2023-01-08', 8),
('2023-01-09', 9),
('2023-01-10', 10);