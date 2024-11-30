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
    <!-- Campo Placa -->
    <el-form-item label="Placa" prop="placa">
      <el-input v-model="formulario.placa" />
    </el-form-item>

    <!-- Campo Marca -->
    <el-form-item label="Marca" prop="marca">
      <el-input v-model="formulario.marca" />
    </el-form-item>

    <!-- Campo Modelo -->
    <el-form-item label="Modelo" prop="modelo">
      <el-input v-model="formulario.modelo" />
    </el-form-item>

    <!-- Campo Año -->
    <el-form-item label="Año" prop="año">
      <el-input v-model="formulario.año" />
    </el-form-item>

    <!-- Campo Cliente -->
    <el-form-item label="Cliente" prop="cliente_id">
      <el-select v-model="formulario.cliente_id" placeholder="Seleccione un cliente">
        <el-option v-for="cliente in clientes"
          :key="cliente.id"
          :label="cliente.nombre"
          :value="cliente.id"
        />
      </el-select>
    </el-form-item>



  </el-form>
</template>

<script setup>
import { reactive, ref , watch } from 'vue'

// Propiedades que reciben el listado de clientes y cargos
const propiedad = defineProps({
  clientes: {
    type: Array,
    required: true
  },
  dataValue:Object
});

const formSize = ref('default')
const formRef = ref()

// Estado reactivo para el formulario
const formulario = reactive({
  placa: '',
  marca: '',
  modelo: '',
  año: '',
  cliente_id: '',
  cargo_id: '' // Campo para seleccionar el cargo relacionado
})

  const datosFormulario =()=>{
    formulario.placa= propiedad.dataValue[0].placa
    formulario.marca= propiedad.dataValue[0].marca
    formulario.modelo= propiedad.dataValue[0].modelo
    formulario.año= propiedad.dataValue[0].año
    formulario.cliente_id= propiedad.dataValue[0].cliente_id
  }

// Reglas de validación
const rulesForm = reactive({
  placa: [
    { required: true, message: 'Por favor ingrese la placa', trigger: 'blur' }
  ],
  marca: [
    { required: true, message: 'Por favor ingrese la marca', trigger: 'blur' }
  ],
  modelo: [
    { required: true, message: 'Por favor ingrese el modelo', trigger: 'blur' }
  ],
  año: [
    { required: true, message: 'Por favor ingrese el año', trigger: 'blur' }
  ],
  cliente_id: [
    { required: true, message: 'Por favor seleccione un cliente', trigger: 'blur' }
  ],
  cargo_id: [
    { required: true, message: 'Por favor seleccione un cargo', trigger: 'blur' }
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
watch(
  () => propiedad.dataValue,
  (newData) => {
    datosFormulario();
  }
);
// Exponer las funciones necesarias para el componente
defineExpose({ validarFormulario, formulario, limpiarFormulario })
</script>

<style scoped>
</style>
