<template>
  <LayoutMain>
    <template #slotLayout>
      <Header 
        :titulo="'Facturas'"
        :tituloBoton="'Crear Factura'"
        :abrir="abrirFormulario" 
      />

      <Formulario :titulo="'Formulario de Facturas'" v-model:is-open="mostrarFormulario" :is-edit="editandoFormulario" @save="guardarDatos">
        <template #slotForm>
          <el-row :gutter="20">
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
              <formFacturas v-model:is-open="mostrarFormulario" :is-edit="editandoFormulario" ref="formRef" />
            </el-col>
          </el-row>
        </template>
      </Formulario>

      <el-table :data="facturas" stripe style="width: 100%">
        <el-table-column prop="cliente_id" label="ID Cliente" width="180" />
        <el-table-column prop="total" label="Monto Total" />
        <el-table-column prop="fecha" label="Fecha" width="180" />
        <el-table-column fixed="right" label="Acciones" min-width="120">
          <template #default>
            <el-button link type="primary" size="large" :icon="Edit" @click="editarFormulario" />
            <el-button link type="danger" :icon="Delete" @click="eliminarFactura" />
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
import formFacturas from './components/formFacturas.vue'
import { Delete, Edit } from "@element-plus/icons-vue"
import { ElMessage } from 'element-plus'
import axios from 'axios'

const mostrarFormulario = ref(false)
const editandoFormulario = ref(false)
const formRef = ref()
const facturas = ref([])

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
    await crearFactura()
  }
}

const crearFactura = async () => {
  const url = 'http://127.0.0.1:8000/api/factura/save'
  const dataFormulario = {
    fecha: formRef.value.formulario.fecha,
    total: formRef.value.formulario.total,
    cliente_id: formRef.value.formulario.cliente_id,
  }
  try {
    await axios.post(url, dataFormulario)
    formRef.value?.limpiarFormulario()
    ElMessage({
      message: 'La factura se creó con éxito.',
      type: 'success',
    })
    cargarFacturas()
    mostrarFormulario.value = false
  } catch (error) {
    console.error('Error al crear factura', error)
  }
}

const eliminarFactura = async () => {
  console.log('Se eliminó la factura')
}

const cargarFacturas = async () => {
  const url = 'http://127.0.0.1:8000/api/factura/datos'
  try {
    const response = await axios.get(url)
    facturas.value = response.data.result
  } catch (error) {
    console.error('Error al cargar facturas', error)
  }
}

onMounted(() => {
  cargarFacturas()
})
</script>
