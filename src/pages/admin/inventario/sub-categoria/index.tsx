import { SubCategoriaProductoTable } from "@/components/tables/subcategoria/SubcategoriaTable";
import { AdminLayout } from "../../../../components/Layout/AdminLayout";
import { AgregarSubCategoriaProducto } from "@/components/admin/formularios/catalogos/sub-categoria-producto/AgregarSubCategoriaProducto";

const SubCategoriaInventario = () => {
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
      <SubCategoriaProductoTable />
    </AdminLayout>
  );
};

export default SubCategoriaInventario;
