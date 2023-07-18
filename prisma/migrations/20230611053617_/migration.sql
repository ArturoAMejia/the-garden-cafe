-- CreateTable
CREATE TABLE "detalle_arqueo" (
    "id" SERIAL NOT NULL,
    "id_arqueo_caja" INTEGER NOT NULL,
    "id_moneda" INTEGER NOT NULL,
    "billete_cien" INTEGER NOT NULL,
    "billete_cincuenta" INTEGER NOT NULL,
    "billete_veinte" INTEGER NOT NULL,
    "billete_diez" INTEGER NOT NULL,
    "billete_cinco" INTEGER NOT NULL,
    "billete_dos" INTEGER NOT NULL,
    "billete_un" INTEGER NOT NULL,
    "moneda_un_centavo" INTEGER NOT NULL,
    "moneda_cinco_centavo" INTEGER NOT NULL,
    "moneda_diez_centavo" INTEGER NOT NULL,
    "moneda_veinticinco_centavo" INTEGER NOT NULL,
    "moneda_cincuenta_centavo" INTEGER NOT NULL,

    CONSTRAINT "detalle_arqueo_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "detalle_arqueo" ADD CONSTRAINT "detalle_arqueo_id_arqueo_caja_fkey" FOREIGN KEY ("id_arqueo_caja") REFERENCES "arqueo_caja"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "detalle_arqueo" ADD CONSTRAINT "detalle_arqueo_id_moneda_fkey" FOREIGN KEY ("id_moneda") REFERENCES "moneda"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
