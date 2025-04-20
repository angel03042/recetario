document.addEventListener("alpine:init", () => {
  Alpine.store("estado", {
    button: "login", // Estado inicial
  });
});

const buttonRegistrar = document.querySelector("#registrar");
const clearInputs = document.querySelectorAll(".entrada-limpia");

buttonRegistrar.addEventListener("click", (event) => {
  event.preventDefault();

  const verificacionDatos = {
    verificaionUsuario: 8,
    verificaionEmail: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    verificaionPassword: 6,
  };

  const usuarioRegistro = document.querySelector("#usuario_registro").value;
  const email = document.querySelector("#correo").value;
  const passwordRegistro = document.querySelector("#password_registro").value;
  const confirmarPassword = document.querySelector("#confirmar_password_registro").value;

  const alertUsuario = document.querySelector("#alertUsuario");
  const alertEmail = document.querySelector("#alertEmail");
  const alertPassword = document.querySelector("#alertPassword");
  const alertPasswordConfirmar = document.querySelector("#alertPasswordConfirmar");

  // const pagesRegistro = document.querySelector("#registroUsuario");
  // const pagesDatosEnviados = document.querySelector("#datosEnviados");

  let labelRegistro = document.querySelectorAll("#labels_registro");

  if (
    usuarioRegistro === "" &&
    email === "" &&
    passwordRegistro === "" &&
    confirmarPassword === ""
  ) {
    labelRegistro.forEach((colors) => {
      colors.style.color = "red";
    });
  } else {
    labelRegistro.forEach((colors) => {
      colors.style.color = "";
    });
    if (usuarioRegistro.length < verificacionDatos.verificaionUsuario) {
      alertUsuario.style.display = "block";
    } else {
      alertUsuario.style.display = "none";
      if (!verificacionDatos.verificaionEmail.test(email)) {
        alertEmail.style.display = "block";
      } else {
        alertEmail.style.display = "none";
        if (passwordRegistro.length < verificacionDatos.verificaionPassword) {
          alertPassword.style.display = "block";
        } else {
          alertPassword.style.display = "none";
          if (passwordRegistro === confirmarPassword) {
            alertPasswordConfirmar.style.display = "none";
            //Guardar datos del usuario
            localStorage.setItem("registroUsuario", usuarioRegistro);
            localStorage.setItem("registroPassword", passwordRegistro)
            // ✅ CAMBIO AQUÍ: Usar Alpine.store()
            clearInputs.forEach((limpiar) => {
              limpiar.value = "";
            });
            Alpine.store("estado").button = "datos_verificacion";
          } else {
            alertPasswordConfirmar.style.display = "block";
          }
        }
      }
    }
  }
});
