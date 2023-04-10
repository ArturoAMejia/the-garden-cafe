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
import { ItemCounter } from "./ItemCounter";
import { IProductoCart } from "@/interfaces/producto";
import { useAppDispatch } from "@/hooks/hooks";

import {
  actualizarCantidadProducto,
  quitarProductoPedido,
} from "@/store/slices/pedido/pedidoSlice";

interface Props {
  productos: IProductoCart[];
  // actualizarCantidadProducto: any;
  quitarProducto: any;
  subtotal: number;
  total: number;
}

export const ResumenPedidoLocal: FC<Props> = ({
  productos,
  // actualizarCantidadProducto,
  quitarProducto,
  subtotal,
  total,
}) => {
  const dispatch = useAppDispatch();

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
                  <Text>{item.precio}</Text>
                </TableCell>
                <TableCell className="flex justify-center">
                  <ItemCounter
                    currentValue={item.cantidad}
                    maxValue={20}
                    updatedQuantity={(value) =>
                      onNewCartQuantityValue(item as IProductoCart, value)
                    }
                  />
                  {/* <Text>{item.cantidad}</Text> */}
                </TableCell>
                <TableCell className="text-center">
                  <Text>{item.precio * item.cantidad}</Text>
                </TableCell>
                <TableCell className="text-center">
                  <button
                    type="button"
                    className="inline-flex  py-2 text-gray-400 hover:text-gray-500"
                    onClick={() => dispatch(quitarProductoPedido(item))}
                  >
                    <TrashIcon className="h-4 w-4 text-black" />
                    <span className="sr-only">Remove</span>
                  </button>
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
        Subtotal: {subtotal}
      </Subtitle>
      <Subtitle className="text-lg font-bold text-black">
        Impuesto:{" "}
        {(subtotal * Number(process.env.NEXT_PUBLIC_TAX_RATE)).toFixed(2)}
      </Subtitle>
      <Subtitle className="text-lg font-bold text-black">
        Total:{total}
      </Subtitle>
    </div>
  );
};
