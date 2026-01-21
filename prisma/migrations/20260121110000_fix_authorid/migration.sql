-- Check if authorId column exists, if not add it
-- Set foreign_key_checks to 0 temporarily
SET FOREIGN_KEY_CHECKS=0;

-- AlterTable
ALTER TABLE `BlogPost` ADD COLUMN `authorId` VARCHAR(191) NULL;

-- Set foreign_key_checks back to 1
SET FOREIGN_KEY_CHECKS=1;

-- AddForeignKey
ALTER TABLE `BlogPost` ADD CONSTRAINT `BlogPost_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `Admin`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
