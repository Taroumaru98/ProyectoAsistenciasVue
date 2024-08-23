<template>
  <q-page class="flex flex-center">
    <q-card class="q-pa-md" style="width: 400px;">
      <q-card-section style="background-color: #2F7D32;">
  <div class="text-h6">INICIAR SESION</div>
</q-card-section>


      <q-card-section>
        <q-input v-model="email" filled label="Nombre de Usuario" dense/>
        <q-input v-model="password" filled label="Contraseña" type="password" dense class="q-mt-md"/>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn :loading="useUsuarios.loading" color="primary" @click ="login()" label="Iniciar Sesión" />
        <template v-slot:loading>
          <q-spinner
        color="white"
        size="1em"
        :thickness="10"
      />
      </template>
      </q-card-actions>
    </q-card>

  </q-page>
</template>

<script setup>
import { ref } from 'vue';
import {useUsuariosStore} from "../stores/usuarios.js"
import { useRouter } from "vue-router";
const router = useRouter();
const email = ref('');
const password = ref('');
const useUsuarios = useUsuariosStore()

async function login() {
  try {
    let res = await useUsuarios.login(email.value, password.value);
    console.log(res);
    if (res.status == 200) {
      router.push("/home");
    } else {
      console.error('Error en el inicio de sesión:', res.message);
    }
  } catch (error) {
    console.error('Error en el inicio de sesión:', error.message);
  }
}

</script>

<style scoped>
.q-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
