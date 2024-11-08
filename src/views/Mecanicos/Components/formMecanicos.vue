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

    <!-- Campo Apellido -->
    <el-form-item label="Apellido" prop="apellido">
      <el-input v-model="formulario.apellido" />
    </el-form-item>

    <!-- Campo Documento -->
    <el-form-item label="Documento" prop="documento">
      <el-input v-model="formulario.documento" />
    </el-form-item>

    <!-- Campo Teléfono -->
    <el-form-item label="Teléfono" prop="telefono">
      <el-input v-model="formulario.telefono" />
    </el-form-item>

    <!-- Campo Especialidad -->
    <el-form-item label="Especialidad" prop="especialidad_id">
      <el-select v-model="formulario.especialidad_id" placeholder="Seleccione una especialidad">
        <el-option
          v-for="especialidad in especialidades"
          :key="especialidad.id"
          :label="especialidad.nombre"
          :value="especialidad.id"
        />
      </el-select>
    </el-form-item>

  </el-form>
</template>

<script setup>
import { reactive, ref } from 'vue'

// Propiedad que recibe el listado de especialidades
const propiedad = defineProps({
  especialidades: {
    type: Array,
    required: true,
  },
})

const formSize = ref('default')
const formRef = ref()
const formulario = reactive({
  nombre: '',
  apellido: '',
  documento: '',
  telefono: '',
  especialidad_id: '',
})

const rulesForm = reactive({
  nombre: [
    { required: true, message: 'Por favor ingrese el nombre', trigger: 'blur' },
  ],
  apellido: [
    { required: true, message: 'Por favor ingrese el apellido', trigger: 'blur' },
  ],
  documento: [
    { required: true, message: 'Por favor ingrese el documento', trigger: 'blur' },
  ],
  telefono: [
    { required: true, message: 'Por favor ingrese el teléfono', trigger: 'blur' },
  ],
  especialidad_id: [
    { required: true, message: 'Por favor seleccione una especialidad', trigger: 'blur' },
  ],
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
