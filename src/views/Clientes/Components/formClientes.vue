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
    <el-form-item label="Nombre" prop="nombre">
      <el-input v-model="formulario.nombre" />
    </el-form-item>
    <el-form-item label="Apellido" prop="apellido">
      <el-input v-model="formulario.apellido" />
    </el-form-item>
    <el-form-item label="Identificación" prop="identificacion">
      <el-input v-model="formulario.identificacion" />
    </el-form-item>
    <el-form-item label="Dirección" prop="direccion">
      <el-input v-model="formulario.direccion" />
    </el-form-item>
    <el-form-item label="Teléfono" prop="telefono">
      <el-input v-model="formulario.telefono" />
    </el-form-item>
    <el-form-item label="Correo Electrónico" prop="email">
      <el-input v-model="formulario.email" />
    </el-form-item>
  </el-form>
</template>

<script setup>
import { reactive, ref } from 'vue'

const formSize = ref('default')
const formRef = ref()
const formulario = reactive({
  nombre: '',
  apellido: '',
  identificacion: '',
  direccion: '',
  telefono: '',
  email: '',
})

const rulesForm = reactive({
  nombre: [{ required: true, message: 'Por favor ingrese el nombre', trigger: 'blur' }],
  apellido: [{ required: true, message: 'Por favor ingrese el apellido', trigger: 'blur' }],
  identificacion: [{ required: true, message: 'Por favor ingrese la identificación', trigger: 'blur' }],
  direccion: [{ required: true, message: 'Por favor ingrese la dirección', trigger: 'blur' }],
  telefono: [{ required: true, message: 'Por favor ingrese el teléfono', trigger: 'blur' }],
  email: [{ required: true, message: 'Por favor ingrese el correo electrónico', trigger: 'blur' }],
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
