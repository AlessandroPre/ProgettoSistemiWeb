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
exports.allRental = exports.rentalFromID = exports.rentalFromDate = exports.FilmHasRental = void 0;

const db_1 = require("../utils/db");
function allRental(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        db_1.connection.execute(`SELECT *
     FROM noleggi`, [], function (err, results, fields) {
            res.json(results);
        });
    });
}
exports.allRental = allRental;

function rentalFromID(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        db_1.connection.execute(`SELECT *
     FROM noleggi
     WHERE idnoleggio=?`, [req.params.idnoleggio], function (err, results, fields) {
            res.json(results);
        });
    });
}
exports.rentalFromID = rentalFromID;

function rentalFromDate(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        db_1.connection.execute(`SELECT *
     FROM noleggi
     WHERE datanoleggio=?`, [req.params.datanoleggio], function (err, results, fields) {
            res.json(results);
        });
    });
}
exports.rentalFromDate = rentalFromDate;

function FilmHasRental(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        db_1.connection.execute(`SELECT f.titolo, n.datanoleggio
        FROM film f JOIN noleggi n ON f.idfilm = n.id_film;`, [], function (err, results, fields) {
            res.json(results);
        });
    });
}
exports.FilmHasRental = FilmHasRental;