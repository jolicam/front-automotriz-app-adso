<template>
    <LayoutMain>
      <Header />
  
      <div class="container">
        <h1>Servicios Mecánicos</h1>
  
        <!-- Botón para abrir el formulario -->
        <el-button type="primary" @click="abrirFormulario">Agregar Servicio</el-button>
  
        <!-- Tabla de servicios mecánicos -->
        <el-table :data="serviciosMecanicos" style="width: 100%">
          <el-table-column prop="servicio_id" label="Servicio ID" />
          <el-table-column prop="mecanico_id" label="Mecánico ID" />
          <el-table-column prop="repuesto_id" label="Repuesto ID" />
  
          <el-table-column label="Acciones">
            <template #default="scope">
              <el-button
                @click="editarFormulario(scope.row)"
                type="warning"
                icon="el-icon-edit"
                size="small"
              >
                Editar
              </el-button>
              <el-button
                @click="eliminarServicio(scope.row)"
                type="danger"
                icon="el-icon-delete"
                size="small"
              >
                Eliminar
              </el-button>
            </template>
          </el-table-column>
        </el-table>
  
        <!-- Formulario para agregar/editar servicios -->
        <el-dialog :visible.sync="mostrarFormulario" title="Formulario Servicio Mecánico">
          <Formulario
            v-if="mostrarFormulario"
            :editando="editandoFormulario"
            :servicios="servicios"
            :mecanicos="mecanicos"
            :repuestos="repuestos"
            :formRef="formRef"
            @guardar="guardarDatos"
          />
        </el-dialog>
      </div>
    </LayoutMain>
  </template>
  
  <script lang="ts" setup>
  import { onMounted, reactive, ref } from 'vue'
  import LayoutMain from '../../components/LayoutMain.vue';
  import Formulario from '../../components/Formulario.vue';
  import Header from '../../components/Header.vue';
  import { Delete, Edit } from "@element-plus/icons-vue";
  import { ElMessage } from 'element-plus'
  import axios from 'axios';
  
  const mostrarFormulario = ref(false)
  const editandoFormulario = ref(false)
  const formRef = ref()
  const servicios = ref([]) 
  const mecanicos = ref([]) 
  const serviciosMecanicos = ref([]) 
  
  const abrirFormulario = () => {
    mostrarFormulario.value = true
    editandoFormulario.value = false
  }
  
  const editarFormulario = async (row) => {
    mostrarFormulario.value = true
    editandoFormulario.value = true
    // Aquí puedes agregar código para llenar el formulario con los datos de 'row' (la fila seleccionada)
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
        repuesto_id: formRef.value.formulario.repuesto_id,
    }
  
    try {
        axios.post(url, dataFormulario)
            .then(function (response) {
                console.log(response);
                formRef.value?.limpiarFormulario()
                ElMessage({
                    message: 'El servicio mecánico se creó con éxito.',
                    type: 'success',
                })
                datosServicioMecanico()
                mostrarFormulario.value = false
            })
            .catch(function (error) {
                console.log(error);
            });
  
    } catch (error) {
        console.error('Error al crear servicio mecánico ', error)
    }
  }
  
  const datosServicioMecanico = async () => {
    const url = 'http://127.0.0.1:8000/api/serviciomecanico/datos'
  
    try {
        axios.get(url)
            .then(function (response) {
                serviciosMecanicos.value = response.data.result
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
  
    } catch (error) {
        console.error('Error al obtener datos de servicios mecánicos ', error)
    }
  }
  
  const getServicios = async () => {
    const url = 'http://127.0.0.1:8000/api/servicio/datos'
  
    try {
        axios.get(url)
            .then(function (response) {
                servicios.value = response.data.result
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    } catch (error) {
        console.error('Error al obtener servicios ', error)
    }
  }
  
  const getMecanicos = async () => {
    const url = 'http://127.0.0.1:8000/api/mecanicos/datos'
  
    try {
        axios.get(url)
            .then(function (response) {
                mecanicos.value = response.data.result
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    } catch (error) {
        console.error('Error al obtener mecánicos ', error)
    }
  }
  
  const getRepuestos = async () => {
    const url = 'http://127.0.0.1:8000/api/repuestos/datos'
  
    try {
        axios.get(url)
            .then(function (response) {
                repuestos.value = response.data.result
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    } catch (error) {
        console.error('Error al obtener repuestos ', error)
    }
  }
  
  onMounted(() => {
    getServicios()
    getMecanicos()
    getRepuestos()
    datosServicioMecanico()
  })
  </script>
  