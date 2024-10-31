/*
  Warnings:

  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `users`;

-- CreateTable
CREATE TABLE `Usuario` (
    `id_user` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password_hash` VARCHAR(191) NOT NULL,
    `date_of_birth` DATETIME(3) NOT NULL,
    `height` DOUBLE NOT NULL,
    `weight` DOUBLE NOT NULL,
    `objective` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Usuario_email_key`(`email`),
    PRIMARY KEY (`id_user`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `GrupoMuscular` (
    `id_group` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_group`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Exercicio` (
    `id_exercise` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `difficulty` ENUM('BEGINNER', 'INTERMEDIATE', 'ADVANCED') NOT NULL,
    `requires_equipment` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id_exercise`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ExercicioGrupoMuscular` (
    `id_exercise` INTEGER NOT NULL,
    `id_group` INTEGER NOT NULL,

    PRIMARY KEY (`id_exercise`, `id_group`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Treino` (
    `id_workout` INTEGER NOT NULL AUTO_INCREMENT,
    `id_user` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `objective` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_workout`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TreinoExercicio` (
    `id_workout` INTEGER NOT NULL,
    `id_exercise` INTEGER NOT NULL,
    `series` INTEGER NOT NULL,
    `repetitions` INTEGER NOT NULL,
    `rest` INTEGER NOT NULL,

    PRIMARY KEY (`id_workout`, `id_exercise`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Progresso` (
    `id_progress` INTEGER NOT NULL AUTO_INCREMENT,
    `id_user` INTEGER NOT NULL,
    `id_exercise` INTEGER NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `completed_series` INTEGER NOT NULL,
    `completed_repetitions` INTEGER NOT NULL,
    `used_weight` DOUBLE NOT NULL,

    PRIMARY KEY (`id_progress`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ExercicioGrupoMuscular` ADD CONSTRAINT `ExercicioGrupoMuscular_id_exercise_fkey` FOREIGN KEY (`id_exercise`) REFERENCES `Exercicio`(`id_exercise`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ExercicioGrupoMuscular` ADD CONSTRAINT `ExercicioGrupoMuscular_id_group_fkey` FOREIGN KEY (`id_group`) REFERENCES `GrupoMuscular`(`id_group`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Treino` ADD CONSTRAINT `Treino_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `Usuario`(`id_user`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TreinoExercicio` ADD CONSTRAINT `TreinoExercicio_id_workout_fkey` FOREIGN KEY (`id_workout`) REFERENCES `Treino`(`id_workout`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TreinoExercicio` ADD CONSTRAINT `TreinoExercicio_id_exercise_fkey` FOREIGN KEY (`id_exercise`) REFERENCES `Exercicio`(`id_exercise`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Progresso` ADD CONSTRAINT `Progresso_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `Usuario`(`id_user`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Progresso` ADD CONSTRAINT `Progresso_id_exercise_fkey` FOREIGN KEY (`id_exercise`) REFERENCES `Exercicio`(`id_exercise`) ON DELETE RESTRICT ON UPDATE CASCADE;
