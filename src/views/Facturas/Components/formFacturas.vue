<template>
  <div>
    <h1>Formulario de Facturas</h1>
    <form @submit.prevent="submitForm">
      <div>
        <label for="cliente">Cliente:</label>
        <input type="text" id="cliente" v-model="formData.cliente" required />
      </div>
      <div>
        <label for="monto">Monto:</label>
        <input type="number" id="monto" v-model="formData.monto" required />
      </div>
      <div>
        <label for="fecha">Fecha:</label>
        <input type="date" id="fecha" v-model="formData.fecha" required />
      </div>
      <button type="submit">Guardar Factura</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const formData = ref({
  cliente: '',
  monto: 0,
  fecha: '', 
});

const submitForm = () => {
  console.log('Factura guardada:', formData.value);
};
</script>

<style scoped>
</style>
