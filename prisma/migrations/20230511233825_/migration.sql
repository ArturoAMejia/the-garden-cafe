/*
  Warnings:

  - A unique constraint covering the columns `[id_pedido]` on the table `pedido_cocinero` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "pedido_cocinero" ALTER COLUMN "fecha_pedido" SET DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE UNIQUE INDEX "pedido_cocinero_id_pedido_key" ON "pedido_cocinero"("id_pedido");
