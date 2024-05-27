-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le : lun. 27 mai 2024 à 14:28
-- Version du serveur : 8.0.33-cll-lve
-- Version de PHP : 8.1.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `tpi_rh_db2`
--

-- --------------------------------------------------------

--
-- Structure de la table `candidacies`
--

CREATE TABLE `candidacies` (
  `idCandidacy` int UNSIGNED NOT NULL,
  `FkJobOffer` int NOT NULL,
  `Lastname` varchar(45) NOT NULL,
  `Firstname` varchar(45) NOT NULL,
  `Mail` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `Phone` int NOT NULL,
  `PostulationDate` date NOT NULL,
  `InterviewDate` date DEFAULT NULL,
  `Decision` varchar(45) NOT NULL DEFAULT 'pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Structure de la table `contracts`
--

CREATE TABLE `contracts` (
  `idContract` int UNSIGNED NOT NULL,
  `FkEmployee` int NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` int NOT NULL,
  `Type` varchar(3) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `Service` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `Job` varchar(45) NOT NULL,
  `StartDate` date NOT NULL,
  `EndDate` date DEFAULT NULL,
  `Rate` int NOT NULL,
  `salary` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Structure de la table `employees`
--

CREATE TABLE `employees` (
  `idEmployee` int NOT NULL,
  `Pseudo` varchar(45) NOT NULL,
  `Password` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `Lastname` varchar(45) NOT NULL,
  `Firstname` varchar(45) NOT NULL,
  `Email` varchar(45) NOT NULL,
  `Phone` varchar(10) NOT NULL,
  `IBAN` varchar(45) NOT NULL,
  `Street` varchar(45) NOT NULL,
  `Number` int NOT NULL,
  `NPA` int NOT NULL,
  `City` varchar(45) NOT NULL,
  `activ` tinyint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Structure de la table `evaluations`
--

CREATE TABLE `evaluations` (
  `idEvaluation` int NOT NULL,
  `FkContract` int UNSIGNED NOT NULL,
  `EvaluationYear` int NOT NULL,
  `PerformanceNote` int NOT NULL,
  `Positiv` varchar(45) NOT NULL,
  `Negativ` varchar(45) NOT NULL,
  `createdAt` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Structure de la table `historics`
--

CREATE TABLE `historics` (
  `idHistoric` int UNSIGNED NOT NULL,
  `FkContract` int UNSIGNED NOT NULL,
  `Service` varchar(45) NOT NULL,
  `StartDate` varchar(45) NOT NULL,
  `EndDate` varchar(45) NOT NULL,
  `Rate` int NOT NULL,
  `Job` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Structure de la table `joboffers`
--

CREATE TABLE `joboffers` (
  `idJobOffer` int NOT NULL,
  `Name` varchar(45) NOT NULL,
  `Place` varchar(45) NOT NULL,
  `Status` varchar(45) NOT NULL,
  `Rate` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Structure de la table `leaverequests`
--

CREATE TABLE `leaverequests` (
  `idLeaveRequest` int UNSIGNED NOT NULL,
  `FkContract` int UNSIGNED NOT NULL,
  `StartDate` date NOT NULL,
  `EndDate` date NOT NULL,
  `Reason` varchar(45) NOT NULL,
  `Payed` tinyint NOT NULL,
  `Status` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `candidacies`
--
ALTER TABLE `candidacies`
  ADD PRIMARY KEY (`idCandidacy`),
  ADD KEY `FkJobOffer_2` (`FkJobOffer`,`Mail`,`Phone`);

--
-- Index pour la table `contracts`
--
ALTER TABLE `contracts`
  ADD PRIMARY KEY (`idContract`),
  ADD UNIQUE KEY `idUser_UNIQUE` (`idContract`),
  ADD UNIQUE KEY `email` (`email`,`phone`),
  ADD KEY `fk_User_Employee_idx` (`FkEmployee`);

--
-- Index pour la table `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`idEmployee`),
  ADD UNIQUE KEY `Email_UNIQUE` (`Email`),
  ADD UNIQUE KEY `Phone_UNIQUE` (`Phone`),
  ADD UNIQUE KEY `IBAN_UNIQUE` (`IBAN`),
  ADD UNIQUE KEY `Pseudo_UNIQUE` (`Pseudo`);

--
-- Index pour la table `evaluations`
--
ALTER TABLE `evaluations`
  ADD PRIMARY KEY (`idEvaluation`),
  ADD UNIQUE KEY `idEvaluation_UNIQUE` (`idEvaluation`),
  ADD KEY `fk_Evaluations_Contracts1_idx` (`FkContract`);

--
-- Index pour la table `historics`
--
ALTER TABLE `historics`
  ADD PRIMARY KEY (`idHistoric`),
  ADD UNIQUE KEY `idHistoric_UNIQUE` (`idHistoric`),
  ADD KEY `fk_Historic_Contracts1_idx` (`FkContract`);

--
-- Index pour la table `joboffers`
--
ALTER TABLE `joboffers`
  ADD PRIMARY KEY (`idJobOffer`),
  ADD UNIQUE KEY `idJobOffer_UNIQUE` (`idJobOffer`);

--
-- Index pour la table `leaverequests`
--
ALTER TABLE `leaverequests`
  ADD PRIMARY KEY (`idLeaveRequest`),
  ADD UNIQUE KEY `idLeaveRequest_UNIQUE` (`idLeaveRequest`),
  ADD KEY `fk_Leave_requests_Contracts1_idx` (`FkContract`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `candidacies`
--
ALTER TABLE `candidacies`
  MODIFY `idCandidacy` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `contracts`
--
ALTER TABLE `contracts`
  MODIFY `idContract` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT pour la table `employees`
--
ALTER TABLE `employees`
  MODIFY `idEmployee` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT pour la table `evaluations`
--
ALTER TABLE `evaluations`
  MODIFY `idEvaluation` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT pour la table `historics`
--
ALTER TABLE `historics`
  MODIFY `idHistoric` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `joboffers`
--
ALTER TABLE `joboffers`
  MODIFY `idJobOffer` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `leaverequests`
--
ALTER TABLE `leaverequests`
  MODIFY `idLeaveRequest` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `candidacies`
--
ALTER TABLE `candidacies`
  ADD CONSTRAINT `fk_Candidacy_Job_offers1` FOREIGN KEY (`FkJobOffer`) REFERENCES `joboffers` (`idJobOffer`);

--
-- Contraintes pour la table `contracts`
--
ALTER TABLE `contracts`
  ADD CONSTRAINT `fk_User_Employee` FOREIGN KEY (`FkEmployee`) REFERENCES `employees` (`idEmployee`);

--
-- Contraintes pour la table `evaluations`
--
ALTER TABLE `evaluations`
  ADD CONSTRAINT `fk_Evaluations_Contracts1` FOREIGN KEY (`FkContract`) REFERENCES `contracts` (`idContract`);

--
-- Contraintes pour la table `historics`
--
ALTER TABLE `historics`
  ADD CONSTRAINT `fk_Historic_Contracts1` FOREIGN KEY (`FkContract`) REFERENCES `contracts` (`idContract`);

--
-- Contraintes pour la table `leaverequests`
--
ALTER TABLE `leaverequests`
  ADD CONSTRAINT `fk_Leave_requests_Contracts1` FOREIGN KEY (`FkContract`) REFERENCES `contracts` (`idContract`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
