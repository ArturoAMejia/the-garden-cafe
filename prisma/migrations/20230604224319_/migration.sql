/*
  Warnings:

  - Added the required column `adultos` to the `detalle_reservacion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hora_reserva` to the `detalle_reservacion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_mesa` to the `detalle_reservacion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `menores` to the `detalle_reservacion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `servicio` to the `detalle_reservacion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "detalle_reservacion" ADD COLUMN     "adultos" INTEGER NOT NULL,
ADD COLUMN     "hora_reserva" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "id_mesa" INTEGER NOT NULL,
ADD COLUMN     "menores" INTEGER NOT NULL,
ADD COLUMN     "servicio" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "mesa" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "ubicacion" TEXT NOT NULL,
    "id_estado" INTEGER NOT NULL,
    "capacidad" INTEGER NOT NULL,

    CONSTRAINT "mesa_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "detalle_reservacion" ADD CONSTRAINT "detalle_reservacion_id_mesa_fkey" FOREIGN KEY ("id_mesa") REFERENCES "mesa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mesa" ADD CONSTRAINT "mesa_id_estado_fkey" FOREIGN KEY ("id_estado") REFERENCES "cat_estado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
