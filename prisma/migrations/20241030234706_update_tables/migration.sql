/*
  Warnings:

  - The primary key for the `Exercicio` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `ExercicioGrupoMuscular` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `GrupoMuscular` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Progresso` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Treino` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `TreinoExercicio` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Usuario` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `ExercicioGrupoMuscular` DROP FOREIGN KEY `ExercicioGrupoMuscular_id_exercise_fkey`;

-- DropForeignKey
ALTER TABLE `ExercicioGrupoMuscular` DROP FOREIGN KEY `ExercicioGrupoMuscular_id_group_fkey`;

-- DropForeignKey
ALTER TABLE `Progresso` DROP FOREIGN KEY `Progresso_id_exercise_fkey`;

-- DropForeignKey
ALTER TABLE `Progresso` DROP FOREIGN KEY `Progresso_id_fkey`;

-- DropForeignKey
ALTER TABLE `Treino` DROP FOREIGN KEY `Treino_id_fkey`;

-- DropForeignKey
ALTER TABLE `TreinoExercicio` DROP FOREIGN KEY `TreinoExercicio_id_exercise_fkey`;

-- DropForeignKey
ALTER TABLE `TreinoExercicio` DROP FOREIGN KEY `TreinoExercicio_id_workout_fkey`;

-- AlterTable
ALTER TABLE `Exercicio` DROP PRIMARY KEY,
    MODIFY `id_exercise` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id_exercise`);

-- AlterTable
ALTER TABLE `ExercicioGrupoMuscular` DROP PRIMARY KEY,
    MODIFY `id_exercise` VARCHAR(191) NOT NULL,
    MODIFY `id_group` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id_exercise`, `id_group`);

-- AlterTable
ALTER TABLE `GrupoMuscular` DROP PRIMARY KEY,
    MODIFY `id_group` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id_group`);

-- AlterTable
ALTER TABLE `Progresso` DROP PRIMARY KEY,
    MODIFY `id_progress` VARCHAR(191) NOT NULL,
    MODIFY `id_exercise` VARCHAR(191) NOT NULL,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id_progress`);

-- AlterTable
ALTER TABLE `Treino` DROP PRIMARY KEY,
    MODIFY `id_workout` VARCHAR(191) NOT NULL,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id_workout`);

-- AlterTable
ALTER TABLE `TreinoExercicio` DROP PRIMARY KEY,
    MODIFY `id_workout` VARCHAR(191) NOT NULL,
    MODIFY `id_exercise` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id_workout`, `id_exercise`);

-- AlterTable
ALTER TABLE `Usuario` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `ExercicioGrupoMuscular` ADD CONSTRAINT `ExercicioGrupoMuscular_id_exercise_fkey` FOREIGN KEY (`id_exercise`) REFERENCES `Exercicio`(`id_exercise`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ExercicioGrupoMuscular` ADD CONSTRAINT `ExercicioGrupoMuscular_id_group_fkey` FOREIGN KEY (`id_group`) REFERENCES `GrupoMuscular`(`id_group`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Treino` ADD CONSTRAINT `Treino_id_fkey` FOREIGN KEY (`id`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TreinoExercicio` ADD CONSTRAINT `TreinoExercicio_id_workout_fkey` FOREIGN KEY (`id_workout`) REFERENCES `Treino`(`id_workout`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TreinoExercicio` ADD CONSTRAINT `TreinoExercicio_id_exercise_fkey` FOREIGN KEY (`id_exercise`) REFERENCES `Exercicio`(`id_exercise`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Progresso` ADD CONSTRAINT `Progresso_id_fkey` FOREIGN KEY (`id`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Progresso` ADD CONSTRAINT `Progresso_id_exercise_fkey` FOREIGN KEY (`id_exercise`) REFERENCES `Exercicio`(`id_exercise`) ON DELETE RESTRICT ON UPDATE CASCADE;
