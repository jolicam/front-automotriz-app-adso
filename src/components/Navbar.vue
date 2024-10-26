<template>
  <el-menu
    :default-active="activeIndex"
    background-color="#a5a7a5"  
    text-color="#fff" 
    mode="horizontal"
    :ellipsis="false"
    @select="handleSelect"
  >
    <el-menu-item index="0">
      <span class="brand">CYCOMPANY S.A.S</span> 
    </el-menu-item>

    <el-sub-menu index="1">
      <template #title>Johanna Camacho</template>
      <el-menu-item index="2-1">Perfil</el-menu-item>
      <el-menu-item index="2-2">Cerrar Sesión</el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const activeIndex = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<style scoped>
.el-menu-demo {
  top: 0;
  width: 100%;
  z-index: 10;
}

.el-menu-item, 
span.el-avatar.el-avatar--circle {
  margin-right: auto;
  padding: 0;
}

.brand {
  font-size: 24px; /* Tamaño de la fuente para el texto */
  font-weight: bold; /* Negrita */
  color: white; /* Color del texto */
}
</style>
