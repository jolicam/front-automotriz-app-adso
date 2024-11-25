<template>
  <LayoutMain>
    <template #slotLayout>
      <Header 
        :titulo="'Repuestos'"
        :tituloBoton="'Crear Repuesto'"
        :abrir="abrirFormulario"
      />

      <Formulario :titulo="'Gestión de Repuestos'" v-model:is-open="mostrarFormulario" :is-edit="editandoFormulario" @save="guardarDatos" @update="actualizarDatos">
        <template #slotForm>
          <el-row :gutter="20">
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <formRepuestos v-model:is-open="mostrarFormulario" :is-edit="editandoFormulario" ref="formRef" :dataValue="dataRepuestoById" />
            </el-col>
          </el-row>
        </template>
      </Formulario>

      <el-table :data="repuestos" stripe style="width: 100%">
        <el-table-column prop="nombre" label="Nombre" />
        <el-table-column prop="precio" label="Precio" />
        <el-table-column fixed="right" label="Acciones" min-width="120">
          <template #default="registro">
            <el-button link type="primary" size="large" :icon="Edit" @click="editarFormulario(registro.row.id)" />
            <el-button link type="danger" :icon="Delete" @click="eliminarRepuesto(registro.row.id)" />
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
import formRepuestos from './components/formRepuestos.vue'
import { Delete, Edit } from "@element-plus/icons-vue"
import { ElMessage, ElMessageBox } from 'element-plus'
import axios from 'axios'

const mostrarFormulario = ref(false)
const editandoFormulario = ref(false)
const formRef = ref()
const repuestos = ref([])
const dataRepuestoById = ref(null)

const abrirFormulario = () => {
  mostrarFormulario.value = true
  editandoFormulario.value = false
}

const editarFormulario = async (id) => {
  dataRepuestoById.value = await datosById(id)
  mostrarFormulario.value = true
  editandoFormulario.value = true
}

const guardarDatos = async () => {
  const validacion = await formRef.value?.validarFormulario()
  if (validacion) {
    await crearRepuesto()
  }
}

const actualizarDatos = async () => {
  const validacion = await formRef.value?.validarFormulario()
  if (validacion) {
    await actualizarRepuesto()
  }
}

const crearRepuesto = async () => {
  const url = 'http://127.0.0.1:8000/api/repuesto/save'
  const dataFormulario = {
    nombre: formRef.value.formulario.nombre,
    precio: formRef.value.formulario.precio,
  }

  try {
    await axios.post(url, dataFormulario)
      .then(response => {
        console.log(response)
        formRef.value?.limpiarFormulario()
        ElMessage({
          message: 'El repuesto se creó con éxito.',
          type: 'success',
        })
        datosRepuesto()
        mostrarFormulario.value = false
      })
      .catch(error => {
        console.log(error)
      })
  } catch (error) {
    console.error('Error al crear repuesto', error)
  }
}

const actualizarRepuesto = async () => {
  const url = 'http://127.0.0.1:8000/api/repuesto/update'
  const dataFormulario = {
    id: dataRepuestoById.value.id,
    nombre: formRef.value.formulario.nombre,
    precio: formRef.value.formulario.precio,
  }

  try {
    await axios.put(url, dataFormulario)
      .then(response => {
        console.log(response)
        formRef.value?.limpiarFormulario()
        ElMessage({
          message: 'El repuesto se actualizó con éxito.',
          type: 'success',
        })
        datosRepuesto()
        mostrarFormulario.value = false
      })
      .catch(error => {
        console.log(error)
      })
  } catch (error) {
    console.error('Error al actualizar repuesto', error)
  }
}

const eliminarRepuesto = async (id) => {
  const url = 'http://127.0.0.1:8000/api/repuesto/delete'
  
  ElMessageBox.confirm(
    '¿Está seguro de eliminar el repuesto?',
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
          datosRepuesto()
          ElMessage({
            type: 'success',
            message: 'Se eliminó correctamente el repuesto',
          })
        })
        .catch(function (error) {
          console.log(error)
        })
    } catch (error) {
      console.error('Error al eliminar repuesto', error)
    }
  })
  .catch(() => {
    ElMessage({
      type: 'info',
      message: 'Eliminación cancelada',
    })
  })
}

const datosById = async (id) => {
  const url = 'http://127.0.0.1:8000/api/repuesto/datosById'
  try {
    const response = await axios.get(url, { params: { id } })
    return response.data.result
  } catch (error) {
    console.error('Error al obtener datos de repuesto', error)
  }
}

const datosRepuesto = async () => {
  const url = 'http://127.0.0.1:8000/api/repuesto/datos'
  try {
    await axios.get(url)
      .then(response => {
        repuestos.value = response.data.result
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      })
  } catch (error) {
    console.error('Error al obtener datos de repuestos', error)
  }
}

onMounted(() => {
  datosRepuesto()
})
</script>
