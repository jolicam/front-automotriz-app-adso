import { createRouter, createWebHistory } from "vue-router";
import LayoutMain from '../components/LayoutMain.vue';
import Login from '../components/Login.vue';
import Especialidades from '../views/Especialidades/Especialidades.vue';
import Clientes from '../views/Clientes/Clientes.vue';
import Vehiculos from '../views/Vehiculos/Vehiculos.vue';
import Mecanicos from '../views/Mecanicos/Mecanicos.vue';
import Servicios from '../views/Servicios/Servicios.vue';
import Repuestos from '../views/Repuestos/Repuestos.vue';
import Facturas from '../views/Facturas/Facturas.vue';
import ServiciosMecanicos from '../views/ServiciosMecanicos/ServiciosMecanicos.vue'; 
//revisa mayusuculas y minusculas por favor

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
    name: 'especialidades',
    component: Especialidades,
  },
  {
    path: '/clientes',
    name: 'clientes',
    component: Clientes,
  },
  {
    path: '/vehiculos',
    name: 'vehiculos',
    component: Vehiculos,
  },
  {
    path: '/mecanicos',
    name: 'mecanicos',
    component: Mecanicos,
  },
  {
    path: '/servicios',
    name: 'servicios',
    component: Servicios,
  },
  {
    path: '/repuestos',
    name: 'repuestos',
    component: Repuestos,
  },
  {
    path: '/serviciosMecanicos',
    name: 'serviciosMecanicos',
    component: ServiciosMecanicos,
  },
  {
    path: '/facturas',
    name: 'facturas',
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
