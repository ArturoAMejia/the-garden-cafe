-- CreateTable
CREATE TABLE "detalle_pedido_ingrediente" (
    "id_pedido" INTEGER NOT NULL,
    "id_producto" INTEGER NOT NULL,
    "cantidad" INTEGER NOT NULL,

    CONSTRAINT "detalle_pedido_ingrediente_pkey" PRIMARY KEY ("id_pedido","id_producto")
);

-- AddForeignKey
ALTER TABLE "detalle_pedido_ingrediente" ADD CONSTRAINT "detalle_pedido_ingrediente_id_pedido_fkey" FOREIGN KEY ("id_pedido") REFERENCES "pedido"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "detalle_pedido_ingrediente" ADD CONSTRAINT "detalle_pedido_ingrediente_id_producto_fkey" FOREIGN KEY ("id_producto") REFERENCES "producto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
