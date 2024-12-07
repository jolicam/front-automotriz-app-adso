<template>
  <LayoutMain>
    <template #slotLayout>
      <Header :titulo="'Servicios'" :tituloBoton="'Crear Servicio'" :abrir="abrirFormulario" />
  
      <Formulario :titulo="'Gestión de Servicios'" v-model:is-open="mostrarFormulario" :is-edit="editandoFormulario" @save="guardarDatos">
        <template #slotForm>
          <el-row :gutter="20">
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <FormServicios v-model:is-open="mostrarFormulario" :is-edit="editandoFormulario" ref="formRef" :vehiculos="vehiculos" :mecanicos="mecanicos" />
            </el-col>
          </el-row>
        </template>
      </Formulario>
  
      <el-table :data="servicios" stripe style="width: 100%">
        <el-table-column prop="descripcion" label="Descripción" />
        <el-table-column prop="costo" label="Costo" />
        <el-table-column prop="fecha" label="Fecha" />
        <el-table-column prop="vehiculo_placa" label="Vehículo" />
        <el-table-column prop="mecanico_id" label="Mecánico" />
        <el-table-column fixed="right" label="Acciones" min-width="120">
          <template #default="{ row }">
            <el-button link type="primary" size="large" :icon="Edit" @click="editarFormulario(row)">Editar</el-button>
            <el-button link type="danger" :icon="Delete" @click="eliminarServicio(row.id)">Eliminar</el-button>
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
import FormServicios from './Components/formServicios.vue'
import { Delete, Edit } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import axios from 'axios'

const mostrarFormulario = ref(false)
const editandoFormulario = ref(false)
const formRef = ref()
const vehiculos = ref([]) // List of vehicles
const mecanicos = ref([]) // List of mechanics
const servicios = ref([]) // List of services
const servicioSeleccionado = ref()

const abrirFormulario = () => {
  mostrarFormulario.value = true
  editandoFormulario.value = false
  servicioSeleccionado.value = null
}

const editarFormulario = async (row) => {
  mostrarFormulario.value = true
  editandoFormulario.value = true
  servicioSeleccionado.value = row
  // Llamamos a la función para obtener los datos del servicio por ID
  await getServicioById(row.id)
}

const getServicioById = async (id) => {
  const url = `http://127.0.0.1:8000/api/servicio/${id}`
  
  try {
    const response = await axios.get(url)
    const servicio = response.data.result
    // Asignamos los datos al formulario para editar
    formRef.value.formulario = servicio
  } catch (error) {
    console.error('Error al obtener el servicio por ID', error)
    ElMessage.error('Error al obtener los datos del servicio')
  }
}

const guardarDatos = async () => {
  const validacion = await formRef.value?.validarFormulario()
  if (validacion) {
    if (editandoFormulario.value) {
      await actualizarServicio()
    } else {
      await crearServicio()
    }
  }
}

const crearServicio = async () => {
  const url = 'http://127.0.0.1:8000/api/servicio/save'
  const dataFormulario = {
    descripcion: formRef.value.formulario.descripcion,
    costo: formRef.value.formulario.costo, // Ensuring the cost is sent to the backend
    fecha: formRef.value.formulario.fecha,
    vehiculo_placa: formRef.value.formulario.vehiculo_placa,
    mecanico_id: formRef.value.formulario.mecanico_id
  }

  try {
    const response = await axios.post(url, dataFormulario)
    formRef.value?.limpiarFormulario()
    ElMessage({
      message: 'El servicio se creó con éxito.',
      type: 'success',
    })
    datosServicio()
    mostrarFormulario.value = false
  } catch (error) {
    console.error('Error al crear servicio', error)
    ElMessage.error('Error al crear el servicio')
  }
}

const actualizarServicio = async () => {
  const url = `http://127.0.0.1:8000/api/servicio/update/${servicioSeleccionado.value.id}`
  const dataFormulario = {
    descripcion: formRef.value.formulario.descripcion,
    costo: formRef.value.formulario.costo, // Ensuring the cost is updated
    fecha: formRef.value.formulario.fecha,
    vehiculo_placa: formRef.value.formulario.vehiculo_placa,
    mecanico_id: formRef.value.formulario.mecanico_id
  }

  try {
    const response = await axios.put(url, dataFormulario)
    formRef.value?.limpiarFormulario()
    ElMessage({
      message: 'El servicio se actualizó con éxito.',
      type: 'success',
    })
    datosServicio()
    mostrarFormulario.value = false
  } catch (error) {
    console.error('Error al actualizar servicio', error)
    ElMessage.error('Error al actualizar el servicio')
  }
}

const eliminarServicio = async (id) => {
  const url = `http://127.0.0.1:8000/api/servicio/delete/${id}`

  try {
    const response = await axios.delete(url)
    ElMessage({
      message: 'El servicio se eliminó con éxito.',
      type: 'success',
    })
    datosServicio()
  } catch (error) {
    console.error('Error al eliminar servicio', error)
    ElMessage.error('Error al eliminar el servicio')
  }
}

const datosServicio = async () => {
  const url = 'http://127.0.0.1:8000/api/servicio/datos'
  try {
    const response = await axios.get(url)
    servicios.value = response.data.result
  } catch (error) {
    console.error('Error al obtener datos de servicios', error)
  }
}

const getVehiculos = async () => {
  const url = 'http://127.0.0.1:8000/api/vehiculos/datos'
  try {
    const response = await axios.get(url)
    vehiculos.value = response.data.result
  } catch (error) {
    console.error('Error al obtener vehículos', error)
  }
}

const getMecanicos = async () => {
  const url = 'http://127.0.0.1:8000/api/mecanicos/datos'
  try {
    const response = await axios.get(url)
    mecanicos.value = response.data.result
  } catch (error) {
    console.error('Error al obtener mecánicos', error)
  }
}

onMounted(() => {
  getVehiculos()
  getMecanicos()
  datosServicio()
})
</script>
