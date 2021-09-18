-- Adminer 4.8.1 MySQL 8.0.26 dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

DROP DATABASE IF EXISTS `galhardoapp`;
CREATE DATABASE `galhardoapp` /*!40100 DEFAULT CHARACTER SET utf8 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `galhardoapp`;

-- Adminer 4.8.1 MySQL 8.0.26 dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

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

INSERT INTO `blog` (`id`, `title`, `slug`, `resume`, `image`, `category`, `body`, `created_at`, `updated_at`) VALUES
(1, 'patched blog title', 'patched-blog-title', 'patched blog resume',  'https://picsum.photos/id/20/230/230',  'patched blog category',  'patched blog body',  '02/09/2021 18:59:23',  '02/09/2021 19:00:59');

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

INSERT INTO `books` (`id`, `title`, `year_release`, `image`, `amazon_link`, `resume`, `pages`, `genres`, `author`, `created_at`, `updated_at`) VALUES
(2, 'HARRY POTTER E A PEDRA FILOSOFAL', 2020, 'https://images-na.ssl-images-amazon.com/images/I/51C5FSmGlqL._SX331_BO1,204,203,200_.jpg', 'https://www.amazon.com.br/dp/8532531768/ref=s9_acsd_al_bw_c2_x_1_t?pf_rd_m=A3RN7G7QC5MWSZ&pf_rd_s=merchandised-search-4&pf_rd_r=94401YP4EFQBKS2C6QK8&pf_rd_t=101&pf_rd_p=bed818b6-7184-4c08-8637-f6cb1f410f34&pf_rd_i=13348890011',  'Há 20 anos a magia aterrissou no Brasil com a chegada de Harry Potter e a Pedra Filosofal. Para comemorar este aniversário tão especial de um dos livros mais vendidos da história, a Rocco lançou esta coleção de luxo em edição limitada com os sete livros em capa dura, com ilustrações de Brian Selznick (vencedor da Medalha Caldecott) e Mary GrandPré. Uma novidade que irá encantar novos leitores e fãs que acompanham a série por todos esses anos',  256,  'Fiction',  'J.K. Rowling', '02/09/2021 18:35:07',  '02/09/2021 18:35:07'),
(3, 'HARRY POTTER E A PEDRA FILOSOFAL', 2020, 'https://images-na.ssl-images-amazon.com/images/I/51C5FSmGlqL._SX331_BO1,204,203,200_.jpg', 'https://www.amazon.com.br/dp/8532531768/ref=s9_acsd_al_bw_c2_x_1_t?pf_rd_m=A3RN7G7QC5MWSZ&pf_rd_s=merchandised-search-4&pf_rd_r=94401YP4EFQBKS2C6QK8&pf_rd_t=101&pf_rd_p=bed818b6-7184-4c08-8637-f6cb1f410f34&pf_rd_i=13348890011',  'Há 20 anos a magia aterrissou no Brasil com a chegada de Harry Potter e a Pedra Filosofal. Para comemorar este aniversário tão especial de um dos livros mais vendidos da história, a Rocco lançou esta coleção de luxo em edição limitada com os sete livros em capa dura, com ilustrações de Brian Selznick (vencedor da Medalha Caldecott) e Mary GrandPré. Uma novidade que irá encantar novos leitores e fãs que acompanham a série por todos esses anos',  256,  'Fiction',  'J.K. Rowling', '02/09/2021 18:38:34',  '02/09/2021 18:38:34');

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

INSERT INTO `games` (`id`, `title`, `year_release`, `resume`, `image`, `igdb_link`, `igdb_rating`, `platforms`, `developer`, `genres`, `amazon_link`, `created_at`, `updated_at`) VALUES
(1, 'Hades',  2020, 'A rogue-lite hack and slash dungeon crawler in which Zagreus, son of Hades the Greek god of the dead, attempts to escape his home and his oppressive father by fighting the souls of the dead through the various layers of the ever-shifting underworld, while getting to know and forging relationships with its inhabitants.',  'https://images.igdb.com/igdb/image/upload/t_cover_big/co39vc.jpg', 'https://www.igdb.com/games/hades--1',  94, 'PC, XboxOne Series S|X, PS4, PS5', 'Supergiant Games', 'Adventure, Hack and slash/Beat \'em up, Indie, Role-playing (RPG)',  'amazon link',  '02/09/2021 19:14:51',  '02/09/2021 19:14:51'),
(2, 'Hades',  2020, 'A rogue-lite hack and slash dungeon crawler in which Zagreus, son of Hades the Greek god of the dead, attempts to escape his home and his oppressive father by fighting the souls of the dead through the various layers of the ever-shifting underworld, while getting to know and forging relationships with its inhabitants.',  'https://images.igdb.com/igdb/image/upload/t_cover_big/co39vc.jpg', 'https://www.igdb.com/games/hades--1',  94, 'PC, XboxOne Series S|X, PS4, PS5', 'Supergiant Games', 'Adventure, Hack and slash/Beat \'em up, Indie, Role-playing (RPG)',  'amazon link',  '02/09/2021 19:28:07',  '02/09/2021 19:28:07'),
(3, 'Hades',  2020, 'A rogue-lite hack and slash dungeon crawler in which Zagreus, son of Hades the Greek god of the dead, attempts to escape his home and his oppressive father by fighting the souls of the dead through the various layers of the ever-shifting underworld, while getting to know and forging relationships with its inhabitants.',  'https://images.igdb.com/igdb/image/upload/t_cover_big/co39vc.jpg', 'https://www.igdb.com/games/hades--1',  94, 'PC, XboxOne Series S|X, PS4, PS5', 'Supergiant Games', 'Adventure, Hack and slash/Beat \'em up, Indie, Role-playing (RPG)',  'amazon link',  '02/09/2021 19:28:08',  '02/09/2021 19:28:08');

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
  `stripe_subscription_automatically_renew` binary(1) NOT NULL,
  `created_at` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `updated_at` varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

INSERT INTO `users` (`id`, `name`, `email`, `confirmed_email`, `confirm_email_token`, `password`, `reset_password_token`, `admin`, `avatar`, `document`, `phone`, `birth_date`, `google_id`, `github_id`, `facebook_id`, `address_zipcode`, `address_street`, `address_street_number`, `address_neighborhood`, `address_city`, `address_state`, `address_country`, `stripe_customer_id`, `stripe_card_token_id`, `stripe_card_id`, `stripe_card_last_4_digits`, `stripe_card_exp_month`, `stripe_card_exp_year`, `stripe_currently_subscription_id`, `stripe_currently_subscription_name`, `stripe_subscription_start`, `stripe_subscription_end`, `stripe_subscription_automatically_renew`, `created_at`, `updated_at`) VALUES
('7f9c1c22-98f6-4472-a031-d027b7196ba9',  'ADMIN Alex', 'admin@gmail.com',  UNHEX('01'),  'null', '$2b$12$qmFqKwOkAfdQLy04VBtOLObd6FUU7H2P3XKa1f95JbKlLgjyOy4kG', 'null', UNHEX('01'),  'admin_avatar.png', '44557777777',  '18999999999',  '2021-08-05', '', '', '', '17280000', 'Avenida Paulista', 42, 'Bairro Chique',  'São Paulo',  'SP', 'Brazil', 'cus_K8y63RgFsRst7l', 'tok_1JV0ZuHoneB4Zvrp8l5HTFNt', 'card_1JV0ZtHoneB4Zvrp0ZVmggZ3',  4242, 8,  22, 'sub_K9dTRyfii6mNKt', 'PRO',  '02/09/2021 14:59:32',  '02/10/2021 14:59:32',  UNHEX('00'),  '10/08/2021 02:25:35',  '15/08/2021 06:25:35');

-- 2021-09-02 22:39:31
