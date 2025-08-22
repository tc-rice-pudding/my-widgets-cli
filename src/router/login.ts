// login.js
import { RouteRecordRaw } from 'vue-router';

const Login = () => import('@/views/login/login.vue');
const login: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: Login
  }
];

export default login;
