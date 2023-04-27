-- AlterTable
ALTER TABLE "detalle_pedido" ADD COLUMN     "id_estado" INTEGER NOT NULL DEFAULT 4;

-- AddForeignKey
ALTER TABLE "detalle_pedido" ADD CONSTRAINT "detalle_pedido_id_estado_fkey" FOREIGN KEY ("id_estado") REFERENCES "cat_estado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
