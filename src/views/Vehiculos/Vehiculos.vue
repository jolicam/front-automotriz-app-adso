<template>
  <LayoutMain>
    <template #slotLayout>
      <Header :titulo="'Vehículos'" :tituloBoton="'Crear Vehículo'" :abrir="abrirFormulario" />

      <Formulario :titulo="'Gestión de Vehículos'" v-model:is-open="mostrarFormulario" :is-edit="editandoFormulario" @save="guardarDatos">
        <template #slotForm>
          <el-row :gutter="20">
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <formVehiculos v-model:is-open="mostrarFormulario" :is-edit="editandoFormulario" ref="formRef" />
            </el-col>
          </el-row>
        </template>
      </Formulario>

      <el-table :data="vehiculos" stripe style="width: 100%">
        <el-table-column prop="placa" label="Placa" />
        <el-table-column prop="marca" label="Marca" />
        <el-table-column prop="modelo" label="Modelo" />
        <el-table-column prop="año" label="Año" />
        <el-table-column prop="cliente_id" label="ID Cliente" />
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
import LayoutMain from '../../components/LayoutMain.vue'
import Formulario from '../../components/Formulario.vue'
import Header from '../../components/Header.vue'
import { Delete, Edit } from "@element-plus/icons-vue"
import formVehiculos from "./components/formVehiculos.vue" // Asegúrate de que este nombre es correcto
import { ElMessage } from 'element-plus'
import axios from 'axios'

const mostrarFormulario = ref(false)
const editandoFormulario = ref(false)
const formRef = ref()
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
    await crearVehiculo()
  }
}

const crearVehiculo = async () => {
  const url = 'http://127.0.0.1:8000/api/vehiculo/save'

  const dataFormulario = {
    placa: formRef.value.formulario.placa,
    marca: formRef.value.formulario.marca,
    modelo: formRef.value.formulario.modelo,
    año: formRef.value.formulario.año,
    cliente_id: formRef.value.formulario.cliente_id
  }

  try {
    await axios.post(url, dataFormulario)
      .then((response) => {
        console.log(response)
        formRef.value?.limpiarFormulario()
        ElMessage({
          message: 'El vehículo se creó con éxito.',
          type: 'success',
        })
        cargarVehiculos()
        mostrarFormulario.value = false
      })
      .catch((error) => {
        console.log(error)
      })
  } catch (error) {
    console.error('Error al crear vehículo', error)
  }
}

const eliminarVehiculo = async () => {
  console.log('Vehículo eliminado')
}

const cargarVehiculos = async () => {
  const url = 'http://127.0.0.1:8000/api/vehiculo/datos'

  try {
    await axios.get(url)
      .then((response) => {
        vehiculos.value = response.data.result
        console.log(response)
      })
      .catch((error) => {
        console.log(error)
      })
  } catch (error) {
    console.error('Error al cargar datos de vehículos', error)
  }
}

onMounted(() => {
  cargarVehiculos()
})
</script>
