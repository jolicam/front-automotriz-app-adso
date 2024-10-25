<template>
    <div>
      <h1>Formulario de Repuestos</h1>
      <form @submit.prevent="submitForm">
        <div>
          <label for="nombre">Nombre del Repuesto:</label>
          <input type="text" id="nombre" v-model="formData.nombre" required />
        </div>
        <div>
          <label for="costo">Costo:</label>
          <input type="number" id="costo" v-model="formData.costo" required />
        </div>
        <button type="submit">Guardar Repuesto</button>
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
    console.log('Repuesto guardado:', formData.value);
  };
  </script>
  
  <style scoped>
  </style>
  