<template>
  <LayoutMain>
    <template #slotLayout>
      <Header :titulo="'Servicios Mecánicos'" :tituloBoton="'Crear Servicio Mecánico'" :abrir="abrirFormulario" />

      <Formulario :titulo="'Gestión de Servicios Mecánicos'" v-model:is-open="mostrarFormulario" :is-edit="editandoFormulario" @save="guardarDatos" @update="actualizarDatos">
        <template #slotForm>
          <el-row :gutter="20">
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <formServiciosMecanicos v-model:is-open="mostrarFormulario" :is-edit="editandoFormulario" ref="formRef" :servicios="servicios" :mecanicos="mecanicos" :repuestos="repuestos" />
            </el-col>
          </el-row>
        </template>
      </Formulario>

      <el-table :data="serviciosMecanicos" stripe style="width: 100%">
        <el-table-column prop="servicio_id" label="ID Servicio" />
        <el-table-column prop="mecanico_id" label="ID Mecánico" />
        <el-table-column prop="repuesto_id" label="ID Repuesto" />
        <el-table-column fixed="right" label="Acciones" min-width="120">
          <template #default="registro">
            <el-button link type="primary" size="large" :icon="Edit" @click="editarFormulario(registro.row.servicio_id)" />
            <el-button link type="danger" :icon="Delete" @click="eliminarServicioMecanico(registro.row.servicio_id)" />
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
import formServiciosMecanicos from "./components/formServiciosMecanicos.vue"
import { ElMessage, ElMessageBox } from 'element-plus'
import axios from 'axios'

const mostrarFormulario = ref(false)
const editandoFormulario = ref(false)
const formRef = ref()
const serviciosMecanicos = ref([])  // Aquí se almacenan los servicios mecánicos
const servicios = ref([])           // Servicios disponibles
const mecanicos = ref([])           // Mecánicos disponibles
const repuestos = ref([])           // Repuestos disponibles
const dataServicioById = ref()      // Datos de un servicio por ID

const abrirFormulario = () => {
  mostrarFormulario.value = true
  editandoFormulario.value = false
}

const editarFormulario = async (id) => {
  dataServicioById.value = await obtenerServicioPorId(id)
  mostrarFormulario.value = true
  editandoFormulario.value = true
}

const guardarDatos = async () => {
  const validacion = await formRef.value?.validarFormulario()
  if (validacion) {
    await crearServicioMecanico()
  }
}

const actualizarDatos = async () => {
  const validacion = await formRef.value?.validarFormulario()
  if (validacion) {
    await actualizarServicioMecanico()
  }
}

const crearServicioMecanico = async () => {
  const url = 'http://127.0.0.1:8000/api/serviciomecanico/save'

  const dataFormulario = {
    servicio_id: formRef.value.formulario.servicio_id,
    mecanico_id: formRef.value.formulario.mecanico_id,
    repuesto_id: formRef.value.formulario.repuesto_id
  }

  try {
    await axios.post(url, dataFormulario)
      .then((response) => {
        console.log(response)
        formRef.value?.limpiarFormulario()
        ElMessage({
          message: 'El servicio mecánico se creó con éxito.',
          type: 'success',
        })
        cargarServiciosMecanicos()
        mostrarFormulario.value = false
      })
      .catch((error) => {
        console.log(error)
      })
  } catch (error) {
    console.error('Error al crear servicio mecánico', error)
  }
}

const actualizarServicioMecanico = async () => {
  const url = 'http://127.0.0.1:8000/api/serviciomecanico/update'

  const dataFormulario = {
    id: dataServicioById.value.servicio_id,
    servicio_id: formRef.value.formulario.servicio_id,
    mecanico_id: formRef.value.formulario.mecanico_id,
    repuesto_id: formRef.value.formulario.repuesto_id
  }

  try {
    await axios.put(url, dataFormulario)
      .then((response) => {
        console.log(response)
        formRef.value?.limpiarFormulario()
        ElMessage({
          message: 'El servicio mecánico se actualizó con éxito.',
          type: 'success',
        })
        cargarServiciosMecanicos()
        mostrarFormulario.value = false
      })
      .catch((error) => {
        console.log(error)
      })
  } catch (error) {
    console.error('Error al actualizar servicio mecánico', error)
  }
}

const eliminarServicioMecanico = async (id) => {
  const url = 'http://127.0.0.1:8000/api/serviciomecanico/delete'

  ElMessageBox.confirm(
    '¿Está seguro de eliminar este servicio mecánico?',
    'Eliminar Registro',
    {
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar',
      type: 'error',
    }
  )
    .then(() => {
      axios.delete(url, { data: { id } })
        .then(() => {
          cargarServiciosMecanicos()
          ElMessage({
            type: 'success',
            message: 'El servicio mecánico fue eliminado con éxito.',
          })
        })
        .catch((error) => {
          console.log(error)
        })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: 'Eliminación cancelada',
      })
    })
}

const cargarServiciosMecanicos = async () => {
  const url = 'http://127.0.0.1:8000/api/serviciomecanico/datos'

  try {
    await axios.get(url)
      .then((response) => {
        serviciosMecanicos.value = response.data.result
      })
      .catch((error) => {
        console.log(error)
      })
  } catch (error) {
    console.error('Error al cargar datos de servicios mecánicos', error)
  }
}

const obtenerServicioPorId = async (id) => {
  const url = 'http://127.0.0.1:8000/api/serviciomecanico/datosById'

  try {
    const response = await axios.get(url, { params: { id } })
    return response.data.result
  } catch (error) {
    console.error('Error al obtener servicio por ID', error)
  }
}

const cargarServicios = async () => {
  const url = 'http://127.0.0.1:8000/api/servicio/datos'

  try {
    await axios.get(url)
      .then((response) => {
        servicios.value = response.data.result
      })
      .catch((error) => {
        console.log(error)
      })
  } catch (error) {
    console.error('Error al cargar servicios', error)
  }
}

const cargarMecanicos = async () => {
  const url = 'http://127.0.0.1:8000/api/mecanicos/datos'

  try {
    await axios.get(url)
      .then((response) => {
        mecanicos.value = response.data.result
      })
      .catch((error) => {
        console.log(error)
      })
  } catch (error) {
    console.error('Error al cargar mecánicos', error)
  }
}

const cargarRepuestos = async () => {
  const url = 'http://127.0.0.1:8000/api/repuestos/datos'

  try {
    await axios.get(url)
      .then((response) => {
        repuestos.value = response.data.result
      })
      .catch((error) => {
        console.log(error)
      })
  } catch (error) {
    console.error('Error al cargar repuestos', error)
  }
}

onMounted(() => {
  cargarServiciosMecanicos()
  cargarServicios()
  cargarMecanicos()
  cargarRepuestos()
})
</script>
