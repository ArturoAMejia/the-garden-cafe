/*
  Warnings:

  - A unique constraint covering the columns `[id_reservacion]` on the table `detalle_reservacion` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "detalle_reservacion" ALTER COLUMN "hora_reserva" SET DATA TYPE TIME;

-- AlterTable
ALTER TABLE "pedido" ADD COLUMN     "id_mesa" INTEGER NOT NULL DEFAULT 1;

-- CreateIndex
CREATE UNIQUE INDEX "detalle_reservacion_id_reservacion_key" ON "detalle_reservacion"("id_reservacion");

-- AddForeignKey
ALTER TABLE "pedido" ADD CONSTRAINT "pedido_id_mesa_fkey" FOREIGN KEY ("id_mesa") REFERENCES "mesa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
