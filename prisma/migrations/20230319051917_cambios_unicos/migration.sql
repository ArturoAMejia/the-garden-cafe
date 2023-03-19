/*
  Warnings:

  - A unique constraint covering the columns `[nombre]` on the table `categoria_producto` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nombre]` on the table `marca` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[siglas]` on the table `marca` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nombre]` on the table `unidad_medida` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[siglas]` on the table `unidad_medida` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id_tipo_categoria` to the `categoria_producto` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "categoria_producto" ADD COLUMN     "id_tipo_categoria" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "categoria_producto_nombre_key" ON "categoria_producto"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "marca_nombre_key" ON "marca"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "marca_siglas_key" ON "marca"("siglas");

-- CreateIndex
CREATE UNIQUE INDEX "unidad_medida_nombre_key" ON "unidad_medida"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "unidad_medida_siglas_key" ON "unidad_medida"("siglas");

-- AddForeignKey
ALTER TABLE "categoria_producto" ADD CONSTRAINT "categoria_producto_id_tipo_categoria_fkey" FOREIGN KEY ("id_tipo_categoria") REFERENCES "tipo_categoria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
