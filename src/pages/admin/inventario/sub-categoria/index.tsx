import { AdminLayout } from "../../../../components/Layout/AdminLayout";
import { AgregarSubCategoriaProducto } from "@/components/admin/formularios/catalogos/sub-categoria-producto/AgregarSubCategoriaProducto";
import { subcategoriaColumns } from "@/components/tables/subcategoria/columns";
import { DataTable } from "@/components/tables/Table";
import { Loader } from "@/components/ui/Loader";
import { useObtenerSubcategoriasQuery } from "@/store/slices/inventario";

const SubCategoriaInventario = () => {
  const { data, isLoading } = useObtenerSubcategoriasQuery();

  return (
    <AdminLayout title="Subcategorias de Productos">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="mb-2 text-xl font-semibold text-gray-900">
            Subcategorías de Productos
          </h1>
          <p className="mb-4 text-sm text-gray-700">
            Añade una nueva subcategoría dandole click al botón
          </p>
        </div>

        <div className="mt-4 mb-4 px-1 sm:mt-0 sm:ml-16 sm:flex-none">
          <AgregarSubCategoriaProducto />
        </div>
      </div>
      {isLoading === true ? (
        <Loader />
      ) : (
        <DataTable columns={subcategoriaColumns} data={data} />
      )}
    </AdminLayout>
  );
};

export default SubCategoriaInventario;
