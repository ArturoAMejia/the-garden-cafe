/*
  Warnings:

  - The primary key for the `rol_permiso` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "rol_permiso" DROP CONSTRAINT "rol_permiso_pkey",
ADD CONSTRAINT "rol_permiso_pkey" PRIMARY KEY ("id_rol", "id_permiso");
