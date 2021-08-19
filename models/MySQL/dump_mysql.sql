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
