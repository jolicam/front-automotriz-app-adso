<template>
  <el-form
    ref="formRef"
    style="max-width: 100%"
    :model="formulario"
    :rules="rulesForm"
    label-width="auto"
    :size="formSize"
    status-icon
  >
    
    <el-form-item label="Descripción" prop="descripcion">
      <el-input v-model="formulario.descripcion" />
    </el-form-item>

   
    <el-form-item label="Costo" prop="costo">
      <el-input v-model="formulario.costo" />
    </el-form-item>

   
    <el-form-item label="Fecha" prop="fecha">
      <el-date-picker v-model="formulario.fecha" type="date" placeholder="Seleccione la fecha" />
    </el-form-item>

  
    <el-form-item label="Placa del Vehículo" prop="vehiculo_placa">
      <el-input v-model="formulario.vehiculo_placa" />
    </el-form-item>

    
    <el-form-item label="Mecánico" prop="mecanico_id">
      <el-select v-model="formulario.mecanico_id" placeholder="Seleccione un mecánico">
        <el-option v-for="mecanico in mecanicos"
          :key="mecanico.id"
          :label="mecanico.nombre"
          :value="mecanico.id"
        />
      </el-select>
    </el-form-item>

  </el-form>
</template>

<script setup>
import { reactive, ref } from 'vue'


const propiedad = defineProps({
  mecanicos: {
    type: Array,
    required: true
  }
})

const formSize = ref('default')  
const formRef = ref()  


const formulario = reactive({
  descripcion: '',  
  costo: '',      
  fecha: '',        
  vehiculo_placa: '', 
  mecanico_id: ''    
})


const rulesForm = reactive({
  descripcion: [
    { required: true, message: 'Por favor ingrese una descripción', trigger: 'blur' }
  ],
  costo: [
    { required: true, message: 'Por favor ingrese el costo', trigger: 'blur' }
  ],
  fecha: [
    { required: true, message: 'Por favor seleccione una fecha', trigger: 'blur' }
  ],
  vehiculo_placa: [
    { required: true, message: 'Por favor ingrese la placa del vehículo', trigger: 'blur' }
  ],
  mecanico_id: [
    { required: true, message: 'Por favor seleccione un mecánico', trigger: 'blur' }
  ]
})


const limpiarFormulario = () => {
  formRef.value.resetFields()
}


const validarFormulario = () => {
  return new Promise((resolve) => {
    formRef.value?.validate((valid) => {
      if (valid) {
        resolve(true)  
      } else {
        resolve(false)  
      }
    })
  })
}


defineExpose({ validarFormulario, formulario, limpiarFormulario })
</script>

<style scoped>
</style>
