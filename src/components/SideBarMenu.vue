<template>
  <el-row>
    <el-col :span="12" class="sidebar">
      <el-menu
        default-active="1"
        class="el-menu-vertical-demo"
        background-color="#16c147"
        text-color="#fff"
        collapse-transition
      >
        <el-sub-menu index="1">
          <template #title>
            <span>Gestión</span>
          </template>

          <el-menu-item index="1-1">Especialidades</el-menu-item>
          <el-menu-item index="1-2">Clientes</el-menu-item>
          <el-menu-item index="1-3">Vehículos</el-menu-item>
          <el-menu-item index="1-4">Mecánicos</el-menu-item>
          <el-menu-item index="1-5">Servicios</el-menu-item>
          <el-menu-item index="1-6">Repuestos</el-menu-item>
          <el-menu-item index="1-7">Servicios Mecanicos</el-menu-item>
          <el-menu-item index="1-8">Facturas</el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
</script>

<style scoped>
.sidebar {
  height: 100vh;
  overflow-y: auto; 
}
</style>
