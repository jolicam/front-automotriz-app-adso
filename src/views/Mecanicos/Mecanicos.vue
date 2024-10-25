<template>
  <LayoutMain>
    <template #slotLayout>
      <Header 
        :titulo="'Mecánicos'"
        :tituloBoton="'Crear Mecánico'"
      />
      <Formulario :titulo="'Formulario de Mecánicos'">
        <template #slotForm>
          <formMecanicos />
        </template>
      </Formulario>

      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="name" label="Nombre" width="180" />
        <el-table-column prop="surname" label="Apellido" width="180" />
        <el-table-column prop="documento" label="Documento" width="180" />
        <el-table-column prop="specialty" label="Especialidad" />
        <el-table-column prop="phone" label="Teléfono" />
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
import formMecanicos from './components/formMecanicos.vue'  
import Formulario from '../../components/Formulario.vue'
import Header from '../../components/Header.vue'
import { Delete, Edit } from "@element-plus/icons-vue"

const tableData = [
  {
    name: 'Carlos Martínez',
    surname: 'Martínez', // Añadido apellido
    documento: '123456789', // Añadido documento
    specialty: 'Mecánica General',
    phone: '3101234567'
  },
  {
    name: 'Daniel Corredor',
    surname: 'Corredor', // Añadido apellido
    documento: '987654321', // Añadido documento
    specialty: 'Cambio de aceite',
    phone: '3159876543'
  }
]
</script>
