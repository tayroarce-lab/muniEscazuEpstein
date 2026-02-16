import { postUsuarios } from "../../server/serviceUsers.js";

const nombre = document.getElementById("nombre");
const email = document.getElementById("email");
const password = document.getElementById("password");
const btnEnviar = document.getElementById("btnEnviar");

btnEnviar.addEventListener("click", function() {
    const usuario = {
        nombre: nombre.value,
        email: email.value,
        password: password.value
    };
    postUsuarios(usuario);

    console.log("Usuario creado con éxito");
    
});
