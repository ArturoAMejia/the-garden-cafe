import React, { FC } from "react";

import { AdminLayout } from "../../../../components/Layout/AdminLayout";
import { ReservacionesTable } from "../../../../components/tables/ventas/reservaciones/ReservacionesTable";

import { IReservacion } from "../../../../interfaces";
import { AgregarReservacion } from "../../../../components";

interface Props {
  reservaciones: IReservacion[];
}
const ReservacionesPage: FC<Props> = ({ reservaciones }) => {
  return (
    <AdminLayout title="Reservaciones">
      <div className="mb-4 sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="px-1 text-xl font-semibold text-gray-900">Reservaciones</h1>
          <p className="mt-2 px-1 text-sm text-gray-700">
            Añade una nueva reservación dándole click al botón
          </p>
        </div>
        <div className="mt-4 sm:mt-0  sm:ml-16 sm:flex-none">
          <AgregarReservacion />
        </div>
      </div>
      <ReservacionesTable />
    </AdminLayout>
  );
};

export default ReservacionesPage;
