<template>
  <div>
    <h1>Formulario de Clientes</h1>
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
        <label for="identificacion">Identificación:</label>
        <input type="text" id="identificacion" v-model="formData.identificacion" required />
      </div>
      <div>
        <label for="direccion">Dirección:</label>
        <input type="text" id="direccion" v-model="formData.direccion" required />
      </div>
      <div>
        <label for="telefono">Teléfono:</label>
        <input type="tel" id="telefono" v-model="formData.telefono" required />
      </div>
      <div>
        <label for="email">Correo Electrónico:</label>
        <input type="email" id="email" v-model="formData.email" required />
      </div>
      <button type="submit">Guardar Cliente</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const formData = ref({
  nombre: '',
  apellido: '',
  identificacion: '',
  direccion: '',
  telefono: '',
  email: '',
});

const submitForm = () => {
  console.log('Cliente guardado:', formData.value);
};
</script>

<style scoped>

</style>
