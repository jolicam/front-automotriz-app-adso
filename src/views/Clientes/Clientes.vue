<template>
  <LayoutMain>
    <template #slotLayout>
      <Header 
        :titulo="'Clientes'"
        :tituloBoton="'Crear Cliente'"
      />
      <Formulario :titulo="'Formulario de Clientes'">
        <template #slotForm>
          <FormClientes />
        </template>
      </Formulario>

      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="name" label="Nombre" width="180" />
        <el-table-column prop="surname" label="Apellido" width="180" />
        <el-table-column prop="identificacion" label="identificacion" width="180" />
        <el-table-column prop="phone" label="Teléfono" />
        <el-table-column prop="direccion" label="Dirección" width="180" />
        <el-table-column prop="email" label="CorreoElectronico" width="180" />
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
import FormClientes from './components/formClientes.vue'  
import Formulario from '../../components/Formulario.vue'
import Header from '../../components/Header.vue'
import { Delete, Edit } from "@element-plus/icons-vue"

const tableData = [
  {
    name: 'Juan Pérez',
    surname: 'Pérez',
    identificacion: '1009937293', 
    direccion: 'Calle 45 #12-34, Bogotá',
    phone: '3001234567',
    email: 'juan.perez@hotmail.com' 
  },
  {
    name: 'María López',
    surname: 'López', 
    identificacion: '52487939', 
    direccion: 'Carrera 7 #56-78, Bogotá',
    phone: '3129876543',
    email: 'maria.lopez@hotmail.com' 
  }
];

</script>
