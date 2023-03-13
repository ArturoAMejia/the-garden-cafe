-- CreateTable
CREATE TABLE "categoria_estado" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "categoria_estado_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cat_estado" (
    "id" SERIAL NOT NULL,
    "id_categoria_estado" INTEGER NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,

    CONSTRAINT "cat_estado_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categoria_impuesto" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "categoria_impuesto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cat_impuesto" (
    "id" SERIAL NOT NULL,
    "id_categoria_impuesto" INTEGER NOT NULL,
    "id_estado" INTEGER NOT NULL,
    "porcentaje" DOUBLE PRECISION NOT NULL,
    "descripcion" TEXT NOT NULL,

    CONSTRAINT "cat_impuesto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "persona" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido_razon_social" TEXT NOT NULL,
    "cedula_ruc" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "direccion_domicilio" TEXT NOT NULL,
    "correo" TEXT NOT NULL,
    "genero" TEXT NOT NULL,
    "fecha_nacimiento_constitucion" TIMESTAMP(3) NOT NULL,
    "fecha_registro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tipo_persona" TEXT NOT NULL DEFAULT 'Natural',

    CONSTRAINT "persona_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cliente" (
    "id" SERIAL NOT NULL,
    "id_persona" INTEGER NOT NULL,
    "id_estado" INTEGER NOT NULL,
    "tipo_cliente" TEXT NOT NULL,

    CONSTRAINT "cliente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "proveedor" (
    "id" SERIAL NOT NULL,
    "id_persona" INTEGER NOT NULL,
    "id_estado" INTEGER NOT NULL,
    "sector_comercial" TEXT NOT NULL,
    "nacionalidad" TEXT NOT NULL,

    CONSTRAINT "proveedor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contacto_proveedor" (
    "id" SERIAL NOT NULL,
    "id_proveedor" INTEGER NOT NULL,
    "telefono" TEXT NOT NULL,
    "celular" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,

    CONSTRAINT "contacto_proveedor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cat_estado_civil" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "cat_estado_civil_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "trabajador" (
    "id" SERIAL NOT NULL,
    "id_persona" INTEGER NOT NULL,
    "id_estado_civil" INTEGER NOT NULL,
    "id_estado" INTEGER NOT NULL,
    "codigo_inss" TEXT NOT NULL,
    "fecha_ingreso" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "trabajador_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cat_cargo" (
    "id" SERIAL NOT NULL,
    "id_estado" INTEGER NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "salario" DOUBLE PRECISION NOT NULL,
    "vigencia" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cat_cargo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "historial_cargo_trabajador" (
    "id" SERIAL NOT NULL,
    "id_trabajador" INTEGER NOT NULL,
    "id_cargo" INTEGER NOT NULL,
    "id_estado" INTEGER NOT NULL,
    "motivo" TEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "historial_cargo_trabajador_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comprobante" (
    "id" SERIAL NOT NULL,
    "id_estado" INTEGER NOT NULL,
    "descripcion" TEXT NOT NULL,
    "numeracion" TEXT NOT NULL,
    "serie" TEXT NOT NULL,
    "fecha_ingreso" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "comprobante_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cat_forma_pago" (
    "id" SERIAL NOT NULL,
    "id_estado" INTEGER NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,

    CONSTRAINT "cat_forma_pago_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "moneda" (
    "id" SERIAL NOT NULL,
    "origen" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "simbolo" TEXT NOT NULL,

    CONSTRAINT "moneda_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tipo_cambio" (
    "id" SERIAL NOT NULL,
    "id_moneda" INTEGER NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "valor_cambio" DOUBLE PRECISION NOT NULL,
    "fecha_registro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tipo_cambio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tipo_producto" (
    "id" SERIAL NOT NULL,
    "id_estado" INTEGER NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "tipo_producto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tipo_categoria" (
    "id" SERIAL NOT NULL,
    "id_estado" INTEGER NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "tipo_categoria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categoria_producto" (
    "id" SERIAL NOT NULL,
    "id_estado" INTEGER NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,

    CONSTRAINT "categoria_producto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sub_categoria_producto" (
    "id" SERIAL NOT NULL,
    "id_categoria_producto" INTEGER NOT NULL,
    "id_estado" INTEGER NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "sub_categoria_producto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "marca" (
    "id" SERIAL NOT NULL,
    "id_estado" INTEGER NOT NULL,
    "nombre" TEXT NOT NULL,
    "siglas" TEXT NOT NULL,

    CONSTRAINT "marca_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "unidad_medida" (
    "id" SERIAL NOT NULL,
    "id_estado" INTEGER NOT NULL,
    "nombre" TEXT NOT NULL,
    "siglas" TEXT NOT NULL,

    CONSTRAINT "unidad_medida_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "zona_preparacion" (
    "id" SERIAL NOT NULL,
    "id_estado" INTEGER NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "zona_preparacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "equivalencia" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "siglas" TEXT NOT NULL,
    "id_unidad_medida" INTEGER NOT NULL,

    CONSTRAINT "equivalencia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "producto" (
    "id" SERIAL NOT NULL,
    "id_estado" INTEGER NOT NULL,
    "id_marca" INTEGER NOT NULL,
    "id_categoria_producto" INTEGER NOT NULL,
    "id_sub_categoria_producto" INTEGER NOT NULL,
    "id_tipo_producto" INTEGER NOT NULL,
    "id_unidad_medida" INTEGER NOT NULL,
    "id_proveedor" INTEGER NOT NULL DEFAULT 1,
    "cod_producto" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "imagen" TEXT NOT NULL DEFAULT '',
    "fecha_ingreso" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "producto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "coste_producto" (
    "id" SERIAL NOT NULL,
    "id_producto" INTEGER NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "costo" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "coste_producto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "producto_elaborado" (
    "id" SERIAL NOT NULL,
    "id_estado" INTEGER NOT NULL,
    "id_categoria_producto" INTEGER NOT NULL,
    "id_sub_categoria_producto" INTEGER NOT NULL,
    "id_zona_preparacion" INTEGER NOT NULL,
    "id_unidad_medida" INTEGER NOT NULL,
    "cod_producto" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "imagen" TEXT NOT NULL DEFAULT '',
    "precio_producto" DOUBLE PRECISION NOT NULL,
    "fecha_ingreso" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "producto_elaborado_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "detalle_producto_elaborado" (
    "id_producto" INTEGER NOT NULL,
    "id_producto_elaborado" INTEGER NOT NULL,
    "id_estado" INTEGER NOT NULL,
    "cantidad" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "detalle_producto_elaborado_pkey" PRIMARY KEY ("id_producto","id_producto_elaborado")
);

-- CreateTable
CREATE TABLE "precio_producto" (
    "id" SERIAL NOT NULL,
    "id_producto" INTEGER NOT NULL,
    "id_estado" INTEGER NOT NULL,
    "fecha_precio" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "gasto" DOUBLE PRECISION NOT NULL,
    "precio_compra" DOUBLE PRECISION NOT NULL,
    "margen_ganancia" DOUBLE PRECISION NOT NULL,
    "precio_venta" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "precio_producto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "coste_producto_elaborado" (
    "id" SERIAL NOT NULL,
    "id_producto_elaborado" INTEGER NOT NULL,
    "coste" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "coste_producto_elaborado_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "caducidad" (
    "id" SERIAL NOT NULL,
    "id_producto" INTEGER NOT NULL,
    "id_estado" INTEGER NOT NULL,
    "fecha_entrada" TIMESTAMP(3) NOT NULL,
    "fecha_caducidad" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "caducidad_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lote_producto" (
    "id" SERIAL NOT NULL,
    "id_producto" INTEGER NOT NULL,
    "id_estado" INTEGER NOT NULL,
    "id_caducidad" INTEGER NOT NULL,
    "existencia" INTEGER NOT NULL,
    "fecha_entrada" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "lote_producto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "solicitud_compra" (
    "id" SERIAL NOT NULL,
    "id_estado" INTEGER NOT NULL,
    "id_trabajador" INTEGER NOT NULL,
    "id_comprobante" INTEGER NOT NULL,
    "motivo" TEXT NOT NULL,
    "descuento" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "impuesto" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "subtotal" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "total" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "fecha_solicitud" TIMESTAMP(3) NOT NULL,
    "fecha_vigencia" TIMESTAMP(3) NOT NULL,
    "cantidad" INTEGER NOT NULL,

    CONSTRAINT "solicitud_compra_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "detalle_solicitud_compra" (
    "id_producto" INTEGER NOT NULL,
    "id_solicitud_compra" INTEGER NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "precio_unitario" DOUBLE PRECISION NOT NULL,
    "monto" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "detalle_solicitud_compra_pkey" PRIMARY KEY ("id_producto","id_solicitud_compra")
);

-- CreateTable
CREATE TABLE "tipo_orden_compra" (
    "id" SERIAL NOT NULL,
    "id_estado" INTEGER NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "tipo_orden_compra_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orden_compra" (
    "id" SERIAL NOT NULL,
    "id_proveedor" INTEGER NOT NULL,
    "id_tipo_orden_compra" INTEGER NOT NULL,
    "id_comprobante" INTEGER NOT NULL,
    "id_estado" INTEGER NOT NULL,
    "id_solicitud_compra" INTEGER NOT NULL,
    "autorizado_por" INTEGER NOT NULL,
    "num_orden" SERIAL NOT NULL,
    "subtotal" DOUBLE PRECISION NOT NULL,
    "descuento" DOUBLE PRECISION NOT NULL,
    "impuesto" DOUBLE PRECISION NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "fecha_orden" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "orden_compra_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "detalle_orden_compra" (
    "id_producto" INTEGER NOT NULL,
    "id_orden_compra" INTEGER NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "precio_unitario" DOUBLE PRECISION NOT NULL,
    "monto" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "detalle_orden_compra_pkey" PRIMARY KEY ("id_producto","id_orden_compra")
);

-- CreateTable
CREATE TABLE "compra" (
    "id" SERIAL NOT NULL,
    "id_proveedor" INTEGER NOT NULL,
    "id_trabajador" INTEGER NOT NULL,
    "id_orden_compra" INTEGER NOT NULL,
    "id_comprobante" INTEGER NOT NULL,
    "id_estado" INTEGER NOT NULL,
    "fecha_compra" TIMESTAMP(3) NOT NULL,
    "descripcion" TEXT NOT NULL,
    "descuento" DOUBLE PRECISION NOT NULL,
    "subtotal" DOUBLE PRECISION NOT NULL,
    "impuesto" DOUBLE PRECISION NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "compra_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "detalle_compra" (
    "id_compra" INTEGER NOT NULL,
    "id_producto" INTEGER NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "precio" DOUBLE PRECISION NOT NULL,
    "monto" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "detalle_compra_pkey" PRIMARY KEY ("id_compra","id_producto")
);

-- CreateTable
CREATE TABLE "recepcion_compra" (
    "id" SERIAL NOT NULL,
    "id_compra" INTEGER NOT NULL,
    "id_trabajador" INTEGER NOT NULL,
    "id_estado" INTEGER NOT NULL,
    "descripcion" TEXT NOT NULL,
    "fecha_recepcion" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "recepcion_compra_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "devolucion_compra" (
    "id" SERIAL NOT NULL,
    "id_compra" INTEGER NOT NULL,
    "id_proveedor" INTEGER NOT NULL,
    "id_trabajador" INTEGER NOT NULL,
    "motivo" TEXT NOT NULL,
    "fecha_devolucion" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "devolucion_compra_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pedido" (
    "id" SERIAL NOT NULL,
    "id_cliente" INTEGER NOT NULL,
    "id_trabajador" INTEGER NOT NULL,
    "id_estado" INTEGER NOT NULL,
    "tipo_pedido" TEXT NOT NULL,
    "fecha_pedido" TIMESTAMP(3) NOT NULL,
    "ubicacion_entrega" TEXT NOT NULL,
    "observacion" TEXT NOT NULL,
    "vigencia" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pedido_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "detalle_pedido" (
    "id_pedido" INTEGER NOT NULL,
    "id_producto" INTEGER NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "precio" DOUBLE PRECISION NOT NULL,
    "monto" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "detalle_pedido_pkey" PRIMARY KEY ("id_pedido","id_producto")
);

-- CreateTable
CREATE TABLE "reservacion" (
    "id" SERIAL NOT NULL,
    "id_cliente" INTEGER NOT NULL,
    "id_estado" INTEGER NOT NULL,
    "tipo_reservacion" TEXT NOT NULL,
    "fecha_reservacion" TIMESTAMP(3) NOT NULL,
    "horas_reservadas" INTEGER NOT NULL,
    "fecha_registro" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "reservacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "detalle_reservacion" (
    "id" SERIAL NOT NULL,
    "id_reservacion" INTEGER NOT NULL,
    "total_personas" INTEGER NOT NULL,
    "observaciones" TEXT NOT NULL,

    CONSTRAINT "detalle_reservacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "venta" (
    "id" SERIAL NOT NULL,
    "id_cliente" INTEGER NOT NULL,
    "id_trabajador" INTEGER NOT NULL,
    "id_pedido" INTEGER NOT NULL,
    "id_comprobante" INTEGER NOT NULL,
    "id_moneda" INTEGER NOT NULL,
    "id_cat_forma_pago" INTEGER NOT NULL,
    "id_estado" INTEGER NOT NULL,
    "tipo_venta" TEXT NOT NULL,
    "fecha_venta" TIMESTAMP(3) NOT NULL,
    "subtotal" DOUBLE PRECISION NOT NULL,
    "descuento" DOUBLE PRECISION NOT NULL,
    "impuesto" DOUBLE PRECISION NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "venta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "detalle_venta" (
    "id_venta" INTEGER NOT NULL,
    "id_producto" INTEGER NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "precio" DOUBLE PRECISION NOT NULL,
    "monto" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "detalle_venta_pkey" PRIMARY KEY ("id_venta","id_producto")
);

-- CreateTable
CREATE TABLE "tipo_bodega" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "tipo_bodega_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bodega" (
    "id" SERIAL NOT NULL,
    "id_tipo_bodega" INTEGER NOT NULL,
    "id_estado" INTEGER NOT NULL,
    "ubicacion" TEXT NOT NULL,
    "existencia" INTEGER NOT NULL,

    CONSTRAINT "bodega_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ubicacion_en_bodega" (
    "id" SERIAL NOT NULL,
    "id_bodega" INTEGER NOT NULL,
    "nombre_pasillo" TEXT NOT NULL,
    "numero_pasillo" INTEGER NOT NULL,
    "numero_estante_vitrina" INTEGER NOT NULL,

    CONSTRAINT "ubicacion_en_bodega_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "trans_inventario" (
    "id" SERIAL NOT NULL,
    "id_producto" INTEGER NOT NULL,
    "fecha_movimiento" TIMESTAMP(3) NOT NULL,
    "cod_documento" TEXT NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "tipo_movimiento" TEXT NOT NULL,

    CONSTRAINT "trans_inventario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inventario" (
    "id" SERIAL NOT NULL,
    "id_producto" INTEGER NOT NULL,
    "stock_min" INTEGER NOT NULL,
    "stock_max" INTEGER NOT NULL,
    "stock_actual" INTEGER NOT NULL,

    CONSTRAINT "inventario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "detalle_inventario" (
    "id_inventario" INTEGER NOT NULL,
    "id_producto" INTEGER NOT NULL,
    "stock_minimo" INTEGER NOT NULL,
    "stock_maximo" INTEGER NOT NULL,
    "existencia" INTEGER NOT NULL,

    CONSTRAINT "detalle_inventario_pkey" PRIMARY KEY ("id_inventario","id_producto")
);

-- CreateTable
CREATE TABLE "entrega_pedido" (
    "id" SERIAL NOT NULL,
    "id_trabajador" INTEGER NOT NULL,
    "id_venta" INTEGER NOT NULL,
    "id_estado" INTEGER NOT NULL,
    "fecha_entrega" TIMESTAMP(3) NOT NULL,
    "tiempo_estimado" INTEGER NOT NULL,
    "lugar_entrega" TEXT NOT NULL,
    "monto_delivery" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "entrega_pedido_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "detalle_entrega" (
    "id" SERIAL NOT NULL,
    "id_entrega_pedido" INTEGER NOT NULL,
    "id_producto" INTEGER NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "precio" DOUBLE PRECISION NOT NULL,
    "monto" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "detalle_entrega_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "caja" (
    "id" SERIAL NOT NULL,
    "id_trabajador" INTEGER NOT NULL,
    "id_estado" INTEGER NOT NULL,
    "tipo_caja" TEXT NOT NULL,
    "fecha_registro" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "caja_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "apertura_caja" (
    "id" SERIAL NOT NULL,
    "id_caja" INTEGER NOT NULL,
    "id_trabajador" INTEGER NOT NULL,
    "id_estado" INTEGER NOT NULL,
    "id_moneda" INTEGER NOT NULL,
    "fecha_apertura" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "apertura_caja_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "detalle_apertura_caja" (
    "id" SERIAL NOT NULL,
    "id_apertura_caja" INTEGER NOT NULL,
    "monto_cordobas" DOUBLE PRECISION NOT NULL,
    "monto_dolares" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "detalle_apertura_caja_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "movimiento_caja" (
    "id" SERIAL NOT NULL,
    "id_caja" INTEGER NOT NULL,
    "id_trabajador" INTEGER NOT NULL,
    "id_moneda" INTEGER NOT NULL,
    "num_movimiento" TEXT NOT NULL,
    "fecha_movimiento" TIMESTAMP(3) NOT NULL,
    "concepto" TEXT NOT NULL,
    "monto" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "movimiento_caja_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "arqueo_caja" (
    "id" SERIAL NOT NULL,
    "id_caja" INTEGER NOT NULL,
    "id_trabajador" INTEGER NOT NULL,
    "fecha_arqueo" TIMESTAMP(3) NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "arqueo_caja_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cierre_caja" (
    "id" SERIAL NOT NULL,
    "id_caja" INTEGER NOT NULL,
    "id_trabajador" INTEGER NOT NULL,
    "id_estado" INTEGER NOT NULL,
    "fecha_cierre" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "total" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "cierre_caja_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "grupo_usuario" (
    "id" SERIAL NOT NULL,
    "id_estado" INTEGER NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,

    CONSTRAINT "grupo_usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sub_grupo_usuario" (
    "id" SERIAL NOT NULL,
    "id_estado" INTEGER NOT NULL,
    "id_grupo_usuario" INTEGER NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,

    CONSTRAINT "sub_grupo_usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "perfil" (
    "id" SERIAL NOT NULL,
    "id_grupo_usuario" INTEGER NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,

    CONSTRAINT "perfil_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usuario" (
    "id" SERIAL NOT NULL,
    "id_perfil" INTEGER NOT NULL,
    "id_estado" INTEGER NOT NULL,
    "id_persona" INTEGER NOT NULL,
    "usuario" TEXT NOT NULL,
    "correo" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "id_rol" INTEGER NOT NULL DEFAULT 6,
    "fecha_registro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "historial_password_usuario" (
    "id" SERIAL NOT NULL,
    "id_usuario" INTEGER NOT NULL,
    "password_antigua" TEXT NOT NULL,
    "fecha_registro" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "historial_password_usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rol" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "id_estado" INTEGER NOT NULL,

    CONSTRAINT "rol_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "modulo" (
    "id" SERIAL NOT NULL,
    "id_estado" INTEGER NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "icono" TEXT NOT NULL DEFAULT '',
    "fecha_registro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "modulo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sub_modulo" (
    "id" SERIAL NOT NULL,
    "id_modulo" INTEGER NOT NULL,
    "nombre" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "sub_modulo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rol_modulo" (
    "id_rol" INTEGER NOT NULL,
    "id_modulo" INTEGER NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "rol_modulo_pkey" PRIMARY KEY ("id_modulo","id_rol")
);

-- CreateTable
CREATE TABLE "permiso" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,

    CONSTRAINT "permiso_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "privilegio_usuario" (
    "id" SERIAL NOT NULL,
    "id_perfil" INTEGER NOT NULL,
    "id_rol_modulo" INTEGER NOT NULL,
    "id_trabajador" INTEGER NOT NULL,

    CONSTRAINT "privilegio_usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "conexion" (
    "id" SERIAL NOT NULL,
    "id_usuario" INTEGER NOT NULL,
    "id_estado" INTEGER NOT NULL,
    "num_conexion" INTEGER NOT NULL,
    "ip" TEXT NOT NULL,
    "mac" TEXT NOT NULL,

    CONSTRAINT "conexion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "historial_sesion" (
    "id" SERIAL NOT NULL,
    "id_usuario" INTEGER NOT NULL,
    "id_estado" INTEGER NOT NULL,
    "fecha_ingreso" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "historial_sesion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "historial_permiso_usuario" (
    "id_usuario" INTEGER NOT NULL,
    "id_permiso" INTEGER NOT NULL,
    "fecha_registro" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "historial_permiso_usuario_pkey" PRIMARY KEY ("id_usuario","id_permiso")
);

-- CreateIndex
CREATE UNIQUE INDEX "persona_cedula_ruc_key" ON "persona"("cedula_ruc");

-- CreateIndex
CREATE UNIQUE INDEX "trabajador_id_persona_key" ON "trabajador"("id_persona");

-- CreateIndex
CREATE UNIQUE INDEX "trans_inventario_cod_documento_key" ON "trans_inventario"("cod_documento");

-- CreateIndex
CREATE UNIQUE INDEX "inventario_id_producto_key" ON "inventario"("id_producto");

-- CreateIndex
CREATE UNIQUE INDEX "detalle_apertura_caja_id_apertura_caja_key" ON "detalle_apertura_caja"("id_apertura_caja");

-- CreateIndex
CREATE UNIQUE INDEX "usuario_id_persona_key" ON "usuario"("id_persona");

-- CreateIndex
CREATE UNIQUE INDEX "usuario_usuario_key" ON "usuario"("usuario");

-- CreateIndex
CREATE UNIQUE INDEX "usuario_correo_key" ON "usuario"("correo");

-- AddForeignKey
ALTER TABLE "cat_estado" ADD CONSTRAINT "cat_estado_id_categoria_estado_fkey" FOREIGN KEY ("id_categoria_estado") REFERENCES "categoria_estado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cat_impuesto" ADD CONSTRAINT "cat_impuesto_id_categoria_impuesto_fkey" FOREIGN KEY ("id_categoria_impuesto") REFERENCES "categoria_impuesto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cat_impuesto" ADD CONSTRAINT "cat_impuesto_id_estado_fkey" FOREIGN KEY ("id_estado") REFERENCES "cat_estado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cliente" ADD CONSTRAINT "cliente_id_persona_fkey" FOREIGN KEY ("id_persona") REFERENCES "persona"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cliente" ADD CONSTRAINT "cliente_id_estado_fkey" FOREIGN KEY ("id_estado") REFERENCES "cat_estado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "proveedor" ADD CONSTRAINT "proveedor_id_persona_fkey" FOREIGN KEY ("id_persona") REFERENCES "persona"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "proveedor" ADD CONSTRAINT "proveedor_id_estado_fkey" FOREIGN KEY ("id_estado") REFERENCES "cat_estado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "contacto_proveedor" ADD CONSTRAINT "contacto_proveedor_id_proveedor_fkey" FOREIGN KEY ("id_proveedor") REFERENCES "proveedor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trabajador" ADD CONSTRAINT "trabajador_id_persona_fkey" FOREIGN KEY ("id_persona") REFERENCES "persona"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trabajador" ADD CONSTRAINT "trabajador_id_estado_civil_fkey" FOREIGN KEY ("id_estado_civil") REFERENCES "cat_estado_civil"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trabajador" ADD CONSTRAINT "trabajador_id_estado_fkey" FOREIGN KEY ("id_estado") REFERENCES "cat_estado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cat_cargo" ADD CONSTRAINT "cat_cargo_id_estado_fkey" FOREIGN KEY ("id_estado") REFERENCES "cat_estado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "historial_cargo_trabajador" ADD CONSTRAINT "historial_cargo_trabajador_id_trabajador_fkey" FOREIGN KEY ("id_trabajador") REFERENCES "trabajador"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "historial_cargo_trabajador" ADD CONSTRAINT "historial_cargo_trabajador_id_cargo_fkey" FOREIGN KEY ("id_cargo") REFERENCES "cat_cargo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "historial_cargo_trabajador" ADD CONSTRAINT "historial_cargo_trabajador_id_estado_fkey" FOREIGN KEY ("id_estado") REFERENCES "cat_estado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comprobante" ADD CONSTRAINT "comprobante_id_estado_fkey" FOREIGN KEY ("id_estado") REFERENCES "cat_estado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cat_forma_pago" ADD CONSTRAINT "cat_forma_pago_id_estado_fkey" FOREIGN KEY ("id_estado") REFERENCES "cat_estado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tipo_cambio" ADD CONSTRAINT "tipo_cambio_id_moneda_fkey" FOREIGN KEY ("id_moneda") REFERENCES "moneda"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tipo_producto" ADD CONSTRAINT "tipo_producto_id_estado_fkey" FOREIGN KEY ("id_estado") REFERENCES "cat_estado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tipo_categoria" ADD CONSTRAINT "tipo_categoria_id_estado_fkey" FOREIGN KEY ("id_estado") REFERENCES "cat_estado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categoria_producto" ADD CONSTRAINT "categoria_producto_id_estado_fkey" FOREIGN KEY ("id_estado") REFERENCES "cat_estado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sub_categoria_producto" ADD CONSTRAINT "sub_categoria_producto_id_categoria_producto_fkey" FOREIGN KEY ("id_categoria_producto") REFERENCES "categoria_producto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sub_categoria_producto" ADD CONSTRAINT "sub_categoria_producto_id_estado_fkey" FOREIGN KEY ("id_estado") REFERENCES "cat_estado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "marca" ADD CONSTRAINT "marca_id_estado_fkey" FOREIGN KEY ("id_estado") REFERENCES "cat_estado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "unidad_medida" ADD CONSTRAINT "unidad_medida_id_estado_fkey" FOREIGN KEY ("id_estado") REFERENCES "cat_estado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "zona_preparacion" ADD CONSTRAINT "zona_preparacion_id_estado_fkey" FOREIGN KEY ("id_estado") REFERENCES "cat_estado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "equivalencia" ADD CONSTRAINT "equivalencia_id_unidad_medida_fkey" FOREIGN KEY ("id_unidad_medida") REFERENCES "unidad_medida"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "producto" ADD CONSTRAINT "producto_id_estado_fkey" FOREIGN KEY ("id_estado") REFERENCES "cat_estado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "producto" ADD CONSTRAINT "producto_id_marca_fkey" FOREIGN KEY ("id_marca") REFERENCES "marca"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "producto" ADD CONSTRAINT "producto_id_categoria_producto_fkey" FOREIGN KEY ("id_categoria_producto") REFERENCES "categoria_producto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "producto" ADD CONSTRAINT "producto_id_sub_categoria_producto_fkey" FOREIGN KEY ("id_sub_categoria_producto") REFERENCES "sub_categoria_producto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "producto" ADD CONSTRAINT "producto_id_tipo_producto_fkey" FOREIGN KEY ("id_tipo_producto") REFERENCES "tipo_producto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "producto" ADD CONSTRAINT "producto_id_unidad_medida_fkey" FOREIGN KEY ("id_unidad_medida") REFERENCES "unidad_medida"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "producto" ADD CONSTRAINT "producto_id_proveedor_fkey" FOREIGN KEY ("id_proveedor") REFERENCES "proveedor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coste_producto" ADD CONSTRAINT "coste_producto_id_producto_fkey" FOREIGN KEY ("id_producto") REFERENCES "producto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "producto_elaborado" ADD CONSTRAINT "producto_elaborado_id_estado_fkey" FOREIGN KEY ("id_estado") REFERENCES "cat_estado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "producto_elaborado" ADD CONSTRAINT "producto_elaborado_id_categoria_producto_fkey" FOREIGN KEY ("id_categoria_producto") REFERENCES "categoria_producto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "producto_elaborado" ADD CONSTRAINT "producto_elaborado_id_sub_categoria_producto_fkey" FOREIGN KEY ("id_sub_categoria_producto") REFERENCES "sub_categoria_producto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "producto_elaborado" ADD CONSTRAINT "producto_elaborado_id_zona_preparacion_fkey" FOREIGN KEY ("id_zona_preparacion") REFERENCES "zona_preparacion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "producto_elaborado" ADD CONSTRAINT "producto_elaborado_id_unidad_medida_fkey" FOREIGN KEY ("id_unidad_medida") REFERENCES "unidad_medida"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "detalle_producto_elaborado" ADD CONSTRAINT "detalle_producto_elaborado_id_producto_fkey" FOREIGN KEY ("id_producto") REFERENCES "producto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "detalle_producto_elaborado" ADD CONSTRAINT "detalle_producto_elaborado_id_producto_elaborado_fkey" FOREIGN KEY ("id_producto_elaborado") REFERENCES "producto_elaborado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "detalle_producto_elaborado" ADD CONSTRAINT "detalle_producto_elaborado_id_estado_fkey" FOREIGN KEY ("id_estado") REFERENCES "cat_estado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "precio_producto" ADD CONSTRAINT "precio_producto_id_producto_fkey" FOREIGN KEY ("id_producto") REFERENCES "producto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "precio_producto" ADD CONSTRAINT "precio_producto_id_estado_fkey" FOREIGN KEY ("id_estado") REFERENCES "cat_estado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coste_producto_elaborado" ADD CONSTRAINT "coste_producto_elaborado_id_producto_elaborado_fkey" FOREIGN KEY ("id_producto_elaborado") REFERENCES "producto_elaborado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "caducidad" ADD CONSTRAINT "caducidad_id_producto_fkey" FOREIGN KEY ("id_producto") REFERENCES "producto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "caducidad" ADD CONSTRAINT "caducidad_id_estado_fkey" FOREIGN KEY ("id_estado") REFERENCES "cat_estado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lote_producto" ADD CONSTRAINT "lote_producto_id_producto_fkey" FOREIGN KEY ("id_producto") REFERENCES "producto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lote_producto" ADD CONSTRAINT "lote_producto_id_estado_fkey" FOREIGN KEY ("id_estado") REFERENCES "cat_estado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lote_producto" ADD CONSTRAINT "lote_producto_id_caducidad_fkey" FOREIGN KEY ("id_caducidad") REFERENCES "caducidad"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "solicitud_compra" ADD CONSTRAINT "solicitud_compra_id_estado_fkey" FOREIGN KEY ("id_estado") REFERENCES "cat_estado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "solicitud_compra" ADD CONSTRAINT "solicitud_compra_id_trabajador_fkey" FOREIGN KEY ("id_trabajador") REFERENCES "trabajador"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "solicitud_compra" ADD CONSTRAINT "solicitud_compra_id_comprobante_fkey" FOREIGN KEY ("id_comprobante") REFERENCES "comprobante"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "detalle_solicitud_compra" ADD CONSTRAINT "detalle_solicitud_compra_id_producto_fkey" FOREIGN KEY ("id_producto") REFERENCES "producto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "detalle_solicitud_compra" ADD CONSTRAINT "detalle_solicitud_compra_id_solicitud_compra_fkey" FOREIGN KEY ("id_solicitud_compra") REFERENCES "solicitud_compra"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tipo_orden_compra" ADD CONSTRAINT "tipo_orden_compra_id_estado_fkey" FOREIGN KEY ("id_estado") REFERENCES "cat_estado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orden_compra" ADD CONSTRAINT "orden_compra_id_proveedor_fkey" FOREIGN KEY ("id_proveedor") REFERENCES "proveedor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orden_compra" ADD CONSTRAINT "orden_compra_id_tipo_orden_compra_fkey" FOREIGN KEY ("id_tipo_orden_compra") REFERENCES "tipo_orden_compra"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orden_compra" ADD CONSTRAINT "orden_compra_id_comprobante_fkey" FOREIGN KEY ("id_comprobante") REFERENCES "comprobante"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orden_compra" ADD CONSTRAINT "orden_compra_id_estado_fkey" FOREIGN KEY ("id_estado") REFERENCES "cat_estado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orden_compra" ADD CONSTRAINT "orden_compra_id_solicitud_compra_fkey" FOREIGN KEY ("id_solicitud_compra") REFERENCES "solicitud_compra"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orden_compra" ADD CONSTRAINT "orden_compra_autorizado_por_fkey" FOREIGN KEY ("autorizado_por") REFERENCES "trabajador"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "detalle_orden_compra" ADD CONSTRAINT "detalle_orden_compra_id_producto_fkey" FOREIGN KEY ("id_producto") REFERENCES "producto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "detalle_orden_compra" ADD CONSTRAINT "detalle_orden_compra_id_orden_compra_fkey" FOREIGN KEY ("id_orden_compra") REFERENCES "orden_compra"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "compra" ADD CONSTRAINT "compra_id_proveedor_fkey" FOREIGN KEY ("id_proveedor") REFERENCES "proveedor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "compra" ADD CONSTRAINT "compra_id_trabajador_fkey" FOREIGN KEY ("id_trabajador") REFERENCES "trabajador"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "compra" ADD CONSTRAINT "compra_id_orden_compra_fkey" FOREIGN KEY ("id_orden_compra") REFERENCES "orden_compra"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "compra" ADD CONSTRAINT "compra_id_comprobante_fkey" FOREIGN KEY ("id_comprobante") REFERENCES "comprobante"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "compra" ADD CONSTRAINT "compra_id_estado_fkey" FOREIGN KEY ("id_estado") REFERENCES "cat_estado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "detalle_compra" ADD CONSTRAINT "detalle_compra_id_compra_fkey" FOREIGN KEY ("id_compra") REFERENCES "compra"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "detalle_compra" ADD CONSTRAINT "detalle_compra_id_producto_fkey" FOREIGN KEY ("id_producto") REFERENCES "producto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recepcion_compra" ADD CONSTRAINT "recepcion_compra_id_compra_fkey" FOREIGN KEY ("id_compra") REFERENCES "compra"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recepcion_compra" ADD CONSTRAINT "recepcion_compra_id_trabajador_fkey" FOREIGN KEY ("id_trabajador") REFERENCES "trabajador"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recepcion_compra" ADD CONSTRAINT "recepcion_compra_id_estado_fkey" FOREIGN KEY ("id_estado") REFERENCES "cat_estado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "devolucion_compra" ADD CONSTRAINT "devolucion_compra_id_compra_fkey" FOREIGN KEY ("id_compra") REFERENCES "compra"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "devolucion_compra" ADD CONSTRAINT "devolucion_compra_id_proveedor_fkey" FOREIGN KEY ("id_proveedor") REFERENCES "proveedor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "devolucion_compra" ADD CONSTRAINT "devolucion_compra_id_trabajador_fkey" FOREIGN KEY ("id_trabajador") REFERENCES "trabajador"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pedido" ADD CONSTRAINT "pedido_id_cliente_fkey" FOREIGN KEY ("id_cliente") REFERENCES "cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pedido" ADD CONSTRAINT "pedido_id_trabajador_fkey" FOREIGN KEY ("id_trabajador") REFERENCES "trabajador"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pedido" ADD CONSTRAINT "pedido_id_estado_fkey" FOREIGN KEY ("id_estado") REFERENCES "cat_estado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "detalle_pedido" ADD CONSTRAINT "detalle_pedido_id_pedido_fkey" FOREIGN KEY ("id_pedido") REFERENCES "pedido"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "detalle_pedido" ADD CONSTRAINT "detalle_pedido_id_producto_fkey" FOREIGN KEY ("id_producto") REFERENCES "producto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reservacion" ADD CONSTRAINT "reservacion_id_cliente_fkey" FOREIGN KEY ("id_cliente") REFERENCES "cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reservacion" ADD CONSTRAINT "reservacion_id_estado_fkey" FOREIGN KEY ("id_estado") REFERENCES "cat_estado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "detalle_reservacion" ADD CONSTRAINT "detalle_reservacion_id_reservacion_fkey" FOREIGN KEY ("id_reservacion") REFERENCES "reservacion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "venta" ADD CONSTRAINT "venta_id_cliente_fkey" FOREIGN KEY ("id_cliente") REFERENCES "cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "venta" ADD CONSTRAINT "venta_id_trabajador_fkey" FOREIGN KEY ("id_trabajador") REFERENCES "trabajador"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "venta" ADD CONSTRAINT "venta_id_pedido_fkey" FOREIGN KEY ("id_pedido") REFERENCES "pedido"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "venta" ADD CONSTRAINT "venta_id_comprobante_fkey" FOREIGN KEY ("id_comprobante") REFERENCES "comprobante"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "venta" ADD CONSTRAINT "venta_id_moneda_fkey" FOREIGN KEY ("id_moneda") REFERENCES "moneda"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "venta" ADD CONSTRAINT "venta_id_cat_forma_pago_fkey" FOREIGN KEY ("id_cat_forma_pago") REFERENCES "cat_forma_pago"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "venta" ADD CONSTRAINT "venta_id_estado_fkey" FOREIGN KEY ("id_estado") REFERENCES "cat_estado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "detalle_venta" ADD CONSTRAINT "detalle_venta_id_venta_fkey" FOREIGN KEY ("id_venta") REFERENCES "venta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "detalle_venta" ADD CONSTRAINT "detalle_venta_id_producto_fkey" FOREIGN KEY ("id_producto") REFERENCES "producto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bodega" ADD CONSTRAINT "bodega_id_tipo_bodega_fkey" FOREIGN KEY ("id_tipo_bodega") REFERENCES "tipo_bodega"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bodega" ADD CONSTRAINT "bodega_id_estado_fkey" FOREIGN KEY ("id_estado") REFERENCES "cat_estado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ubicacion_en_bodega" ADD CONSTRAINT "ubicacion_en_bodega_id_bodega_fkey" FOREIGN KEY ("id_bodega") REFERENCES "bodega"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trans_inventario" ADD CONSTRAINT "trans_inventario_id_producto_fkey" FOREIGN KEY ("id_producto") REFERENCES "producto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inventario" ADD CONSTRAINT "inventario_id_producto_fkey" FOREIGN KEY ("id_producto") REFERENCES "producto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "detalle_inventario" ADD CONSTRAINT "detalle_inventario_id_inventario_fkey" FOREIGN KEY ("id_inventario") REFERENCES "inventario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "detalle_inventario" ADD CONSTRAINT "detalle_inventario_id_producto_fkey" FOREIGN KEY ("id_producto") REFERENCES "producto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "entrega_pedido" ADD CONSTRAINT "entrega_pedido_id_trabajador_fkey" FOREIGN KEY ("id_trabajador") REFERENCES "trabajador"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "entrega_pedido" ADD CONSTRAINT "entrega_pedido_id_venta_fkey" FOREIGN KEY ("id_venta") REFERENCES "venta"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "entrega_pedido" ADD CONSTRAINT "entrega_pedido_id_estado_fkey" FOREIGN KEY ("id_estado") REFERENCES "cat_estado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "detalle_entrega" ADD CONSTRAINT "detalle_entrega_id_entrega_pedido_fkey" FOREIGN KEY ("id_entrega_pedido") REFERENCES "entrega_pedido"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "detalle_entrega" ADD CONSTRAINT "detalle_entrega_id_producto_fkey" FOREIGN KEY ("id_producto") REFERENCES "producto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "caja" ADD CONSTRAINT "caja_id_trabajador_fkey" FOREIGN KEY ("id_trabajador") REFERENCES "trabajador"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "caja" ADD CONSTRAINT "caja_id_estado_fkey" FOREIGN KEY ("id_estado") REFERENCES "cat_estado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "apertura_caja" ADD CONSTRAINT "apertura_caja_id_caja_fkey" FOREIGN KEY ("id_caja") REFERENCES "caja"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "apertura_caja" ADD CONSTRAINT "apertura_caja_id_trabajador_fkey" FOREIGN KEY ("id_trabajador") REFERENCES "trabajador"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "apertura_caja" ADD CONSTRAINT "apertura_caja_id_estado_fkey" FOREIGN KEY ("id_estado") REFERENCES "cat_estado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "apertura_caja" ADD CONSTRAINT "apertura_caja_id_moneda_fkey" FOREIGN KEY ("id_moneda") REFERENCES "moneda"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "detalle_apertura_caja" ADD CONSTRAINT "detalle_apertura_caja_id_apertura_caja_fkey" FOREIGN KEY ("id_apertura_caja") REFERENCES "apertura_caja"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "movimiento_caja" ADD CONSTRAINT "movimiento_caja_id_caja_fkey" FOREIGN KEY ("id_caja") REFERENCES "caja"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "movimiento_caja" ADD CONSTRAINT "movimiento_caja_id_trabajador_fkey" FOREIGN KEY ("id_trabajador") REFERENCES "trabajador"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "movimiento_caja" ADD CONSTRAINT "movimiento_caja_id_moneda_fkey" FOREIGN KEY ("id_moneda") REFERENCES "moneda"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "arqueo_caja" ADD CONSTRAINT "arqueo_caja_id_caja_fkey" FOREIGN KEY ("id_caja") REFERENCES "caja"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "arqueo_caja" ADD CONSTRAINT "arqueo_caja_id_trabajador_fkey" FOREIGN KEY ("id_trabajador") REFERENCES "trabajador"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cierre_caja" ADD CONSTRAINT "cierre_caja_id_caja_fkey" FOREIGN KEY ("id_caja") REFERENCES "caja"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cierre_caja" ADD CONSTRAINT "cierre_caja_id_trabajador_fkey" FOREIGN KEY ("id_trabajador") REFERENCES "trabajador"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cierre_caja" ADD CONSTRAINT "cierre_caja_id_estado_fkey" FOREIGN KEY ("id_estado") REFERENCES "cat_estado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "grupo_usuario" ADD CONSTRAINT "grupo_usuario_id_estado_fkey" FOREIGN KEY ("id_estado") REFERENCES "cat_estado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sub_grupo_usuario" ADD CONSTRAINT "sub_grupo_usuario_id_estado_fkey" FOREIGN KEY ("id_estado") REFERENCES "cat_estado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sub_grupo_usuario" ADD CONSTRAINT "sub_grupo_usuario_id_grupo_usuario_fkey" FOREIGN KEY ("id_grupo_usuario") REFERENCES "grupo_usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "perfil" ADD CONSTRAINT "perfil_id_grupo_usuario_fkey" FOREIGN KEY ("id_grupo_usuario") REFERENCES "grupo_usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usuario" ADD CONSTRAINT "usuario_id_perfil_fkey" FOREIGN KEY ("id_perfil") REFERENCES "perfil"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usuario" ADD CONSTRAINT "usuario_id_estado_fkey" FOREIGN KEY ("id_estado") REFERENCES "cat_estado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usuario" ADD CONSTRAINT "usuario_id_persona_fkey" FOREIGN KEY ("id_persona") REFERENCES "persona"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usuario" ADD CONSTRAINT "usuario_id_rol_fkey" FOREIGN KEY ("id_rol") REFERENCES "rol"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "historial_password_usuario" ADD CONSTRAINT "historial_password_usuario_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rol" ADD CONSTRAINT "rol_id_estado_fkey" FOREIGN KEY ("id_estado") REFERENCES "cat_estado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "modulo" ADD CONSTRAINT "modulo_id_estado_fkey" FOREIGN KEY ("id_estado") REFERENCES "cat_estado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sub_modulo" ADD CONSTRAINT "sub_modulo_id_modulo_fkey" FOREIGN KEY ("id_modulo") REFERENCES "modulo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rol_modulo" ADD CONSTRAINT "rol_modulo_id_rol_fkey" FOREIGN KEY ("id_rol") REFERENCES "rol"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rol_modulo" ADD CONSTRAINT "rol_modulo_id_modulo_fkey" FOREIGN KEY ("id_modulo") REFERENCES "modulo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "privilegio_usuario" ADD CONSTRAINT "privilegio_usuario_id_perfil_fkey" FOREIGN KEY ("id_perfil") REFERENCES "perfil"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "privilegio_usuario" ADD CONSTRAINT "privilegio_usuario_id_trabajador_fkey" FOREIGN KEY ("id_trabajador") REFERENCES "trabajador"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "conexion" ADD CONSTRAINT "conexion_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "conexion" ADD CONSTRAINT "conexion_id_estado_fkey" FOREIGN KEY ("id_estado") REFERENCES "cat_estado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "historial_sesion" ADD CONSTRAINT "historial_sesion_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "historial_sesion" ADD CONSTRAINT "historial_sesion_id_estado_fkey" FOREIGN KEY ("id_estado") REFERENCES "cat_estado"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "historial_permiso_usuario" ADD CONSTRAINT "historial_permiso_usuario_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "historial_permiso_usuario" ADD CONSTRAINT "historial_permiso_usuario_id_permiso_fkey" FOREIGN KEY ("id_permiso") REFERENCES "permiso"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
