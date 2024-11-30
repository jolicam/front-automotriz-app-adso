<template>
  <el-form ref="formRef" style="max-width: 100%" :model="formulario" :rules="rulesForm" label-width="auto"
    :size="formSize" status-icon>
    <el-form-item label="Nombre de Especialidad" prop="nombre_especialidad">
      <el-input v-model="formulario.nombre_especialidad" />
    </el-form-item>
  </el-form>
</template>

<script setup>
import { reactive, ref, watch } from 'vue'

const propiedad = defineProps({
  dataValue: Object, // Usado si deseas pre-llenar el formulario
});

const formSize = ref('default');
const formRef = ref();

const formulario = reactive({
  nombre_especialidad: '', // Solo un campo en este caso
});

// Reglas de validación
const rulesForm = reactive({
  nombre_especialidad: [
    { required: true, message: 'Por favor ingrese el nombre de la especialidad', trigger: 'blur' },
  ],
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

// Si se reciben datos para editar, llenar el formulario automáticamente
watch(
  () => propiedad.dataValue,
  (newData) => {
    if (newData) {
      formulario.nombre_especialidad = newData.nombre_especialidad;
    }
  }
);

defineExpose({ validarFormulario, formulario, limpiarFormulario });
</script>

<style scoped>
</style>
