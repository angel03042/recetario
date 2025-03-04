document.addEventListener('DOMContentLoaded',()=> {
    fetch('anadir_recetas.html')
        .then(res => res.text())
        .then(data => {
            document.querySelector('#anadirRecetas').innerHTML = data;
            inicializarFunciones();
        })
        .catch(error => console.log('Error cargar seccion', error))
})