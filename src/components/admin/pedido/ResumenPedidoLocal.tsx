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
  Badge,
} from "@tremor/react";
import { ItemCounter } from "./ItemCounter";
import { IProductoCart } from "@/interfaces/producto";
import { useAppDispatch } from "@/hooks/hooks";

import {
  actualizarCantidadProducto,
  quitarProductoPedido,
} from "@/store/slices/pedido/pedidoSlice";
import { useSession } from "next-auth/react";

import { CambiarEstadoProductoPedido } from "./CambiarEstadoProductoPedido";
import { ICatEstado } from "@/interfaces";

interface Props {
  id_estado: number;
  productos: IProductoCart[];
  // actualizarCantidadProducto: any;
  quitarProducto: any;
  subtotal: number;
  total: number;
  id_trabajador?: number;
  estados?: ICatEstado[];
  nuevo_pedido: boolean;
}

export const ResumenPedidoLocal: FC<Props> = ({
  productos,
  id_estado,
  quitarProducto,
  subtotal,
  total,
  id_trabajador,
  estados,
  nuevo_pedido,
}) => {
  const dispatch = useAppDispatch();

  const { data: session } = useSession();

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
              <TableHeaderCell className="text-center">P.U.</TableHeaderCell>
              <TableHeaderCell className="text-center">
                Cantidad
              </TableHeaderCell>
              <TableHeaderCell className="text-center">Total</TableHeaderCell>
              {!nuevo_pedido ? (
                id_estado !== 8 ? (
                  id_estado !== 15 ? (
                    <TableHeaderCell className="text-center">
                      Estado
                    </TableHeaderCell>
                  ) : null
                ) : null
              ) : null}
            </TableRow>
          </TableHead>
          <TableBody>
            {productos.map((item) => (
              <TableRow key={item.nombre} className="text-center">
                <TableCell className="text-center">{item.id}</TableCell>
                <TableCell className="text-center">
                  <Text>{item.nombre}</Text>
                </TableCell>
                <TableCell className="text-center">
                  <Text>$ {item.precio.toFixed(2)}</Text>
                </TableCell>

                <TableCell className="flex justify-center">
                  {id_trabajador === session?.user?.id_trabajador ||
                  (id_trabajador !== session?.user?.id_trabajador &&
                    session?.user.id_rol === 1) ||
                  (id_trabajador !== session?.user?.id_trabajador &&
                    session?.user.id_rol === 2) ||
                  (id_trabajador !== session?.user?.id_trabajador &&
                    session?.user.id_rol === 3) ||
                  (id_trabajador !== session?.user?.id_trabajador &&
                    session?.user.id_rol === 5) ? (
                    id_estado !== 8 ? (
                      id_estado !== 15 ? (
                        <ItemCounter
                          currentValue={item.cantidad}
                          maxValue={20}
                          updatedQuantity={(value) =>
                            onNewCartQuantityValue(item as IProductoCart, value)
                          }
                        />
                      ) : (
                        <h1 className="w-8 text-center"> {item.cantidad} </h1>
                      )
                    ) : (
                      <h1 className="w-8 text-center"> {item.cantidad} </h1>
                    )
                  ) : (
                    <h1 className="w-8 text-center"> {item.cantidad} </h1>
                  )}
                  {/* <Text>{item.cantidad}</Text> */}
                </TableCell>
                <TableCell className="text-center">
                  <Text>${Number(item.precio * item.cantidad).toFixed(2)}</Text>
                </TableCell>

                {!nuevo_pedido ? (
                  id_estado !== 8 ? (
                    id_estado !== 15 ? (
                      <TableCell className="text-center">
                        <CambiarEstadoProductoPedido
                          id_estado={item.id_estado}
                          estados={estados}
                        />
                      </TableCell>
                    ) : null
                  ) : null
                ) : null}

                <TableCell className="text-center">
                  {id_trabajador === session?.user?.id_trabajador ||
                  (id_trabajador !== session?.user?.id_trabajador &&
                    session?.user.id_rol === 1) ||
                  (id_trabajador !== session?.user?.id_trabajador &&
                    session?.user.id_rol === 2) ||
                  (id_trabajador !== session?.user?.id_trabajador &&
                    session?.user.id_rol === 3) ||
                  (id_trabajador !== session?.user?.id_trabajador &&
                    session?.user.id_rol === 5) ? (
                    id_estado !== 8 ? (
                      id_estado !== 15 ? (
                        <button
                          type="button"
                          className="inline-flex  py-2 text-gray-400 hover:text-gray-500"
                          onClick={() => dispatch(quitarProductoPedido(item))}
                        >
                          <TrashIcon className="h-4 w-4 text-black" />
                          <span className="sr-only">Remove</span>
                        </button>
                      ) : null
                    ) : null
                  ) : null}
                </TableCell>
                <TableCell>
                  {/* <Badge color="emerald" icon={SignalIcon}>
                  {item.}
                </Badge> */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
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
    </div>
  );
};
