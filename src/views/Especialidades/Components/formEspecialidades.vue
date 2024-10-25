<template>
    <div>
      <h1>Formulario de Especialidades</h1>
      <form @submit.prevent="submitForm">
        <div>
          <label for="nombre">Nombre de Especialidad:</label>
          <input type="text" id="nombre" v-model="formData.nombre" required />
        </div>
        <button type="submit">Guardar Especialidad</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const formData = ref({
    nombre: '',
  });
  
  const submitForm = () => {
    console.log('Especialidad guardada:', formData.value);
  };
  </script>
  
  <style scoped>
  
  </style>
  