/*
  Warnings:

  - A unique constraint covering the columns `[token]` on the table `usuario` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "rol_permiso" (
    "id_rol" INTEGER NOT NULL,
    "id_permiso" INTEGER NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "rol_permiso_pkey" PRIMARY KEY ("id_permiso","id_rol")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuario_token_key" ON "usuario"("token");

-- AddForeignKey
ALTER TABLE "rol_permiso" ADD CONSTRAINT "rol_permiso_id_rol_fkey" FOREIGN KEY ("id_rol") REFERENCES "rol"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rol_permiso" ADD CONSTRAINT "rol_permiso_id_permiso_fkey" FOREIGN KEY ("id_permiso") REFERENCES "permiso"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
