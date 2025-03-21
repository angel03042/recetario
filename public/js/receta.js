let imagen = document.querySelector("#imagen");
let title = document.querySelector("#titleReceta");
let ingredientes = document.querySelector("#ingredientesReceta");
let instrucciones = document.querySelector("#instruccionesReceta");


let receta =JSON.parse(localStorage.getItem('recetaSeleccionada'));

console.log(receta)

if(receta) {
    imagen.src = receta.imagen;
    title.textContent = receta.nombre;
    ingredientes.innerHTML = receta.ingredientes.replace(/\n/g, '<br>');
    instrucciones.innerHTML = receta.instrucciones.replace(/\n/g, '<br>');
} else {
    console.log('Receta no encontrada');
}