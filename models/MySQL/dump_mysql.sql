CREATE TABLE `users` (
  `id` int(6) PRIMARY KEY NOT NULL AUTO INCREMENT ,
  `email` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `confirmed_email` tinyint(1) NOT NULL,
  `confirm_email_token` varchar(128) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(128) COLLATE utf8_unicode_ci NOT NULL,
  `reset_password_token` varchar(128) COLLATE utf8_unicode_ci NOT NULL,
  `admin` tinyint(1) NOT NULL,
  `avatar` varchar(128) COLLATE utf8_unicode_ci NOT NULL,
  `document` varchar(12) COLLATE utf8_unicode_ci NOT NULL,
  `phone` varchar(12) COLLATE utf8_unicode_ci NOT NULL,
  `birth_date` date NOT NULL,
  `google_id` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `facebook_id` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `github_id` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `stripe_customer_id` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `stripe_card_token_id` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `stripe_card_id` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `stripe_card_holder_name` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `stripe_card_last_4_digits` int(4) NOT NULL,
  `stripe_card_exp_month` int(2) NOT NULL,
  `stripe_card_exp_year` year(4) NOT NULL,
  `stripe_currently_subscription_id` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `stripe_currently_subscription_name` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `stripe_subscription_start` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `stripe_subscription_end` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `stripe_subscription_automatically_renew` tinyint(1) NOT NULL,
  `created_at` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `updated_at` varchar(64) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;



CREATE TABLE `blog` (
  `id` int(6) PRIMARY KEY NOT NULL AUTO INCREMENT,
  `title` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `resume` varchar(512) COLLATE utf8_unicode_ci NOT NULL,
  `image` varchar(128) COLLATE utf8_unicode_ci NOT NULL,
  `category` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `body` text COLLATE utf8_unicode_ci NOT NULL,
  `slug` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `updated_at` varchar(32) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;



CREATE TABLE `games` (
  `id` int(6) PRIMARY KEY NOT NULL AUTO INCREMENT,
  `title` varchar(64) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `year_release` year(4) NOT NULL,
  `resume` varchar(512) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `image` varchar(128) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `igdb_link` varchar(128) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `igdb_rating` float NOT NULL,
  `platforms` varchar(64) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `developer` varchar(64) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `genres` varchar(128) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `amazon_link` varchar(128) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `created_at` varchar(32) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `updated_at` varchar(32) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;


CREATE TABLE `books` (
  `id` int(6) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `title` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `year_release` int(4) NOT NULL,
  `image` varchar(128) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `amazon_link` varchar(256) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `resume` varchar(512) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `pages` int(4) NOT NULL,
  `genres` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `author` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `created_at` varchar(50) NOT NULL,
  `updated_at` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;
