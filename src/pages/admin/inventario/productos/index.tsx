import { Tab, TabList } from "@tremor/react";
import { AdminLayout } from "@/components/Layout/AdminLayout";
import { AgregarProducto } from "@/components/admin/inventario/producto/AgregarProducto";

import { useState } from "react";
import {
  BanknotesIcon,
  BeakerIcon,
  StarIcon,
} from "@heroicons/react/24/outline";

import { ingredientesColumns } from "@/components/tables/inventario/ingredienteColumns";
import {
  useObtenerIngredientesQuery,
  useObtenerPlatillosQuery,
  useObtenerProductosQuery,
} from "@/store/slices/inventario";
import { Loader } from "@/components/ui/Loader";
import { productoColumns } from "@/components/tables/inventario/productoColumns";
import { DataTable } from "@/components/tables/Table";
import { platillosColumns } from "@/components/tables/inventario/platillosColumns";

const ProductosPage = () => {
  const [showCard, setShowCard] = useState(1);
  const { data: ingredientes, isLoading } = useObtenerIngredientesQuery();
  const { data: productos, isLoading: isLoadingProductos } =
    useObtenerProductosQuery();
  const { data: platillos, isLoading: isLoadingPlatillos } =
    useObtenerPlatillosQuery();

  return (
    <AdminLayout title="Productos">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="mb-2 text-xl font-semibold text-gray-900">
            {showCard === 1
              ? "Platillos"
              : showCard === 2
              ? "Productos para vender"
              : "Ingredientes"}
          </h1>
          <p className="mb-4 text-sm text-gray-700">
            Añade un nuevo
            {showCard === 1
              ? // TODO Crear platillo
                " platillo "
              : showCard === 2
              ? " producto "
              : " ingrediente "}
            dandole click al botón
          </p>
        </div>
        <div className="mt-4 mb-4 px-1 sm:mt-0 sm:ml-16 sm:flex-none">
          {showCard === 1 ? (
            // TODO Crear platillo
            "            Agregar platillo"
          ) : showCard === 2 ? (
            <AgregarProducto isProduct={true} />
          ) : (
            <AgregarProducto isIngredient={true} />
          )}
        </div>
      </div>

      <TabList
        defaultValue="1"
        onValueChange={(value) => setShowCard(Number(value))}
      >
        <Tab value="1" text="Platillos" icon={StarIcon} />
        <Tab value="2" text="Productos para vender" icon={BanknotesIcon} />
        <Tab value="3" text="Ingredientes" icon={BeakerIcon} />
      </TabList>
      {isLoading === true ||
      isLoadingPlatillos === true ||
      isLoadingProductos === true ? (
        <Loader />
      ) : showCard === 1 ? (
        <DataTable columns={platillosColumns} data={platillos} />
      ) : showCard === 2 ? (
        <DataTable columns={productoColumns} data={productos} />
      ) : (
        <DataTable columns={ingredientesColumns} data={ingredientes} />
      )}
    </AdminLayout>
  );
};

export default ProductosPage;
