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
    verificaionUsuario: /^[a-zA-Z0-9]{1,}$/, // Solo letras y números
    verificaionEmail: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    verificaionPassword: 6,
  };

  const usuarioRegistro = document.querySelector("#usuario_registro").value;
  const email = document.querySelector("#correo").value;
  const passwordRegistro = document.querySelector("#password_registro").value;
  const confirmarPassword = document.querySelector("#confirmar_password_registro").value;

  const alertCaracteresUsuario = document.querySelector("#alertCaracteresUsuario");
  const alertUsuario = document.querySelector("#alertUsuario");
  const alertEmail = document.querySelector("#alertEmail");
  const alertPassword = document.querySelector("#alertPassword");
  const alertPasswordConfirmar = document.querySelector("#alertPasswordConfirmar");

  let labelRegistro = document.querySelectorAll(".etiqueta-registro");

  // Verificar si todos los campos están vacíos
  if (
    usuarioRegistro === "" &&
    email === "" &&
    passwordRegistro === "" &&
    confirmarPassword === ""
  ) {
    labelRegistro.forEach((colors) => {
      colors.style.color = "red";
    });
    return;
  }

  // Restablecer colores
  labelRegistro.forEach((colors) => {
    colors.style.color = "";
  });

  // Validar usuario
  if (!verificacionDatos.verificaionUsuario.test(usuarioRegistro)) {
    // Caso: contiene caracteres especiales
    alertUsuario.style.display = "block";
    alertCaracteresUsuario.style.display = "none";
    return;
  }
  
  if (usuarioRegistro.length < 6) {
    // Caso: longitud excesiva
    console.log('hola')
    alertUsuario.style.display = "none";
    alertCaracteresUsuario.style.display = "block";
    return;
  }
  
  // Si llega aquí, el usuario es válido
  alertUsuario.style.display = "none";
  alertCaracteresUsuario.style.display = "none";

  // Validar email
  if (!verificacionDatos.verificaionEmail.test(email)) {
    alertEmail.style.display = "block";
    return;
  } else {
    alertEmail.style.display = "none";
  }

  // Validar longitud de la contraseña
  if (passwordRegistro.length < verificacionDatos.verificaionPassword) {
    alertPassword.style.display = "block";
    return;
  } else {
    alertPassword.style.display = "none";
  }

  // Validar confirmación de contraseña
  if (passwordRegistro !== confirmarPassword) {
    alertPasswordConfirmar.style.display = "block";
    return;
  } else {
    alertPasswordConfirmar.style.display = "none";
  }

  // Si todo es válido, guardar datos y cambiar vista
  localStorage.setItem("registroUsuario", usuarioRegistro);
  localStorage.setItem("registroPassword", passwordRegistro);

  clearInputs.forEach((limpiar) => {
    limpiar.value = "";
  });

  // Si todo es válido, guardar datos y cambiar vista
  localStorage.setItem("registroUsuario", usuarioRegistro);
  localStorage.setItem("registroPassword", passwordRegistro);

  // ENVIAR CORREO CON EMAILJS
  emailjs.send("service_8doreyk", "template_exg4xxd", {
    usuario: usuarioRegistro,
    correo: email,
    contrasena: passwordRegistro,
    to_email: email, // 👈 ¡Esto es lo que EmailJS necesita!
  })
  .then(function(response) {
    console.log('Correo enviado correctamente', response.status, response.text);
  })
  .catch(function(error) {
    console.error('Error al enviar el correo', error);
  });  

  clearInputs.forEach((limpiar) => {
    limpiar.value = "";
  });

  Alpine.store("estado").button = "datos_verificacion";
});
