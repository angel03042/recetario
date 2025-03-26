document.querySelector(".btn1").addEventListener("click", (event) => {
  event.preventDefault();
  //Registro
  const usuarioRegistro = localStorage.getItem("registroUsuario");
  const passwordRegistro = localStorage.getItem("registroPassword");
  //Datos Actualizados del usuario
  const usuarioUpload = localStorage.getItem("usuarioUpload");
  const passwordUpload = localStorage.getItem("passwordUpload");

  const datosUsuario = {
    usuario: usuarioUpload,
    password: passwordUpload,
  };

  const usuario = document.querySelector("#usuario").value;
  const password = document.querySelector("#password").value;

  let verificacion = document.querySelector("#verificacionId");
  let verificacion_incorrectos = document.querySelector("#incorrectosId");

  let labels = document.querySelectorAll("#labels");

  if (usuario === "" && password === "") {
    labels.forEach((labelsInput) => {
      labelsInput.style.color = "red";
    });
    verificacion.style.display = "block";
  } else {
    if (usuario === usuarioRegistro && password === passwordRegistro) {
      localStorage.setItem("usuario", usuario);
      localStorage.setItem("password", password);
      window.location.href = "public/pages/usuario.html";
    } else if (
      usuario === datosUsuario.usuario &&
      password === datosUsuario.password
    ) {
      localStorage.setItem("usuario", usuario);
      localStorage.setItem("password", password);
      window.location.href = "/public/pages/usuario.html";
    } else {
      verificacion.style.display = "none";
      verificacion_incorrectos.style.display = "block";
    }
  }
});
