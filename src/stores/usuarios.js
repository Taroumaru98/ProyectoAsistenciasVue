import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
import { Notify } from "quasar";

export const useUsuariosStore = defineStore("usuario", () => {
  let xtoken = ref("");
  let usuario = ref("");
  let loading = ref(false);
  const listarUsuarios = async () => {
    try {
      let r = await axios.get("http://localhost:4500/api/Usuarios/listar");
      console.log(r);
      return r;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const login = async (email, password) => {
    loading.value = true;
    try {
      let r = await axios.post("http://localhost:4500/api/Usuarios/login", {
        email: email,
        password: password,
      });
      xtoken.value = r.data.token;
      usuario.value = r.data.usuario;
      Notify.create({
        type: "positive",
        message: "Inicio de sesión exitoso",
      });
      return r;
    } catch (error) {
      console.log(error);
      Notify.create({
        type: "negative",
        message: "Error al iniciar sesión",
      });
      return error;
    }
    finally {
      loading.value = false;
    }
  }

  const logout = async () => {
    xtoken.value = ""
  }

  return {

    listarUsuarios,
    login,
    logout,
    xtoken,
    usuario,
    loading
  };

}, { persist: true });
