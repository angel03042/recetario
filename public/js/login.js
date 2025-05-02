document.querySelector(".btn-primario").addEventListener("click", (event) => {
  event.preventDefault();

  // Registro original
  const usuarioRegistro = localStorage.getItem("registroUsuario");
  const passwordRegistro = localStorage.getItem("registroPassword");

  // Datos actualizados del usuario
  const usuarioUpload = localStorage.getItem("usuarioUpload");
  const passwordUpload = localStorage.getItem("passwordUpload");

  const datosUsuario = {
    usuario: usuarioUpload,
    password: passwordUpload,
  };

  const usuario = document.querySelector("#usuario").value;
  const password = document.querySelector("#password").value;

  const verificacion = document.querySelector("#verificacionId");
  const verificacionIncorrectos = document.querySelector("#incorrectosId");
  const labels = document.querySelectorAll(".etiqueta");

  // Validación: campos vacíos
  if (usuario === "" && password === "") {
    labels.forEach(label => {
      label.style.color = "red";
    });
    verificacion.style.display = "block";
    verificacionIncorrectos.style.display = "none";
    return;
  }

  // Restablecer estilos si hay datos
  labels.forEach(label => {
    label.style.color = "";
  });
  verificacion.style.display = "none";

  // Validación: datos registrados
  if (usuario === usuarioRegistro && password === passwordRegistro) {
    localStorage.setItem("usuario", usuario);
    localStorage.setItem("password", password);
    window.location.href = "public/pages/usuario.html";
    return;
  }

  // Validación: datos actualizados
  if (usuario === datosUsuario.usuario && password === datosUsuario.password) {
    localStorage.setItem("usuario", usuario);
    localStorage.setItem("password", password);
    window.location.href = "/public/pages/usuario.html";
    return;
  }

  // Si ninguna validación fue correcta
  verificacionIncorrectos.style.display = "block";
});
