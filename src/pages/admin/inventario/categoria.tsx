import { AgregarCatProducto } from "../../../components";
import { AdminLayout } from "../../../components/Layout/AdminLayout";
import { CategoriaProductoTable } from "../../../components/tables/CategoriaProductoTable";

const CategoriaInventario = () => {
  return (
    <AdminLayout title="Categorias de Productos">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="mb-2 text-xl font-semibold text-gray-900">
            Categorías de Productos
          </h1>
          <p className="mb-4 text-sm text-gray-700">
            Añade una nueva categoría dandole click al botón
          </p>
        </div>

        <div className="mt-4 mb-4 px-1 sm:mt-0 sm:ml-16 sm:flex-none">
          <AgregarCatProducto/>
        </div>
      </div>
      <CategoriaProductoTable />
    </AdminLayout>
  );
};

export default CategoriaInventario;
