-- CreateTable
CREATE TABLE "pedido_cocinero" (
    "id" SERIAL NOT NULL,
    "id_trabajador" INTEGER NOT NULL,
    "id_pedido" INTEGER NOT NULL,
    "id_estado" INTEGER NOT NULL,
    "fecha_pedido" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pedido_cocinero_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "pedido_cocinero" ADD CONSTRAINT "pedido_cocinero_id_trabajador_fkey" FOREIGN KEY ("id_trabajador") REFERENCES "trabajador"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pedido_cocinero" ADD CONSTRAINT "pedido_cocinero_id_pedido_fkey" FOREIGN KEY ("id_pedido") REFERENCES "pedido"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pedido_cocinero" ADD CONSTRAINT "pedido_cocinero_id_estado_fkey" FOREIGN KEY ("id_estado") REFERENCES "cat_estado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
