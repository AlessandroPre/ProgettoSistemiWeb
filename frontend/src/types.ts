export interface Film {
    idfilm: number
    id_regista: number
    titolo: string
    genere: string
}

export interface Registi {
    idregista: number
    nome: string
    datanascita: Date
    origine: string
}

export interface Noleggi {
    idnoleggio: number
    datanoleggio: Date
    id_film: Film["idfilm"]
}
