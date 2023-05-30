/*
  Warnings:

  - You are about to drop the column `id_compra` on the `recepcion_compra` table. All the data in the column will be lost.
  - Added the required column `id_orden_compra` to the `recepcion_compra` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "recepcion_compra" DROP CONSTRAINT "recepcion_compra_id_compra_fkey";

-- AlterTable
ALTER TABLE "recepcion_compra" DROP COLUMN "id_compra",
ADD COLUMN     "id_orden_compra" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "detalle_recepcion_orden_compra" (
    "id_recepcion_compra" INTEGER NOT NULL,
    "id_producto" INTEGER NOT NULL,
    "cantidad_solicitada" INTEGER NOT NULL,
    "cantidad_recibida" INTEGER NOT NULL,
    "precio_unitario" DOUBLE PRECISION NOT NULL,
    "monto" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "detalle_recepcion_orden_compra_pkey" PRIMARY KEY ("id_recepcion_compra","id_producto")
);

-- AddForeignKey
ALTER TABLE "recepcion_compra" ADD CONSTRAINT "recepcion_compra_id_orden_compra_fkey" FOREIGN KEY ("id_orden_compra") REFERENCES "orden_compra"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "detalle_recepcion_orden_compra" ADD CONSTRAINT "detalle_recepcion_orden_compra_id_recepcion_compra_fkey" FOREIGN KEY ("id_recepcion_compra") REFERENCES "recepcion_compra"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "detalle_recepcion_orden_compra" ADD CONSTRAINT "detalle_recepcion_orden_compra_id_producto_fkey" FOREIGN KEY ("id_producto") REFERENCES "producto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
