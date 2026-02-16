import { getUsuarios } from "../server/serviceUsers.js";

const email = document.getElementById("email");
const password = document.getElementById("password");
const btnEnviar = document.getElementById("btnEnviar");

btnEnviar.addEventListener("click", async function() {
    const usuario = {
        email: email.value,
        password: password.value
    };
    let usuarios = await getUsuarios();

    verificarUsuario();
    async function verificarUsuario() {
    for (let index = 0; index < usuarios.length; index++) {

    if (usuarios[index].email === usuario.email && usuarios[index].password === usuario.password) {
        alert("Usuario encontrado");
        window.location.href = "../pages/index.html";
        break;
    }
}}});
