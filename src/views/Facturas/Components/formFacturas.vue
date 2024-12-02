<template>
  <el-form ref="formRef" style="max-width: 100%" :model="formulario" :rules="rulesForm" label-width="auto"
    :size="formSize" status-icon>
    
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
import { reactive, ref, watch } from 'vue'

const propiedad = defineProps({
  clientes: {
    type: Array,
    required: true,
  },
  dataValue: Object, // Para cargar los datos si es necesario
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

// Función para llenar los datos en el formulario (cuando se recibe `dataValue`)
const datosFormulario = () => {
  formulario.fecha = propiedad.dataValue?.fecha || '';
  formulario.total = propiedad.dataValue?.total || '';
  formulario.cliente_id = propiedad.dataValue?.cliente_id || '';
}

// Observador para detectar cambios en `dataValue`
watch(
  () => propiedad.dataValue,
  (newData) => {
    datosFormulario();
  }
);

defineExpose({ validarFormulario, formulario, limpiarFormulario })
</script>

<style scoped>
</style>
