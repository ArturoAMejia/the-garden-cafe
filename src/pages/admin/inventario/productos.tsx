import { AdminLayout } from "../../../components/Layout/AdminLayout";
import { AgregarProducto } from "../../../components/admin/inventario/producto/AgregarProducto";
import { ProductoTable } from "../../../components/tables/inventario/ProductoTable";

const ProductosPage = () => {
  return (
    <AdminLayout title="Productos">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="mb-4 px-1 text-xl font-semibold text-gray-900">
            Productos
          </h1>
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



