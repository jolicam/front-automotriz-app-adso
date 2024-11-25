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
          <template #default="scope">
            <el-button link type="primary" size="large" :icon="Edit" @click="editarFormulario(scope.row)"></el-button>
            <el-button link type="danger" :icon="Delete" @click="eliminarEspecialidad(scope.row)"></el-button>
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

// Abrir el formulario para crear una nueva especialidad
const abrirFormulario = () => {
  mostrarFormulario.value = true
  editandoFormulario.value = false
}

// Abrir el formulario para editar una especialidad existente
const editarFormulario = (especialidad) => {
  mostrarFormulario.value = true
  editandoFormulario.value = true
  formRef.value?.setEspecialidad(especialidad) // Asignar la especialidad a editar
}

// Guardar los datos del formulario
const guardarDatos = async () => {
  const validacion = await formRef.value?.validarFormulario()
  if (validacion) {
    editandoFormulario.value ? await actualizarEspecialidad() : await crearEspecialidad()
  }
}

// Crear una nueva especialidad
const crearEspecialidad = async () => {
  const url = 'http://127.0.0.1:8000/api/especialidad/save'

  const dataFormulario = {
    Nombre_especialidades: formRef.value.formulario.Nombre_especialidades
  }

  try {
    const response = await axios.post(url, dataFormulario)
    formRef.value?.limpiarFormulario()
    ElMessage({
      message: 'La especialidad se creó con éxito.',
      type: 'success',
    })
    cargarEspecialidades()
    mostrarFormulario.value = false
  } catch (error) {
    console.error('Error al crear especialidad', error)
  }
}

// Actualizar una especialidad existente
const actualizarEspecialidad = async () => {
  const url = 'http://127.0.0.1:8000/api/especialidad/update'

  const dataFormulario = {
    id: formRef.value.formulario.id,
    Nombre_especialidades: formRef.value.formulario.Nombre_especialidades
  }

  try {
    const response = await axios.put(url, dataFormulario)
    formRef.value?.limpiarFormulario()
    ElMessage({
      message: 'La especialidad se actualizó con éxito.',
      type: 'success',
    })
    cargarEspecialidades()
    mostrarFormulario.value = false
  } catch (error) {
    console.error('Error al actualizar especialidad', error)
  }
}

// Eliminar una especialidad
const eliminarEspecialidad = async (especialidad) => {
  const url = `http://127.0.0.1:8000/api/especialidad/eliminar/${especialidad.id}`

  try {
    const response = await axios.delete(url)
    ElMessage({
      message: 'La especialidad se eliminó con éxito.',
      type: 'success',
    })
    cargarEspecialidades()
  } catch (error) {
    console.error('Error al eliminar especialidad', error)
  }
}

// Cargar todas las especialidades desde la API
const cargarEspecialidades = async () => {
  const url = 'http://127.0.0.1:8000/api/especialidad/datos'

  try {
    const response = await axios.get(url)
    especialidades.value = response.data.result
  } catch (error) {
    console.error('Error al cargar datos de especialidad', error)
  }
}

// Al montar el componente, cargar las especialidades
onMounted(() => {
  cargarEspecialidades()
})
</script>
