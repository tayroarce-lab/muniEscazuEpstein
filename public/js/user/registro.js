import { postUsuarios, getUsuarios } from "../../server/serviceUsers.js";

const nombre = document.getElementById("nombre");
const email = document.getElementById("email");
const password = document.getElementById("password");
const btnEnviar = document.getElementById("btnEnviar");

btnEnviar.addEventListener("click", async function() {
    const usuario = {
        nombre: nombre.value.trim(),
        email: email.value.trim(),
        password: password.value.trim()
    };

    if (!usuario.nombre || !usuario.email || !usuario.password) {
        Swal.fire({
            icon: "warning",
            title: "Campos incompletos",
            text: "Por favor llene todos los campos"
        });
        return;
    }

    try {
        // Verificar si existe
        const usuarios = await getUsuarios();
        if (usuarios && usuarios.some(u => u.email === usuario.email)) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "El correo electrónico ya está registrado"
            });
            return;
        }

        const nuevoUsuario = await postUsuarios(usuario);

        if (nuevoUsuario) {
             Swal.fire({
                icon: 'success',
                title: 'Registrado',
                text: 'Usuario creado con éxito',
                timer: 2000,
                showConfirmButton: false
            }).then(() => {
                window.location.href = "login.html";
            });
        } else {
             throw new Error("No se pudo crear el usuario");
        }

    } catch (error) {
        console.error("Error al registrar:", error);
         Swal.fire({
            icon: "error",
            title: "Error",
            text: "No se pudo conectar con el servidor"
        });
    }
});
