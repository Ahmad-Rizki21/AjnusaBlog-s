-- CreateTable
CREATE TABLE `Popup` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `type` ENUM('IMAGE', 'HTML') NOT NULL DEFAULT 'IMAGE',
    `content` TEXT NOT NULL,
    `link` LONGTEXT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT FALSE,
    `delay` INTEGER NOT NULL DEFAULT 0,
    `showClose` BOOLEAN NOT NULL DEFAULT TRUE,
    `width` INTEGER NULL,
    `height` INTEGER NULL,
    `createdBy` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Popup` ADD CONSTRAINT `Popup_createdBy_fkey` FOREIGN KEY (`createdBy`) REFERENCES `Admin`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
