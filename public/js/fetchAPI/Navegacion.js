document.addEventListener('DOMContentLoaded', ()=>{
    fetch('navegacion.html')
        .then(res => res.text())
        .then(data => {
            document.querySelector('#navegacion').innerHTML = data;
            inicializarFunciones();
        })
        .catch(error => console.log('Error cargando la seccion', error))
})

