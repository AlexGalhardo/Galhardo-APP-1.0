-- Adminer 4.8.1 MySQL 8.0.26 dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

DROP DATABASE IF EXISTS `galhardoapp`;
CREATE DATABASE `galhardoapp` /*!40100 DEFAULT CHARACTER SET utf8 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `galhardoapp`;

DROP TABLE IF EXISTS `blog`;
CREATE TABLE `blog` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(128) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `slug` varchar(128) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `resume` varchar(256) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `image` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `category` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `body` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `created_at` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `updated_at` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

DROP TABLE IF EXISTS `blog_comments`;
CREATE TABLE `blog_comments` (
  `comment_id` int NOT NULL AUTO_INCREMENT,
  `user_id` varchar(128) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `user_name` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `user_avatar` varchar(128) NOT NULL,
  `comment` varchar(256) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `created_at` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`comment_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `blog_comments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET DEFAULT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

DROP TABLE IF EXISTS `books`;
CREATE TABLE `books` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `year_release` int NOT NULL,
  `image` varchar(128) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `amazon_link` varchar(256) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `resume` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `pages` int NOT NULL,
  `genres` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `author` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `created_at` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `updated_at` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;


DROP TABLE IF EXISTS `games`;
CREATE TABLE `games` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `year_release` int NOT NULL,
  `resume` varchar(512) NOT NULL,
  `image` varchar(256) NOT NULL,
  `igdb_link` varchar(128) NOT NULL,
  `igdb_rating` float NOT NULL,
  `platforms` varchar(64) NOT NULL,
  `developer` varchar(64) NOT NULL,
  `genres` varchar(64) NOT NULL,
  `amazon_link` varchar(256) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `created_at` varchar(32) NOT NULL,
  `updated_at` varchar(32) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;


DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` varchar(128) NOT NULL,
  `name` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `email` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `confirmed_email` binary(1) NOT NULL,
  `confirm_email_token` varchar(128) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `password` varchar(256) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `reset_password_token` varchar(256) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `admin` binary(1) NOT NULL,
  `avatar` varchar(128) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `document` varchar(12) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `phone` varchar(16) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `birth_date` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `google_id` varchar(128) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `github_id` varchar(128) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `facebook_id` varchar(128) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `address_zipcode` varchar(24) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `address_street` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `address_street_number` int NOT NULL,
  `address_neighborhood` varchar(128) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `address_city` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `address_state` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `address_country` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `stripe_customer_id` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `stripe_card_token_id` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `stripe_card_id` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `stripe_card_last_4_digits` int NOT NULL,
  `stripe_card_exp_month` int NOT NULL,
  `stripe_card_exp_year` int NOT NULL,
  `stripe_currently_subscription_id` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `stripe_currently_subscription_name` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `stripe_subscription_start` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `stripe_subscription_end` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `stripe_subscription_automatically_renew` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `created_at` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `updated_at` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;


-- 2021-08-20 15:16:58
