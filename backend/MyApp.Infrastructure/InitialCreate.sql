CREATE TABLE IF NOT EXISTS `__EFMigrationsHistory` (
    `MigrationId` varchar(150) CHARACTER SET utf8mb4 NOT NULL,
    `ProductVersion` varchar(32) CHARACTER SET utf8mb4 NOT NULL,
    CONSTRAINT `PK___EFMigrationsHistory` PRIMARY KEY (`MigrationId`)
) CHARACTER SET=utf8mb4;

START TRANSACTION;
ALTER DATABASE CHARACTER SET utf8mb4;

CREATE TABLE `Anetaret` (
    `anetar_id` int NOT NULL AUTO_INCREMENT,
    `emri` longtext CHARACTER SET utf8mb4 NOT NULL,
    `mbiemri` longtext CHARACTER SET utf8mb4 NOT NULL,
    `data_lindjes` datetime(6) NOT NULL,
    `gjinia` longtext CHARACTER SET utf8mb4 NOT NULL,
    `telefoni` longtext CHARACTER SET utf8mb4 NOT NULL,
    `email` longtext CHARACTER SET utf8mb4 NOT NULL,
    `adresa` longtext CHARACTER SET utf8mb4 NOT NULL,
    `data_regjistrimit` datetime(6) NOT NULL,
    `lloji_anetaresimit` longtext CHARACTER SET utf8mb4 NOT NULL,
    `statusi` longtext CHARACTER SET utf8mb4 NOT NULL,
    CONSTRAINT `PK_Anetaret` PRIMARY KEY (`anetar_id`)
) CHARACTER SET=utf8mb4;

CREATE TABLE `Instruktoret` (
    `instruktor_id` int NOT NULL AUTO_INCREMENT,
    `emri` longtext CHARACTER SET utf8mb4 NOT NULL,
    `mbiemri` longtext CHARACTER SET utf8mb4 NOT NULL,
    `specializimi` longtext CHARACTER SET utf8mb4 NOT NULL,
    `certifikimet` longtext CHARACTER SET utf8mb4 NOT NULL,
    `telefoni` longtext CHARACTER SET utf8mb4 NOT NULL,
    `email` longtext CHARACTER SET utf8mb4 NOT NULL,
    `biografia` longtext CHARACTER SET utf8mb4 NOT NULL,
    `data_fillimit` datetime(6) NOT NULL,
    `tarifa_orare` decimal(18,2) NOT NULL,
    CONSTRAINT `PK_Instruktoret` PRIMARY KEY (`instruktor_id`)
) CHARACTER SET=utf8mb4;

CREATE TABLE `Klasat` (
    `klase_id` int NOT NULL AUTO_INCREMENT,
    `emri` longtext CHARACTER SET utf8mb4 NOT NULL,
    `pershkrimi` longtext CHARACTER SET utf8mb4 NOT NULL,
    `lloji` longtext CHARACTER SET utf8mb4 NOT NULL,
    `niveli` longtext CHARACTER SET utf8mb4 NOT NULL,
    `kohezgjatja_min` int NOT NULL,
    `kapaciteti_max` int NOT NULL,
    `instruktor_id` int NOT NULL,
    CONSTRAINT `PK_Klasat` PRIMARY KEY (`klase_id`)
) CHARACTER SET=utf8mb4;

CREATE TABLE `Orari` (
    `orar_id` int NOT NULL AUTO_INCREMENT,
    `klase_id` int NOT NULL,
    `dita_javes` longtext CHARACTER SET utf8mb4 NOT NULL,
    `ora_fillimit` longtext CHARACTER SET utf8mb4 NOT NULL,
    `ora_perfundimit` longtext CHARACTER SET utf8mb4 NOT NULL,
    `salla_id` int NOT NULL,
    `statusi` longtext CHARACTER SET utf8mb4 NOT NULL,
    CONSTRAINT `PK_Orari` PRIMARY KEY (`orar_id`)
) CHARACTER SET=utf8mb4;

CREATE TABLE `Produktet` (
    `produkti_id` int NOT NULL AUTO_INCREMENT,
    `emri` longtext CHARACTER SET utf8mb4 NOT NULL,
    `pershkrimi` longtext CHARACTER SET utf8mb4 NOT NULL,
    `kategoria` longtext CHARACTER SET utf8mb4 NOT NULL,
    `cmimi` decimal(18,2) NOT NULL,
    `sasia_stok` int NOT NULL,
    CONSTRAINT `PK_Produktet` PRIMARY KEY (`produkti_id`)
) CHARACTER SET=utf8mb4;

CREATE TABLE `Regjistrimet_Workshop` (
    `rw_id` int NOT NULL AUTO_INCREMENT,
    `workshop_id` int NOT NULL,
    `anetar_id` int NOT NULL,
    `data_regjistrimit` datetime(6) NOT NULL,
    `statusi_pageses` tinyint(1) NOT NULL,
    CONSTRAINT `PK_Regjistrimet_Workshop` PRIMARY KEY (`rw_id`)
) CHARACTER SET=utf8mb4;

CREATE TABLE `Sallat` (
    `salla_id` int NOT NULL AUTO_INCREMENT,
    `emri` longtext CHARACTER SET utf8mb4 NOT NULL,
    `kapaciteti` int NOT NULL,
    `pajisjet` longtext CHARACTER SET utf8mb4 NOT NULL,
    `pershkrimi` longtext CHARACTER SET utf8mb4 NOT NULL,
    CONSTRAINT `PK_Sallat` PRIMARY KEY (`salla_id`)
) CHARACTER SET=utf8mb4;

CREATE TABLE `Workshopet` (
    `workshop_id` int NOT NULL AUTO_INCREMENT,
    `titulli` longtext CHARACTER SET utf8mb4 NOT NULL,
    `pershkrimi` longtext CHARACTER SET utf8mb4 NOT NULL,
    `instruktor_id` int NOT NULL,
    `data` datetime(6) NOT NULL,
    `ora_fillimit` datetime(6) NOT NULL,
    `ora_perfundimit` datetime(6) NOT NULL,
    `cmimi` decimal(18,2) NOT NULL,
    `kapaciteti` int NOT NULL,
    CONSTRAINT `PK_Workshopet` PRIMARY KEY (`workshop_id`)
) CHARACTER SET=utf8mb4;

CREATE TABLE `Anetaresimet` (
    `anetaresimi_id` int NOT NULL AUTO_INCREMENT,
    `anetar_id` int NOT NULL,
    `lloji` longtext CHARACTER SET utf8mb4 NOT NULL,
    `cmimi` decimal(18,2) NOT NULL,
    `data_fillimit` datetime(6) NOT NULL,
    `data_perfundimit` datetime(6) NOT NULL,
    `statusi` longtext CHARACTER SET utf8mb4 NOT NULL,
    CONSTRAINT `PK_Anetaresimet` PRIMARY KEY (`anetaresimi_id`),
    CONSTRAINT `FK_Anetaresimet_Anetaret_anetar_id` FOREIGN KEY (`anetar_id`) REFERENCES `Anetaret` (`anetar_id`) ON DELETE RESTRICT
) CHARACTER SET=utf8mb4;

CREATE TABLE `Regjistrimet` (
    `regjistrim_id` int NOT NULL AUTO_INCREMENT,
    `anetar_id` int NOT NULL,
    `orar_id` int NOT NULL,
    `data` datetime(6) NOT NULL,
    `statusi` longtext CHARACTER SET utf8mb4 NOT NULL,
    `shenimet` longtext CHARACTER SET utf8mb4 NOT NULL,
    CONSTRAINT `PK_Regjistrimet` PRIMARY KEY (`regjistrim_id`),
    CONSTRAINT `FK_Regjistrimet_Anetaret_anetar_id` FOREIGN KEY (`anetar_id`) REFERENCES `Anetaret` (`anetar_id`) ON DELETE RESTRICT,
    CONSTRAINT `FK_Regjistrimet_Orari_orar_id` FOREIGN KEY (`orar_id`) REFERENCES `Orari` (`orar_id`) ON DELETE RESTRICT
) CHARACTER SET=utf8mb4;

CREATE TABLE `Shitjet_Produkteve` (
    `shitje_id` int NOT NULL AUTO_INCREMENT,
    `anetar_id` int NOT NULL,
    `produkti_id` int NOT NULL,
    `sasia` int NOT NULL,
    `cmimi_total` decimal(18,2) NOT NULL,
    `data` datetime(6) NOT NULL,
    CONSTRAINT `PK_Shitjet_Produkteve` PRIMARY KEY (`shitje_id`),
    CONSTRAINT `FK_Shitjet_Produkteve_Anetaret_anetar_id` FOREIGN KEY (`anetar_id`) REFERENCES `Anetaret` (`anetar_id`) ON DELETE RESTRICT,
    CONSTRAINT `FK_Shitjet_Produkteve_Produktet_produkti_id` FOREIGN KEY (`produkti_id`) REFERENCES `Produktet` (`produkti_id`) ON DELETE RESTRICT
) CHARACTER SET=utf8mb4;

CREATE TABLE `Pagesat` (
    `pagese_id` int NOT NULL AUTO_INCREMENT,
    `anetar_id` int NOT NULL,
    `anetaresim_id` int NOT NULL,
    `data_pageses` datetime(6) NOT NULL,
    `shuma` decimal(18,2) NOT NULL,
    `metoda` longtext CHARACTER SET utf8mb4 NOT NULL,
    `statusi` longtext CHARACTER SET utf8mb4 NOT NULL,
    CONSTRAINT `PK_Pagesat` PRIMARY KEY (`pagese_id`),
    CONSTRAINT `FK_Pagesat_Anetaresimet_anetaresim_id` FOREIGN KEY (`anetaresim_id`) REFERENCES `Anetaresimet` (`anetaresimi_id`) ON DELETE RESTRICT,
    CONSTRAINT `FK_Pagesat_Anetaret_anetar_id` FOREIGN KEY (`anetar_id`) REFERENCES `Anetaret` (`anetar_id`) ON DELETE RESTRICT
) CHARACTER SET=utf8mb4;

CREATE INDEX `IX_Anetaresimet_anetar_id` ON `Anetaresimet` (`anetar_id`);

CREATE INDEX `IX_Pagesat_anetar_id` ON `Pagesat` (`anetar_id`);

CREATE INDEX `IX_Pagesat_anetaresim_id` ON `Pagesat` (`anetaresim_id`);

CREATE INDEX `IX_Regjistrimet_anetar_id` ON `Regjistrimet` (`anetar_id`);

CREATE INDEX `IX_Regjistrimet_orar_id` ON `Regjistrimet` (`orar_id`);

CREATE INDEX `IX_Shitjet_Produkteve_anetar_id` ON `Shitjet_Produkteve` (`anetar_id`);

CREATE INDEX `IX_Shitjet_Produkteve_produkti_id` ON `Shitjet_Produkteve` (`produkti_id`);

INSERT INTO `__EFMigrationsHistory` (`MigrationId`, `ProductVersion`)
VALUES ('20260523100715_InitialCreate', '9.0.0');

COMMIT;

