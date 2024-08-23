<template>
  <q-page-container style="background-color: white">
    <div style="margin: 10px">
      <div style="display: flex; justify-content: end">
        <q-btn @click="fixed = true" color="primary" class="btnCrear"
          >Crear</q-btn
        >
      </div>
      <q-table
        title="Aprendices"
        :rows="rows"
        :columns="columns"
        row-key="name"
      >
        <template v-slot:body-cell-opciones="props">
          <q-td :props="props">
            <q-btn @click="traerDatos(props.row)" color="primary">📝</q-btn>
            <q-btn @click="ides(props.row._id)">🗑️</q-btn>
            <q-btn @click="activar(props.row._id)" v-if="props.row.estado == 0"
              >✅</q-btn
            >
            <q-btn @click="activar(props.row._id)" v-else>❌</q-btn>
          </q-td>
        </template>
        <template v-slot:body-cell-estado1="props">
          <q-td :props="props">
            <p style="color: green" v-if="props.row.estado == 1">Activo</p>
            <p style="color: red" v-else>Inactivo</p>
          </q-td>
        </template>
      </q-table>
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
              {{ b == true ? "Editar Aprendiz" : "Guardar Aprendiz" }}
            </div>
          </q-card-section>

          <q-separator />

          <q-card-section style="max-height: 50vh" class="scroll">
            <q-input
              filled
              v-model="nom"
              label="Nombre del Aprendiz"
              :dense="dense"
            />
            <q-input
              filled
              v-model="doc"
              label="Numero de Documento"
              :dense="dense"
            />
            <q-input
              filled
              v-model="cod"
              label="Numero de Ficha"
              :dense="dense"
            />
            <q-input filled v-model="ema" label="Email" :dense="dense" />
            <q-input filled v-model="tel" label="Telefono" :dense="dense" />
          </q-card-section>

          <q-separator />

          <q-card-actions align="right">
            <q-btn
              flat
              label="Cerrar"
              color="primary"
              v-close-popup
              @click="cerar()"
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
            <span class="q-ml-sm"
              >¿Seguro que quiere eliminar el aprendiz?</span
            >
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
import { useAprendizStore } from "../stores/aprendiz.js";

const useAprendiz = useAprendizStore();

const $q = useQuasar();
let confirm = ref(false);
let r = ref("");
let fixed = ref(false);
let nom = ref("");
let doc = ref("");
let cod = ref("");
let ema = ref("");
let tel = ref("");
let error = ref("");
let b = ref(false);
let id = ref("");

const rows = ref([]);

onBeforeMount(() => {
  traer();
});

function ides(ids) {
  id.value = ids;
  confirm.value = true;
}

async function traer() {
  let res = await useAprendiz.listarAprendiz();
  rows.value = res.data;
}

function traerDatos(datos) {
  console.log(datos);
  id.value = datos._id;
  fixed.value = true;
  b.value = true;
  nom.value = datos.nombre;
  doc.value = datos.cc;
  cod.value = datos.idFicha;
  ema.value = datos.email;
  tel.value = datos.telefono;
}

function cerar() {
  b.value = false;
  num.value = "";
  cod.value = "";
}

async function activar(id) {
  let res = await useAprendiz.activarDesactivarAprendiz(id);
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
    label: "Nombre del Aprendiz",
    align: "center",
    field: "nombre",
    sortable: true,
  },
  {
    name: "documento1",
    align: "center",
    label: "Numero de Documento",
    field: "cc",
    sortable: true,
  },
  {
    name: "ficha1",
    align: "center",
    label: "Numero de ficha",
    field: (row) => row.IdFicha ? row.IdFicha.codigo : 'N/A',
    sortable: true,
  },
  {
    name: "ficha1",
    align: "center",
    label: "Nombre de ficha",
    field: (row) => row.IdFicha ? row.IdFicha.nombre : 'N/A',
    sortable: true,
  },
  {
    name: "email1",
    align: "center",
    label: "Correo",
    field: "email",
    sortable: true,
  },
  {
    name: "telefono1",
    align: "center",
    label: "Telefono",
    field: "telefono",
    sortable: true,
  },
  {
    name: "estado1",
    align: "center",
    label: "Estado",
    field: "estado",
    sortable: true,
  },
  { name: "opciones", label: "Opciones", align: "center" },
]);

</script>