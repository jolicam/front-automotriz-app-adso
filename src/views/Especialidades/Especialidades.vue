<template>
    <LayoutMain>
      <template #slotLayout>
        <Header 
        :titulo="'Especialidades'"
        :tituloBoton="'Crear Especialidad'"
        />
        <Formulario :titulo="'Formulario de Especialidades'">
          <template #slotForm>
            <formEspecialidades />
          </template>
        </Formulario>
  
        <el-table :data="tableData" stripe style="width: 100%">
          <el-table-column prop="name" label="Nombre" width="180" />
          <el-table-column prop="description" label="Descripción" />
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
  import formEspecialidades from './components/formEspecialidades.vue'
  import Formulario from '../../components/Formulario.vue'
  import Header from '../../components/Header.vue'
  import { Delete, Edit } from "@element-plus/icons-vue"
  
  const tableData = [
    {
      name: 'Mecánica Automotriz',
      description: 'Especialización en reparación y mantenimiento de vehículos.'
    }
  ]
  </script>