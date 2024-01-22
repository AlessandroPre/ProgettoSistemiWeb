SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

CREATE SCHEMA IF NOT EXISTS `mioDB` DEFAULT CHARACTER SET utf8 ;
USE `mioDB` ;


CREATE TABLE IF NOT EXISTS `mioDB`.`registi` (
  `idregista` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(100) NOT NULL,
  `datanascita` VARCHAR(20) NOT NULL,
  `origine` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`idregista`)
)
ENGINE = InnoDB;

/*autenticazione*/
CREATE TABLE IF NOT EXISTS `mioDB`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `username` VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(512) NOT NULL,
  role ENUM("admin", "user") default "user"
)
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `mioDB`.`film` (
  `idfilm` INT NOT NULL,
  `id_regista` INT NOT NULL,
  `titolo` VARCHAR(512) NOT NULL,
  `genere` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idfilm`),
  INDEX `fk_film_registi_idx` (`id_regista` ASC),
  CONSTRAINT `fk_film_registi`
    FOREIGN KEY (`id_regista`)
    REFERENCES `mioDB`.`registi` (`idregista`)
)
ENGINE = InnoDB;


CREATE TABLE IF NOT EXISTS `mioDB`.`noleggi` (
  `idnoleggio` INT NOT NULL AUTO_INCREMENT,
  `datanoleggio` VARCHAR(20) NOT NULL,
  `id_film` INT NOT NULL,
  `noleggiatore` INT NOT NULL,
  PRIMARY KEY (`idnoleggio`),
  CONSTRAINT `fk_noleggi_film`
    FOREIGN KEY (`id_film`)
    REFERENCES `mioDB`.`film` (`idfilm`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_noleggi_users`
    FOREIGN KEY (`noleggiatore`)
    REFERENCES `mioDB`.`users` (`id`)
)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
