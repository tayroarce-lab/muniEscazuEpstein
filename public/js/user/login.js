import { getUsuarios } from "../../server/serviceUsers.js";

const email = document.getElementById("email");
const password = document.getElementById("password");
const btnEnviar = document.getElementById("btnEnviar");

btnEnviar.addEventListener("click", async function() {
    const credentials = {
        email: email.value.trim(),
        password: password.value.trim()
    };

    if (!credentials.email || !credentials.password) {
        Swal.fire({
            icon: "warning",
            title: "Campos vacíos",
            text: "Por favor complete todos los campos"
        });
        return;
    }

    try {
        const usuarios = await getUsuarios();

        if (!usuarios) {
            Swal.fire({
                icon: "error",
                title: "Error de conexión",
                text: "No se pudo obtener la lista de usuarios. Verifique que el servidor esté corriendo."
            });
            return;
        }

        const userFound = usuarios.find(u => u.email === credentials.email && u.password === credentials.password);

        if (userFound) {
            // Guardar sesión antes de redirigir
            sessionStorage.setItem("user", JSON.stringify(userFound));

            Swal.fire({
                icon: 'success',
                title: 'Bienvenido',
                text: 'Inicio de sesión exitoso',
                timer: 1500,
                showConfirmButton: false
            }).then(() => {
                // Redirigir según el rol
                if (userFound.rol === 'admin') {
                    window.location.href = '../admin-dashboard-html/admin.html';
                } else {
                    window.location.href = 'index.html';
                }
            });
        } else {
            Swal.fire({
                icon: "error",
                title: "Credenciales incorrectas",
                text: "El correo o la contraseña no coinciden"
            });
        }
    } catch (error) {
        console.error("Error en login:", error);
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "Ocurrió un error inesperado"
        });
    }
});