import home from '../components/home.vue'
import fichas from '../components/fichas.vue'
import aprendiz from '../components/aprendiz.vue'
import usuario from '../components/usuario.vue'
import bitacoras from '../components/bitacoras.vue'
import loguin from '../components/loguin.vue'


import { createRouter, createWebHashHistory } from 'vue-router'



const routes = [
    { path: '/home', component: home }, 
    { path: '/fichas', component: fichas },
    { path: '/aprendiz', component: aprendiz },
    { path: '/usuario', component: usuario },
    { path: '/bitacoras', component: bitacoras },
    {path: '/',  component: loguin}
]


export const router = createRouter({
    history: createWebHashHistory(),
    routes
})