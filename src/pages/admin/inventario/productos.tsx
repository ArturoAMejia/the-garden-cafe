import { AdminLayout } from "../../../components/Layout/AdminLayout";
import { AgregarProducto } from "../../../components/admin/inventario/producto/AgregarProducto";
import { ProductoTable } from "../../../components/tables/inventario/ProductoTable";

const ProductosPage = () => {
  return (
    <AdminLayout title="Productos">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="mb-2 text-xl font-semibold text-gray-900">
            Productos
          </h1>
          <p className="mb-4 text-sm text-gray-700">
            Añade un nuevo producto dandole click al botón
          </p>
        </div>
        <div className="mt-4 mb-4 px-1 sm:mt-0 sm:ml-16 sm:flex-none">
          <AgregarProducto isProduct={true} />
        </div>
      </div>
      <ProductoTable />
    </AdminLayout>
  );
};

export default ProductosPage;
