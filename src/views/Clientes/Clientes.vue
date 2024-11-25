<template>
  <LayoutMain>
    <template #slotLayout>
      <Header :titulo="'Clientes'" :tituloBoton="'Crear Cliente'" :abrir="abrirFormulario" />

      <Formulario :titulo="'Gestión de Clientes'" v-model:is-open="mostrarFormulario" :is-edit="editandoFormulario" @save="guardarDatos">
        <template #slotForm>
          <el-row :gutter="20">
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <FormClientes v-model:is-open="mostrarFormulario" :is-edit="editandoFormulario" ref="formRef" />
            </el-col>
          </el-row>
        </template>
      </Formulario>

      <el-table :data="clientes" stripe style="width: 100%">
        <el-table-column prop="nombre" label="Nombre" />
        <el-table-column prop="apellido" label="Apellido" />
        <el-table-column prop="identificacion" label="Identificación" />
        <el-table-column prop="telefono" label="Teléfono" />
        <el-table-column prop="correo_electronico" label="Correo Electrónico" />
        <el-table-column fixed="right" label="Acciones" min-width="120">
          <template #default="registro">
            <el-button link type="primary" size="large" :icon="Edit" @click="editarFormulario(registro.row.id)"></el-button>
            <el-button link type="danger" :icon="Delete" @click="eliminarCliente(registro.row.id)"></el-button>
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
import FormClientes from './components/FormClientes.vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import axios from 'axios'

const mostrarFormulario = ref(false)
const editandoFormulario = ref(false)
const formRef = ref()
const clientes = ref([])

const abrirFormulario = () => {
  mostrarFormulario.value = true
  editandoFormulario.value = false
}

const editarFormulario = async (id) => {
  // Obtener datos del cliente por ID
  const cliente = await obtenerCliente(id)
  // Cargar datos en el formulario
  formRef.value.formulario = cliente
  mostrarFormulario.value = true
  editandoFormulario.value = true
}

const guardarDatos = async () => {
  const validacion = await formRef.value?.validarFormulario()
  if (validacion) {
    if (editandoFormulario.value) {
      await actualizarCliente()
    } else {
      await crearCliente()
    }
  }
}

const crearCliente = async () => {
  const url = 'http://127.0.0.1:8000/api/cliente/save'
  const dataFormulario = {
    nombre: formRef.value.formulario.nombre,
    apellido: formRef.value.formulario.apellido,
    identificacion: formRef.value.formulario.identificacion,
    telefono: formRef.value.formulario.telefono,
    correo_electronico: formRef.value.formulario.correo_electronico
  }

  try {
    await axios.post(url, dataFormulario)
      .then((response) => {
        formRef.value?.limpiarFormulario()
        ElMessage({
          message: 'El cliente se creó con éxito.',
          type: 'success',
        })
        datosCliente()
        mostrarFormulario.value = false
      })
      .catch((error) => {
        console.log(error)
      })
  } catch (error) {
    console.error('Error al crear cliente', error)
  }
}

const actualizarCliente = async () => {
  const url = 'http://127.0.0.1:8000/api/cliente/update'
  const dataFormulario = {
    id: formRef.value.formulario.id,
    nombre: formRef.value.formulario.nombre,
    apellido: formRef.value.formulario.apellido,
    identificacion: formRef.value.formulario.identificacion,
    telefono: formRef.value.formulario.telefono,
    correo_electronico: formRef.value.formulario.correo_electronico
  }

  try {
    await axios.put(url, dataFormulario)
      .then((response) => {
        formRef.value?.limpiarFormulario()
        ElMessage({
          message: 'El cliente se actualizó con éxito.',
          type: 'success',
        })
        datosCliente()
        mostrarFormulario.value = false
      })
      .catch((error) => {
        console.log(error)
      })
  } catch (error) {
    console.error('Error al actualizar cliente', error)
  }
}

const eliminarCliente = async (id) => {
  const url = 'http://127.0.0.1:8000/api/cliente/delete'

  ElMessageBox.confirm(
    '¿Está seguro de eliminar este cliente?',
    'Eliminar Cliente',
    {
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar',
      type: 'error',
    }
  ).then(() => {
    axios.delete(url, { data: { id } })
      .then((response) => {
        datosCliente() // Recargar la lista
        ElMessage({
          type: 'success',
          message: 'Cliente eliminado correctamente',
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }).catch(() => {
    ElMessage({
      type: 'info',
      message: 'Eliminación cancelada',
    })
  })
}

const obtenerCliente = async (id) => {
  const url = `http://127.0.0.1:8000/api/cliente/${id}`
  const response = await axios.get(url)
  return response.data
}

const datosCliente = async () => {
  const url = 'http://127.0.0.1:8000/api/clientes'
  const response = await axios.get(url)
  clientes.value = response.data
}

onMounted(() => {
  datosCliente()
})
</script>
