/*
  Warnings:

  - You are about to drop the `detalle_arqueo` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `id_moneda` to the `arqueo_caja` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "detalle_arqueo" DROP CONSTRAINT "detalle_arqueo_id_arqueo_caja_fkey";

-- DropForeignKey
ALTER TABLE "detalle_arqueo" DROP CONSTRAINT "detalle_arqueo_id_moneda_fkey";

-- AlterTable
ALTER TABLE "arqueo_caja" ADD COLUMN     "id_moneda" INTEGER NOT NULL;

-- DropTable
DROP TABLE "detalle_arqueo";

-- CreateTable
CREATE TABLE "detalle_monedas_arqueo" (
    "id" SERIAL NOT NULL,
    "id_arqueo_caja" INTEGER NOT NULL,
    "moneda_un_cordoba" INTEGER NOT NULL DEFAULT 0,
    "moneda_cinco_cordobas" INTEGER NOT NULL DEFAULT 0,
    "moneda_diez_cordobas" INTEGER NOT NULL DEFAULT 0,
    "moneda_diez_centavo" INTEGER NOT NULL DEFAULT 0,
    "moneda_veinticinco_centavo" INTEGER NOT NULL DEFAULT 0,
    "moneda_cincuenta_centavo" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "detalle_monedas_arqueo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "detalle_billete_arqueo" (
    "id" SERIAL NOT NULL,
    "id_arqueo_caja" INTEGER NOT NULL,
    "billete_mil_cordobas" INTEGER NOT NULL DEFAULT 0,
    "billete_quinientos_cordobas" INTEGER NOT NULL DEFAULT 0,
    "billete_doscientos_cordobas" INTEGER NOT NULL DEFAULT 0,
    "billete_cien_cordobas" INTEGER NOT NULL DEFAULT 0,
    "billete_cincuenta_cordobas" INTEGER NOT NULL DEFAULT 0,
    "billete_veinte_cordobas" INTEGER NOT NULL DEFAULT 0,
    "billete_diez_cordobas" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "detalle_billete_arqueo_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "arqueo_caja" ADD CONSTRAINT "arqueo_caja_id_moneda_fkey" FOREIGN KEY ("id_moneda") REFERENCES "moneda"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "detalle_monedas_arqueo" ADD CONSTRAINT "detalle_monedas_arqueo_id_arqueo_caja_fkey" FOREIGN KEY ("id_arqueo_caja") REFERENCES "arqueo_caja"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "detalle_billete_arqueo" ADD CONSTRAINT "detalle_billete_arqueo_id_arqueo_caja_fkey" FOREIGN KEY ("id_arqueo_caja") REFERENCES "arqueo_caja"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
