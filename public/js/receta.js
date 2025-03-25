// Obtener los elementos del DOM
let imagen = document.querySelector("#imagen");
let title = document.querySelector("#titleReceta");
let ingredientes = document.querySelector("#ingredientesReceta");
let instrucciones = document.querySelector("#instruccionesReceta");

// Obtener receta seleccionada
let receta = JSON.parse(localStorage.getItem('recetaSeleccionada'));
console.log(receta);

if (receta) {
    imagen.src = receta.imagen;
    title.textContent = receta.nombre;
    ingredientes.innerHTML = receta.ingredientes.replace(/\n/g, '<br>');
    instrucciones.innerHTML = receta.instrucciones.replace(/\n/g, '<br>');
} else {
    console.log('Receta no encontrada');
}

// Mostrar confirmación
let buttonDeleteReceta = document.querySelector("#buttonDeleteReceta");
let confirmarDeleteReceta = document.querySelector("#confirmarDeleteReceta");
let cancelarDelete = document.querySelector("#cancelarDelete");
let deleteReceta = document.querySelector("#deleteReceta");
let section = document.querySelector("#section");

// Mostrar alerta
buttonDeleteReceta.addEventListener('click', () => {
    confirmarDeleteReceta.style.display = 'block';
    section.style.opacity = '.2';
    document.body.style.overflow = 'hidden';
    section.style.pointerEvents = 'none';
});

// Cancelar eliminación
cancelarDelete.addEventListener('click', () => {
    confirmarDeleteReceta.style.display = 'none';
    section.style.opacity = '';
    document.body.style.overflow = '';
    section.style.pointerEvents = '';
});

// Eliminar receta seleccionada
deleteReceta.addEventListener('click', () => {
    // Obtener todas las recetas guardadas
    let recetasGuardadas = JSON.parse(localStorage.getItem('recetas')) || [];

    // Filtrar eliminando la receta actual
    const recetasActualizadas = recetasGuardadas.filter(r => r.nombre !== receta.nombre);

    // Actualizar localStorage
    localStorage.setItem('recetas', JSON.stringify(recetasActualizadas));
    localStorage.removeItem('recetaSeleccionada'); // Opcional: Limpiar la seleccionada

    window.location.href = 'usuario.html'; // Redireccionar o a donde desees
});
