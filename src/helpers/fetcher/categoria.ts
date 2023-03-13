import tgcApi from "../../api/tgcApi";
import { ICategoriaProducto } from "../../interfaces";

export const fetcher = async (url: string) => {
  const { data } = await tgcApi.get<ICategoriaProducto[]>(url);
  return data;
};
