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

    <el-form-item label="Teléfono" prop="telefono">
      <el-input v-model="formulario.telefono" />
    </el-form-item>
    <el-form-item label="Correo Electrónico" prop="email">
      <el-input v-model="formulario.email" />
    </el-form-item>
  </el-form>
</template>

<script setup>
import { reactive, ref, watch } from 'vue';

// Propiedad para pasar los datos desde el componente padre
const propiedad = defineProps({
  dataValue: Object,
});

const formSize = ref('default');
const formRef = ref();

// El modelo de datos del formulario
const formulario = reactive({
  nombre: '',
  apellido: '',
  identificacion: '',
  telefono: '',
  email: '',
});

// Función para asignar los datos del formulario
const datosFormulario = () => {
  formulario.nombre = propiedad.dataValue[0]?.nombre || '';
  formulario.apellido = propiedad.dataValue[0]?.apellido || '';
  formulario.identificacion = propiedad.dataValue[0]?.identificacion || '';
  formulario.telefono = propiedad.dataValue[0]?.telefono || '';
  formulario.email = propiedad.dataValue[0]?.correo_electronico || '';
};

// Reglas de validación para el formulario
const rulesForm = reactive({
  nombre: [{ required: true, message: 'Por favor ingrese el nombre', trigger: 'blur' }],
  apellido: [{ required: true, message: 'Por favor ingrese el apellido', trigger: 'blur' }],
  identificacion: [{ required: true, message: 'Por favor ingrese la identificación', trigger: 'blur' }],
  direccion: [{ required: true, message: 'Por favor ingrese la dirección', trigger: 'blur' }],
  telefono: [{ required: true, message: 'Por favor ingrese el teléfono', trigger: 'blur' }],
  email: [{ required: true, message: 'Por favor ingrese el correo electrónico', trigger: 'blur' }],
});

// Función para limpiar el formulario
const limpiarFormulario = () => {
  formRef.value.resetFields();
};

// Función para validar el formulario
const validarFormulario = () => {
  return new Promise((resolve) => {
    formRef.value?.validate((valid) => {
      if (valid) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
};

// Verificar si los datos del formulario han cambiado
watch(
  () => propiedad.dataValue,
  (newData) => {
    datosFormulario();
  }
);

// Exposición de métodos y datos
defineExpose({ validarFormulario, formulario, limpiarFormulario });
</script>

<style scoped>
</style>
