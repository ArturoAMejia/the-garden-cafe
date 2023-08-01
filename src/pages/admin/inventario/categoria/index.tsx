import { AgregarCatProducto } from "@/components";
import { AdminLayout } from "@/components/Layout/AdminLayout";
import { DataTable } from "@/components/tables/Table";
import { categoriaProductoColumns } from "@/components/tables/inventario/categoriaProductoColumns";
import { Loader } from "@/components/ui/Loader";
import { useObtenerCategoriasQuery } from "@/store/slices/inventario";

const CategoriaInventario = () => {
  const { data, isLoading } = useObtenerCategoriasQuery();

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
          <AgregarCatProducto />
        </div>
      </div>
      {isLoading === true ? (
        <Loader />
      ) : (
        <DataTable columns={categoriaProductoColumns} data={data} />
      )}
    </AdminLayout>
  );
};

export default CategoriaInventario;
