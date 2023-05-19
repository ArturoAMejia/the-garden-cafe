-- CreateTable
CREATE TABLE "producto_proveedor" (
    "id_producto" INTEGER NOT NULL,
    "id_proveedor" INTEGER NOT NULL,

    CONSTRAINT "producto_proveedor_pkey" PRIMARY KEY ("id_producto","id_proveedor")
);

-- CreateTable
CREATE TABLE "rol_sub_modulo" (
    "id_rol" INTEGER NOT NULL,
    "id_sub_modulo" INTEGER NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "rol_sub_modulo_pkey" PRIMARY KEY ("id_sub_modulo","id_rol")
);

-- AddForeignKey
ALTER TABLE "producto_proveedor" ADD CONSTRAINT "producto_proveedor_id_producto_fkey" FOREIGN KEY ("id_producto") REFERENCES "producto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "producto_proveedor" ADD CONSTRAINT "producto_proveedor_id_proveedor_fkey" FOREIGN KEY ("id_proveedor") REFERENCES "proveedor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rol_sub_modulo" ADD CONSTRAINT "rol_sub_modulo_id_rol_fkey" FOREIGN KEY ("id_rol") REFERENCES "rol"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rol_sub_modulo" ADD CONSTRAINT "rol_sub_modulo_id_sub_modulo_fkey" FOREIGN KEY ("id_sub_modulo") REFERENCES "sub_modulo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
