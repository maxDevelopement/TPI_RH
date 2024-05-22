-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le : mer. 22 mai 2024 à 11:48
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
-- Structure de la table `Candidacy`
--

CREATE TABLE `Candidacy` (
  `idCandidacy` int UNSIGNED NOT NULL,
  `FkJobOffer` int NOT NULL,
  `Lastname` varchar(45) NOT NULL,
  `Firstname` varchar(45) NOT NULL,
  `Mail` varchar(45) NOT NULL,
  `Phone` int NOT NULL,
  `PostulationDate` date NOT NULL,
  `InterviewDate` date DEFAULT NULL,
  `Decision` varchar(45) NOT NULL DEFAULT 'pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Structure de la table `Contract`
--

CREATE TABLE `Contract` (
  `idContract` int UNSIGNED NOT NULL,
  `FkEmployee` int NOT NULL,
  `Type` varchar(3) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `Service` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `Job` varchar(45) NOT NULL,
  `StartDate` date NOT NULL,
  `EndDate` date DEFAULT NULL,
  `Rate` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Déchargement des données de la table `Contract`
--

INSERT INTO `Contract` (`idContract`, `FkEmployee`, `Type`, `Service`, `Job`, `StartDate`, `EndDate`, `Rate`) VALUES
(8, 16, 'CDD', 'hr', '70', '2012-12-12', NULL, 0);

-- --------------------------------------------------------

--
-- Structure de la table `Employee`
--

CREATE TABLE `Employee` (
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

--
-- Déchargement des données de la table `Employee`
--

INSERT INTO `Employee` (`idEmployee`, `Pseudo`, `Password`, `Lastname`, `Firstname`, `Email`, `Phone`, `IBAN`, `Street`, `Number`, `NPA`, `City`, `activ`) VALUES
(16, 'Erica16', '$2b$10$HHmcpobw.qy9nDBbiXQ9LOK.WylsTrLFLI2QUa8ZyIAo0UyhfklKK', 'Duchemin', 'Erica', 'EricaDuchemin22@entreprise.com', '0765559555', '000320-CH09w9-4466-DF', 'Bonheur', 44, 1001, 'Aigle', 1);

-- --------------------------------------------------------

--
-- Structure de la table `Evaluation`
--

CREATE TABLE `Evaluation` (
  `idEvaluation` int NOT NULL,
  `FkContract` int UNSIGNED NOT NULL,
  `EvaluationYear` int NOT NULL,
  `PerformanceNote` int NOT NULL,
  `Positiv` varchar(45) NOT NULL,
  `Negativ` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Structure de la table `Historic`
--

CREATE TABLE `Historic` (
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
-- Structure de la table `JobOffer`
--

CREATE TABLE `JobOffer` (
  `idJobOffer` int NOT NULL,
  `Name` varchar(45) NOT NULL,
  `Place` varchar(45) NOT NULL,
  `Status` varchar(45) NOT NULL,
  `Rate` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Structure de la table `LeaveRequest`
--

CREATE TABLE `LeaveRequest` (
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
-- Index pour la table `Candidacy`
--
ALTER TABLE `Candidacy`
  ADD PRIMARY KEY (`idCandidacy`),
  ADD UNIQUE KEY `Mail_UNIQUE` (`Mail`),
  ADD UNIQUE KEY `Phone_UNIQUE` (`Phone`),
  ADD KEY `fk_Candidacy_Job_offers1_idx` (`FkJobOffer`);

--
-- Index pour la table `Contract`
--
ALTER TABLE `Contract`
  ADD PRIMARY KEY (`idContract`),
  ADD UNIQUE KEY `idUser_UNIQUE` (`idContract`),
  ADD KEY `fk_User_Employee_idx` (`FkEmployee`);

--
-- Index pour la table `Employee`
--
ALTER TABLE `Employee`
  ADD PRIMARY KEY (`idEmployee`),
  ADD UNIQUE KEY `Email_UNIQUE` (`Email`),
  ADD UNIQUE KEY `Phone_UNIQUE` (`Phone`),
  ADD UNIQUE KEY `IBAN_UNIQUE` (`IBAN`),
  ADD UNIQUE KEY `Pseudo_UNIQUE` (`Pseudo`);

--
-- Index pour la table `Evaluation`
--
ALTER TABLE `Evaluation`
  ADD PRIMARY KEY (`idEvaluation`),
  ADD UNIQUE KEY `idEvaluation_UNIQUE` (`idEvaluation`),
  ADD KEY `fk_Evaluations_Contracts1_idx` (`FkContract`);

--
-- Index pour la table `Historic`
--
ALTER TABLE `Historic`
  ADD PRIMARY KEY (`idHistoric`),
  ADD UNIQUE KEY `idHistoric_UNIQUE` (`idHistoric`),
  ADD KEY `fk_Historic_Contracts1_idx` (`FkContract`);

--
-- Index pour la table `JobOffer`
--
ALTER TABLE `JobOffer`
  ADD PRIMARY KEY (`idJobOffer`),
  ADD UNIQUE KEY `idJobOffer_UNIQUE` (`idJobOffer`);

--
-- Index pour la table `LeaveRequest`
--
ALTER TABLE `LeaveRequest`
  ADD PRIMARY KEY (`idLeaveRequest`),
  ADD UNIQUE KEY `idLeaveRequest_UNIQUE` (`idLeaveRequest`),
  ADD KEY `fk_Leave_requests_Contracts1_idx` (`FkContract`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `Candidacy`
--
ALTER TABLE `Candidacy`
  MODIFY `idCandidacy` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `Contract`
--
ALTER TABLE `Contract`
  MODIFY `idContract` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT pour la table `Employee`
--
ALTER TABLE `Employee`
  MODIFY `idEmployee` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT pour la table `Evaluation`
--
ALTER TABLE `Evaluation`
  MODIFY `idEvaluation` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `Historic`
--
ALTER TABLE `Historic`
  MODIFY `idHistoric` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `JobOffer`
--
ALTER TABLE `JobOffer`
  MODIFY `idJobOffer` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `LeaveRequest`
--
ALTER TABLE `LeaveRequest`
  MODIFY `idLeaveRequest` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `Candidacy`
--
ALTER TABLE `Candidacy`
  ADD CONSTRAINT `fk_Candidacy_Job_offers1` FOREIGN KEY (`FkJobOffer`) REFERENCES `JobOffer` (`idJobOffer`);

--
-- Contraintes pour la table `Contract`
--
ALTER TABLE `Contract`
  ADD CONSTRAINT `fk_User_Employee` FOREIGN KEY (`FkEmployee`) REFERENCES `Employee` (`idEmployee`);

--
-- Contraintes pour la table `Evaluation`
--
ALTER TABLE `Evaluation`
  ADD CONSTRAINT `fk_Evaluations_Contracts1` FOREIGN KEY (`FkContract`) REFERENCES `Contract` (`idContract`);

--
-- Contraintes pour la table `Historic`
--
ALTER TABLE `Historic`
  ADD CONSTRAINT `fk_Historic_Contracts1` FOREIGN KEY (`FkContract`) REFERENCES `Contract` (`idContract`);

--
-- Contraintes pour la table `LeaveRequest`
--
ALTER TABLE `LeaveRequest`
  ADD CONSTRAINT `fk_Leave_requests_Contracts1` FOREIGN KEY (`FkContract`) REFERENCES `Contract` (`idContract`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
