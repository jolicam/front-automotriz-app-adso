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
    <!-- Campo Nombre -->
    <el-form-item label="Nombre" prop="nombre">
      <el-input v-model="formulario.nombre" />
    </el-form-item>

    <!-- Campo Precio -->
    <el-form-item label="Precio" prop="precio">
      <el-input v-model="formulario.precio" />
    </el-form-item>

  </el-form>
</template>

<script setup>
import { reactive, ref } from 'vue'

// Inicialización de datos
const formSize = ref('default')  
const formRef = ref()  

const formulario = reactive({
  nombre: '',  // Campo para el nombre del repuesto
  precio: ''   // Campo para el precio del repuesto
})

// Reglas de validación
const rulesForm = reactive({
  nombre: [
    { required: true, message: 'Por favor ingrese el nombre del repuesto', trigger: 'blur' }
  ],
  precio: [
    { required: true, message: 'Por favor ingrese el precio del repuesto', trigger: 'blur' }
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
