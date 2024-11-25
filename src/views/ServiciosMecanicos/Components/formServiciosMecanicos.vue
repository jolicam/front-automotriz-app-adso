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
    <!-- Campo Servicio ID -->
    <el-form-item label="Servicio ID" prop="servicio_id">
      <el-input v-model="formulario.servicio_id" />
    </el-form-item>
    
    <!-- Campo Mecánico -->
    <el-form-item label="Mecánico" prop="mecanico_id">
      <el-select v-model="formulario.mecanico_id" placeholder="Seleccione un mecánico">
        <el-option v-for="mecanico in mecanicos" 
                   :key="mecanico.id" 
                   :label="mecanico.nombre" 
                   :value="mecanico.id" />
      </el-select>
    </el-form-item>

    <!-- Campo Repuesto -->
    <el-form-item label="Repuesto" prop="repuesto_id">
      <el-select v-model="formulario.repuesto_id" placeholder="Seleccione un repuesto">
        <el-option v-for="repuesto in repuestos" 
                   :key="repuesto.id" 
                   :label="repuesto.nombre" 
                   :value="repuesto.id" />
      </el-select>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { reactive, ref } from 'vue'

// Propiedades que reciben los listados de mecánicos y repuestos
const propiedad = defineProps({
  mecanicos: {
    type: Array,
    required: true
  },
  repuestos: {
    type: Array,
    required: true
  }
});

const formSize = ref('default')
const formRef = ref()

// Estado reactivo para el formulario
const formulario = reactive({
  servicio_id: '',
  mecanico_id: '',
  repuesto_id: ''
})

// Reglas de validación
const rulesForm = reactive({
  servicio_id: [
    { required: true, message: 'Por favor ingrese el servicio ID', trigger: 'blur' }
  ],
  mecanico_id: [
    { required: true, message: 'Por favor seleccione un mecánico', trigger: 'blur' }
  ],
  repuesto_id: [
    { required: true, message: 'Por favor seleccione un repuesto', trigger: 'blur' }
  ]
})

// Función para limpiar el formulario
const limpiarFormulario = () => {
  formRef.value.resetFields()    
}

// Función para validar el formulario
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

// Exponer las funciones necesarias para el componente
defineExpose({ validarFormulario, formulario, limpiarFormulario })
</script>

<style scoped>
</style>
