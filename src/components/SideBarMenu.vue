<template>
  <el-menu
    :default-active="$route.path"
    router
    class="el-menu-vertical-demo"
    background-color="#16c147"
    text-color="#fff"
    collapse-transition
  >
    
    <el-sub-menu index="1">
      <template #title>
        <el-icon><Location /></el-icon>
        <span>Administrador</span>
      </template>
      <el-menu-item index="especialidades">Especialidades</el-menu-item>
      <el-menu-item index="clientes">Clientes</el-menu-item>
      <el-menu-item index="vehiculos">Vehículos</el-menu-item>
      <el-menu-item index="mecanicos">Mecánicos</el-menu-item>
      <el-menu-item index="servicios">Servicios</el-menu-item>
      <el-menu-item index="repuestos">Repuestos</el-menu-item>
      <el-menu-item index="serviciosMecanicos">Servicios Mecánicos</el-menu-item>
      <el-menu-item index="facturas">Facturas</el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script lang="ts" setup>
import { Location } from '@element-plus/icons-vue';
</script>

<style scoped>
html, body {
    margin: 0;
    padding: 0;
    /* height: 100%; */
  }
  

  
  .el-menu-vertical-demo {
    width: 250px;
    min-height: 100%;
  }
  </style>