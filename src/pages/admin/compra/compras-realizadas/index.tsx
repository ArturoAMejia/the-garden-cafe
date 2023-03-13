import React from 'react'
import { AdminLayout } from '../../../../components/Layout/AdminLayout'
import { ComprasTable } from '../../../../components/admin/compra/compras-realizadas/ComprasRealizasTable'

const ComprasRealizadaPage = () => {
  return (
    <AdminLayout title='Compras Realizadas' >
      <h1>Compras Realizadas</h1>
      <ComprasTable/>
    </AdminLayout>
  )
}

export default ComprasRealizadaPage