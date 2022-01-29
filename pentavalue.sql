-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 29, 2022 at 04:47 AM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 8.0.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pentavalue`
--

-- --------------------------------------------------------

--
-- Table structure for table `note`
--

CREATE TABLE `note` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `message` varchar(255) NOT NULL,
  `note_type` int(11) NOT NULL,
  `seen` tinyint(1) NOT NULL DEFAULT 0,
  `softdelete` tinyint(1) NOT NULL DEFAULT 0,
  `media` longtext NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `note`
--

INSERT INTO `note` (`id`, `user_id`, `title`, `message`, `note_type`, `seen`, `softdelete`, `media`, `date`) VALUES
(1, 1, 'Congrats moe', 'congrats for your new house', 2, 0, 0, 'http://localhost:4000/file/file_1643421238567.jpg', '2022-01-28 22:00:00'),
(2, 1, 'Congrats moe', 'congrats for your new car', 2, 0, 0, 'http://localhost:4000/file/file_1643421460538.jpg', '2022-01-28 22:00:00'),
(3, 1, 'Congrats moe', 'congrats for your new mobile', 2, 0, 0, 'http://localhost:4000/file/file_1643421527799.jpg', '2022-01-28 23:58:47'),
(4, 2, 'congrats son', 'take care', 2, 0, 0, 'http://localhost:4000/file/file_1643427084871.jpg', '2022-01-29 01:31:24'),
(5, 1, 'congrats son', 'take care', 2, 0, 0, '', '2022-01-29 03:45:34');

-- --------------------------------------------------------

--
-- Table structure for table `notetype`
--

CREATE TABLE `notetype` (
  `id` int(11) NOT NULL,
  `type` varchar(255) NOT NULL,
  `disabled` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `notetype`
--

INSERT INTO `notetype` (`id`, `type`, `disabled`) VALUES
(1, 'invitation', 0),
(2, 'congrats', 0);

-- --------------------------------------------------------

--
-- Table structure for table `send_note`
--

CREATE TABLE `send_note` (
  `id` int(11) NOT NULL,
  `sent_id` int(11) NOT NULL,
  `receive_email` varchar(255) NOT NULL,
  `note_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `send_note`
--

INSERT INTO `send_note` (`id`, `sent_id`, `receive_email`, `note_id`) VALUES
(1, 2, 'moe@gmail.com', 4);

--
-- Triggers `send_note`
--
DELIMITER $$
CREATE TRIGGER `on_note_sent` AFTER INSERT ON `send_note` FOR EACH ROW BEGIN

SET @title = (SELECT title from note where note.user_id = NEW.sent_id and note.id = NEW.note_id);

SET @message = (SELECT message from note where note.user_id = NEW.sent_id and note.id = NEW.note_id);

SET @note_type = (SELECT note_type from note where note.user_id = NEW.sent_id and note.id = NEW.note_id);

SET @user_id = (SELECT id from user WHERE user.email = NEW.receive_email);


INSERT INTO note (title,message,user_id,note_type) VALUES (@title,@message,@user_id,@note_type);

END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `name`, `email`, `image`) VALUES
(1, 'mohamed', 'moe@gmail.com', ''),
(2, 'moe', 'moe2@gmail.com', ''),
(3, 'moe', 'moe3@gmail.com', 'http://localhost:4000/image/image_1643419490941.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `note`
--
ALTER TABLE `note`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id_fk` (`user_id`),
  ADD KEY `note_type_id` (`note_type`);

--
-- Indexes for table `notetype`
--
ALTER TABLE `notetype`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `send_note`
--
ALTER TABLE `send_note`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id_sent_fk` (`sent_id`),
  ADD KEY `email_receive_fk` (`receive_email`),
  ADD KEY `note_id_fk` (`note_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `note`
--
ALTER TABLE `note`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `notetype`
--
ALTER TABLE `notetype`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `send_note`
--
ALTER TABLE `send_note`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `note`
--
ALTER TABLE `note`
  ADD CONSTRAINT `note_type_id` FOREIGN KEY (`note_type`) REFERENCES `notetype` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `send_note`
--
ALTER TABLE `send_note`
  ADD CONSTRAINT `email_receive_fk` FOREIGN KEY (`receive_email`) REFERENCES `user` (`email`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `note_id_fk` FOREIGN KEY (`note_id`) REFERENCES `note` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_id_sent_fk` FOREIGN KEY (`sent_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
