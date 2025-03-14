function cargarContenido(idElemento, archivo) {
    fetch(archivo)
        .then(response => response.text())
        .then(data => {
            document.getElementById(idElemento).innerHTML = data;
            inicializarFunciones();
        })
        .catch(error => console.error(`Error cargando ${archivo}:`, error));
}
