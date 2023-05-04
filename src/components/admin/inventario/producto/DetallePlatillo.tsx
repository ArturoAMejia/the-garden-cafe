import { ICatEstado } from "@/interfaces";
import { Dialog, Transition } from "@headlessui/react";

import { EllipsisHorizontalCircleIcon } from "@heroicons/react/24/outline";
import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  Text,
  TableRow,
} from "@tremor/react";
import { productos } from "prisma/data/productos";
import { FC, Fragment, useState } from "react";

interface Props {
  detalle_platillo: any;
}

export const DetallePlatillo: FC<Props> = ({ detalle_platillo }) => {
  console.log(detalle_platillo);
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => setIsOpen(false);

  const openModal = () => setIsOpen(true);
  return (
    <>
      <div className="flex items-center justify-center">
        <button
          type="button"
          onClick={openModal}
          className="rounded-md py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          <EllipsisHorizontalCircleIcon className="h-6 w-6 text-black" />
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 mb-2"
                  >
                    Detalle del Platillo
                  </Dialog.Title>
                  <Card className="h-96 overflow-auto  p-2">
                    <Table className="m-0  p-0">
                      <TableHead>
                        <TableRow>
                          <TableHeaderCell className="text-center">
                            Código
                          </TableHeaderCell>
                          <TableHeaderCell className="text-center">
                            Nombre
                          </TableHeaderCell>
                          <TableHeaderCell className="text-center">
                            Cantidad
                          </TableHeaderCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {detalle_platillo.map((item) => (
                          <TableRow
                            key={item.producto.nombre}
                            className="text-center"
                          >
                            <TableCell className="text-center">
                              {item.producto.id}
                            </TableCell>
                            <TableCell className="text-center">
                              <Text>{item.producto.nombre}</Text>
                            </TableCell>
                            <TableCell className="text-center">
                              <Text>{item.cantidad}</Text>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Card>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
