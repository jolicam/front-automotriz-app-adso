<template>
  <LayoutMain>
    <template #slotLayout>
      <Header :titulo="'Especialidades'" :tituloBoton="'Crear Especialidad'" :abrir="abrirFormulario" />

      <Formulario :titulo="'Gestión de Especialidades'" v-model:is-open="mostrarFormulario" :is-edit="editandoFormulario" @save="guardarDatos">
        <template #slotForm>
          <el-row :gutter="20">
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <formEspecialidades v-model:is-open="mostrarFormulario" :is-edit="editandoFormulario" ref="formRef" />
            </el-col>
          </el-row>
        </template>
      </Formulario>

      <el-table :data="especialidades" stripe style="width: 100%">
        <el-table-column prop="Nombre_especialidades" label="Nombre de la Especialidad" />
        <el-table-column fixed="right" label="Acciones" min-width="120">
          <template #default>
            <el-button link type="primary" size="large" :icon="Edit" @click="editarFormulario"></el-button>
            <el-button link type="danger" :icon="Delete" @click="eliminarEspecialidad"></el-button>
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
import formEspecialidades from './components/formEspecialidades.vue'
import { ElMessage } from 'element-plus'
import axios from 'axios'

const mostrarFormulario = ref(false)
const editandoFormulario = ref(false)
const formRef = ref()
const especialidades = ref([])

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
    await crearEspecialidad()
  }
}

const crearEspecialidad = async () => {
  const url = 'http://127.0.0.1:8000/api/especialidad/save'

  const dataFormulario = {
    Nombre_especialidades: formRef.value.formulario.Nombre_especialidades
  }

  try {
    await axios.post(url, dataFormulario)
      .then((response) => {
        console.log(response)
        formRef.value?.limpiarFormulario()
        ElMessage({
          message: 'La especialidad se creó con éxito.',
          type: 'success',
        })
        cargarEspecialidades()
        mostrarFormulario.value = false
      })
      .catch((error) => {
        console.log(error)
      })
  } catch (error) {
    console.error('Error al crear especialidad', error)
  }
}

const eliminarEspecialidad = async () => {
  console.log('Especialidad eliminada')
}

const cargarEspecialidades = async () => {
  const url = 'http://127.0.0.1:8000/api/especialidad/datos'

  try {
    await axios.get(url)
      .then((response) => {
        especialidades.value = response.data.result
        console.log(response)
      })
      .catch((error) => {
        console.log(error)
      })
  } catch (error) {
    console.error('Error al cargar datos de especialidad', error)
  }
}

onMounted(() => {
  cargarEspecialidades()
})
</script>
