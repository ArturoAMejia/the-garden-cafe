/*
  Warnings:

  - Added the required column `id_sub_modulo` to the `rol_permiso` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "rol_permiso" ADD COLUMN     "id_sub_modulo" INTEGER NOT NULL,
ALTER COLUMN "id_permiso" SET DEFAULT 1;

-- AddForeignKey
ALTER TABLE "rol_permiso" ADD CONSTRAINT "rol_permiso_id_sub_modulo_fkey" FOREIGN KEY ("id_sub_modulo") REFERENCES "sub_modulo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
