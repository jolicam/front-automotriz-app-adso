<template>
    <LayoutMain>
      <template #slotLayout>
        <Header 
        :titulo="'Servicios Mecánicos'"
        :tituloBoton="'Crear Servicio Mecanico'"
        />
        <Formulario :titulo="'Formulario de Servicios Mecanicos'">
          <template #slotForm>
            <formServiciosMecanicos />
          </template>
        </Formulario>
  
        <el-table :data="tableData" stripe style="width: 100%">
          <el-table-column prop="serviceName" label="Nombre del Servicio" width="180" />
          <el-table-column prop="mechanicName" label="Nombre del Mecanico" />
          <el-table-column prop="price" label="Precio" />
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
  import formServiciosMecanicos from './components/formServiciosMecanicos.vue'
  import Formulario from '../../components/Formulario.vue'
  import Header from '../../components/Header.vue'
  import { Delete, Edit } from "@element-plus/icons-vue"
  
  const tableData = [
    {
      serviceName: 'Cambio de Aceite',
      mechanicName: 'Juan Pérez',
      price: '50,000'
    },
    {
      serviceName: 'Revisión de Frenos',
      mechanicName: 'María López',
      price: '80,000'
    }
  ]
  </script>
  