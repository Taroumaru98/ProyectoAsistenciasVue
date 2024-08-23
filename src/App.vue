<template>
  <div class="q-pa-md">
    <q-layout view="hHh LpR fFf" container style="height: 100vh" class="shadow-2 rounded-borders">
      
      <!-- Header -->
      <q-header elevated :class="$q.dark.isActive ? 'bg-secondary' : 'bg-green-8'">
        <q-toolbar>
          <q-btn flat @click="toggleDrawer" round dense icon="menu" />
          <q-toolbar-title>REPFORA</q-toolbar-title>
          <q-btn @click="Salir" icon="arrow_back" color="green" />
        </q-toolbar>
      </q-header>

      <!-- Drawer -->
      <q-drawer
        v-model="drawer"
        :width="250"
        side="left"
        overlay
        :mini="miniState"
        @mouseover="miniState = false"
        @mouseout="miniState = true"
        bordered
        :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-black'"
        dark
        elevated
      >
        <q-img class="absolute-top" src="https://cdn.quasar.dev/img/material.png" style="height: 150px">
        </q-img>

        <q-scroll-area style="height: calc(100% - 150px); color:white; background-color: white; margin-top: 150px; border-right: 1px solid #ddd">
  <q-list padding>
    <q-item clickable to="/home" v-ripple style="background-color: green; border-radius: 2rem; color:white; margin-bottom: 10px;">
      <q-item-section avatar>
        <q-icon name="home" />
      </q-item-section>
      <q-item-section>Home</q-item-section>
    </q-item>

    <q-item clickable to="/bitacoras" v-ripple style="background-color: green; border-radius: 2rem; color:white; margin-bottom: 10px;">
      <q-item-section avatar>
        <q-icon name="person" />
      </q-item-section>
      <q-item-section>Bitacoras</q-item-section>
    </q-item>

    <q-item clickable to="/fichas" v-ripple style="background-color: green; border-radius: 2rem; color:white; margin-bottom: 10px;">
      <q-item-section avatar>
        <q-icon name="drafts" />
      </q-item-section>
      <q-item-section>Fichas</q-item-section>
    </q-item>

    <q-item clickable to="/aprendiz" v-ripple style="background-color: green; border-radius: 2rem; color:white; margin-bottom: 10px;">
      <q-item-section avatar>
        <q-icon name="star" />
      </q-item-section>
      <q-item-section>Aprendices</q-item-section>
    </q-item>
  </q-list>
</q-scroll-area>


      </q-drawer>

      <!-- Page Container -->
      <q-page-container style="background-color: white;">
        <router-view />
      </q-page-container>

      <!-- Footer -->
      <q-footer elevated class="bg-grey-5 text-black">
        <q-toolbar>
          <q-toolbar-title class="text-center">
            <span class="text-bold">REPFORA - SENA 2024 Todos los derechos reservados</span>
          </q-toolbar-title>
        </q-toolbar>
      </q-footer>

    </q-layout>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUsuariosStore } from './stores/usuarios.js';

const router = useRouter();
const useUsuarios = useUsuariosStore();
const drawer = ref(false);
const miniState = ref(true);

const toggleDrawer = () => {
  drawer.value = !drawer.value;
};

const Salir = async () => {
  try {
    await useUsuarios.logout(); 
    router.replace('/');
  } catch (error) {
    console.error('Error during logout:', error);
  }
};
</script>

<style scoped>

.q-pa-md{
  margin: 0;
  padding: 0;
}
</style>