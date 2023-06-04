/*
  Warnings:

  - Added the required column `id_comprobante` to the `movimiento_caja` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "movimiento_caja" ADD COLUMN     "id_comprobante" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "movimiento_caja" ADD CONSTRAINT "movimiento_caja_id_comprobante_fkey" FOREIGN KEY ("id_comprobante") REFERENCES "comprobante"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
