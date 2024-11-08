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
    <el-form-item label="Fecha" prop="fecha">
      <el-date-picker v-model="formulario.fecha" type="date" placeholder="Seleccione una fecha" />
    </el-form-item>

    <el-form-item label="Total" prop="total">
      <el-input v-model="formulario.total" type="number" placeholder="Ingrese el total" />
    </el-form-item>

    <el-form-item label="Cliente" prop="cliente_id">
      <el-select v-model="formulario.cliente_id" placeholder="Seleccione un cliente">
        <el-option v-for="cliente in clientes" :key="cliente.id" :label="cliente.nombre" :value="cliente.id" />
      </el-select>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { reactive, ref } from 'vue'


const propiedad = defineProps({
  clientes: {
    type: Array,
    required: true,
  },
})

const formSize = ref('default')
const formRef = ref()
const formulario = reactive({
  fecha: '',
  total: '',
  cliente_id: '',
})

const rulesForm = reactive({
  fecha: [{ required: true, message: 'Por favor ingrese la fecha', trigger: 'blur' }],
  total: [{ required: true, message: 'Por favor ingrese el total', trigger: 'blur' }],
  cliente_id: [{ required: true, message: 'Por favor seleccione un cliente', trigger: 'blur' }],
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
