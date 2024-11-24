-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'MEMBER');

-- CreateEnum
CREATE TYPE "Difficulty" AS ENUM ('BEGINNER', 'INTERMEDIATE', 'ADVANCED');

-- CreateTable
CREATE TABLE "Usuario" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "date_of_birth" TIMESTAMP(3) NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'MEMBER',
    "height" TEXT NOT NULL,
    "weight" TEXT NOT NULL,
    "objective" TEXT NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GrupoMuscular" (
    "id_group" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "GrupoMuscular_pkey" PRIMARY KEY ("id_group")
);

-- CreateTable
CREATE TABLE "Exercicio" (
    "id_exercise" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "difficulty" "Difficulty" NOT NULL,
    "requires_equipment" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Exercicio_pkey" PRIMARY KEY ("id_exercise")
);

-- CreateTable
CREATE TABLE "ExercicioGrupoMuscular" (
    "id_exercise" TEXT NOT NULL,
    "id_group" TEXT NOT NULL,

    CONSTRAINT "ExercicioGrupoMuscular_pkey" PRIMARY KEY ("id_exercise","id_group")
);

-- CreateTable
CREATE TABLE "Treino" (
    "id_workout" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "objective" TEXT NOT NULL,

    CONSTRAINT "Treino_pkey" PRIMARY KEY ("id_workout")
);

-- CreateTable
CREATE TABLE "TreinoExercicio" (
    "id_workout" TEXT NOT NULL,
    "id_exercise" TEXT NOT NULL,
    "series" INTEGER NOT NULL,
    "repetitions" INTEGER NOT NULL,
    "rest" INTEGER NOT NULL,

    CONSTRAINT "TreinoExercicio_pkey" PRIMARY KEY ("id_workout","id_exercise")
);

-- CreateTable
CREATE TABLE "Progresso" (
    "id_progress" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "id_exercise" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "completed_series" INTEGER NOT NULL,
    "completed_repetitions" INTEGER NOT NULL,
    "used_weight" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Progresso_pkey" PRIMARY KEY ("id_progress")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- AddForeignKey
ALTER TABLE "ExercicioGrupoMuscular" ADD CONSTRAINT "ExercicioGrupoMuscular_id_exercise_fkey" FOREIGN KEY ("id_exercise") REFERENCES "Exercicio"("id_exercise") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExercicioGrupoMuscular" ADD CONSTRAINT "ExercicioGrupoMuscular_id_group_fkey" FOREIGN KEY ("id_group") REFERENCES "GrupoMuscular"("id_group") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Treino" ADD CONSTRAINT "Treino_id_fkey" FOREIGN KEY ("id") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TreinoExercicio" ADD CONSTRAINT "TreinoExercicio_id_workout_fkey" FOREIGN KEY ("id_workout") REFERENCES "Treino"("id_workout") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TreinoExercicio" ADD CONSTRAINT "TreinoExercicio_id_exercise_fkey" FOREIGN KEY ("id_exercise") REFERENCES "Exercicio"("id_exercise") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Progresso" ADD CONSTRAINT "Progresso_id_fkey" FOREIGN KEY ("id") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Progresso" ADD CONSTRAINT "Progresso_id_exercise_fkey" FOREIGN KEY ("id_exercise") REFERENCES "Exercicio"("id_exercise") ON DELETE RESTRICT ON UPDATE CASCADE;
