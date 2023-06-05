/*
  Warnings:

  - Added the required column `tipo_movimiento` to the `movimiento_caja` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "apertura_caja" ADD COLUMN     "fecha_cierre" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "cierre_caja" ADD COLUMN     "fecha_apertura" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "movimiento_caja" ADD COLUMN     "tipo_movimiento" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "stock_seguridad" (
    "id" SERIAL NOT NULL,
    "id_producto" INTEGER NOT NULL,
    "tiempo_entrega" INTEGER NOT NULL,
    "desviacion_estandar" DOUBLE PRECISION NOT NULL,
    "probabilidad_nivel_servicio" DOUBLE PRECISION NOT NULL,
    "stock_seguridad" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "stock_seguridad_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "punto_pedido" (
    "id" SERIAL NOT NULL,
    "id_estado" INTEGER NOT NULL,
    "id_producto" INTEGER NOT NULL,
    "desviacion_estandar" DOUBLE PRECISION NOT NULL,
    "dias" INTEGER NOT NULL,
    "costo_producto" DOUBLE PRECISION NOT NULL,
    "semanas_trabajadas" INTEGER NOT NULL,
    "tasa_anual" DOUBLE PRECISION NOT NULL,
    "punto_pedido" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "punto_pedido_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "stock_seguridad_id_producto_key" ON "stock_seguridad"("id_producto");

-- CreateIndex
CREATE UNIQUE INDEX "punto_pedido_id_producto_key" ON "punto_pedido"("id_producto");

-- AddForeignKey
ALTER TABLE "stock_seguridad" ADD CONSTRAINT "stock_seguridad_id_producto_fkey" FOREIGN KEY ("id_producto") REFERENCES "producto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "punto_pedido" ADD CONSTRAINT "punto_pedido_id_estado_fkey" FOREIGN KEY ("id_estado") REFERENCES "cat_estado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "punto_pedido" ADD CONSTRAINT "punto_pedido_id_producto_fkey" FOREIGN KEY ("id_producto") REFERENCES "producto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
