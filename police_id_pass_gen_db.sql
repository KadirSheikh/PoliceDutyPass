-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 21, 2021 at 10:38 AM
-- Server version: 10.1.37-MariaDB
-- PHP Version: 7.3.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `police_id_pass_gen_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin_tbl`
--

CREATE TABLE `admin_tbl` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(200) NOT NULL,
  `password` varchar(1024) NOT NULL,
  `create_date` date NOT NULL DEFAULT '0000-00-00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admin_tbl`
--

INSERT INTO `admin_tbl` (`id`, `name`, `email`, `password`, `create_date`) VALUES
(1, 'Nidhey Indurkar', 'nidhey60@gmail.com', '$2a$10$o2aOc3aaH6U4BO/8gJ83GeP4KwPIQkuDDy3YhIj1JJUPm86AFScVW', '2021-02-28'),
(2, 'Ritwik Chavhan', 'ritwikchavhan19@gmail.com', '$2a$10$14tw7H.avtYI14/UtTPPHu2KedQBVUhABaenydiFO1mer0qo3dOWu', '2021-02-28'),
(3, 'nidhey', 'nidhey60@gmail.com', '$2a$10$JJ4xbx90o2IklkJnYSPCF.yjnj6VZ9KMUFqU.uYoasR4VUtzOIV3a', '0000-00-00'),
(4, 'Kadir Sheikh', 'sheikhkadir02@gmail.com', '$2a$10$o2aOc3aaH6U4BO/8gJ83GeP4KwPIQkuDDy3YhIj1JJUPm86AFScVW', '2021-04-14');

-- --------------------------------------------------------

--
-- Table structure for table `pass_gen_tbl`
--

CREATE TABLE `pass_gen_tbl` (
  `id` int(11) NOT NULL,
  `id_number` varchar(100) NOT NULL,
  `name` varchar(200) NOT NULL,
  `designation` varchar(50) NOT NULL,
  `mobile` varchar(20) NOT NULL,
  `company_name` varchar(50) NOT NULL,
  `station` varchar(200) NOT NULL,
  `duty_place` varchar(200) NOT NULL,
  `pass_type` varchar(30) NOT NULL,
  `lineup` tinyint(4) NOT NULL,
  `proximity` tinyint(4) NOT NULL,
  `start_date` varchar(50) NOT NULL,
  `end_date` varchar(50) NOT NULL,
  `pass_size` varchar(20) NOT NULL,
  `pass_color` varchar(20) NOT NULL,
  `photo` varchar(50) NOT NULL,
  `is_active` tinyint(4) DEFAULT '0',
  `create_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `pass_gen_tbl`
--

INSERT INTO `pass_gen_tbl` (`id`, `id_number`, `name`, `designation`, `mobile`, `company_name`, `station`, `duty_place`, `pass_type`, `lineup`, `proximity`, `start_date`, `end_date`, `pass_size`, `pass_color`, `photo`, `is_active`, `create_date`) VALUES
(1, 'ANUP123566', 'kamil Sheikh', 'Rank', '79782112808', 'DPT', 'ABCD', 'Duty1', 'Security Pass', 1, 0, '2021-03-24', '2021-03-27', 'b3', 'brown', 'Screenshot (100).png', 0, '2021-03-22 15:43:47'),
(2, 'AHUP231', 'Ritwik Chavhan', 'abc', '7972112804', 'xyz', 'aaaa', 'Duty2', 'Duty Pass', 0, 1, '2021-03-24', '2021-03-27', 'b4', 'red', 'Screenshot (95).png', 0, '2021-03-22 15:43:59'),
(3, 'AHUP321', 'Nidhey Indurkar', 'bca', '7972112804', 'pqr', 'aaaa', 'Duty3', 'Security Pass', 1, 0, '2021-03-24', '2021-03-27', 'b3', 'green', 'Screenshot (95).png', 0, '2021-03-22 15:43:59'),
(133, 'ANUP123', 'Kadir Rizwan Sheikh', 'Designation', '7878787878', 'gjhgjhg', 'fafasfjhsk', 'fasfsafsf', 'Duty Pass', 0, 0, '2021-04-14', '2021-04-15', 'b3', 'red', 'Screenshot (95).png', 0, '2021-04-14 12:43:26'),
(134, 'ANUP123', 'Kadir Rizwan Sheikh', 'Rank', '7777777777777', 'DPT', 'Nagpur', 'Nagpur', 'Duty Pass', 0, 0, '2021-04-16', '2021-04-17', 'b3', 'lightblue', 'img.jpg', 1, '2021-04-16 10:46:23'),
(135, 'AHUPI5051P', 'Kadir Sheikh ', 'abc', '7972112804', 'xyz', 'aaaa', 'aaaaa', 'Duty Pass', 1, 1, 'March 21 2021', 'March 22 2021', 'b3', 'lightblue', 'a.png', 1, '2021-04-16 11:01:31'),
(136, 'AHUPI5051P', 'Kadir Sheikh cccc', 'bca', '7972112804', 'pqr', 'aaaa', 'aaaaa', 'Security Pass', 0, 1, 'March 21 2021', 'March 22 2021', 'b3', 'red', 'b.png', 1, '2021-04-16 11:01:31'),
(137, 'AHUPI5051P', 'Kadir Sheikh cccc', 'csa', '7972112804', 'mno', 'aaaa', 'aaaaa', 'Duty Pass', 1, 0, 'March 21 2021', 'March 22 2021', 'b3', 'yellow', 'c.png', 1, '2021-04-16 11:01:31'),
(138, 'AHUPI5051P', 'Kadir Sheikh cccc', 'csa', '7972112804', 'mno', 'aaaa', 'aaaaa', 'Duty Pass', 1, 0, 'March 21 2021', 'March 22 2021', 'b3', 'green', 'd.png', 1, '2021-04-16 11:01:31'),
(139, 'ANUP123', 'Kadir Rizwan Sheikh', 'Designation', '7878787878', 'gjhgjhg', 'fafasfjhsk', 'Nagpur2', 'Duty Pass', 0, 0, '2021-04-16', '2021-04-17', 'b3', 'lightblue', 'Screenshot (101).png', 1, '2021-04-16 11:18:28');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin_tbl`
--
ALTER TABLE `admin_tbl`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pass_gen_tbl`
--
ALTER TABLE `pass_gen_tbl`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin_tbl`
--
ALTER TABLE `admin_tbl`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `pass_gen_tbl`
--
ALTER TABLE `pass_gen_tbl`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=140;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
