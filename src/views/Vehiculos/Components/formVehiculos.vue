<template>
    <div>
      <h1>Formulario de Vehículos</h1>
      <form @submit.prevent="submitForm">
        <div>
          <label for="marca">Marca:</label>
          <input type="text" id="marca" v-model="formData.marca" required />
        </div>
        <div>
          <label for="modelo">Modelo:</label>
          <input type="text" id="modelo" v-model="formData.modelo" required />
        </div>
        <div>
          <label for="anio">Año:</label>
          <input type="number" id="anio" v-model="formData.anio" required />
        </div>
        <button type="submit">Guardar Vehículo</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const formData = ref({
    marca: '',
    modelo: '',
    anio: '',
  });
  
  const submitForm = () => {
    console.log('Vehículo guardado:', formData.value);
  };
  </script>
  
  <style scoped>
  </style>
  