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
          <template #default="scope">
            <el-button link type="primary" size="large" :icon="Edit" @click="editarFormulario(scope.row)" />
            <el-button link type="danger" :icon="Delete" @click="eliminarFactura(scope.row)" />
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
import Header from '../../Components/Header.vue'
import formFacturas from './Components/formFacturas.vue'
import { Delete, Edit } from "@element-plus/icons-vue"
import { ElMessage } from 'element-plus'
import axios from 'axios'

const mostrarFormulario = ref(false)
const editandoFormulario = ref(false)
const formRef = ref()
const facturas = ref([])

// Abrir el formulario para crear una nueva factura
const abrirFormulario = () => {
  mostrarFormulario.value = true
  editandoFormulario.value = false
}

// Abrir el formulario para editar una factura existente
const editarFormulario = async (factura) => {
  mostrarFormulario.value = true
  editandoFormulario.value = true
  // Aquí utilizamos datosById para obtener la factura por ID
  const facturaData = await datosById(factura.id) 
  formRef.value?.setFactura(facturaData)  // Cargar la factura a editar
}

// Obtener los datos de la factura por su ID (esto es análogo a datosById del profesor)
const datosById = async (id) => {
  try {
    const url = `http://127.0.0.1:8000/api/factura/${id}`
    const response = await axios.get(url)
    return response.data.result
  } catch (error) {
    console.error('Error al obtener los datos de la factura', error)
  }
}

// Guardar los datos del formulario
const guardarDatos = async () => {
  const validacion = await formRef.value?.validarFormulario()
  if (validacion) {
    editandoFormulario.value ? await actualizarFactura() : await crearFactura()
  }
}

// Crear una nueva factura
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

// Actualizar una factura existente
const actualizarFactura = async () => {
  const url = 'http://127.0.0.1:8000/api/factura/update'
  const dataFormulario = {
    id: formRef.value.formulario.id,
    fecha: formRef.value.formulario.fecha,
    total: formRef.value.formulario.total,
    cliente_id: formRef.value.formulario.cliente_id,
  }
  try {
    await axios.put(url, dataFormulario)
    formRef.value?.limpiarFormulario()
    ElMessage({
      message: 'La factura se actualizó con éxito.',
      type: 'success',
    })
    cargarFacturas()
    mostrarFormulario.value = false
  } catch (error) {
    console.error('Error al actualizar factura', error)
  }
}

// Eliminar una factura
const eliminarFactura = async (factura) => {
  const url = `http://127.0.0.1:8000/api/factura/eliminar/${factura.id}`
  try {
    await axios.delete(url)
    ElMessage({
      message: 'La factura se eliminó con éxito.',
      type: 'success',
    })
    cargarFacturas()
  } catch (error) {
    console.error('Error al eliminar factura', error)
  }
}

// Cargar todas las facturas desde la API
const cargarFacturas = async () => {
  const url = 'http://127.0.0.1:8000/api/factura/datos'
  try {
    const response = await axios.get(url)
    facturas.value = response.data.result
  } catch (error) {
    console.error('Error al cargar facturas', error)
  }
}

// Cargar las facturas al montar el componente
onMounted(() => {
  cargarFacturas()
})
</script>
