function inicializarFunciones() {

    const usuario = localStorage.getItem('usuario');
    const password = localStorage.getItem('password');

    document.querySelector('.usuario_editar').value = usuario;
    document.querySelector('.password_editar').value = password;

    // mostrar password
    const alertActualizarDatos = document.querySelector('#alert');
    const alertEditarCampos = document.querySelector('#alert2');
    const buttonActualizarDatos = document.querySelector('#actualizar_datos');
    const buttonEditarDatos = document.querySelector('#editar_datos');
    const usuario_editar = document.querySelector('.usuario_editar');
    const passwordOculto = document.getElementById('passwordEditar');
    const ocultarPassword = document.querySelector('#ocultar');
    const mostrarPassword = document.querySelector('#mostrar');

    //Button para editar los datos del usuario
    buttonEditarDatos.addEventListener('click',()=>{
        usuario_editar.removeAttribute('readonly');
        passwordOculto.removeAttribute('readonly');
        usuario_editar.style.border = '3px solid green';
        passwordOculto.style.border = '3px solid green'
    });

    buttonActualizarDatos.addEventListener('click',()=>{
        if(usuario_editar.hasAttribute('readonly') && passwordOculto.hasAttribute('readonly')){
            alertEditarCampos.style.display = 'block';

            setTimeout(()=> {
                alertEditarCampos.style.display = 'none'
            }, 5000);
        }else {
            alertActualizarDatos.style.display = 'block';

            setTimeout(()=>{
                alertActualizarDatos.style.display = 'none';
            }, 5000);

            usuario_editar.setAttribute('readonly', '');
            passwordOculto.setAttribute('readonly', '');
            usuario_editar.style.border = 'none';
            passwordOculto.style.border = 'none';
        }
    })
    
    //Button para navegar en la pagina (menu)
    const buttonCargarImagen = document.querySelector('#cargar_img');

    //Imagen subida por el usuario
    let imagenURL = '';

    //button para agregar la receta
    const anadirReceta = document.querySelector('#anadir_receta');

    //Paginas
    const imagenCargada = document.querySelector('#img_cargada');
    const inputImagen = document.querySelector('#input_imagen');

    //Button para cerrar sesion

    const buttonCerrarSesion = document.querySelectorAll("#cerrar_salirSesion");
    //confirmar
    const cerrarSesion = document.querySelector(".cerrar_sesion");
    //Button (salir o mantener)
    const salir = document.querySelector("#salir");
    const mantener = document.querySelector("#mantener");

    //Cerrar sesion

    buttonCerrarSesion.forEach(salirSesion => { 
    salirSesion.addEventListener("click",()=>{
        cerrarSesion.style.display = 'block';
        salir.addEventListener('click', ()=>{
           window.location.href = '/index.html';
        })
        mantener.addEventListener('click', ()=>{
            cerrarSesion.style.display = 'none';
        })
    })
    })

    //event para mostrar password
    ocultarPassword.addEventListener('click', ()=>{
        mostrarPassword.style.display = 'block';
        ocultarPassword.style.display = 'none';
        passwordOculto.type = 'text';
    });

    mostrarPassword.addEventListener('click',()=>{
        mostrarPassword.style.display = 'none';
        ocultarPassword.style.display = 'block'  ;
        passwordOculto.type = 'password';
    })


    //Subir archivo PDF

    const filePDF = document.querySelector('#filePDF');

    document.querySelector('#button1').addEventListener('click',()=>{
        filePDF.click();
    })


    //Subir img de la receta

    buttonCargarImagen.addEventListener('click', () => {
        inputImagen.click();
    });
    
    inputImagen.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                imagenURL = e.target.result; // Guarda la imagen en la variable global
    
                // Verificar si ya hay una imagen cargada y reemplazarla en lugar de agregar otra
                if (imagenCargada.querySelector('img')) {
                    imagenCargada.querySelector('img').src = imagenURL;
                } else {
                    const imgElement = document.createElement('img');
                    imgElement.src = imagenURL;
                    imagenCargada.innerHTML = ''; // Asegurar que no haya imágenes previas
                    imagenCargada.appendChild(imgElement);
                }
                
                imagenCargada.style.border = 'none';
            };
            reader.readAsDataURL(file);
        }
    });
    

    //seleccionar los campos
    const recetaCategoria = document.querySelector('#receta_categoria');
    const subMenuCategoria = document.querySelector('.sub_menu_categorias');
    //evento para mostrar el sub menu
    recetaCategoria.addEventListener('click', ()=> {
        subMenuCategoria.style.display = 'block';
    });
    //recorrer toda la lista de las categorias y mostrarla en el input
    subMenuCategoria.querySelectorAll('li').forEach(categoria => {
        categoria.addEventListener('click',()=>{
            recetaCategoria.value = categoria.textContent;
            subMenuCategoria.style.display = 'none';
        })
    });

    //Agregar receta al recetario

    anadirReceta.addEventListener('click', (event) => {
        event.preventDefault();
    
        // Inputs de recetas
        const nombreReceta = document.querySelector('#nombre_receta');
        const descripcionReceta = document.querySelector('#descripcion_receta');
        const instruccionesReceta = document.querySelector('#instrucciones_receta');
        const ingredientesReceta = document.querySelector('#ingrediente_receta');

        // Botón y contenedor de confirmación
        const recetaAgregadaButton = document.querySelector('#receta_exitosa');
        const containerRecetaAgregado = document.querySelector('#container_agregado_receta');
        const verificarCamposReceta = document.querySelector('#verificar_campos');
        const verificarDescripcion = document.querySelector('#Descripcion_letras');
        
        if (nombreReceta.value.trim() === '' || 
            descripcionReceta.value.trim() === '' || 
            instruccionesReceta.value.trim() === '' || 
            ingredientesReceta.value.trim() === '' ||
            recetaCategoria.value.trim() === '') {
            
            verificarCamposReceta.style.display = 'block';
        } else if(descripcionReceta.value.length > 100) {
            verificarDescripcion.style.display = 'block';
            descripcionReceta.style.border = '2px solid red'
        } else {
            verificarDescripcion.style.display = 'none';
            descripcionReceta.style.border = ''
            verificarCamposReceta.style.display = 'none';
            containerRecetaAgregado.style.display = 'block';
    
            recetaAgregadaButton.addEventListener('click', () => {
                containerRecetaAgregado.style.display = 'none';
                


                //contenedor de todas las recetas
                const containerRecetas = document.querySelector('.container_recetas');
                //contenedor de la receta
                const recetasUsuario = document.createElement('div');
                recetasUsuario.classList.add('recetas_agregadas');
                //Imagen de la receta
                const imgReceta = document.createElement('img');
                imgReceta.src = imagenURL;
                //contenedor del texto de la receta
                const informacionReceta = document.createElement('div');
                //Titulo de la receta
                const titulo = document.createElement('p');
                titulo.classList.add('title_receta');

                titulo.textContent = nombreReceta.value;
                //Descripcion de la receta
                const descripcion = document.createElement('p');
                descripcion.classList.add('description_receta');

                descripcion.textContent = descripcionReceta.value;
                //Agregar informacion al contenedor padre
                recetasUsuario.appendChild(imgReceta);
                recetasUsuario.appendChild(informacionReceta);
                informacionReceta.appendChild(titulo)
                informacionReceta.appendChild(descripcion);
                containerRecetas.appendChild(recetasUsuario);

                //Anadir recetas a su respectiva categoria
                let categorias = ['Postres','Bebidas','Entradas y Aperitivos','Sopas y Cremas','Ensaladas','Salsa y Aderezos','Platos Fuertes','Guarniciones'];
    
                // Limpiar los campos
                imagenCargada.style.border = '';
                imagenCargada.innerHTML = ''; // Limpiar la vista previa de la imagen
                imagenURL = ''; // Resetear la imagen guardada
                nombreReceta.value = '';
                recetaCategoria.value = '';
                descripcionReceta.value = '';
                instruccionesReceta.value = '';
                ingredientesReceta.value = '';
                inputImagen.value = '';  // Limpiar el input file
            }, { once: true });
        }
    });

    }   


















