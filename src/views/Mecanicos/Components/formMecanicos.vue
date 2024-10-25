<template>
  <div>
    <h1>Formulario de Mecánicos</h1>
    <form @submit.prevent="submitForm">
      <div>
        <label for="nombre">Nombre:</label>
        <input type="text" id="nombre" v-model="formData.nombre" required />
      </div>
      <div>
        <label for="apellido">Apellido:</label>
        <input type="text" id="apellido" v-model="formData.apellido" required />
      </div>
      <div>
        <label for="documento">Documento:</label>
        <input type="text" id="documento" v-model="formData.documento" required />
      </div>
      <div>
        <label for="especialidad">Especialidad:</label>
        <input type="text" id="especialidad" v-model="formData.especialidad" required />
      </div>
      <div>
        <label for="telefono">Teléfono:</label>
        <input type="tel" id="telefono" v-model="formData.telefono" required />
      </div>
      <button type="submit">Guardar Mecánico</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const formData = ref({
  nombre: '',
  apellido: '', 
  documento: '', 
  especialidad: '',
  telefono: '', 
});

const submitForm = () => {
  console.log('Mecánico guardado:', formData.value);
};
</script>

<style scoped>
</style>
