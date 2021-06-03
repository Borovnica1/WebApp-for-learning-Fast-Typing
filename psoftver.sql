-- MySQL dump 10.13  Distrib 5.7.34, for Linux (x86_64)
--
-- Host: localhost    Database: psoftver
-- ------------------------------------------------------
-- Server version	5.7.34-0ubuntu0.18.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `administrator`
--

DROP TABLE IF EXISTS `administrator`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `administrator` (
  `administrator_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(32) COLLATE utf8_bin DEFAULT NULL,
  `password_hash` varchar(128) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`administrator_id`),
  UNIQUE KEY `uq_administrator_username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `administrator`
--

LOCK TABLES `administrator` WRITE;
/*!40000 ALTER TABLE `administrator` DISABLE KEYS */;
INSERT INTO `administrator` VALUES (6,'admin3','$2b$10$ERTUSZnfIK8xmEJE79z9fuZ51Usw.90MDbOF88TYy6sp4nnjbG22C');
/*!40000 ALTER TABLE `administrator` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `category` (
  `category_id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(128) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'html'),(2,'css'),(3,'javascript'),(4,'python'),(8,'DSCDSVDSV');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exercise`
--

DROP TABLE IF EXISTS `exercise`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `exercise` (
  `exercise_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(45) COLLATE utf8_bin DEFAULT NULL,
  `text` text COLLATE utf8_bin,
  `time_taken` double DEFAULT NULL,
  `wrong_chars` text COLLATE utf8_bin,
  `category_id` int(11) unsigned DEFAULT NULL,
  PRIMARY KEY (`exercise_id`),
  UNIQUE KEY `uq_exercise_title` (`title`),
  KEY `fk_exercise_category_id_idx` (`category_id`),
  CONSTRAINT `fk_exercise_category_id` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exercise`
--

LOCK TABLES `exercise` WRITE;
/*!40000 ALTER TABLE `exercise` DISABLE KEYS */;
INSERT INTO `exercise` VALUES (1,'hello world','neki tekst kao',55.5,'g-7 k-3',1),(2,'css change background','KAOAOSOD TEXTE ANJndsakjn JSSJADSA WDAS SAAS SA SASADASDASDSD SAKDM askdmas sad ',3.3,'g-7 k-3',2),(3,'say hello world','neki tekst kao',2.2,'g-7 k-3',3),(32,'CCC','NNNN',55.5,'hjh',1),(34,'RRRRRRRRRRRR','vfdvfvrvrvrvrverververv',55.5,'hjh',2),(35,'ascsacascsacas','',NULL,NULL,2),(37,'bdsbsd','nngn',NULL,NULL,2);
/*!40000 ALTER TABLE `exercise` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exercise_history`
--

DROP TABLE IF EXISTS `exercise_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `exercise_history` (
  `exercise_history_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `exercise_id` int(10) unsigned DEFAULT NULL,
  `history_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`exercise_history_id`),
  KEY `fk_exercise_history_exercise_id_idx` (`exercise_id`),
  KEY `fk_exercise_history_history_id_idx` (`history_id`),
  CONSTRAINT `fk_exercise_history_exercise_id` FOREIGN KEY (`exercise_id`) REFERENCES `exercise` (`exercise_id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `fk_exercise_history_history_id` FOREIGN KEY (`history_id`) REFERENCES `history` (`history_id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exercise_history`
--

LOCK TABLES `exercise_history` WRITE;
/*!40000 ALTER TABLE `exercise_history` DISABLE KEYS */;
INSERT INTO `exercise_history` VALUES (3,1,7),(4,1,7),(5,2,7),(6,3,7),(7,3,6),(8,3,5);
/*!40000 ALTER TABLE `exercise_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `history`
--

DROP TABLE IF EXISTS `history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `history` (
  `history_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `average_speed` double unsigned DEFAULT NULL,
  `user_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`history_id`),
  KEY `fk_history_user_id_idx` (`user_id`),
  CONSTRAINT `fk_history_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `history`
--

LOCK TABLES `history` WRITE;
/*!40000 ALTER TABLE `history` DISABLE KEYS */;
INSERT INTO `history` VALUES (1,0,24),(2,0,25),(3,0,26),(4,0,27),(5,0,28),(6,0,29),(7,0,30),(8,0,31),(9,0,1),(13,0,1),(15,0,6);
/*!40000 ALTER TABLE `history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `photo`
--

DROP TABLE IF EXISTS `photo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `photo` (
  `photo_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `category_id` int(11) unsigned DEFAULT NULL,
  `image_path` varchar(128) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`photo_id`),
  UNIQUE KEY `image_path_UNIQUE` (`image_path`),
  KEY `fk_photo_category_id_idx` (`category_id`),
  CONSTRAINT `fk_photo_category_id` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `photo`
--

LOCK TABLES `photo` WRITE;
/*!40000 ALTER TABLE `photo` DISABLE KEYS */;
INSERT INTO `photo` VALUES (1,1,'img/html.jpg'),(2,2,'img/css.jpg'),(3,3,'img/javascript.jpg'),(4,4,'img/categories.jpg'),(8,8,'SADAS');
/*!40000 ALTER TABLE `photo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `user_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `password_hash` varchar(128) COLLATE utf8_bin DEFAULT NULL,
  `username` varchar(32) COLLATE utf8_bin DEFAULT NULL,
  `typing_speed` varchar(45) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `uq_user_email` (`email`),
  UNIQUE KEY `uq_user_username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'tilo@gmail.com','pass1234','fonikos','average'),(6,'zzz@gmail.com','$2b$10$Ed/dwDoNMSFGW8r/WOsoIe2vBMBu8svb1zIodyWK6vXVcrtODwm.W','wow','very slow'),(7,'rtr@gmail.com','$2b$10$Ub7hsahw2oW/1CWrqKCKa.xTNMn.J8dj64vuBgQOmZO6y3ig41KHS','wow55','very slow'),(11,'wowwww@gmail.com','$2b$10$rYOcoG/5ToYrZAIDRhl/COsk3uT6OmG.1T2/kLJYI90o.M2iNN0aS','wow55888s','very slow'),(12,'zuz@gmail.com','$2b$10$r9QQSe.mv5W0Oo/9HPfg3eDpeTx7v8jiFc78avouBXTRtHw7TeB46','wow52','very slow'),(13,'ww@gmail.com','$2b$10$IBvc.L4R3fCBzo9b6lIc4OBsdw./C/MA2zOzwDh0mBzfr0yibjHA6','lol555','very slow'),(14,'po@gmail.com','$2b$10$cfqf/3GCxOv7ylceEyZYo.sdYB/cZVX6FefV0qsIF9PlGt8IZYCOC','re','very slow'),(15,'s@gmail.com','$2b$10$hFec1nbhV8BPXHEH4zwkieYYkHsGVq/.KWZou49JPLHsgRDFwet2u','ok','very slow'),(17,'a@gmail.com','$2b$10$ExcNT1z1GWOEMYBxkw71peUMuRMZu9svNqqRJMToFly.ac/2spsIa','a','very slow'),(19,'aa@gmail.com','$2b$10$Q2uNtAEMVOdEYMByrOOr1uqRs0XulcngwL5XYoVm0Wu75gOqAb87K','aa','very slow'),(20,'aaa@gmail.com','$2b$10$wcqBgOe3D8zyoAj2R/YbtuUMpH3.klLghZMcZQ3rjokpcepSfX6t.','aaa','very slow'),(21,'aaaa@gmail.com','$2b$10$Jlebx5c6cKpgByiHj4B65Obq5OFxg9Mmjxriw7SidnVLAvlqjAMje','aaaa','very slow'),(22,'q@gmail.com','$2b$10$P/CJ92Gn2hoQzsvGy6HIRukvWCkmc8e5c54mgFaSzIRqKFmJsmsHG','q','very slow'),(23,'yyyy@gmail.com','$2b$10$vJfwQAoFblGXut27FRO.1eXn4vMzHeUmBd2G5uw.qplwFeC6mX7PG','wt','very slow'),(24,'1x@gmail.com','$2b$10$NKJSdmNKw5Ddd5rpDPJgKOZ/3r.YRBjDHEf1TnuREy1PAmAZakBdC','kkkk','very slow'),(25,'se@gmail.com','$2b$10$r4197gEOoUETkPb3E5YkGOmjMy6mxNlEwKa3tqEv3TH8MQqk1ioqm','se','very slow'),(26,'g@gmail.com','$2b$10$z3ZPb9mol4nU7/e9MJhAZe4oehsejMotW3./oV7FvaoE/EBlTfGh.','g','very slow'),(27,'e@gmail.com','$2b$10$Vh6T44x5JUr4uH0dLGR3Q.2FTjEESPCcsHZruwUBDcqWTKJ0YEmGi','e','very slow'),(28,'i@gmail.com','$2b$10$Wy4N4Czmr8NhBXD7hnW5Vu8lE.OYI8yQw4qpfiIvj3pymnkYyqQC.','i','very slow'),(29,'p@gmail.com','$2b$10$9AIxGRizPhoNSKaPNp/gTu8rFI1Ybg2WV2fLNfuFu.LGC2Bdazux2','p','very slow'),(30,'eeeeee@gmail.com','$2b$10$I3OAoCHIf5Xtt.vIMErVR.Ge1a/.1Zp.4Ylf1XdgAc8AKKT6Rnzs2','ee','very slow'),(31,'kasodsdas@gmail.com','$2b$10$Ucrmae2YEszwgIZjf.EEKuFCZ1o4RGeN7DUfJgOqaagKmwB.6zEfq','eeee','very slow');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-06-03 23:10:36
