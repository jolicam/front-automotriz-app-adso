<template>
    <div>
      <h1>Formulario de Servicios Mecanicos</h1>
      <form @submit.prevent="submitForm">
        <div>
          <label for="servicio">Servicio:</label>
          <input type="text" id="servicio" v-model="formData.servicio" required />
        </div>
        <div>
          <label for="mecanico">Mecánico:</label>
          <input type="text" id="mecanico" v-model="formData.mecanico" required />
        </div>
        <button type="submit">Guardar Servicio Mecanico</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const formData = ref({
    servicio: '',
    mecanico: '',
  });
  
  const submitForm = () => {
    console.log('Servicio mecanico guardado:', formData.value);
  };
  </script>
  
  <style scoped>
  </style>
  