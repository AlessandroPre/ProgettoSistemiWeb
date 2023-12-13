INSERT INTO mioDB.registi (nome, datanascita, origine) VALUES 
('Federico Fellini', '1920-01-20', 'Rimini'),
('Sergio Leone', '1929-01-03', 'Roma'),
('Luchino Visconti', '1906-11-02', 'Milano'),
('Michelangelo Antonini', '1912-09-29', 'Ferrara');

INSERT INTO mioDB.film (idfilm, id_regista, titolo, genere) VALUES 
(1, 1, 'La strada', 'Drammatico'), 
(2, 1, 'Amarcord', 'Commedia'), 
(3, 1, 'Otto e mezzo', 'Fantasia'), 
(4, 2, 'Il colosso di Rodi', 'Peplum'), 
(5, 2, 'Per un pugno di dollari', 'Western'), 
(6, 2, 'giù la testa', 'Western'), 
(7, 3, 'Bellissima', 'Dramma'), 
(8, 3, 'Senso', 'Storico'), 
(9, 3, 'Morte a Venezia', 'Dramma'), 
(10, 4, 'Cronaca di un amore', 'Dramma'), 
(11, 4, 'Blow-up', 'Thriller psicologico'), 
(12, 4, 'Deserto rosso', 'Dramma');

INSERT INTO mioDB.noleggi (idnoleggio, datanoleggio, id_film) VALUES 
(1,'2022-06-18', 1), 
(2,'2023-05-09', 5), 
(3,'2020-11-21', 11), 
(4,'2021-08-03', 10), 
(5,'2022-03-14', 12), 
(6,'2023-10-26', 3), 
(7,'2020-05-28', 9), 
(8,'2022-12-20', 11);
