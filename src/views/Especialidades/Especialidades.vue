<template>
  <LayoutMain>
    <template #slotLayout>
      <Header :titulo="'Especialidades'" :tituloBoton="'Crear Especialidad'" :abrir="abrirFormulario" />

      <Formulario :titulo="'Gestión de Especialidades'" v-model:is-open="mostrarFormulario" :is-edit="editandoFormulario" @save="guardarDatos" @update="actualizarDatos">
        <template #slotForm>
          <el-row :gutter="20">
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <formEspecialidades v-model:is-open="mostrarFormulario" :is-edit="editandoFormulario" ref="formRef" :data-value="especialidadSeleccionada" />
            </el-col>
          </el-row>
        </template>
      </Formulario>

      <el-table :data="especialidades" stripe style="width: 100%">
        <el-table-column prop="nombre_especialidad" label="Nombre de la Especialidad" />
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
import formEspecialidades from './Components/formEspecialidades.vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import axios from 'axios'

const mostrarFormulario = ref(false)
const editandoFormulario = ref(false)
const formRef = ref()
const especialidades = ref([])
const especialidadSeleccionada = ref()

// Abrir el formulario para crear una nueva especialidad
const abrirFormulario = () => {
  mostrarFormulario.value = true
  editandoFormulario.value = false
  especialidadSeleccionada.value = null
}

// Abrir el formulario para editar una especialidad existente
const editarFormulario = (especialidad) => {
  mostrarFormulario.value = true
  editandoFormulario.value = true
  especialidadSeleccionada.value = especialidad 
}

// Guardar los datos del formulario
const guardarDatos = async () => {
  const validacion = await formRef.value?.validarFormulario()
  if (validacion) {
    editandoFormulario.value ? await actualizarEspecialidad() : await crearEspecialidad()
  } else {
    ElMessage({
      message: 'Por favor complete todos los campos.',
      type: 'warning',
    })
  }
}

// Actualizar los datos del formulario
const actualizarDatos = async () => {
  const validacion = await formRef.value?.validarFormulario()
  if (validacion) {
    await actualizarEspecialidad()
  }
}

// Crear una nueva especialidad
const crearEspecialidad = async () => {
  const url = 'http://127.0.0.1:8000/api/especialidad/save'

  const dataFormulario = {
    nombre_especialidad: formRef.value.formulario.nombre_especialidad
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
    ElMessage({
      message: 'Hubo un error al crear la especialidad.',
      type: 'error',
    })
  }
}

// Actualizar una especialidad existente
const actualizarEspecialidad = async () => {
  const url = 'http://127.0.0.1:8000/api/especialidad/update'

  const dataFormulario = {
    id: especialidadSeleccionada.value.id, // Enviar el ID de la especialidad
    nombre_especialidad: formRef.value.formulario.nombre_especialidad
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
    ElMessage({
      message: 'Hubo un error al actualizar la especialidad.',
      type: 'error',
    })
  }
}

// Eliminar una especialidad
const eliminarEspecialidad = async (especialidad) => {
  const url = `http://127.0.0.1:8000/api/especialidad/eliminar/${especialidad.id}`

  ElMessageBox.confirm(
    '¿Está seguro de eliminar esta especialidad?',
    'Eliminar Especialidad',
    {
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar',
      type: 'warning',
    }
  ).then(async () => {
    try {
      const response = await axios.delete(url)
      ElMessage({
        message: 'La especialidad se eliminó con éxito.',
        type: 'success',
      })
      cargarEspecialidades()
    } catch (error) {
      console.error('Error al eliminar especialidad', error)
      ElMessage({
        message: 'Hubo un error al eliminar la especialidad.',
        type: 'error',
      })
    }
  }).catch(() => {
    ElMessage({
      message: 'Eliminación cancelada',
      type: 'info',
    })
  })
}

// Cargar todas las especialidades desde la API
const cargarEspecialidades = async () => {
  const url = 'http://127.0.0.1:8000/api/especialidad/datos'

  try {
    const response = await axios.get(url)
    especialidades.value = response.data.result
  } catch (error) {
    console.error('Error al cargar datos de especialidad', error)
    ElMessage({
      message: 'Hubo un error al cargar las especialidades.',
      type: 'error',
    })
  }
}

// Al montar el componente, cargar las especialidades
onMounted(() => {
  cargarEspecialidades()
})
</script>
