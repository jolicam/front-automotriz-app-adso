import { createRouter, createWebHistory } from "vue-router";
import LayoutMain from '../components/LayoutMain.vue';
import Login from '../components/Login.vue';
import Especialidades from '../views/especialidades/especialidades.vue';
import Clientes from '../views/clientes/clientes.vue';
import Vehiculos from '../views/vehiculos/vehiculos.vue';
import Mecanicos from '../views/Mecanicos/Mecanicos.vue';
import Servicios from '../views/servicios/servicios.vue';
import Repuestos from '../views/repuestos/repuestos.vue';
import Facturas from '../views/facturas/facturas.vue';
import ServiciosMecanicos from '../views/ServiciosMecanicos/ServiciosMecanicos.vue'; 


const routes = [
  {
    path: '/',
    name: 'home',
    component: LayoutMain,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/especialidades',
    name: 'Especialidades',
    component: Especialidades,
  },
  {
    path: '/clientes',
    name: 'Clientes',
    component: Clientes,
  },
  {
    path: '/vehiculos',
    name: 'Vehiculos',
    component: Vehiculos,
  },
  {
    path: '/mecanicos',
    name: 'Mecanicos',
    component: Mecanicos,
  },
  {
    path: '/servicios',
    name: 'Servicios',
    component: Servicios,
  },
  {
    path: '/repuestos',
    name: 'Repuestos',
    component: Repuestos,
  },
  {
    path: '/serviciosMecanicos',
    name: 'ServiciosMecanicos',
    component: ServiciosMecanicos,
  },
  {
    path: '/facturas',
    name: 'Facturas',
    component: Facturas,
  },
  // {
  //   path: '/servicios_mecanicos',
  //   name: 'servicios_mecanicos',
  //   component: FormServiciosMecanicos, 
  // },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
