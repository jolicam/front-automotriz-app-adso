<template>
    <LayoutMain>
      <template #slotLayout>
        <Header 
        :titulo="'Repuestos'"
        :tituloBoton="'Crear Repuesto'"
        />
        <Formulario :titulo="'Formulario de Repuestos'">
          <template #slotForm>
            <formRepuestos />
          </template>
        </Formulario>
  
        <el-table :data="tableData" stripe style="width: 100%">
          <el-table-column prop="name" label="Nombre" width="180" />
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
  import formRepuestos from './components/formRepuestos.vue'
  import Formulario from '../../components/Formulario.vue'
  import Header from '../../components/Header.vue'
  import { Delete, Edit } from "@element-plus/icons-vue"
  
  const tableData = [
    {
      name: 'Filtro de Aceite',
      price: '20,000'
    },
    {
      name: 'Batería',
      price: '200,000'
    }
  ]
  </script>
  