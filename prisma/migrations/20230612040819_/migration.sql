/*
  Warnings:

  - You are about to drop the column `billete_cien` on the `detalle_arqueo` table. All the data in the column will be lost.
  - You are about to drop the column `billete_cinco` on the `detalle_arqueo` table. All the data in the column will be lost.
  - You are about to drop the column `billete_cincuenta` on the `detalle_arqueo` table. All the data in the column will be lost.
  - You are about to drop the column `billete_diez` on the `detalle_arqueo` table. All the data in the column will be lost.
  - You are about to drop the column `billete_dos` on the `detalle_arqueo` table. All the data in the column will be lost.
  - You are about to drop the column `billete_un` on the `detalle_arqueo` table. All the data in the column will be lost.
  - You are about to drop the column `billete_veinte` on the `detalle_arqueo` table. All the data in the column will be lost.
  - You are about to drop the column `moneda_cinco_centavo` on the `detalle_arqueo` table. All the data in the column will be lost.
  - You are about to drop the column `moneda_un_centavo` on the `detalle_arqueo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "detalle_arqueo" DROP COLUMN "billete_cien",
DROP COLUMN "billete_cinco",
DROP COLUMN "billete_cincuenta",
DROP COLUMN "billete_diez",
DROP COLUMN "billete_dos",
DROP COLUMN "billete_un",
DROP COLUMN "billete_veinte",
DROP COLUMN "moneda_cinco_centavo",
DROP COLUMN "moneda_un_centavo",
ADD COLUMN     "billete_cien_cordobas" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "billete_cincuenta_cordobas" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "billete_diez_cordobas" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "billete_doscientos_cordobas" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "billete_mil_cordobas" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "billete_quinientos_cordobas" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "billete_veinte_cordobas" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "moneda_cinco_cordobas" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "moneda_diez_cordobas" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "moneda_un_cordoba" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "id_moneda" SET DEFAULT 0,
ALTER COLUMN "moneda_diez_centavo" SET DEFAULT 0,
ALTER COLUMN "moneda_veinticinco_centavo" SET DEFAULT 0,
ALTER COLUMN "moneda_cincuenta_centavo" SET DEFAULT 0;
