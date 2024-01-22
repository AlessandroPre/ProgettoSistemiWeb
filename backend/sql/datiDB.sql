INSERT INTO registi (nome, datanascita, origine)
VALUES
('Steven Spielberg', '1946-12-18', 'USA'),
('Christopher Nolan', '1970-07-30', 'UK'),
('Quentin Tarantino', '1963-03-27', 'USA'),
('Martin Scorsese', '1942-11-17', 'USA'),
('Sofia Coppola', '1971-05-14', 'USA');

INSERT INTO users (username, password, role)
VALUES
('admin', '123456', 'admin');


INSERT INTO film (idfilm, id_regista, titolo, genere)
VALUES
(1, 1, 'Jurassic Park', 'Avventura'),
(2, 1, 'Schindler List', 'Drammatico'),
(3, 2, 'Inception', 'Fantascienza'),
(4, 2, 'The Dark Knight', 'Azione'),
(5, 3, 'Pulp Fiction', 'Crime'),
(6, 3, 'Kill Bill', 'Azione'),
(7, 4, 'The Departed', 'Crime'),
(8, 4, 'The Wolf of Wall Street', 'Commedia'),
(9, 5, 'Lost in Translation', 'Commedia'),
(10, 5, 'The Virgin Suicides', 'Drammatico');

