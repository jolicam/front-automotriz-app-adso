<template>
    <LayoutMain>
      <template #slotLayout>
        <Header 
        :titulo="'Vehículos'"
        :tituloBoton="'Crear Vehículo'"
        />
        <Formulario :titulo="'Formulario de Vehículos'">
          <template #slotForm>
            <formVehiculos />
          </template>
        </Formulario>
  
        <el-table :data="tableData" stripe style="width: 100%">
          <el-table-column prop="plate" label="Placa" width="180" />
          <el-table-column prop="brand" label="Marca" width="180" />
          <el-table-column prop="model" label="Modelo" />
          <el-table-column prop="year" label="Año" />
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
  import formVehiculos from './components/formVehiculos.vue'
  import Formulario from '../../components/Formulario.vue'
  import Header from '../../components/Header.vue'
  import { Delete, Edit } from "@element-plus/icons-vue"
  
  const tableData = [
    {
      plate: 'ABC-123',
      brand: 'Toyota',
      model: 'Corolla',
      year: 2019
    },
    {
      plate: 'XYZ-456',
      brand: 'Chevrolet',
      model: 'Sonic',
      year: 2020
    }
  ]
  </script>