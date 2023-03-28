/*
  Warnings:

  - The primary key for the `detalle_pedido` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `id_producto_elaborado` to the `detalle_pedido` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "detalle_pedido" DROP CONSTRAINT "detalle_pedido_id_producto_fkey";

-- AlterTable
ALTER TABLE "detalle_pedido" DROP CONSTRAINT "detalle_pedido_pkey",
ADD COLUMN     "id_producto_elaborado" INTEGER NOT NULL,
ALTER COLUMN "id_producto" DROP NOT NULL,
ADD CONSTRAINT "detalle_pedido_pkey" PRIMARY KEY ("id_pedido", "id_producto_elaborado");

-- AddForeignKey
ALTER TABLE "detalle_pedido" ADD CONSTRAINT "detalle_pedido_id_producto_fkey" FOREIGN KEY ("id_producto") REFERENCES "producto"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "detalle_pedido" ADD CONSTRAINT "detalle_pedido_id_producto_elaborado_fkey" FOREIGN KEY ("id_producto_elaborado") REFERENCES "producto_elaborado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
