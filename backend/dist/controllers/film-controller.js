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
exports.allFilms = exports.filmsFromDirector = exports.filmsFromID = exports.filmsFromGenre = void 0;

const db_1 = require("../utils/db");
function allFilms(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        db_1.connection.execute(`SELECT *
     FROM film`, [], function (err, results, fields) {
            res.json(results);
        });
    });
}
exports.allFilms = allFilms;

function filmsFromDirector(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        db_1.connection.execute(`SELECT idfilm, id_regista, titolo, genere 
     FROM film, registi
     WHERE id_regista=idregista AND idregista=?`, [req.params.idregista], function (err, results, fields) {
            res.json(results);
        });
    });
}
exports.filmsFromDirector = filmsFromDirector;

function filmsFromID(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        db_1.connection.execute(`SELECT *
     FROM film
     WHERE idfilm=?`, [req.params.idfilm], function (err, results, fields) {
            res.json(results);
        });
    });
}
exports.filmsFromID = filmsFromID;

function filmsFromGenre(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        db_1.connection.execute(`SELECT *
     FROM film
     WHERE genere=?`, [req.params.genere], function (err, results, fields) {
            res.json(results);
        });
    });
}
exports.filmsFromGenre = filmsFromGenre;
