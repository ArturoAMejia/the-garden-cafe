/*
  Warnings:

  - You are about to drop the column `billete_cien_cordobas` on the `detalle_billete_arqueo` table. All the data in the column will be lost.
  - You are about to drop the column `billete_cincuenta_cordobas` on the `detalle_billete_arqueo` table. All the data in the column will be lost.
  - You are about to drop the column `billete_diez_cordobas` on the `detalle_billete_arqueo` table. All the data in the column will be lost.
  - You are about to drop the column `billete_doscientos_cordobas` on the `detalle_billete_arqueo` table. All the data in the column will be lost.
  - You are about to drop the column `billete_mil_cordobas` on the `detalle_billete_arqueo` table. All the data in the column will be lost.
  - You are about to drop the column `billete_quinientos_cordobas` on the `detalle_billete_arqueo` table. All the data in the column will be lost.
  - You are about to drop the column `billete_veinte_cordobas` on the `detalle_billete_arqueo` table. All the data in the column will be lost.
  - You are about to drop the column `moneda_cinco_cordobas` on the `detalle_monedas_arqueo` table. All the data in the column will be lost.
  - You are about to drop the column `moneda_cincuenta_centavo` on the `detalle_monedas_arqueo` table. All the data in the column will be lost.
  - You are about to drop the column `moneda_diez_centavo` on the `detalle_monedas_arqueo` table. All the data in the column will be lost.
  - You are about to drop the column `moneda_diez_cordobas` on the `detalle_monedas_arqueo` table. All the data in the column will be lost.
  - You are about to drop the column `moneda_un_cordoba` on the `detalle_monedas_arqueo` table. All the data in the column will be lost.
  - You are about to drop the column `moneda_veinticinco_centavo` on the `detalle_monedas_arqueo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "detalle_billete_arqueo" DROP COLUMN "billete_cien_cordobas",
DROP COLUMN "billete_cincuenta_cordobas",
DROP COLUMN "billete_diez_cordobas",
DROP COLUMN "billete_doscientos_cordobas",
DROP COLUMN "billete_mil_cordobas",
DROP COLUMN "billete_quinientos_cordobas",
DROP COLUMN "billete_veinte_cordobas",
ADD COLUMN     "cantidad" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "denominacion" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "total" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "detalle_monedas_arqueo" DROP COLUMN "moneda_cinco_cordobas",
DROP COLUMN "moneda_cincuenta_centavo",
DROP COLUMN "moneda_diez_centavo",
DROP COLUMN "moneda_diez_cordobas",
DROP COLUMN "moneda_un_cordoba",
DROP COLUMN "moneda_veinticinco_centavo",
ADD COLUMN     "cantidad" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "denominacion" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "total" DOUBLE PRECISION NOT NULL DEFAULT 0;
