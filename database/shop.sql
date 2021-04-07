-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Апр 02 2021 г., 19:04
-- Версия сервера: 5.6.41
-- Версия PHP: 5.5.38

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `shop`
--

-- --------------------------------------------------------

--
-- Структура таблицы `categories`
--

CREATE TABLE `categories` (
  `id` int(11) UNSIGNED NOT NULL,
  `category` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `categories`
--

INSERT INTO `categories` (`id`, `category`) VALUES
(1, 'Shoes'),
(2, 'Clothing'),
(3, 'Accessories');

-- --------------------------------------------------------

--
-- Структура таблицы `customers`
--

CREATE TABLE `customers` (
  `id` int(11) UNSIGNED NOT NULL,
  `customer` varchar(45) NOT NULL,
  `phone` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `customers`
--

INSERT INTO `customers` (`id`, `customer`, `phone`) VALUES
(1, 'Ivchenko', '911-911-922'),
(7, 'wewr', '+38(098)-223-38-88'),
(8, 'zzzzz', '+38(098)-111-22-22'),
(9, 'cccc', '+38(098)-744-44-44'),
(10, 'vvbbbb', '+38(098)-444-44-44'),
(11, 'vvvvbnn', '+38(098)-111-00-00'),
(12, 'aser', '+38(097)-441-10-00'),
(13, 'sdfgh', '+38(098)-445-55-55'),
(14, 'dfg', '+38(098)-552-22-22'),
(15, 'hgfds', '+38(098)-777-77-44'),
(16, 'asdtfg', '+38(098)-777-44-41'),
(17, 'asdrtrfyu', '+38(097)-871-11-11'),
(18, 'iiii', '+38(098)-566-66-62'),
(19, 'dsfg', '+38(098)-555-55-55'),
(20, 'dfghj', '+38(098)-755-22-22'),
(21, 'sedrtfgh', '+38(098)-522-20-00'),
(22, 'esrty', '+38(098)-744-44-44'),
(23, 'qwer', '+38(098)-555-55-55'),
(24, 'srtyu', '+38(098)-552-00-00'),
(25, 'zzzxxxx', '+38(098)-455-52-22'),
(26, 'testing', '+38(098)-226-66-66'),
(27, 'Ivanov', '+38(098)-100-10-10'),
(28, 'Alex', '+38(097)-425-00-66'),
(29, 'Irina', '+38(097)-123-55-89');

-- --------------------------------------------------------

--
-- Структура таблицы `genders`
--

CREATE TABLE `genders` (
  `id` int(11) UNSIGNED NOT NULL,
  `gender` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `genders`
--

INSERT INTO `genders` (`id`, `gender`) VALUES
(1, 'Womens'),
(2, 'Mens');

-- --------------------------------------------------------

--
-- Структура таблицы `goods`
--

CREATE TABLE `goods` (
  `id` int(11) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `label` varchar(45) DEFAULT NULL,
  `description` varchar(255) NOT NULL,
  `price` int(11) NOT NULL,
  `categories_id` int(11) UNSIGNED NOT NULL,
  `images_id` int(11) UNSIGNED NOT NULL,
  `genders_id` int(11) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `goods`
--

INSERT INTO `goods` (`id`, `name`, `label`, `description`, `price`, `categories_id`, `images_id`, `genders_id`) VALUES
(1, 'Striped Long Sleeve Shirt', 'new', 'Red/Sky Blue', 119, 2, 1, 1),
(2, 'Poplin Top With Sleeve Bow', 'Bestseller', 'Bright Blue', 129, 2, 2, 1),
(3, 'TOMS Women\'s Alpargata Loafer', 'Bestseller', 'Red', 219, 1, 3, 1),
(4, 'Text T-Shirt', 'Bestseller', 'Pink and dogs', 119, 2, 4, 1),
(5, 'Sweater Choker Neck', 'Bestseller', 'Dustyolive', 319, 2, 5, 1),
(6, 'SJP by Sarah Jessica Parker', NULL, 'Black/Nude Patent', 242, 1, 6, 1),
(7, 'ECCO Biom Aex Luxe Hydromax Water-Resistant Cross Trainer', NULL, 'Black', 199, 1, 7, 2),
(8, 'Nike Air Max Torch 3 Men\'s Running Shoes', NULL, 'Black/White', 153, 1, 8, 2),
(9, 'Printed Shirt with a Bow', NULL, 'Pink/Sky Blue/Yellow', 119, 2, 9, 1),
(10, 'Text T-Shirt', 'New', 'White', 59, 2, 10, 1),
(11, 'Faded Beach Trousers', 'New', 'Ochre', 139, 2, 11, 1),
(12, 'Embroidered Hoodie', 'New', 'Lilac', 89, 2, 12, 1),
(13, 'Bugatchi Men\'s Long Sleeve Printed Cotton Pointed Collar Shirt', 'New', 'Periwinkle', 109, 2, 13, 2),
(14, 'SITKA Gear Men\'s Hunting Windproof Optifade', NULL, 'Elevated Ii', 299, 2, 14, 2),
(15, 'Derek Rose Men\'s Short Sleeve T-Shirt', NULL, 'Charcoal', 119, 2, 15, 2),
(16, 'LEKODE Men Beach Shorts Drawstring Print Pocket Fashion Casual Swim Pants', NULL, 'Red-Cola', 19, 2, 16, 2),
(17, 'Anna by Anuschka Women\'s Genuine Leather Large Hobo Handbag', 'Bestseller', 'Tuscan Tiles', 199, 3, 17, 1),
(18, 'Prada Trick Pelle Saffiano Dog', NULL, 'White / White Chihuahua Gold Keychain', 450, 3, 18, 1),
(19, 'Willberries Essentials Women\'s Faux Fur Ear Muffs', 'Bestseller', 'Leopard', 19, 3, 19, 1),
(20, 'Purse Organizer Insert, Felt Bag organizer with zipper', NULL, 'Black / FeltPurse Organizer Insert, Felt Bag organizer with zipper', 29, 3, 20, 1),
(21, 'Spyder Mens Pinnacle GTX Ski Glove', NULL, 'Black', 239, 3, 21, 2),
(22, 'Salvatore Ferragamo Double Gancini Glossy Buckle', NULL, 'Black/Brown Reversible Belt', 417, 3, 22, 2),
(23, 'American Hat Makers Sierra Cowboy Hat', 'New', 'Handcrafted, Genuine Leather, Breathable / Latte', 217, 3, 23, 2),
(24, 'Oakley Men\'s Flak 2.0 XL OO9188 Sunglasses Bundle', NULL, 'Matte Black/Prizm Deep Water Polarized', 206, 3, 24, 2);

-- --------------------------------------------------------

--
-- Структура таблицы `images`
--

CREATE TABLE `images` (
  `id` int(11) UNSIGNED NOT NULL,
  `src` varchar(255) NOT NULL,
  `type` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `images`
--

INSERT INTO `images` (`id`, `src`, `type`) VALUES
(1, 'img/image-122', 'jpg'),
(2, 'img/201mt210e', 'jpg'),
(3, 'img/61SVZdHi1SL', 'jpg'),
(4, 'img/thR2gxLUL1152', 'jpg'),
(5, 'img/81ecpN8bKL', 'jpg'),
(6, 'img/61xZxTBffZL', 'jpg'),
(7, 'img/71AogkKMguL', 'jpg'),
(8, 'img/71wbXtpEwQL', 'jpg'),
(9, 'img/71Ka10xx6', 'jpg'),
(10, 'img/image-121', 'jpg'),
(11, 'img/image-120', 'jpg'),
(12, 'img/image-119', 'jpg'),
(13, 'img/A1GFd9I31', 'jpg'),
(14, 'img/819MP6k4E6L', 'jpg'),
(15, 'img/713S476iemL', 'jpg'),
(16, 'img/61BjZJm0AaL', 'jpg'),
(17, 'img/91DXANwJ63L', 'jpg'),
(18, 'img/61vHzipbVL', 'jpg'),
(19, 'img/81zhsxFeEJL', 'jpg'),
(20, 'img/61-25976rtL', 'jpg'),
(21, 'img/51xrpCz0wuL', 'jpg'),
(22, 'img/51EeCDi3G9L', 'jpg'),
(23, 'img/61qMUpjOx7L', 'jpg'),
(24, 'img/41heUmYaMGL', 'jpg');

-- --------------------------------------------------------

--
-- Структура таблицы `orders`
--

CREATE TABLE `orders` (
  `id` int(11) UNSIGNED NOT NULL,
  `customer_id` int(11) UNSIGNED NOT NULL,
  `goods_id` int(11) UNSIGNED NOT NULL,
  `count` int(11) UNSIGNED NOT NULL,
  `datetime` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `orders`
--

INSERT INTO `orders` (`id`, `customer_id`, `goods_id`, `count`, `datetime`) VALUES
(1, 1, 2, 5, '2021-03-20 00:00:00'),
(2, 1, 7, 10, '2021-03-30 00:00:00'),
(3, 1, 2, 5, '2021-04-01 00:00:00'),
(9, 27, 5, 4, '2021-04-02 19:00:55'),
(10, 27, 4, 4, '2021-04-02 19:00:55'),
(11, 27, 2, 2, '2021-04-02 19:00:55'),
(12, 27, 7, 1, '2021-04-02 19:00:55'),
(13, 28, 8, 1, '2021-04-02 19:01:55'),
(14, 28, 21, 1, '2021-04-02 19:01:55'),
(15, 28, 16, 2, '2021-04-02 19:01:55'),
(16, 29, 6, 4, '2021-04-02 19:02:39'),
(17, 29, 1, 6, '2021-04-02 19:02:39'),
(18, 29, 2, 2, '2021-04-02 19:02:39'),
(19, 29, 18, 2, '2021-04-02 19:02:39'),
(20, 29, 19, 1, '2021-04-02 19:02:39');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `genders`
--
ALTER TABLE `genders`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `goods`
--
ALTER TABLE `goods`
  ADD PRIMARY KEY (`id`,`categories_id`,`images_id`,`genders_id`),
  ADD KEY `categories_id_fk_idx` (`categories_id`),
  ADD KEY `genders_id_fk_idx` (`genders_id`),
  ADD KEY `images_id_fk_idx` (`images_id`);

--
-- Индексы таблицы `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`,`customer_id`,`goods_id`),
  ADD KEY `customer_id_fk_idx` (`customer_id`),
  ADD KEY `goods_id_fk_idx` (`goods_id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT для таблицы `customers`
--
ALTER TABLE `customers`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT для таблицы `genders`
--
ALTER TABLE `genders`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `goods`
--
ALTER TABLE `goods`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT для таблицы `images`
--
ALTER TABLE `images`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT для таблицы `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `goods`
--
ALTER TABLE `goods`
  ADD CONSTRAINT `categories_id_fk` FOREIGN KEY (`categories_id`) REFERENCES `categories` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `genders_id_fk` FOREIGN KEY (`genders_id`) REFERENCES `genders` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `images_id_fk` FOREIGN KEY (`images_id`) REFERENCES `images` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Ограничения внешнего ключа таблицы `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `customer_id_fk` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `goods_id_fk` FOREIGN KEY (`goods_id`) REFERENCES `goods` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
