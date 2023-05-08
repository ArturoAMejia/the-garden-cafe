-- CreateTable
CREATE TABLE "politica_abc" (
    "id" SERIAL NOT NULL,
    "clasificacion" TEXT NOT NULL,
    "porcentaje" DOUBLE PRECISION NOT NULL,
    "fecha_creacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "politica_abc_pkey" PRIMARY KEY ("id")
);
