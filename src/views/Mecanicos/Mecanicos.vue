<template>
  <LayoutMain>
    <template #slotLayout>
      <Header 
        :titulo="'Mecánicos'"
        :tituloBoton="'Crear Mecánico'"
        :abrir="abrirFormulario"
      />

      <Formulario :titulo="'Gestión de Mecánicos'" v-model:is-open="mostrarFormulario" :is-edit="editandoFormulario" @save="guardarDatos" @update="actualizarDatos">
        <template #slotForm>
          <el-row :gutter="20">
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <formMecanicos v-model:is-open="mostrarFormulario" :is-edit="editandoFormulario" ref="formRef" :especialidades="especialidades" :dataValue="dataMecanicoById" />
            </el-col>
          </el-row>
        </template>
      </Formulario>

      <el-table :data="mecanicos" stripe style="width: 100%">
        <el-table-column prop="nombre" label="Nombre" />
        <el-table-column prop="apellido" label="Apellido" />
        <el-table-column prop="documento" label="Documento" />
        <el-table-column prop="especialidad_id" label="Especialidad" />
        <el-table-column prop="telefono" label="Teléfono" />
        <el-table-column fixed="right" label="Acciones" min-width="120">
          <template #default="registro">
            <el-button link type="primary" size="large" :icon="Edit" @click="editarFormulario(registro.row.id)" />
            <el-button link type="danger" :icon="Delete" @click="eliminarMecanico(registro.row.id)" />
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
import formMecanicos from './Components/formMecanicos.vue'
import { Delete, Edit } from "@element-plus/icons-vue"
import { ElMessage, ElMessageBox } from 'element-plus'
import axios from 'axios'

const mostrarFormulario = ref(false)
const editandoFormulario = ref(false)
const formRef = ref()
const dataMecanicoById = ref()
const especialidades = ref([])
const mecanicos = ref([])

const abrirFormulario = () => {
  mostrarFormulario.value = true
  editandoFormulario.value = false
  
}

const editarFormulario = async (id) => {
  dataMecanicoById.value = await datosById(id)
  mostrarFormulario.value = true
  editandoFormulario.value = true
}

const guardarDatos = async () => {
  const validacion = await formRef.value?.validarFormulario()
  if (validacion) {
    await crearMecanico()
  }
}

const actualizarDatos = async () => {
  const validacion = await formRef.value?.validarFormulario()
  if (validacion) {
    await actualizarMecanico()
  }
}

const crearMecanico = async () => {
  const url = 'http://127.0.0.1:8000/api/mecanico/save'
  const dataFormulario = {
    nombre: formRef.value.formulario.nombre,
    apellido: formRef.value.formulario.apellido,
    documento: formRef.value.formulario.documento,
    telefono: formRef.value.formulario.telefono,
    especialidad_id: formRef.value.formulario.especialidad_id,
  }

  try {
    await axios.post(url, dataFormulario)
    formRef.value?.limpiarFormulario()
    ElMessage({
      message: 'El mecánico se creó con éxito.',
      type: 'success',
    })
    cargarMecanicos()
    mostrarFormulario.value = false
  } catch (error) {
    console.error('Error al crear mecánico', error)
  }
}

const actualizarMecanico = async () => {
  const url = 'http://127.0.0.1:8000/api/mecanico/update'
  const dataFormulario = {
    id: dataMecanicoById.value[0].id,
    nombre: formRef.value.formulario.nombre,
    apellido: formRef.value.formulario.apellido,
    documento: formRef.value.formulario.documento,
    telefono: formRef.value.formulario.telefono,
    especialidad_id: formRef.value.formulario.especialidad_id,
  }

  try {
    await axios.put(url, dataFormulario)
    formRef.value?.limpiarFormulario()
    ElMessage({
      message: 'El mecánico se actualizó con éxito.',
      type: 'success',
    })
    cargarMecanicos()
    mostrarFormulario.value = false
  } catch (error) {
    console.error('Error al actualizar mecánico', error)
  }
}

const eliminarMecanico = async (id) => {
  const url = 'http://127.0.0.1:8000/api/mecanico/delete'
  ElMessageBox.confirm(
    '¿Está seguro de eliminar el mecánico?',
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
            cargarMecanicos()
          })
          .catch(function (error) {
            console.log(error)
          })
      } catch (error) {
        console.error('Error al eliminar mecánico', error)
      }
      ElMessage({
        type: 'success',
        message: 'Se eliminó correctamente el mecánico.',
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: 'Eliminación cancelada',
      })
    })
}

const cargarMecanicos = async () => {
  const url = 'http://127.0.0.1:8000/api/mecanico/getData'
  try {
    const response = await axios.get(url)
    mecanicos.value = response.data.result
  } catch (error) {
    console.error('Error al cargar mecánicos', error)
  }
}

const getEspecialidades = async () => {
  const url = 'http://127.0.0.1:8000/api/especialidad/datos'
  try {
    const response = await axios.get(url)
    especialidades.value = response.data.result
  } catch (error) {
    console.error('Error al obtener especialidades', error)
  }
}

const datosById = async (id) => {
  const url = 'http://127.0.0.1:8000/api/mecanico/getDataById'
  try {
    const response = await axios.get(url, { params: { id } })
    return response.data.result
  } catch (error) {
    console.error('Error al obtener datos del mecánico', error)
  }
}

onMounted(() => {
  getEspecialidades()
  cargarMecanicos()
})
</script>
