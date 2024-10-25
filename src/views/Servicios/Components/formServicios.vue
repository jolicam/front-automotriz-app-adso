<template>
    <div>
      <h1>Formulario de Servicios</h1>
      <form @submit.prevent="submitForm">
        <div>
          <label for="nombre">Nombre del Servicio:</label>
          <input type="text" id="nombre" v-model="formData.nombre" required />
        </div>
        <div>
          <label for="costo">Costo:</label>
          <input type="number" id="costo" v-model="formData.costo" required />
        </div>
        <button type="submit">Guardar Servicio</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const formData = ref({
    nombre: '',
    costo: 0,
  });
  
  const submitForm = () => {
    console.log('Servicio guardado:', formData.value);
  };
  </script>
  
  <style scoped>
  </style>
  