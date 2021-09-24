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
  `amazon_link` varchar(256) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
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
  `price` int NOT NULL,
  `resume` varchar(512) NOT NULL,
  `image` varchar(256) NOT NULL,
  `igdb_link` varchar(128) NOT NULL,
  `igdb_rating` float NOT NULL,
  `platforms` varchar(64) NOT NULL,
  `developer` varchar(64) NOT NULL,
  `genres` varchar(64) NOT NULL,
  `amazon_link` varchar(256) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `created_at` varchar(32) NOT NULL,
  `updated_at` varchar(32) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;


DROP TABLE IF EXISTS `pagarme_shop_transactions`;
CREATE TABLE `pagarme_shop_transactions` (
  `transaction_id` int unsigned NOT NULL,
  `total_amount` int unsigned NOT NULL,
  `payment_card_id` varchar(64) NOT NULL,
  `payment_card_last_digits` varchar(6) NOT NULL,
  `payment_card_first_digits` varchar(6) NOT NULL,
  `payment_card_brand` varchar(32) NOT NULL,
  `payment_card_expiration_date` varchar(4) NOT NULL,
  `currency` varchar(3) NOT NULL,
  `status` varchar(8) NOT NULL,
  `products_amount` int unsigned NOT NULL,
  `products` text NOT NULL,
  `customer_id` varchar(64) NOT NULL,
  `customer_pagarme_id` int unsigned NOT NULL,
  `customer_email` varchar(32) NOT NULL,
  `customer_phone` varchar(32) NOT NULL,
  `customer_name` varchar(32) NOT NULL,
  `shipping_zipcode` varchar(32) NOT NULL,
  `shipping_address` varchar(32) NOT NULL,
  `shipping_street` varchar(32) NOT NULL,
  `shipping_street_number` int unsigned NOT NULL,
  `shipping_neighborhood` varchar(32) NOT NULL,
  `shipping_city` varchar(32) NOT NULL,
  `shipping_state` varchar(12) NOT NULL,
  `shipping_country` varchar(32) NOT NULL,
  `shipping_carrier` varchar(32) NOT NULL,
  `shipping_fee` int unsigned NOT NULL,
  `shipping_deadline` int unsigned NOT NULL,
  `created_at` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;


DROP TABLE IF EXISTS `pagarme_subs_transactions`;
CREATE TABLE `pagarme_subs_transactions` (
  `transaction_id` int unsigned NOT NULL,
  `status` varchar(8) NOT NULL,
  `payment_card_id` varchar(32) NOT NULL,
  `payment_card_first_digits` varchar(6) NOT NULL,
  `payment_card_last_digits` varchar(6) NOT NULL,
  `payment_card_brand` varchar(6) NOT NULL,
  `payment_card_expiration_date` varchar(12) NOT NULL,
  `plan_id` varchar(12) NOT NULL,
  `plan_name` varchar(18) NOT NULL,
  `plan_amount` int NOT NULL,
  `plan_current_period_start` varchar(32) NOT NULL,
  `plan_current_period_end` varchar(32) NOT NULL,
  `customer_id` varchar(32) NOT NULL,
  `customer_pagarme_id` varchar(32) NOT NULL,
  `customer_name` varchar(32) NOT NULL,
  `customer_email` varchar(64) NOT NULL,
  `customer_phone` varchar(18) NOT NULL,
  `created_at` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;


DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` varchar(128) NOT NULL,
  `name` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `email` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `confirmed_email` binary(1) DEFAULT NULL,
  `confirm_email_token` varchar(128) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `password` varchar(256) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `reset_password_token` varchar(256) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `admin` binary(1) NOT NULL,
  `avatar` varchar(128) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `document` varchar(12) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `phone_country` varchar(16) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `phone_ddd` varchar(3) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `phone_number` varchar(12) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `birth_date` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `google_id` varchar(128) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `github_id` varchar(128) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `facebook_id` varchar(128) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `address_zipcode` varchar(24) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `address_street` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `address_street_number` int DEFAULT NULL,
  `address_neighborhood` varchar(128) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `address_city` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `address_state` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `address_country` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `pagarme_customer_id` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `pagarme_card_id` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `pagarme_card_first_digits` varchar(6) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `pagarme_card_last_digits` int DEFAULT NULL,
  `pagarme_card_expiration_date` int DEFAULT NULL,
  `pagarme_currently_subscription_id` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `pagarme_currently_subscription_name` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `pagarme_subscription_start` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `pagarme_subscription_end` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `pagarme_subscription_cancel_at_period_end` binary(1) DEFAULT NULL,
  `created_at` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `updated_at` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;


-- 2021-09-24 23:08:10
