import { SubCategoriaProductoTable } from "@/components/tables/subcategoria/SubcategoriaTable";
import { AdminLayout } from "../../../../components/Layout/AdminLayout";
import { AgregarSubCategoriaProducto } from "@/components/admin/formularios/catalogos/sub-categoria-producto/AgregarSubCategoriaProducto";
import { AgregarPrecioProducto } from "@/components/admin/inventario/producto/AgregarPrecioProducto";
import { PrecioProductoTable } from "@/components/tables/inventario/PrecioProductoTable";

const PrecioProductoPage = () => {
  return (
    <AdminLayout title="Precio Producto">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="mb-2 text-xl font-semibold text-gray-900">
            Precio de producto
          </h1>
          <p className="mb-4 text-sm text-gray-700">
            Añade un nuevo precio al producto click al botón
          </p>
        </div>

        <div className="mt-4 mb-4 px-1 sm:mt-0 sm:ml-16 sm:flex-none">
          {/* // TODO Agregarprecioproducto  */}
          <AgregarPrecioProducto />
          {/* <AgregarSubCategoriaProducto /> */}
        </div>
      </div>
      {/* // todo precio producto table */}
      <PrecioProductoTable />
    </AdminLayout>
  );
};

export default PrecioProductoPage;
