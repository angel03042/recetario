document.addEventListener('DOMContentLoaded',()=>{
    fetch('perfilusuario.html')
        .then(res => res.text())
        .then(data => {
            document.querySelector('#perfilUsuario').innerHTML = data;
            inicializarFunciones();
        })
        .catch(error => console.log('Error cargar seccion', error));
})