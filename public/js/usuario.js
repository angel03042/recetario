document.addEventListener("alpine:init", () => {
  Alpine.store("estado", {
    category: "entrada", // Estado inicial
  });
});

const usuario = localStorage.getItem("usuario");
const password = localStorage.getItem("password");

document.querySelector(".usuario_editar").value = usuario;
document.querySelector(".password_editar").value = password;

// Mostrar nombre de usuario en la pagina principal
let nameUser = document.querySelectorAll(".name_user").forEach(name => {
  name.textContent = usuario;
})
// Mensaje al actualizar datos usuario
const alertActualizarDatos = document.querySelector("#alert");
const alertEditarCampos = document.querySelector("#alert2");
// Button editar usuario
const buttonActualizarDatos = document.querySelector("#actualizar_datos");
const buttonDeleteDatos = document.querySelector("#delete_cuenta");
// Editar datos del usuario
const buttonEditarDatos = document.querySelector("#editar_datos");
const ocultarPassword = document.querySelector("#ocultar");
const mostrarPassword = document.querySelector("#mostrar");
// input (info del usuario)
const passwordOculto = document.getElementById("passwordEditar");
const usuario_editar = document.querySelector(".usuario_editar");

//Button para editar los datos del usuario
buttonEditarDatos.addEventListener("click", () => {
  usuario_editar.removeAttribute("readonly");
  passwordOculto.removeAttribute("readonly");
  usuario_editar.style.border = "3px solid green";
  passwordOculto.style.border = "3px solid green";
});

buttonActualizarDatos.addEventListener("click", () => {
  if (
    usuario_editar.hasAttribute("readonly") &&
    passwordOculto.hasAttribute("readonly")
  ) {
    alertEditarCampos.style.display = "block";

    setTimeout(() => {
      alertEditarCampos.style.display = "none";
    }, 2000);
  } else {
    alertActualizarDatos.style.display = "block";
    //Obtener los valores de los input
    const usuarioValor = usuario_editar.value;
    const passwordValor = passwordOculto.value;
    //Guardar los datos de los input en el localStore
    localStorage.setItem("usuarioUpload", usuarioValor);
    localStorage.setItem("passwordUpload", passwordValor);

    setTimeout(() => {
      alertActualizarDatos.style.display = "none";
      window.location.href = '/index.html';
    }, 5000);

    usuario_editar.setAttribute("readonly", "");
    passwordOculto.setAttribute("readonly", "");
    usuario_editar.style.border = "none";
    passwordOculto.style.border = "none";
  }
});

// Event para borrar cuenta y informacion del usuario
buttonDeleteDatos.addEventListener('click',()=> {
  const confirmaciónDatos = confirm('Estas seguro de que deseas borrar los datos?')
  
  if(confirmaciónDatos){
    localStorage.clear();
    alert('Cache borrada con exito')
    window.location.href = '/index.html'
  }else{
    alert('Operacion cancelada');
  }
 
})

//Button para navegar en la pagina (menu)
const buttonCargarImagen = document.querySelector("#cargar_img");

//Imagen subida por el usuario
let imagenURL = "";

//button para agregar la receta
const anadirReceta = document.querySelector("#anadir_receta");

//Paginas
const imagenCargada = document.querySelector("#img_cargada");
const inputImagen = document.querySelector("#input_imagen");

//Button para cerrar sesion

const buttonCerrarSesion = document.querySelectorAll(".salir");
//confirmar
const cerrarSesion = document.querySelector(".cerrar_sesion");
//Button (salir o mantener)
const salir = document.querySelector("#salir");
const mantener = document.querySelector("#mantener");

//Cerrar sesion

buttonCerrarSesion.forEach((salirSesion) => {
  salirSesion.addEventListener("click", () => {
    cerrarSesion.style.display = "block";
    salir.addEventListener("click", () => {
      window.location.href = "/index.html";
    });
    mantener.addEventListener("click", () => {
      cerrarSesion.style.display = "none";
    });
  });
});

//event para mostrar password
ocultarPassword.addEventListener("click", () => {
  mostrarPassword.style.display = "block";
  ocultarPassword.style.display = "none";
  passwordOculto.type = "text";
});

mostrarPassword.addEventListener("click", () => {
  mostrarPassword.style.display = "none";
  ocultarPassword.style.display = "block";
  passwordOculto.type = "password";
});


//Subir img de la receta

buttonCargarImagen.addEventListener("click", () => {
  inputImagen.click();
});

inputImagen.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      imagenURL = e.target.result; // Guarda la imagen en la variable global
      
      // Verificar si ya hay una imagen cargada y reemplazarla en lugar de agregar otra
      if (imagenCargada.querySelector("img")) {
        imagenCargada.querySelector("img").src = imagenURL;
      } else {
        const imgElement = document.createElement("img");
        imgElement.src = imagenURL;
        imagenCargada.innerHTML = ""; // Asegurar que no haya imágenes previas
        imagenCargada.appendChild(imgElement);
        
      }

      imagenCargada.style.border = "none";
    };
    reader.readAsDataURL(file);
  }
});

//seleccionar los campos
const recetaCategoria = document.querySelector("#receta_categoria");
const subMenuCategoria = document.querySelector(".sub_menu_categorias");
//evento para mostrar el sub menu
recetaCategoria.addEventListener("click", () => {
  subMenuCategoria.style.display = "block";
});
//recorrer toda la lista de las categorias y mostrarla en el input
subMenuCategoria.querySelectorAll("li").forEach((categoria) => {
  categoria.addEventListener("click", () => {
    recetaCategoria.value = categoria.textContent;
    subMenuCategoria.style.display = "none";
  });
});

//Agregar receta al recetario

// Función para mostrar recetas almacenadas
function mostrarRecetas() {
  const containerRecetas = document.querySelector(".container_recetas");
  
  // Recuperar recetas del localStorage
  let recetas = JSON.parse(localStorage.getItem('recetas')) || [];

  // Limpiar el contenedor antes de agregar las recetas
  containerRecetas.innerHTML = "";

  // Recorrer las recetas y agregarlas al contenedor
  recetas.forEach((receta) => {
    const recetasUsuario = document.createElement("a");
    recetasUsuario.classList.add("recetas_agregadas");
    recetasUsuario.href = "receta.html";

    const imgReceta = document.createElement("img");
    imgReceta.src = receta.imagen;

    const informacionReceta = document.createElement("div");
    const titulo = document.createElement("p");
    titulo.classList.add("title_receta");
    titulo.textContent = receta.nombre;

    const descripcion = document.createElement("p");
    descripcion.classList.add("description_receta");
    descripcion.textContent = receta.descripcion;

    // Agregar al DOM
    recetasUsuario.appendChild(imgReceta);
    recetasUsuario.appendChild(informacionReceta);
    informacionReceta.appendChild(titulo);
    informacionReceta.appendChild(descripcion);
    containerRecetas.appendChild(recetasUsuario);

    // Agregar evento click para guardar la receta seleccionada
    recetasUsuario.addEventListener('click',()=>{
      localStorage.setItem('recetaSeleccionada', JSON.stringify(receta));
    });
  });
}

// Llamar a la función mostrarRecetas cuando la página se cargue
window.addEventListener('load', mostrarRecetas);

anadirReceta.addEventListener("click", () => {
  const nombreReceta = document.querySelector("#nombre_receta");
  const descripcionReceta = document.querySelector("#descripcion_receta");
  const instruccionesReceta = document.querySelector("#instrucciones_receta");
  const ingredientesReceta = document.querySelector("#ingrediente_receta");
  const recetaAgregadaButton = document.querySelector("#receta_exitosa");
  const containerRecetaAgregado = document.querySelector("#container_agregado_receta");
  const verificarCamposReceta = document.querySelector("#verificar_campos");
  const verificarDescripcion = document.querySelector("#Descripcion_letras");

  if (
    nombreReceta.value.trim() === "" ||
    descripcionReceta.value.trim() === "" ||
    instruccionesReceta.value.trim() === "" ||
    ingredientesReceta.value.trim() === "" ||
    recetaCategoria.value.trim() === ""
  ) {
    verificarCamposReceta.style.display = "block";
  } else if (descripcionReceta.value.length > 100) {
    verificarDescripcion.style.display = "block";
    descripcionReceta.style.border = "2px solid red";
  } else {
    verificarDescripcion.style.display = "none";
    descripcionReceta.style.border = "";
    verificarCamposReceta.style.display = "none";
    containerRecetaAgregado.style.display = "block";

    recetaAgregadaButton.addEventListener(
      "click",
      () => {
        containerRecetaAgregado.style.display = "none";

        const receta = {
          nombre: nombreReceta.value,
          descripcion: descripcionReceta.value,
          imagen: imagenURL || "public/img/default.jpg", // Imagen por defecto
          categoria: recetaCategoria.value,
          ingredientes: ingredientesReceta.value,
          instrucciones: instruccionesReceta.value,
        };

        let recetas = JSON.parse(localStorage.getItem('recetas')) || [];

        if (!Array.isArray(recetas)) {
          recetas = [];
        }

        recetas.push(receta);
        localStorage.setItem("recetas", JSON.stringify(recetas));

        console.log("Receta guardada:", receta);
        console.log("Todas las recetas:", recetas);

        // Limpiar los campos
        imagenCargada.style.border = "";
        imagenCargada.innerHTML = "";
        imagenURL = "";
        nombreReceta.value = "";
        recetaCategoria.value = "";
        descripcionReceta.value = "";
        instruccionesReceta.value = "";
        ingredientesReceta.value = "";
        inputImagen.value = "";

        // Volver a cargar las recetas
        mostrarRecetas();
      },
      { once: true }
    );
  }
});


//Funcion para mostrar las recetas en sus categorias
function cargarRecetasPorCategoria(categoria){
  const recetasContainer = document.getElementById("cargarCategoria");
  recetasContainer.innerHTML = "";

  const recetas = JSON.parse(localStorage.getItem("recetas")) || [];
  const recetasFiltradas = recetas.filter(receta => receta.categoria === categoria);

  console.log(recetas)

  if(recetasFiltradas.length === 0) {
    recetasContainer.innerHTML = "<p>No hay recetas disponibles para esta categoria.</p>";
    return;
  }

  recetasFiltradas.forEach(receta => {
    const recetasUsuario = document.createElement("a");
    recetasUsuario.classList.add("recetas_agregadas");
    recetasUsuario.href = "receta.html";

    const imgReceta = document.createElement("img");
    imgReceta.src = receta.imagen;

    const informacionReceta = document.createElement("div");
    const titulo = document.createElement("p");
    titulo.classList.add("title_receta");
    titulo.textContent = receta.nombre;

    const descripcion = document.createElement("p");
    descripcion.classList.add("description_receta");
    descripcion.textContent = receta.descripcion;

  // Agregar al DOM
  recetasUsuario.appendChild(imgReceta);
  recetasUsuario.appendChild(informacionReceta);
  informacionReceta.appendChild(titulo);
  informacionReceta.appendChild(descripcion);
  recetasContainer.appendChild(recetasUsuario);

  // Agregar evento click para guardar la receta seleccionada
  recetasUsuario.addEventListener('click',()=>{
    localStorage.setItem('recetaSeleccionada', JSON.stringify(receta));
  });
  })
}

function editarRecetas(){
  const recetas = JSON.parse(localStorage.getItem("recetas")) || [];
  console.log(recetas)

  let containerEditarRecetas = document.querySelector("#editarRecetas");

  containerEditarRecetas.innerHTML = "";

  recetas.forEach(receta => {
    const recetasUsuario = document.createElement("a");
    recetasUsuario.classList.add("recetas_agregadas");

    const imgReceta = document.createElement("img");
    imgReceta.src = receta.imagen;

    const informacionReceta = document.createElement("div");
    const titulo = document.createElement("p");
    titulo.classList.add("title_receta");
    titulo.textContent = receta.nombre;

    const descripcion = document.createElement("p");
    descripcion.classList.add("description_receta");
    descripcion.textContent = receta.descripcion;

    // Agregar al DOM
    recetasUsuario.appendChild(imgReceta);
    recetasUsuario.appendChild(informacionReceta);
    informacionReceta.appendChild(titulo);
    informacionReceta.appendChild(descripcion);
    containerEditarRecetas.appendChild(recetasUsuario);

    recetasUsuario.addEventListener('click', ()=>{
      localStorage.setItem('recetaEdit', JSON.stringify(receta));
      Alpine.store("estado").category = "agregar_receta";
    })
  })
}





