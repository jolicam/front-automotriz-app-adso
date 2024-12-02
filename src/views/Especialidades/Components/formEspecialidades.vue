<template>
  <el-form ref="formRef" style="max-width: 100%" :model="formulario" :rules="rulesForm" label-width="auto"
    :size="formSize" status-icon>
    <el-form-item label="Nombre de Especialidad" prop="nombre_especialidad">
      <el-input v-model="formulario.nombre_especialidad" />
    </el-form-item>
  </el-form>|
</template>

<script setup>
import { onMounted, reactive, ref, watch } from 'vue'

const propiedad = defineProps({
  dataValue: Object,
});

const formSize = ref('default');
const formRef = ref();

const formulario = reactive({
  id: '',
  nombre_especialidad: '',
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

// Función para llenar los datos del formulario si se reciben datos para editar
const datosFormulario = () => {
  if (propiedad.dataValue) {
    formulario.id = propiedad.dataValue.id || '';  // Asegurarse de asignar el ID en la edición
    formulario.nombre_especialidad = propiedad.dataValue.nombre_especialidad;
  }
};

watch(
  () => propiedad.dataValue,
  (newData) => {
    datosFormulario();
  }
);

defineExpose({ validarFormulario, formulario, limpiarFormulario });
</script>

<style scoped>
</style>
