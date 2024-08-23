<template>
    <q-page-container style="background-color: white">
      <div class="q-pa-lg">
        <div class="row q-col-gutter-lg">
          <!-- Primer Card -->
          <div class="col-xs-12 col-md-6">
            <q-card class="card">
              <q-card-section>
                <div class="text-h6">Fichas</div>
              </q-card-section>
              <q-img src="https://via.placeholder.com/150" class="q-mx-auto q-mb-md" />
              <q-card-actions align="center">
                <q-btn :style="{ backgroundColor: '#2F7D32', color: 'white' }" label="ENTRAR" />
              </q-card-actions>
            </q-card>
          </div>
  
          <!-- Segundo Card -->
          <div class="col-xs-12 col-md-6">
            <q-card class="card">
              <q-card-section>
                <div class="text-h6">Aprendices</div>
              </q-card-section>
              <q-img src="https://via.placeholder.com/150" class="q-mx-auto q-mb-md" />
              <q-card-actions align="center">
                <q-btn :style="{ backgroundColor: '#2F7D32', color: 'white' }" label="ENTRAR" />
              </q-card-actions>
            </q-card>
          </div>
        </div>
  
        <div class="row q-col-gutter-lg q-mt-lg">
          <!-- Tercer Card -->
          <div class="col-xs-12 col-md-6">
            <q-card class="card">
              <q-card-section>
                <div class="text-h6">Bitacoras</div>
              </q-card-section>
              <q-img src="https://via.placeholder.com/150" class="q-mx-auto q-mb-md" />
              <q-card-actions align="center">
                <q-btn :style="{ backgroundColor: '#2F7D32', color: 'white' }" label="ENTRAR" />
              </q-card-actions>
            </q-card>
          </div>
  
          <!-- Cuarto Card -->
          <div class="col-xs-12 col-md-6">
            <q-card class="card">
              <q-card-section>
                <div class="text-h6">Instructores</div>
              </q-card-section>
              <q-img src="https://via.placeholder.com/150" class="q-mx-auto q-mb-md" />
              <q-card-actions align="center">
                <q-btn :style="{ backgroundColor: '#2F7D32', color: 'white' }" label="ENTRAR" />
              </q-card-actions>
            </q-card>
          </div>
        </div>
      </div>
    </q-page-container>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useQuasar } from 'quasar';
  
  const $q = useQuasar();
  </script>
  
  <style scoped>
  .card {
    background-color: #f5f5f5;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    transition: transform 0.3s ease;
  }
  
  .card:hover {
    transform: scale(1.05);
  }
  
  .text-h6 {
    text-align: center;
    font-weight: bold;
  }
  
  .q-img {
    max-width: 100px;
    height: auto;
  }
  
  .q-btn {
    width: 100%;
  }
  </style>