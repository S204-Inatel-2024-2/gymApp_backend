/*
  Warnings:

  - You are about to drop the column `id_user` on the `Progresso` table. All the data in the column will be lost.
  - You are about to drop the column `id_user` on the `Treino` table. All the data in the column will be lost.
  - The primary key for the `Usuario` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_user` on the `Usuario` table. All the data in the column will be lost.
  - Added the required column `id` to the `Progresso` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Treino` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Progresso` DROP FOREIGN KEY `Progresso_id_user_fkey`;

-- DropForeignKey
ALTER TABLE `Treino` DROP FOREIGN KEY `Treino_id_user_fkey`;

-- AlterTable
ALTER TABLE `Progresso` DROP COLUMN `id_user`,
    ADD COLUMN `id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Treino` DROP COLUMN `id_user`,
    ADD COLUMN `id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Usuario` DROP PRIMARY KEY,
    DROP COLUMN `id_user`,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `Treino` ADD CONSTRAINT `Treino_id_fkey` FOREIGN KEY (`id`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Progresso` ADD CONSTRAINT `Progresso_id_fkey` FOREIGN KEY (`id`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
