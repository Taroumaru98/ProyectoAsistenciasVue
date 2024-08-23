<template>
  <q-page-container style="background-color: white">
    <div style="margin: 10px">
      <h3 class="title">Programas</h3>
      <div
        style="
          display: flex;
          justify-content: left;
          margin-top: 35px;
          margin-left: 150px;
          margin-bottom: 25px;
        "
      >
        <q-btn
          @click="fixed = true"
          :style="{ backgroundColor: '#2F7D32', color: 'white' }"
          :icon="'add'"
          label="CREAR"
        />
      </div>

      <div style="max-width: 1600px; margin: auto">
        <q-table :rows="rows" :columns="columns" row-key="name">
          <template v-slot:body-cell-opciones="props">
            <q-td :props="props">
              <q-btn
                @click="traerDatos(props.row)"
                color="posion"
                icon="edit"
                round
                dense
                :style="{ backgroundColor: '#2F7D32', color: 'white' }"
                class="q-mr-sm"
              />
              <q-btn
                @click="ides(props.row._id)"
                color="negative"
                icon="close"
                round
                dense
                class="q-mr-sm"
              />
              <q-btn
                @click="activar(props.row._id)"
                v-if="props.row.estado == 0"
                color="posion"
                icon="check"
                round
                dense
                :style="{ backgroundColor: '#2F7D32', color: 'white' }"
                class="q-mr-sm"
              />
              <q-btn
                @click="activar(props.row._id)"
                v-else
                color="negative"
                icon="close"
                round
                dense
                class="q-mr-sm"
              />
            </q-td>
          </template>
          <template v-slot:body-cell-estado1="props">
            <q-td :props="props">
              <p
                v-if="props.row.estado == 1"
                style="
                  display: inline-block;
                  color: white;
                  background-color: #2f7d32;
                  padding: 4px 8px;
                  border-radius: 10rem;
                "
              >
                Activo
              </p>

              <p
                v-else
                style="
                  display: inline-block;
                  color: white;
                  background-color: red;
                  padding: 4px 8px;
                  border-radius: 10rem;
                "
              >
                Inactivo
              </p>
            </q-td>
          </template>
        </q-table>
      </div>

      <q-dialog
        v-model="fixed"
        :backdrop-filter="'blur(4px) saturate(150%)'"
        transition-show="rotate"
        transition-hide="rotate"
        persistent
      >
        <q-card>
          <q-card-section>
            <div class="text-h6">
              {{ b == true ? "Editar Ficha" : "Guardar Ficha" }}
            </div>
          </q-card-section>

          <q-separator />

          <q-card-section style="max-height: 50vh" class="scroll">
            <q-input
              filled
              v-model="num"
              label="Nombre De La Ficha"
              :dense="dense"
            />
            <q-input
              filled
              v-model="cod"
              label="Codigo De La Ficha"
              :dense="dense"
            />
          </q-card-section>

          <q-separator />

          <q-card-actions align="right">
            <q-btn
              flat
              label="Cerrar"
              color="primary"
              v-close-popup
              @click="cerrar()"
            />
            <q-btn flat label="Guardar" color="primary" @click="crearFicha()" />
          </q-card-actions>
        </q-card>
      </q-dialog>

      <q-dialog
        v-model="confirm"
        persistent
        :backdrop-filter="'blur(4px) saturate(150%)'"
        transition-show="rotate"
        transition-hide="rotate"
      >
        <q-card>
          <q-card-section class="row items-center">
            <span class="q-ml-sm">¿Seguro quieres eliminar la ficha?</span>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="Cancelar" color="primary" v-close-popup />
            <q-btn
              @click="eliminarFicha()"
              flat
              label="Aceptar"
              color="primary"
              v-close-popup
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </q-page-container>
</template>

  
  <script setup>
import axios from "axios";
import { onBeforeMount, ref, watch } from "vue";
import { Notify } from "quasar";
import { useQuasar } from "quasar";
import { useFichaStore } from "../stores/fichas.js";
import { Dark } from "quasar";

const useFicha = useFichaStore();

const $q = useQuasar();
let confirm = ref(false);
let r = ref("");
let fixed = ref(false);
let num = ref("");
let cod = ref("");
let error = ref("");
let b = ref(false);
let id = ref("");

const isDark = ref(Dark.isActive);
watch(isDark, (val) => {
  Dark.set(val);
});

const rows = ref([]);

onBeforeMount(() => {
  traer();
});

function ides(ids) {
  id.value = ids;
  confirm.value = true;
}

async function traer() {
  let res = await useFicha.listarFichas();
  rows.value = res.data;
}

function traerDatos(datos) {
  console.log(datos);
  id.value = datos._id;
  fixed.value = true;
  b.value = true;
  num.value = datos.nombre;
  cod.value = datos.codigo;
}

function cerar() {
  b.value = false;
  num.value = "";
  cod.value = "";
}

async function activar(id) {
  let res = await useFicha.activarDesactivarFichas(id);
  await traer();
}

async function crearFicha() {
  if (b.value == true) {
    const res = await editarFicha(id);
    if (res?.response?.data?.errors) {
      fixed.value = true;
    } else {
      await traer();
      fixed.value = false;
    }
  } else {
    let res = await useFicha.guardarFicha(cod.value, num.value);
    if (res?.response?.data?.errors) {
      fixed.value = true;
    } else {
      await traer();
      fixed.value = false;
    }
  }
}

async function editarFicha() {
  let res = await useFicha.editarFicha(id.value, cod.value, num.value);
  await traer();
  return res;
}

async function eliminarFicha() {
  let res = await useFicha.eliminar(id.value);
  await traer();
  return res;
}

const columns = ref([
  {
    name: "nombre1",
    required: true,
    label: "NOMBRE",
    align: "center",
    field: "nombre",
    sortable: true,
  },
  {
    name: "codigo1",
    align: "center",
    label: "CÓDIGO",
    field: "codigo",
    sortable: true,
  },
  {
    name: "estado1",
    align: "center",
    label: "ESTADO",
    field: "estado",
    sortable: true,
  },
  { name: "opciones", label: "OPCIONES", align: "center" },
]);
</script>
  
  <style scoped>
.title {
  text-align: center;
  border-bottom: 4px solid #2f7d32;
  padding-bottom: 8px;
  margin-bottom: 0;
  font-weight: bold;
}
</style>