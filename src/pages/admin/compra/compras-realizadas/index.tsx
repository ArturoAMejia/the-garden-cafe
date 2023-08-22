import React from "react";
import { AdminLayout } from "../../../../components/Layout/AdminLayout";
import { DataTable } from "@/components/tables/Table";
import { comprasRealizadasColumns } from "@/components/admin/compra/compras-realizadas/columns";
import { useObtenerComprasQuery } from "@/store/slices/compra";
import { Loader } from "@/components/ui/Loader";

const ComprasRealizadaPage = () => {
  const { data, isLoading } = useObtenerComprasQuery();
  return (
    <AdminLayout title="Compras Realizadas">
      <h1>Compras Realizadas</h1>

      {isLoading === true ? (
        <Loader />
      ) : (
        <DataTable columns={comprasRealizadasColumns} data={data} />
      )}
    </AdminLayout>
  );
};

export default ComprasRealizadaPage;
