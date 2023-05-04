/*
  Warnings:

  - You are about to drop the column `genero` on the `persona` table. All the data in the column will be lost.
  - Added the required column `genero` to the `cliente` table without a default value. This is not possible if the table is not empty.
  - Added the required column `genero` to the `trabajador` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cliente" ADD COLUMN     "genero" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "persona" DROP COLUMN "genero";

-- AlterTable
ALTER TABLE "trabajador" ADD COLUMN     "genero" TEXT NOT NULL;
