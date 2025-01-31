DROP TABLE IF EXISTS `ScheduledMessage`;

CREATE TABLE `ScheduledMessage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `phoneNumber` VARCHAR(191) NOT NULL,
    `message` TEXT NOT NULL,
    `scheduledTime` DATETIME(3) NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'PENDING',
    `sentTime` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

INSERT INTO `ScheduledMessage` (`phoneNumber`, `message`, `scheduledTime`, `status`, `sentTime`, `createdAt`, `updatedAt`)
VALUES
('6285815245639', 'Hello, this is a scheduled message.', '2024-11-03 23:10:00', 'PENDING', NULL, NOW(), NOW());
