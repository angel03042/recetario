document.addEventListener('DOMContentLoaded', ()=>{
    fetch('Todos_los_productos.html')
        .then(res => res.text())
        .then(data => {
            document.querySelector('#todos_los_productos').innerHTML = data;
            inicializarFunciones();
        })
        .catch(error => console.log('Error cargando la seccion', error))
})