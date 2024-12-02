<template>
  <LayoutMain>
    <template #slotLayout>
      <Header :titulo="'Vehículos'" :tituloBoton="'Crear Vehículo'" :abrir="abrirFormulario" />

      <Formulario :titulo="'Gestión de Vehículos'" v-model:is-open="mostrarFormulario" :is-edit="editandoFormulario" @save="guardarDatos" @update="actualizarDatos">
        <template #slotForm>
          <el-row :gutter="20">
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <formVehiculos v-model:is-open="mostrarFormulario" :is-edit="editandoFormulario" ref="formRef" :clientes="clientes" :dataValue="dataVehiculoById" />
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
          <template #default="registro">
            <el-button link type="primary" size="large" :icon="Edit" @click="editarFormulario(registro.row.id)"></el-button>
            <el-button link type="danger" :icon="Delete" @click="eliminarVehiculo(registro.row.id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </LayoutMain>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import LayoutMain from '../../components/LayoutMain.vue'
import Formulario from '../../components/Formulario.vue'
import Header from '../../components/Header.vue'
import { Delete, Edit } from "@element-plus/icons-vue"
import formVehiculos from './Components/formVehiculos.vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import axios from 'axios'

const mostrarFormulario = ref(false)
const editandoFormulario = ref(false)
const formRef = ref()
const dataVehiculoById = ref()
const clientes = ref([]) // Cambiado a clientes para el vehículo
const vehiculos = ref([]) // Cambiado de cargos a vehiculos

const abrirFormulario = () => {
  mostrarFormulario.value = true
  editandoFormulario.value = false
}

const editarFormulario = async (id) => {
  dataVehiculoById.value = await datosById(id) // Llamamos a datosById para cargar los datos del vehículo
  mostrarFormulario.value = true
  editandoFormulario.value = true
}

const guardarDatos = async () => {
  const validacion = await formRef.value?.validarFormulario()
  if (validacion) {
    await crearVehiculo()
  }
}
const actualizarDatos = async () => {
  const validacion = await formRef.value?.validarFormulario()
  if (validacion) {
    await actualizarVehiculo()
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

const actualizarVehiculo = async () => {
  const url = 'http://127.0.0.1:8000/api/vehiculo/update'

  const dataFormulario = {
    id: dataVehiculoById.value[0].id,
    placa: formRef.value.formulario.placa,
    marca: formRef.value.formulario.marca,
    modelo: formRef.value.formulario.modelo,
    año: formRef.value.formulario.año,
    cliente_id: formRef.value.formulario.cliente_id
  }

  try {
    await axios.put(url, dataFormulario)
      .then((response) => {
        console.log(response)
        formRef.value?.limpiarFormulario()
        ElMessage({
          message: 'El vehículo se actualizó con éxito.',
          type: 'success',
        })
        cargarVehiculos()
        mostrarFormulario.value = false
      })
      .catch((error) => {
        console.log(error)
      })
  } catch (error) {
    console.error('Error al actualizar vehículo', error)
  }
}
const obtenerClientes = async () => {
  const url = 'http://127.0.0.1:8000/api/cliente/getData'
  try {
    axios.get(url)
      .then((response) => {
        clientes.value = response.data.result
      })
      .catch((error) => {
        console.log(error)
      })
  } catch (error) {
    console.error('Error al obtener clientes', error)
  }
}
const eliminarVehiculo = async (id) => {
  const url = 'http://127.0.0.1:8000/api/vehiculo/delete'

  ElMessageBox.confirm(
    '¿Está seguro de eliminar este vehículo?',
    'Eliminar Registro',
    {
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar',
      type: 'error',
    }
  )
    .then(() => {
      try {
        axios.delete(url, { data: { id } })
          .then(function (response) {
            cargarVehiculos()
          })
          .catch(function (error) {
            console.log(error)
          })
      } catch (error) {
        console.error('Error al eliminar vehículo', error)
      }
      ElMessage({
        type: 'success',
        message: 'Se eliminó correctamente el vehículo',
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: 'Eliminación cancelada',
      })
    })
}

const cargarVehiculos = async () => {
  const url = 'http://127.0.0.1:8000/api/vehiculo/getData'

  try {
    await axios.get(url)
      .then((response) => {
        vehiculos.value = response.data.result
      })
      .catch((error) => {
        console.log(error)
      })
  } catch (error) {
    console.error('Error al cargar vehículos', error)
  }
}



// Aquí implementamos la función `datosById` para obtener los datos de un vehículo por su ID
const datosById = async (id) => {
  const url = `http://127.0.0.1:8000/api/vehiculo/getDataById`
  try {
    const response = await axios.get(url, {
      params: {
        id: id
      }
    })
    return response.data.result
  } catch (error) {
    console.error('Error al obtener vehiculo por ID', error)
  }

}

const obtenerVehiculos = async () => {
  const url = 'http://127.0.0.1:8000/api/vehiculos/getData'
  try {
    axios.get(url)
      .then((response) => {
        vehiculos.value = response.data.result
      })
      .catch((error) => {
        console.log(error)
      })
  } catch (error) {
    console.error('Error al obtener vehiculos', error)
  }
}
  


onMounted(() => {
  cargarVehiculos()
 obtenerClientes() // Cargamos los clientes al montar el componente
})
</script>
