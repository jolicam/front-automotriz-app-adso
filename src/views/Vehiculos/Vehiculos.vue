<template>
    <LayoutMain>
      <template #slotLayout>
        <!-- Encabezado -->
        <Header :titulo="'Vehículos'" :tituloBoton="'Crear Vehículo'" :abrir="abrirFormulario" />
  
        <!-- Formulario de Vehículo -->
        <Formulario :titulo="'Gestión de Vehículos'" v-model:is-open="mostrarFormulario" :is-edit="editandoFormulario"
          @save="guardarDatos">
          <template #slotForm>
            <el-row :gutter="20">
              <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <FormVehiculo v-model:is-open="mostrarFormulario" :is-edit="editandoFormulario" ref="formRef"
                  :marcas="marcas" :tipos="tipos" />
              </el-col>
            </el-row>
          </template>
        </Formulario>
  
        <!-- Tabla de Vehículos -->
        <el-table :data="vehiculos" stripe style="width: 100%">
          <el-table-column prop="placa" label="Placa" />
          <el-table-column prop="marca" label="Marca" />
          <el-table-column prop="tipo" label="Tipo" />
          <el-table-column prop="anio" label="Año" />
          <el-table-column fixed="right" label="Acciones" min-width="120">
            <template #default>
              <el-button link type="primary" size="large" :icon="Edit" @click="editarFormulario"></el-button>
              <el-button link type="danger" :icon="Delete" @click="eliminarVehiculo"></el-button>
            </template>
          </el-table-column>
        </el-table>
  
      </template>
    </LayoutMain>
  </template>
  
  <script lang="ts" setup>
  import { onMounted, ref } from 'vue'
  import LayoutMain from '../../components/LayoutMain.vue';
  import Formulario from '../../components/Formulario.vue';
  import Header from '../../components/Header.vue';
  import { Delete, Edit } from "@element-plus/icons-vue"
  import { ElMessage } from 'element-plus'
  import formVehiculos from '../../components/formVehiculos.vue';

  
  // Variables de control
  const mostrarFormulario = ref(false)
  const editandoFormulario = ref(false)
  const formRef = ref()
  const marcas = ref([])
  const tipos = ref([])
  const vehiculos = ref([])
  
  
  const abrirFormulario = () => {
    mostrarFormulario.value = true
    editandoFormulario.value = false
  }
  

  const editarFormulario = async () => {
    mostrarFormulario.value = true
    editandoFormulario.value = true
  }
  
  
  const guardarDatos = async () => {
    const validacion = await formRef.value?.validarFormulario()
    if (validacion) {
      if (editandoFormulario.value) {
        await actualizarVehiculo()
      } else {
        await crearVehiculo()
      }
    }
  }
  
  // Función para crear un vehículo
  const crearVehiculo = async () => {
    const url = 'http://127.0.0.1:8000/api/vehiculos/save'
    const dataFormulario = {
      placa: formRef.value.formulario.placa,
      marca: formRef.value.formulario.marca,
      tipo: formRef.value.formulario.tipo,
      anio: formRef.value.formulario.anio,
    }
  
    try {
      axios.post(url, dataFormulario)
        .then(function (response) {
          ElMessage({
            message: 'El vehículo se creó con éxito.',
            type: 'success',
          })
          formRef.value?.limpiarFormulario()
          datosVehiculo()
          mostrarFormulario.value = false
        })
        .catch(function (error) {
          console.log(error);
        });
  
    } catch (error) {
      console.error('Error al crear vehículo', error)
    }
  }
  
  // Función para actualizar un vehículo
  const actualizarVehiculo = async () => {
    const url = 'http://127.0.0.1:8000/api/vehiculos/update'
    const dataFormulario = {
      id: formRef.value.formulario.id,
      placa: formRef.value.formulario.placa,
      marca: formRef.value.formulario.marca,
      tipo: formRef.value.formulario.tipo,
      anio: formRef.value.formulario.anio,
    }
  
    try {
      axios.put(url, dataFormulario)
        .then(function (response) {
          ElMessage({
            message: 'El vehículo se actualizó con éxito.',
            type: 'success',
          })
          datosVehiculo()
          mostrarFormulario.value = false
        })
        .catch(function (error) {
          console.log(error);
        });
  
    } catch (error) {
      console.error('Error al actualizar vehículo', error)
    }
  }
  
  // Función para eliminar un vehículo
  const eliminarVehiculo = async (id: string) => {
    const url = `http://127.0.0.1:8000/api/vehiculos/delete/${id}`
  
    try {
      axios.delete(url)
        .then(function (response) {
          ElMessage({
            message: 'El vehículo se eliminó con éxito.',
            type: 'success',
          })
          datosVehiculo()
        })
        .catch(function (error) {
          console.log(error);
        });
  
    } catch (error) {
      console.error('Error al eliminar vehículo', error)
    }
  }
  
  // Función para obtener los datos de los vehículos
  const datosVehiculo = async () => {
    const url = 'http://127.0.0.1:8000/api/vehiculos/datos'
  
    try {
      axios.get(url)
        .then(function (response) {
          vehiculos.value = response.data.result
        })
        .catch(function (error) {
          console.log(error);
        });
  
    } catch (error) {
      console.error('Error al obtener los vehículos', error)
    }
  }
  
 
  const getMarcasYTipos = async () => {
    const urlMarcas = 'http://127.0.0.1:8000/api/marcas/datos'
    const urlTipos = 'http://127.0.0.1:8000/api/tipos/datos'
  
    try {
      axios.get(urlMarcas)
        .then(function (response) {
          marcas.value = response.data.result
        })
        .catch(function (error) {
          console.log(error);
        });
  
      axios.get(urlTipos)
        .then(function (response) {
          tipos.value = response.data.result
        })
        .catch(function (error) {
          console.log(error);
        });
  
    } catch (error) {
      console.error('Error al obtener marcas o tipos', error)
    }
  }
  
 
  onMounted(() => {
    getMarcasYTipos()
    datosVehiculo()
  })
  
  </script>
  
  