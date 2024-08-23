<template>
  <q-page class="flex flex-center">
    <q-card class="q-pa-md" style="width: 400px;">
      <q-card-section>
        <div class="text-h6">Iniciar Sesión</div>
      </q-card-section>

      <q-card-section>
        <q-input
          v-model="email"
          filled
          label="Nombre de Usuario"
          dense
        />
        <q-input
          v-model="password"
          filled
          label="Contraseña"
          type="password"
          dense
          class="q-mt-md"
        />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn @click ="loguin()" label="Iniciar Sesión" color="primary" />
      </q-card-actions>
    </q-card>

  </q-page>
</template>

<script setup>

</script>

<style scoped>
.q-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
