/*
  Warnings:

  - Added the required column `id_tipo_orden_compra` to the `solicitud_compra` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "solicitud_compra" ADD COLUMN     "id_tipo_orden_compra" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "solicitud_compra" ADD CONSTRAINT "solicitud_compra_id_tipo_orden_compra_fkey" FOREIGN KEY ("id_tipo_orden_compra") REFERENCES "tipo_orden_compra"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
