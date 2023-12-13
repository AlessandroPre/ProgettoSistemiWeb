"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.allDirector = exports.directorFromDate = exports.filmFromDirector = exports.rentalFromDirector = void 0;

const db_1 = require("../utils/db");
function allDirector(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        db_1.connection.execute(`SELECT *
     FROM registi`, [], function (err, results, fields) {
            res.json(results);
        });
    });
}
exports.allDirector = allDirector;

function directorFromDate(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        db_1.connection.execute(`SELECT idregista, nome, datanascita, origine 
        FROM registi 
        ORDER BY datanascita;`, [], function (err, results, fields) {
            res.json(results);
        });
    });
}
exports.directorFromDate = directorFromDate;

function filmFromDirector(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        db_1.connection.execute(`SELECT r.nome AS nome_regista, f.titolo AS titolo_film 
        FROM registi r JOIN film f ON r.idregista = f.id_regista 
        GROUP BY r.nome, f.titolo ORDER BY r.nome;`, [], function (err, results, fields) {
            res.json(results);
        });
    });
}
exports.filmFromDirector = filmFromDirector;

function rentalFromDirector(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        db_1.connection.execute(`SELECT r.nome, f.titolo, COUNT(n.idnoleggio) as noleggi 
        FROM registi r JOIN film f ON r.idregista = f.id_regista JOIN noleggi n ON f.idfilm = n.id_film 
        GROUP BY r.idregista, r.nome, f.idfilm, f.titolo 
        ORDER BY r.idregista, f.idfilm;`,[],  function (err, results, fields) {
            res.json(results);
        });
    });
}
exports.rentalFromDirector = rentalFromDirector;