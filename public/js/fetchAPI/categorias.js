document.addEventListener('DOMContentLoaded',()=> {
    fetch('categorias.html')
        .then(res => res.text())
        .then(data => {
            document.querySelector('#categorias').innerHTML = data;
            inicializarFunciones();
        })
        .catch(error => console.log('Error cargar seccion', error))
})