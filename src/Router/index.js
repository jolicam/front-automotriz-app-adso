import { createRouter, createWebHistory } from "vue-router";
import Ejemplo from '../views/Ejemplo.vue'
import paises from '../views/paises.vue'

const routes =[

{
  path:'/cargos',  
  name:'cargos',
  component:Ejemplo,
},
{
    path:'/paises',  
    name:'paises',
    component:paises, 
},

]

const router= createRouter({
    history:createWebHistory(),
    routes,
})

export default router;


