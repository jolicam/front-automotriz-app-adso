<template>
  <LayoutMain>
    <template #slotLayout>
      <Header 
        :titulo="'Facturas'"
        :tituloBoton="'Crear Factura'"
      />
      <Formulario :titulo="'Formulario de Facturas'">
        <template #slotForm>
          <formFactura />
        </template>
      </Formulario>

      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="invoiceNumber" label="Número de Factura" width="180" />
        <el-table-column prop="clientName" label="Nombre del Cliente" />
        <el-table-column prop="totalAmount" label="Monto Total" />
        <el-table-column prop="invoiceDate" label="Fecha" width="180" /> <!-- Añadido campo de fecha -->
        <el-table-column fixed="right" label="Acciones" min-width="120">
          <template #default>
            <el-button link type="primary" size="large" :icon="Edit" />
            <el-button link type="danger" :icon="Delete" />
          </template>
        </el-table-column>
      </el-table>
    </template>
  </LayoutMain>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import LayoutMain from '../../components/LayoutMain.vue'
import formFacturas from './Components/formFacturas.vue'
import Formulario from '../../components/Formulario.vue'
import Header from '../../components/Header.vue'
import { Delete, Edit } from "@element-plus/icons-vue"

const tableData = [
  {
    invoiceNumber: 'F001',
    clientName: 'Carlos Martínez',
    totalAmount: '150,000',
    invoiceDate: '2024-10-24' 
  },
  {
    invoiceNumber: 'F002',
    clientName: 'Laura Gómez',
    totalAmount: '200,000',
    invoiceDate: '2024-10-23' 
  }
]
</script>

  