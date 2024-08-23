import home from '../components/Home.vue'
import fichas from '../components/Fichas.vue'
import aprendiz from '../components/Aprendiz.vue'
import usuario from '../components/Usuario.vue'
import bitacoras from '../components/Bitacoras.vue'
import login from '../components/Login.vue'


import { createRouter, createWebHashHistory } from 'vue-router'



const routes = [
    { path: '/home', component: home }, 
    { path: '/fichas', component: fichas },
    { path: '/aprendiz', component: aprendiz },
    { path: '/usuario', component: usuario },
    { path: '/bitacoras', component: bitacoras },
    {path: '/',  component: login}
]


export const router = createRouter({
    history: createWebHashHistory(),
    routes
})