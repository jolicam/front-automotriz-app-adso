<template>
  <LayoutMain>
    <template #slotLayout>
      <Header 
        :titulo="'Mecánicos'"
        :tituloBoton="'Crear Mecánico'"
        :abrir="abrirFormulario"
      />

      <Formulario :titulo="'Gestión de Mecánicos'" v-model:is-open="mostrarFormulario" :is-edit="editandoFormulario" @save="guardarDatos">
        <template #slotForm>
          <el-row :gutter="20">
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <formMecanicos v-model:is-open="mostrarFormulario" :is-edit="editandoFormulario" ref="formRef" :especialidades="especialidades" />
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
          <template #default>
            <el-button link type="primary" size="large" :icon="Edit" @click="editarFormulario" />
            <el-button link type="danger" :icon="Delete" @click="eliminarMecanico" />
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
import formMecanicos from './components/formMecanicos.vue'
import { Delete, Edit } from "@element-plus/icons-vue"
import { ElMessage } from 'element-plus'
import axios from 'axios'

const mostrarFormulario = ref(false)
const editandoFormulario = ref(false)
const formRef = ref()
const especialidades = ref([])
const mecanicos = ref([])

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
    await crearMecanico()
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
    axios.post(url, dataFormulario)
      .then(response => {
        console.log(response)
        formRef.value?.limpiarFormulario()
        ElMessage({
          message: 'El mecánico se creó con éxito.',
          type: 'success',
        })
        datosMecanico()
        mostrarFormulario.value = false
      })
      .catch(error => {
        console.log(error)
      })
  } catch (error) {
    console.error('Error al crear mecánico', error)
  }
}

const eliminarMecanico = async () => {
  console.log('Se eliminó el mecánico')
}

const datosMecanico = async () => {
  const url = 'http://127.0.0.1:8000/api/mecanico/datos'
  try {
    axios.get(url)
      .then(response => {
        mecanicos.value = response.data.result
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      })
  } catch (error) {
    console.error('Error al obtener datos de mecánicos', error)
  }
}

const getEspecialidades = async () => {
  const url = 'http://127.0.0.1:8000/api/especialidades/datos'
  try {
    axios.get(url)
      .then(response => {
        especialidades.value = response.data.result
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      })
  } catch (error) {
    console.error('Error al obtener especialidades', error)
  }
}

onMounted(() => {
  getEspecialidades()
  datosMecanico()
})
</script>
