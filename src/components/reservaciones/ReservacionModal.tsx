import { XCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import React, { FC, useContext } from "react";
import { AdminContext } from "../../context/admin/admin";
import { IUser } from "../../interfaces/IUser";

interface Props {
  nombre?: string;
  apellido?: string;
  num_cedula_ruc?: string;
  correo?: string
}

export const ReservacionModal:FC<Props> = ({nombre, apellido, correo,num_cedula_ruc,}) => {

  return (
    <div>
      <div className="flex justify-between">
        <div className="">
          <h1 className="text-xl font-bold">Detalles Reservación</h1>
        </div>
        <div className="pr-7">
          <button className="">
            <XCircleIcon className="h-7 w-7 " />
          </button>
        </div>
      </div>
      <div className="flex flex-row p-4">
        <div className="w-1/2">
          <ul>
            <li>{nombre}</li>
            <li className="text-black">{correo} </li>
            <li></li>
          </ul>
        </div>
        <div className="w-1/2">2</div>
      </div>
    </div>
  );
};
