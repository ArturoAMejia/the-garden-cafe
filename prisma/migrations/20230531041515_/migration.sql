/*
  Warnings:

  - Added the required column `id_modulo` to the `rol_sub_modulo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "rol_sub_modulo" ADD COLUMN     "id_modulo" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "rol_sub_modulo" ADD CONSTRAINT "rol_sub_modulo_id_modulo_fkey" FOREIGN KEY ("id_modulo") REFERENCES "modulo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
