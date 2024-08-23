import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
import { Notify } from "quasar";
import {useUsuariosStore} from "../stores/usuarios.js"


export const useBitacorasStore = defineStore("Bitacora", () => {
    const useUsuarios = useUsuariosStore()
    let token = ref("");
    const listarBitacoras = async () => {
        try {
            let r = await axios.get("http://localhost:4500/api/Bitacoras/Listar",
                {headers:{
                    "x-token": useUsuarios.xtoken
                  }}
            );
            console.log(r);
            return r;
        } catch (error) {
            console.log(error);
            return error;
        }
    };

    const listarBitacorasPorAprendiz = async () => {
        try {
            let r = await axios.get(`localhost:4500/api/Bitacoras/ListarAprendis/${id}`,
                {headers:{
                    "x-token": useUsuarios.xtoken
                  }}
            );
            console.log(r);
            return r;
        } catch (error) {
            console.log(error);
            return error;
        }
    };

    const listarBitacorasPorFicha = async () => {
        try {
            let r = await axios.get(`localhost:4500/api/Bitacoras/ListarFicha/${id}`,
                {headers:{
                    "x-token": useUsuarios.xtoken
                  }}
            );
            console.log(r);
            return r;
        } catch (error) {
            console.log(error);
            return error;
        }
    };

    return {
        listarBitacoras, listarBitacorasPorAprendiz, listarBitacorasPorFicha, token

    };
}, { persist: true });