/*
  Warnings:

  - You are about to drop the `detalle_recepcion_orden_compra` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "detalle_recepcion_orden_compra" DROP CONSTRAINT "detalle_recepcion_orden_compra_id_producto_fkey";

-- DropForeignKey
ALTER TABLE "detalle_recepcion_orden_compra" DROP CONSTRAINT "detalle_recepcion_orden_compra_id_recepcion_compra_fkey";

-- DropTable
DROP TABLE "detalle_recepcion_orden_compra";

-- CreateTable
CREATE TABLE "detalle_recepcion_compra" (
    "id_producto" INTEGER NOT NULL,
    "id_recepcion_compra" INTEGER NOT NULL,
    "cantidad_solicitada" INTEGER NOT NULL,
    "cantidad_recibida" INTEGER NOT NULL,
    "precio_unitario" DOUBLE PRECISION NOT NULL,
    "monto" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "detalle_recepcion_compra_pkey" PRIMARY KEY ("id_producto","id_recepcion_compra")
);

-- AddForeignKey
ALTER TABLE "detalle_recepcion_compra" ADD CONSTRAINT "detalle_recepcion_compra_id_producto_fkey" FOREIGN KEY ("id_producto") REFERENCES "producto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "detalle_recepcion_compra" ADD CONSTRAINT "detalle_recepcion_compra_id_recepcion_compra_fkey" FOREIGN KEY ("id_recepcion_compra") REFERENCES "recepcion_compra"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
