<template>
    <div>
      <div id="en">
        <h1 id="programas">Bitacoras</h1>
      </div>
      <hr>
      <div style="margin: 0px;">
        <div class="tablafichas">
          <div style="margin-top: 0px;">
          </div>
          <q-table :rows="rows" :columns="columns" row-key="codigo" title="Bitacoras">
            <template v-slot:body-cell-opciones="props">
              <q-td :props="props">
                <q-btn @click="traerDatos(props.row)" color="primary">📝</q-btn>
                <q-btn @click="ides(props.row._id)">🗑️</q-btn>
              </q-td>
            </template>
            <template v-slot:body-cell-estado="props">
              <q-td :props="props">
              </q-td>
            </template>
          </q-table>
        </div>
        
      </div>
    </div>
  </template>
  
  <script setup>
  import { useRouter} from 'vue-router'
  import { ref, onBeforeMount, watch } from 'vue';
  import { Dark } from 'quasar';
  import { useQuasar } from 'quasar';
  import { useBitacorasStore } from '../stores/bitacoras.js';
  
  const useBitacora = useBitacorasStore();
  const $q = useQuasar();
  const router = useRouter()
  let confirm = ref(false);
  let num = ref("");
  let cod = ref("");
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
    let res = await useBitacora.listarBitacoras();
    rows.value = res.data;
  }
  
  function traerDatos(datos) {
    id.value = datos._id;
    b.value = true;
    num.value = datos.nombre;
    cod.value = datos.codigo;
  }

  const columns = ref([
  { name: 'fecha', label: 'Fecha', field: 'fecha', align: 'center', sortable: true },
  { name: 'IdAprendiz', align: 'center', label: 'Nombre Aprendiz', field: (row) => row?.IdAprendis?.nombre, sortable: true },
  { name: 'IdAprendiz', align: 'center', label: 'Telefono Aprendiz', field: (row) => row?.IdAprendis?.telefono, sortable: true },
  { name: 'IdAprendiz', align: 'center', label: 'Email Aprendiz', field: (row) => row?.IdAprendis?.email, sortable: true },
  { name: 'IdAprendiz', align: 'center', label: 'Número Documento', field: (row) => row?.IdAprendis?.cc, sortable: true },
  { name: 'nombreFicha', align: 'center', label: 'Nombre Ficha', field: row => row?.IdAprendis?.IdFicha?.nombre, sortable: true },
  { name: 'codigoFicha', align: 'center', label: 'Código Ficha', field: row => row?.IdAprendis?.IdFicha?.codigo, sortable: true }
]);

  </script>