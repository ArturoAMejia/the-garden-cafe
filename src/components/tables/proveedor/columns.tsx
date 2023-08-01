import React, { useEffect, useMemo } from "react";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { ICatEstado, IPersona, IProveedor } from "../../../interfaces";
import { DesactivarProveedor, EditarProveedor } from "@/components/admin";

export const columHelper = createColumnHelper<IProveedor>();

export const proviederColumns: ColumnDef<IProveedor>[] = [
  columHelper.accessor<"persona", IPersona>("persona", {
    header: "Nº Cédula - RUC",
    cell: (info) => info.getValue().cedula_ruc,
  }),
  columHelper.accessor<"persona", IPersona>("persona", {
    header: "Nombre",
    cell: (info) => info.getValue().nombre,
  }),
  columHelper.accessor<"persona", IPersona>("persona", {
    header: "Apellido - Razón Social",
    cell: (info) => info.getValue().apellido_razon_social,
  }),
  columHelper.accessor<"sector_comercial", string>("sector_comercial", {
    header: "Sector Comercial",
    cell: (info) => info.getValue(),
  }),
  columHelper.accessor<"persona", IPersona>("persona", {
    header: "Dirección - Domicilio",
    cell: (info) => info.getValue().direccion_domicilio,
  }),
  columHelper.accessor<"persona", IPersona>("persona", {
    header: "Telefóno",
    cell: (info) => info.getValue().telefono,
  }),
  columHelper.accessor<"cat_estado", ICatEstado>("cat_estado", {
    header: "Estado",
    cell: (props) =>
      props.getValue().nombre === "Activo" ? (
        <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
          {props.getValue().nombre}
        </span>
      ) : props.getValue().nombre === "Utilizable" ? (
        <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
          {props.getValue().nombre}
        </span>
      ) : (
        <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
          {props.getValue().nombre}
        </span>
      ),
  }),
  columHelper.display({
    id: "acciones",
    header: "Acciones",
    cell: (props) => (
      <div className="flex justify-center">
        <EditarProveedor proveedor={props.row.original} />{" "}
        <DesactivarProveedor proveedor={props.row.original} />
      </div>
    ),
  }),
];
