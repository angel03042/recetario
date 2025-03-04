document.addEventListener('DOMContentLoaded', ()=> {
    fetch('cargarRecetas.html')
        .then(res => res.text())
        .then(data => {
            document.querySelector('#cargarRecetas').innerHTML = data;
            inicializarFunciones();
        })
        .catch(error => console.log('Error cargar seccion', error))
})