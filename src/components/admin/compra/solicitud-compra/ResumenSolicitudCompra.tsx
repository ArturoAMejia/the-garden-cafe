import { FC } from "react";
import { TrashIcon } from "@heroicons/react/24/outline";
import {
  Card,
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Text,
  Divider,
  Subtitle,
} from "@tremor/react";

import { IProductoCart } from "@/interfaces/producto";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";

import { actualizarCantidadProducto } from "@/store/slices/pedido/pedidoSlice";

import { useSession } from "next-auth/react";

import { ICatEstado } from "@/interfaces";
import { CantidadProducto } from "./CantidadProducto";
import { quitarProductoSolicitud } from "@/store/slices/compra";
import { AppState } from "@/store/store";
import { PrecioProductoCompra } from "./PrecioProductoCompra";

interface Props {
  productos: IProductoCart[];
  id_estado_solicitud?: number;
  id_trabajador?: number;
}

export const ResumenSolicitudCompra: FC<Props> = ({
  productos,
  id_estado_solicitud,
  id_trabajador,
}) => {
  const dispatch = useAppDispatch();

  const { data: session } = useSession();

  const { descuento, impuesto, total, subtotal } = useAppSelector(
    (state: AppState) => state.compra
  );

  const onNewCartQuantityValue = (
    product: IProductoCart,
    newQuantityValue: number
  ) => {
    dispatch(
      actualizarCantidadProducto({ ...product, cantidad: newQuantityValue })
    );
  };

  return (
    <div>
      <Card className="h-96 overflow-auto border-b-0 p-2">
        <Table className="m-0 border-b-0 p-0">
          <TableHead>
            <TableRow>
              <TableHeaderCell className="text-center">Código</TableHeaderCell>
              <TableHeaderCell className="text-center">Nombre</TableHeaderCell>
              <TableHeaderCell className="text-center">
                Descripción
              </TableHeaderCell>
              <TableHeaderCell className="text-center">
                Unidad de Medida
              </TableHeaderCell>
              <TableHeaderCell className="text-center">
                Cantidad
              </TableHeaderCell>
              {id_estado_solicitud === 14 ? (
                <TableHeaderCell className="text-center">
                  Precio Unitario
                </TableHeaderCell>
              ) : (
                ""
              )}
              {id_estado_solicitud === 14 ? (
                <TableHeaderCell className="text-center">
                  Precio Total
                </TableHeaderCell>
              ) : (
                ""
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {productos.map((item: any) => (
              <TableRow key={item.nombre} className="text-center">
                <TableCell className="text-center">{item.id}</TableCell>
                <TableCell className="text-center">
                  <Text>{item.nombre}</Text>
                </TableCell>
                <TableCell className="text-center">
                  <Text>{item.descripcion}</Text>
                </TableCell>
                <TableCell className="text-center">
                  <Text>{item?.unidad_medida}</Text>
                </TableCell>

                <TableCell className="flex justify-center">
                  {id_trabajador === session?.user?.id_trabajador ||
                  (id_trabajador !== session?.user?.id_trabajador &&
                    session?.user.id_rol === 1) ||
                  (id_trabajador !== session?.user?.id_trabajador &&
                    session?.user.id_rol === 2) ||
                  (id_trabajador !== session?.user?.id_trabajador &&
                    session?.user.id_rol === 5) ||
                  (id_trabajador !== session?.user?.id_trabajador &&
                    session?.user.id_rol === 7) ||
                  (id_trabajador !== session?.user?.id_trabajador &&
                    session?.user.id_rol === 8) ? (
                    // <h1 className="w-8 text-center"> {item.cantidad} </h1>
                    id_estado_solicitud === 7 ? (
                      <h1 className="w-8 text-center"> {item.cantidad} </h1>
                    ) : (
                      <CantidadProducto
                        producto={item}
                        id_estado={id_estado_solicitud}
                      />
                    )
                  ) : (
                    <h1 className="w-8 text-center"> {item.cantidad} </h1>
                  )}
                </TableCell>
                {id_estado_solicitud !== 14 ? (
                  <TableCell className="text-center">
                    {id_trabajador === session?.user?.id_trabajador ||
                    (id_trabajador !== session?.user?.id_trabajador &&
                      session?.user.id_rol === 1) ||
                    (id_trabajador !== session?.user?.id_trabajador &&
                      session?.user.id_rol === 2) ||
                    (id_trabajador !== session?.user?.id_trabajador &&
                      session?.user.id_rol === 5) ||
                    (id_trabajador !== session?.user?.id_trabajador &&
                      session?.user.id_rol === 7) ||
                    (id_trabajador !== session?.user?.id_trabajador &&
                      session?.user.id_rol === 8) ? (
                      id_estado_solicitud === 7 ? (
                        ""
                      ) : (
                        <button
                          type="button"
                          className="inline-flex  py-2 text-gray-400 hover:text-gray-500"
                          onClick={() =>
                            dispatch(quitarProductoSolicitud(item))
                          }
                        >
                          <TrashIcon className="h-4 w-4 text-black" />
                          <span className="sr-only">Remove</span>
                        </button>
                      )
                    ) : null}
                  </TableCell>
                ) : (
                  ""
                )}

                {id_estado_solicitud === 14 ? (
                  <TableCell className="text-center">
                    <PrecioProductoCompra
                      producto={item}
                      id_estado={id_estado_solicitud}
                    />
                  </TableCell>
                ) : (
                  ""
                )}
                {id_estado_solicitud === 14 ? (
                  <TableCell className="text-center">
                    <Text>${item.cantidad * Number(item.precio)}</Text>
                  </TableCell>
                ) : (
                  ""
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
      {id_estado_solicitud === 14 ? (
        <>
          <Divider />
          <Subtitle className="text-lg font-bold text-black">
            {" "}
            Subtotal: ${subtotal.toFixed(2)}
          </Subtitle>
          <Subtitle className="text-lg font-bold text-black">
            Impuesto: $
            {(subtotal * Number(process.env.NEXT_PUBLIC_TAX_RATE)).toFixed(2)}
          </Subtitle>
          <Subtitle className="text-lg font-bold text-black">
            Total: ${total.toFixed(2)}
          </Subtitle>
        </>
      ) : (
        ""
      )}
    </div>
  );
};
