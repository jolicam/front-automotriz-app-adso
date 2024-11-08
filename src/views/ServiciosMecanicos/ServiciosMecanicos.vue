<template>
  <LayoutMain>
    <template #slotLayout>
      <Header :titulo="'Servicios Mecánicos'" :tituloBoton="'Crear Servicio Mecánico'" :abrir="abrirFormulario" />

      <Formulario :titulo="'Gestión de Servicios Mecánicos'" v-model:is-open="mostrarFormulario" :is-edit="editandoFormulario" @save="guardarDatos">
        <template #slotForm>
          <el-row :gutter="20">
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <formServiciosMecanicos v-model:is-open="mostrarFormulario" :is-edit="editandoFormulario" ref="formRef" />
            </el-col>
          </el-row>
        </template>
      </Formulario>

      <el-table :data="serviciosMecanicos" stripe style="width: 100%">
        <el-table-column prop="servicio_id" label="ID Servicio" />
        <el-table-column prop="mecanico_id" label="ID Mecánico" />
        <el-table-column prop="repuesto_id" label="ID Repuesto" />
        <el-table-column fixed="right" label="Acciones" min-width="120">
          <template #default>
            <el-button link type="primary" size="large" :icon="Edit" @click="editarFormulario"></el-button>
            <el-button link type="danger" :icon="Delete" @click="eliminarServicioMecanico"></el-button>
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
import formServiciosMecanicos from "./components/formServiciosMecanicos.vue" // Verifica que este nombre esté correcto
import { ElMessage } from 'element-plus'
import axios from 'axios'

const mostrarFormulario = ref(false)
const editandoFormulario = ref(false)
const formRef = ref()
const serviciosMecanicos = ref([])

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
    await crearServicioMecanico()
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

const eliminarServicioMecanico = async () => {
  console.log('Servicio mecánico eliminado')
}

const cargarServiciosMecanicos = async () => {
  const url = 'http://127.0.0.1:8000/api/serviciomecanico/datos'

  try {
    await axios.get(url)
      .then((response) => {
        serviciosMecanicos.value = response.data.result
        console.log(response)
      })
      .catch((error) => {
        console.log(error)
      })
  } catch (error) {
    console.error('Error al cargar datos de servicios mecánicos', error)
  }
}

onMounted(() => {
  cargarServiciosMecanicos()
})
</script>
