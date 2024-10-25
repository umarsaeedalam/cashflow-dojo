/*
  Warnings:

  - The primary key for the `expense` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE `expense` DROP PRIMARY KEY,
    MODIFY `expense_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`expense_id`);
